import AdminOrder from "../models/AdminOrderByRestuarant.js";
import Hotel from "../models/Hotel.js";
import Menu from "../models/Menu.js";
import RestaurantMenu from "../models/RestaurantMenu.js";
import Room from "../models/Room.js";

export const createOrderforadmin = async (req, res) => {
    try {
      const { hotelId, roomId, orderItems,name,phoneNo} = req.body;
  
      // Validate request data
      if (!hotelId || !roomId || !orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: "All fields are required!" });
      }
      // Check if the hotel exists
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found!" });
      }
  
      // Check if the room exists in the given hotel and populate the hotel details
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
        totalPrice += menuItem.sellingPrice * item.quantity;
      }
      const newOrder = new AdminOrder({
        hotelId,
        roomId,
        orderItems,
        totalPrice,
        name,
        phoneNo,
        status: "Processing",
      });
  
      await newOrder.save();
      // Populate the order items with menu details
      const populatedOrder = await AdminOrder.findById(newOrder._id)
        .populate({
          path: 'orderItems.menuItem',
          model: 'Menu',
        });
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
        // menuItems: populatedOrder.orderItems.map(item => ({
        //   menuItem: item.menuItem, // Populated menu item details
        //   quantity: item.quantity,
        // })),
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
          model: "RestaurantMenu",
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
      const { id } = req.params;  // Getting roomId from the query parameter
      if (!id) {
        return res.status(400).json({ message: "Room ID is required!" });
      }

      // Find orders by roomId
      const orders = await AdminOrder.find({ 
        roomId:
        id })
        .populate({
          path: "orderItems.menuItem",
          model: "RestaurantMenu",
        })
        // .populate({
        //   path: "hotelId",
        //   model: "Hotel",
        // })
        // .populate({
        //   path: "roomId",
        //   model: "Room",
        // });
  
      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this room!" });
      }
  
      res.status(200).json({
        message: "Orders retrieved successfully for the specified room!",
        orders,
      });
    } catch (error) {
      console.error(error);  // Log the error for debugging purposes
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
        model: "RestaurantMenu",
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
  