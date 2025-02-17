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
import Reviews from "../models/Reviews.js";

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
      orderStatus: "Pending",
      paymentStatus: "failed",
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
      .then(async (response) => {
      await  Order.findOneAndUpdate({_id:order._id},{orderStatus:'Confirm'})
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

export const Orders=async (req,res)=>{
  try {
    // Get page and limit from query parameters, with defaults
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || Infinity; // Default to limit of 10
    console.log(limit);
    
    const skip = (page - 1) * limit; // Calculate how many records to skip
  
    // Get startDate and endDate from query parameters
    const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;
  
    // Build the query object
    const query = {};
    if (startDate) {
      query.createdAt = { $gte: startDate }; // Greater than or equal to startDate
    }
    if (endDate) {
      query.createdAt = { ...query.createdAt, $lte: endDate }; // Less than or equal to endDate
    }
  
    // Fetch orders with pagination and date filtering
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "firstName lastName email phoneNo")
      .populate("deliveryAddress", "zipCode location");
      console.log(orders);
      
  
    // Get the total count of orders for pagination info
    const totalOrders = await Order.countDocuments(query);
  
    return res.status(200).json({
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }

}

export const GetAllReviews =async (req,res)=>{
  try {
    const {
      search = '',
      startDate,
      endDate,
      sort = 'recent', // 'highest', 'lowest', or 'recent'
      page = 1,
      limit = 10
  } = req.query;

  // Build the query object
  const query = {
      review: { $regex: search, $options: 'i' } 
  };

  // Add date range filter if provided
  if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
          query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
          query.createdAt.$lte = new Date(endDate);
      }
  }

  // Determine sorting
  let sortOption;
  if (sort === 'highest') {
      sortOption = { rating: -1 }; // Sort by highest rating
  } else if (sort === 'lowest') {
      sortOption = { rating: 1 }; // Sort by lowest rating
  } else {
      sortOption = { createdAt: -1 }; // Sort by most recent
  }

  // Pagination
  const reviews = await Reviews.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('menuId', 'name description images type') // Populate menuId with name field
      .populate('userId', 'firstName lastName '); // Populate userId with username field

  // Get total count for pagination
  const totalReviews = await Reviews.countDocuments(query);

  res.status(200).json({
      success: true,
      data: reviews,
      total: totalReviews,
      page: Number(page),
      totalPages: Math.ceil(totalReviews / limit)
  });
  } catch (error) {
    
  }
}

export const favoritesmenu=async (req,res)=>{
  try {
    // Step 1: Fetch all reviews
    const reviews = await Reviews.find().populate('menuId').populate('userId'); // Populate to get user info if needed

    // Step 2: Prepare a list of menuIds from the reviews
    const menuIds = reviews.map(review => review.menuId);

    // Step 3: Fetch all orders where the items match the menuIds and the order status indicates delivery
    const deliveredOrders = await Order.find({
      'items.itemid': { $in: menuIds },
      orderStatus: 'Delivered' // Adjust this condition based on your actual statuses
    }).limit(10).populate('items.itemid');

    const menuCount=await Menu.countDocuments()
    // Step 4: Return or process the results as needed
    return res.status(200).json({
      reviews,
      deliveredOrders,
      menuCount
    }) ;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Handle error as appropriate for your application
  }

}

export const getItemsWithCategory = async (req, res) => {
  try {
    const cuisine = await Cuisine.find().populate('items');
    res.status(200).json(cuisine);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};