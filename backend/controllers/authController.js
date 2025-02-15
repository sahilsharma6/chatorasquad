import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import Hotel from '../models/Hotel.js';

// SignUp Controller
export const signUp = async (req, res) => {
  try {

    console.log(req.body+ "req reached");
    const { firstName,lastName, email, password, phoneNo,gender,age,role } = req.body;

    if (!firstName || !lastName || !email || !password || !phoneNo  ) {
      return res.status(400).json({ message: 'Please provide all the required fields' });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      firstName,
      lastName,
      email,
      gender,
      role:role || 'user',
      age,
      password: hashedPassword,
      phoneNo,
    });

    await user.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || "secretkey", {
      expiresIn: "24h",
    });
    const getHotel=await Hotel.findOne({userId:user._id})
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      maxAge: 24 * 60 * 60 * 1000, 
      sameSite: "None", 
      domain: "",
    });
    if(getHotel){

      return res.status(200).json({ success: true, message: "Login successful", data: { user, token,hotel:getHotel.name } });
    }
    res.status(200).json({ success: true, message: "Login successful", data: { user, token, } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};




// Logout Controller
export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};  
