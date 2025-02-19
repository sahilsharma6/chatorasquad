import Hotel from "../models/Hotel.js";
import Restaurant from "../models/Restaurant.js";
import RestaurantMenu from "../models/RestaurantMenu.js";
import RestaurantOrder from "../models/RestuarantOrder.js";
import Room from "../models/Room.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Create a new restaurant
export const createRestaurant = async (req, res) => {
  try {
    const { name, phoneNo, firstName,lastName ,email,password,gender} = req.body;
    

   if (!name || !phoneNo || !firstName || !lastName || !email || !password) {
     return res.status(400).json({ message: "Please fill in all fields" });
   }

   // Check if Restaurant already exists
   const existingRes = await Restaurant.findOne({ name });
   if (existingRes) {
     return res.status(400).json({ message: "Restaurant already exists. use unique name" });
   }
   
  
   // Check if user exists
   const existingUser = await User.findOne({ email });
   if (existingUser) {
     return res.status(400).json({ message: "User already exists .Use diffrent email " });
   }

   // Create a new user

   const hashedPassword = await bcrypt.hash(password, 12);
   const newUser = new User({
     firstName,
     lastName,
     email,
     password: hashedPassword,
     role: 'restaurant',
     gender,
     phoneNo,
   });

   // If user exists, create the Restaurant
   const newRestaurant = new Restaurant({
     name,
     userId: newUser._id,
     isValid: false,
   });

    newUser.restaurantId = newRestaurant._id;
   await newUser.save();
   await newRestaurant.save();
   return res.status(201).json(newRestaurant);
 } catch (error) {
   console.log(error);
   return res.status(500).json({ message: "internal Server error", error });
 }
};
    


// Validate a restaurant

export const validateRestaurant = async (req, res) => {
  try{
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    restaurant.isValid = true;
    await restaurant.save();
    return res.status(200).json(restaurant);

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Server error", error });
  }
};


// create restaurant admin

export const createRestaurantAdmin = async (req, res) => {
  try {
    const { name, phoneNo, firstName,lastName ,email,password } = req.body;

    if (!name || !phoneNo || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if Restaurant already exists
    const existingRes = await Restaurant.findOne({ name });
    if (!existingRes) {
      return res.status(400).json({ message: "Restaurant not found" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists .Use diffrent email " });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'restaurant',
      phoneNo,
    });

   const newRestaurant =  new Restaurant({
      name,
      userId: newUser._id,
      isValid: true,
    });

    newUser.restaurantId = newRestaurant._id;
    await newUser.save();
    await newRestaurant.save();
    return res.status(201).json(newRestaurant);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Server error", error });
  }
};



export const changeRoleToRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has a restaurant
    const existingRestaurant = await Restaurant.findOne({ userId: user._id });
    if (existingRestaurant) {
      return res.status(400).json({ message: "User already has a restaurant" });
    }

    user.role = "restaurant";

    // Check if a restaurant with the given name already exists
    let restaurant = await Restaurant.findOne({ name });
    if (!restaurant) {
      restaurant = new Restaurant({
        name,
        userId: user._id,
        isValid: true,
      });

      await restaurant.save();
    }

    user.restaurantId = restaurant._id;
    await user.save();

    return res.status(201).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};




export const getValidatedRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ isValid: true }).populate('userId');
    return res.status(200).json(restaurants);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Server error", error });
  }
};


// Get all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('userId');
    return res.status(200).json(restaurants);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Server error", error });
  }
};

// Get a restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const restaurant = await Restaurant.findById(id).populate('userId');
    
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    
    return res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Server error", error });
  }
};
export const getRestaurantsByUserId = async (req, res) => {
  try {
    const { id } = req.params; // Extract userId from request parameters
    
    // Find all restaurants where userId matches
    const restaurants = await Restaurant.find({ userId:
      id }).populate('userId');
    
    // If no restaurants found, return 404
    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found for this user." });
    }

    // Return restaurants if found
    return res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};


// Update restaurant details
export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name,firstName,lastName,gender,age} = req.body;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.name = name || restaurant.name;

    const user = await User.findById(restaurant.userId);
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName
    user.gender = gender || ""; 
    user.age = age || user.age;
    await user.save();
    await restaurant.save();
    
    const updatedRestaurant = await Restaurant.findById(id).populate('userId');

    return res.status(200).json(updatedRestaurant);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    
    await restaurant.remove();
    return res.status(200).json({ message: "Restaurant deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


export const createOrder = async (req, res) => {
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
      const menuItem = await RestaurantMenu.findById(item.menuItem);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item with ID ${item.menuItem} not found!` });
      }
      totalPrice += menuItem.sellingPrice * item.quantity;
    }

    // Create new order and populate menu details
    const newOrder = new RestaurantOrder({
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
    const populatedOrder = await RestaurantOrder.findById(newOrder._id)
      .populate({
        path: 'orderItems.menuItem',
        model: 'RestaurantMenu',
      });

    // Send response with order, hotel, room, and menu details
    res.status(201).json({
      message: "Order placed successfully!",
      order: populatedOrder,
      hotel: {
        _id: room.hotelId._id, // Populated hotel from room's hotelId reference
        name: room.hotelId.name, // Assuming 'name' is a field in the hotel schema
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
//
//getorder admin hotelid userid roomno
export const getOrders = async (req, res) => {
  try {
    // Retrieve all orders without populating any fields
    const orders = await RestaurantOrder.find();

    // Check if no orders exist
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found!' });
    }
    // Send back the orders
    res.status(200).json({
      message: 'Orders retrieved successfully!',
      orders: orders,
    });
  } catch (error) {
    console.error(error);  // Log the error to the server console for debugging
    res.status(500).json({ message: 'Server error!', error: error.message });
  }
};
export const getOrdersByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;
    const orders = await RestaurantOrder.find({ roomId: roomId })
      .populate({
        path: 'orderItems.menuItem',
        select: 'name description sellingPrice',
      })
      .exec();
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this restaurant!' });
    }
    res.status(200).json({
      message: 'Orders retrieved successfully!',
      orders: orders,
    });
  } catch (error) {
    console.error(error);  // Log the error to the server console for debugging
    res.status(500).json({ message: 'Server error!', error: error.message });
  }
};

export const getOrdersByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const orders = await RestaurantOrder.find({ restaurantId: restaurantId })
      .populate({
        path: 'orderItems.menuItem',
        select: 'name description sellingPrice',
      })
      .exec();
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this restaurant!' });
    }
    res.status(200).json({
      message: 'Orders retrieved successfully!',
      orders: orders,
    });
  } catch (error) {
    console.error(error);  // Log the error to the server console for debugging
    res.status(500).json({ message: 'Server error!', error: error.message });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;  // Capture the order ID from the request parameters.
    const order = await RestaurantOrder.findById(orderId)  // Find the order by its unique ID.
      .populate({
        path: 'orderItems.menuItem',
        select: 'name description sellingPrice',
      })
      .exec();
    
    if (!order) {  // If no order is found, return a 404 error.
      return res.status(404).json({ message: 'Order not found!' });
    }
    
    res.status(200).json({  // If the order is found, return it.
      message: 'Order retrieved successfully!',
      order: order,
    });
  } catch (error) {
    console.error(error);  // Log the error to the server console for debugging.
    res.status(500).json({ message: 'Server error!', error: error.message });
  }
};

