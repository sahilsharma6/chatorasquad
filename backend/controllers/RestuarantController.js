import Restuarant from "../models/Restuarant.js";
import User from "../models/User.js";

// Create a new restaurant
export const createRestaurant = async (req, res) => {
  try {
    const { name, phoneNo, userId } = req.body;
    
    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ message: "User not found." });
    }
    
    // Check if restaurant already exists
    const existingRestaurant = await Restuarant.findOne({ name });
    if (existingRestaurant) {
      return res.status(400).json({ message: "Restaurant already exists." });
    }
    
    const newRestaurant = new Restuarant({
      name,
      phoneNo,
      userId
    });
    
    await newRestaurant.save();
    return res.status(201).json(newRestaurant);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restuarant.find().populate('userId', 'name email');
    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get a restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const restaurant = await Restuarant.findById(id).populate('userId', 'name email');
    
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    
    return res.status(200).json(restaurant);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
// menu
// Update restaurant details
export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNo, isValid } = req.body;
    
    const restaurant = await Restuarant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    
    restaurant.name = name || restaurant.name;
    restaurant.phoneNo = phoneNo || restaurant.phoneNo;
    restaurant.isValid = isValid || restaurant.isValid;
    
    await restaurant.save();
    
    return res.status(200).json(restaurant);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    
    const restaurant = await Restuarant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    
    await restaurant.remove();
    return res.status(200).json({ message: "Restaurant deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
export const createRestaurantAdmin = async (req, res) => {
  try {
    const { name, phoneNo, firstName, lastName, email, password, gender } = req.body;

    // Check if all required fields are provided
    if (!name || !phoneNo || !firstName || !lastName || !email || !password) {
      console.log(req.body);
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if restaurant already exists
    const existingRestaurant = await Restuarant.findOne({ name });
    if (existingRestaurant) {
      return res.status(400).json({ message: "Restaurant already exists. Use a unique name" });
    }

    // Check if user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Use a different email" });
    }

    // Hash the password for the new user
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'restaurant', // Set role as restaurant admin
      gender,
      phoneNo,
    });

    // Create the restaurant after creating the user
    const newRestaurant = new Restuarant({
      name,
      phoneNo,
      userId: newUser._id,
    });

    newUser.restaurantId = newRestaurant._id;

    // Save the user and restaurant
    await newUser.save();
    await newRestaurant.save();

    return res.status(201).json(newRestaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
