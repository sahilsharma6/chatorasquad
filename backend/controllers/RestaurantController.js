import Restaurant from "../models/Restaurant.js";
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
    const {name} = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = 'restaurant';
    
    const restaurant = await Restaurant.findOne({name});
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const newRestaurant = new Restaurant({
      name,
      userId: user._id,
      isValid: true,
    });

    user.restaurantId = newRestaurant._id;
    await user.save();
    await newRestaurant.save();
    return res.status(201).json(newRestaurant);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Server error", error });
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
