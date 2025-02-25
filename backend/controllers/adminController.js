import AdminOrder from "../models/AdminOrderByRestuarant.js";
import Hotel from "../models/Hotel.js";
import Menu from "../models/Menu.js";
import RestaurantMenu from "../models/RestaurantMenu.js";
import Room from "../models/Room.js";

export const createOrderforadmin = async (req, res) => {
  try {
    const { hotelId, roomId, orderItems, name, phoneNo } = req.body;

    console.log("Request Body:", req.body); // Debugging log to check if phoneNo is included

    // Validate request data
    if (!hotelId || !roomId || !orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if the hotel exists
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found!" });
    }

    // Check if the room exists in the given hotel
    const room = await Room.findOne({ _id: roomId, hotelId: hotelId }).populate('hotelId');
    if (!room) {
      return res.status(404).json({ message: "Room not found in the given hotel!" });
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of orderItems) {
      const menuItem = await Menu.findById(item.menuItem);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item with ID ${item.menuItem} not found!` });
      }
      totalPrice += menuItem.discountedPrice * item.quantity;
    }
    const sub=totalPrice;
    const gst = totalPrice * 0.05;
    totalPrice += gst;
    totalPrice = parseFloat(totalPrice.toFixed(2));

    // Create new order with GST
    const newOrder = new AdminOrder({
      hotelId,
      roomId,
      orderItems,
      totalPrice, // Now rounded to 2 decimal places
      gst,  
      name,
      phoneNo,  
      status: "Processing",
      subtotal:sub
    });

    // Save the new order
    await newOrder.save();

    // Populate the order with menu details
    const populatedOrder = await AdminOrder.findById(newOrder._id)
      .populate({
        path: 'orderItems.menuItem',
        model: 'Menu',
      });

    // Return the response with populated order and hotel/room details
    res.status(201).json({
      message: "Order placed successfully!",
      order: populatedOrder,
      hotel: {
        _id: room.hotelId._id,
        name: room.hotelId.name,
      },
      room: {
        _id: room._id,
        roomId: room.roomId,
        roomDetails: room.room, // Example room field
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};





  export const getOrdersForAdmin = async (req, res) => {
    try {
      const orders = await AdminOrder.find()
        .populate({
          path: "orderItems.menuItem",
          model: "Menu",
        })
        .populate({
          path: "hotelId",
          model: "Hotel",
        })
        .populate({
          path: "roomId",
          model: "Room",
        });
  
      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found!" });
      }
  
      res.status(200).json({
        message: "Orders retrieved successfully!",
        orders,
      });
    } catch (error) {
      console.error(error);  // Log the error for debugging purposes
      res.status(500).json({ message: "Server error!", error: error.message });
    }
  };
  export const getOrdersByRoomId = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Room ID is required!" });
      }
  
      // Fetch orders with populated fields
      const orders = await AdminOrder.find({ roomId: id })
        .populate({
          path: "orderItems.menuItem", // Populating the menuItem inside orderItems
          model: "Menu", // The model for menuItem
          select: "name price description discountedPrice", // Select specific fields to return
        })
        .populate({
          path: "hotelId", // Populating the hotel details
          model: "Hotel", // The model for Hotel
          select: "name address contactNumber", // Select specific fields to return
        })
        .populate({
          path: "roomId", // Populating the room details
          model: "Room", // The model for Room
          select: "room", // Select specific fields to return
        });
  
      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this room!" });
      }
  
      // Modify the response to include total cost for each order item
      const formattedOrders = orders.map((order) => {
        const updatedOrderItems = order.orderItems.map((item) => {
          return {
            menuItem: item.menuItem,
            quantity: item.quantity,
            discountedPrice: item.menuItem?.discountedPrice || 0,
            totalCost: parseFloat((item.quantity * (item.menuItem?.discountedPrice || 0)).toFixed(2)), // Multiply quantity by discounted price and round to 2 decimal places
          };
        });
  
        return {
          _id: order._id,
          hotelId: order.hotelId,
          roomId: order.roomId,
          orderItems: updatedOrderItems,
          totalPrice: order.totalPrice,
          gst: order.gst,
          name: order.name,
          phoneNo: order.phoneNo,
          status: order.status,
          subtotal:order.subtotal,
          orderDate:order.orderDate
        };
      });
  
      res.status(200).json({
        message: "Orders retrieved successfully for the specified room!",
        orders: formattedOrders,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ message: "Server error!", error: error.message });
    }
  };
  
  
  // Update the status of an existing order
export const updateOrder = async (req, res) => {
    try {
      const {id } = req.params;

      const { status } = req.body;
  
      // Validate that the status is one of the allowed values
      const validStatuses = ["Processing", "Delivered", "Cancelled"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status!" });
      }
  
      // Find and update the order
      const updatedOrder = await AdminOrder.findByIdAndUpdate(
        id,
        { status },
        { new: true }  // Return the updated order after modification
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found!" });
      }
  
      // Populate the order details (optional, if you need detailed info in response)
      const populatedOrder = await updatedOrder.populate({
        path: "orderItems.menuItem",
        model: "Menu",
      });
  
      res.status(200).json({
        message: "Order status updated successfully!",
        order: populatedOrder,
      });
    } catch (error) {
      console.error(error);  // Log the error for debugging purposes
      res.status(500).json({ message: "Server error!", error: error.message });
    }
  };
  export const addGst = async (req, res) => {
    try {
      const { id } = req.params;
      const { gst } = req.body; 
      const order = await AdminOrder.findById(id);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found!" });
      }
      order.gst = gst;
      await order.save();
      res.status(200).json({
        message: "GST added successfully!",
        order: order,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
  export const getorderbyId=async(req,res)=>{
    try {
      const { id } = req.params;
      const order = await AdminOrder
        .findById(id,{})
        .populate({
          path: "orderItems.menuItem",  // Populating the menuItem inside orderItems
          model: "Menu",  // The model for menuItem
          // select: "name price description"  // Select specific fields to return (optional)
        })
        .populate({
          path: "hotelId",  // Populating the hotel details
          model: "Hotel",  // The model for Hotel
          select: "name address contactNumber"  // Select specific fields to return (optional)
        })
        .populate({
          path: "roomId",  // Populating the room details
          model: "Room",  // The model for Room
          // select: "room"  // Select specific fields to return (optional)
        }); console.log(order);
        if(order){
          res.status(200).json({
            message: "Order retrieved successfully!",
            order,
          });
        }
       
        
        else{
          res.status(404).json({ message: "Order not found!" });
        }
    } catch (error) {
      res.status(500).json({ message: "Server error!", error: error.message });
    }
  }