import Order from "../models/Order.js";
import Cuisine from "../models/Cuisine.js";
import Delivery from "../models/Delivery.js";
import User from "../models/User.js";
import uniquid from "uniqid"; // npm install uniqid
import Menu from "../models/Menu.js";
import axios from "axios";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import Address from "../models/Address.js";
import Cart from "../models/Cart.js";

export const payment = async (req, res) => {
  try {
    const merchantTransactionId = uniquid();
    const { userId, date, time, items, total, deliveryAddress } = req.body;
    if (!userId || !date || !time || !items || !total || !deliveryAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const payload = {
      merchantId: process.env.MERCHANT_ID,
      amount: total * 100,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: userId,
      redirectUrl: `${process.env.REDIRECT_URL}/${merchantTransactionId}`,
      redirectMode: "POST",
      callbackUrl: process.env.CALLBACK_URL,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const order = new Order({
      userId,
      date,
      time,
      items,
      total,
      deliveryAddress,
      orderStatus: "pending",
      paymentStatus: "cancelled",
      merchantTransactionId,
    });
    await order.save();
    const payEndPoint = "/pg/v1/pay";
    const base64EncodedPayload = Buffer.from(JSON.stringify(payload)).toString(
      "base64"
    );
    // const base64EncodedPayload = bufferobj.toString("base64");
    const xVerify =
      crypto
        .createHash("sha256")
        .update(base64EncodedPayload + payEndPoint + process.env.SALT_KEY)
        .digest("hex") +
      "###" +
      process.env.SALT_INDEX;
    const options = {
      method: "POST",
      url: `${process.env.PHONE_PAY_HOST_URL}${payEndPoint}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
      },
      data: {
        request: base64EncodedPayload,
      },
    };
    axios
      .request(options)
      .then((response) => {
        res.status(200).json({
          url: response.data.data.instrumentResponse.redirectInfo.url,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: error });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const addOrder = async (req, res) => {
//     try{

//         const options = {
//             method: 'GET',
//             url:`${process.env.PHONE_PAY_HOST_URL}/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
//             headers: {
//                 accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 'X-VERIFY': xVerify,
//                 'X-MERCHANT-ID':merchantTransactionId,
//             },
//         }

//      const response = await axios.request(options);
//     //  const paymentStatus = response.data.data.status;

//         // const {userId,date,time,items,total,deliveryAddress,orderStatus} = req.body;
//         // const order = new Order({
//         //     userId,
//         //     date,
//         //     time,
//         //     items,
//         //     paymentStatus,
//         //     total,
//         //     deliveryAddress,
//         //     orderStatus
//         // });
//         // await order.save();
//         console.log(response.data);
//     }
//     catch(error){
//         res.status(500).json({message:"Internal server error"});
//     }
// }

export const checkPaymentStatus = async (req, res) => {
  try {
    const merchantTransactionId = req.params.id;

    if (process.env.NODE_ENV === "development") {
      const payEndPoint = `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`;
      const xVerify =
        crypto
          .createHash("sha256")
          .update(payEndPoint + process.env.SALT_KEY)
          .digest("hex") +
        "###" +
        process.env.SALT_INDEX;
      const options = {
        method: "GET",
        url: `${process.env.PHONE_PAY_HOST_URL}${payEndPoint}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
          "X-MERCHANT-ID": merchantTransactionId,
        },
      };
      axios
        .request(options)
        .then((response) => {
          if (response.data.success) {
            const paymentStatus =
              response.data.code === "PAYMENT_SUCCESS" ? "completed" : "failed";
            Order.findOneAndUpdate({ merchantTransactionId }, { paymentStatus })
              .then(async(order) => {
                const cart = await Cart.findOneAndDelete({ userId: order.userId });
                res.status(200).redirect(process.env.ORDER_URL);
              })
              .catch((error) => {
                console.error(error);
                res.status(500).json({ message: error });
              });
          } else {
            const paymentStatus = "failed";
            Order.findOneAndUpdate({ merchantTransactionId }, { paymentStatus })
              .then((order) => {
                res.status(400).redirect(process.env.ORDER_URL);
              })
              .catch((error) => {
                console.error(error);
                res.status(500).json({ message: error });
              });
          }
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: error });
        });
    } else {
      const payEndPoint = `/v3/transaction/${process.env.MERCHANT_ID}/${merchantTransactionId}/status`;
      const xVerify =
        crypto
          .createHash("sha256")
          .update(payEndPoint + process.env.SALT_KEY)
          .digest("hex") +
        "###" +
        process.env.SALT_INDEX;
      const options = {
        method: "GET",
        url: `https://mercury-t2.phonepe.com${payEndPoint}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
          "X-MERCHANT-ID": merchantTransactionId,
        },
      };
      axios
        .request(options)
        .then((response) => {
          if (response.data.success) {
            const paymentStatus =
              response.data.code === "PAYMENT_SUCCESS" ? "completed" : "failed";
            Order.findOneAndUpdate({ merchantTransactionId }, { paymentStatus })
              .then(async(order) => {
                const cart = await Cart.findOneAndDelete({ userId: order.userId });
                res.status(200).redirect(process.env.ORDER_URL);
              })
              .catch((error) => {
                console.error(error);
                res.status(500).json({ message: error });
              });
          } else {
            const paymentStatus = "failed";
            Order.findOneAndUpdate({ merchantTransactionId }, { paymentStatus })
              .then((order) => {
                res.status(400).redirect({ message: "Payment failed" });
              })
              .catch((error) => {
                console.error(error);
                res.status(500).json({ message: error });
              });
          }
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: error });
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getOrders = async (req, res) => {
  try {
    const userId = req.params.id;

    const orders = await Order.find({ userId });

    const updatedOrders = await Promise.all(
      orders.map(async (order) => {
        const address = await Address.findById(order.deliveryAddress);

        const updatedItems = await Promise.all(
          order.items.map(async (item) => {
            const menuItem = await Menu.findById(item.itemid);
            return {
              ...item.toObject(), 
              image: menuItem?.images?.[0] || null, 
            };
          })
        );

        return {
          ...order.toObject(), 
          deliveryAddress: address,
          items: updatedItems, 
        };
      })
    );

    res.status(200).json({ orders: updatedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const status = req.body.orderStatus;
    const id = req.params.id;
    const order = await Order.findById(id);
    if (order) {
      order.orderStatus = status;
      await order.save();
      res.status(200).json({ message: "Order status updated successfully" });
    } else {
      res.status(400).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getOrderDetails = async (req, res) => {
  try {
    const id = req.params.id;

  
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

  
    const address = await Address.findById(order.deliveryAddress);
    
    
    const updatedItems = await Promise.all(
      order.items.map(async (item) => {
        const menuItem = await Menu.findById(item.itemid);
        return {
          ...item.toObject(),
          image: menuItem?.images?.[0] || null,
        };
      })
    );

    
    const updatedOrder = {
      ...order.toObject(),
      deliveryAddress: address, 
      items: updatedItems, 
    };

    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getOrdersByFilter = async (req, res) => {
  try {
    const id = req.params.id;
    const { orderStatus, paymentStatus, date } = req.body;
    const query = {};
    if (orderStatus) {
      query.orderStatus = orderStatus;
    }
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }
    if (date) {
      query.date = date;
    }
    query.userid = id;
    const orders = await Order.find(query);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addCuisine = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCuisine = await Cuisine.findOne({ name });
    if (existingCuisine) {
      return res.status(200).json({ message: "Cuisine already exists" });
    }
    const date = new Date();
    const cuisine = new Cuisine({
      name,
      date
    });

    await cuisine.save();
    res.status(200).json({ message: "Cuisine added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCuisines = async (req, res) => {
  try {
    const cuisines = await Cuisine.find();
    res.status(200).json(cuisines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCuisineById = async (req, res) => {
  try {
    const id = req.params.id;
    const cuisine = await Cuisine.findById(id);
    if (cuisine) {
      res.status(200).json(cuisine);
    } else {
      res.status(400).json({ message: "Cuisine not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCuisine = async (req, res) => {
  try {
    const id = req.params.id;
    const { name} = req.body;
    const cuisine = await Cuisine.findById(id);

    if (!cuisine) {
      return res.status(400).json({ message: "Cuisine not found" });
    }
    cuisine.name = name;
    await cuisine.save();
    res.status(200).json({ message: "Cuisine updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCuisine = async (req, res) => {
  try {
    const id = req.params.id;
    const cuisine = await Cuisine.findById(id);
    if (cuisine) {
      await cuisine.deleteOne();
      res.status(200).json({ message: "Cuisine deleted successfully" });
    } else {
      res.status(400).json({ message: "Cuisine not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adddeliveryaddress = async (req, res) => {
  try {
    const { zipCode } = req.body;
    const delivery = new Delivery({
      zipCode,
    });
    await delivery.save();
    res.status(200).json({ message: "Delivery added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDeliveryaddress = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletedeliveryaddress = async (req, res) => {
  try {
    const id = req.params.id;
    const delivery = await Delivery.findById(id);
    if (delivery) {
      await delivery.remove();
      res.status(200).json({ message: "Delivery deleted successfully" });
    } else {
      res.status(400).json({ message: "Delivery not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatedeliveryaddress = async (req, res) => {
  try {
    const id = req.params.id;
    const { zipCode } = req.body;
    const delivery = await Delivery.findById(id);
    if (delivery) {
      delivery.zipCode = zipCode;
      await delivery.save();
      res.status(200).json({ message: "Delivery updated successfully" });
    } else {
      res.status(400).json({ message: "Delivery not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkdeliveryaddress = async (req, res) => {
  try {
    const { zipCode } = req.body;

    if (!zipCode) {
      return res.status(400).json({ message: "Zip code is required." });
    }

    const delivery = await Delivery.findOne({ zipCode });
    if (delivery) {
      return res
        .status(200)
        .json({ deliveryAvailable: true, message: "Delivery available" });
    } else {
      return res
        .status(200)
        .json({ deliveryAvailable: false, message: "Delivery not available" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
