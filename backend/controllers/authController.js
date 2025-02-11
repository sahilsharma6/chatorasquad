import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

// SignUp Controller
export const signUp = async (req, res) => {
  try {

    console.log(req.body+ "req reached");
    const { firstName,lastName, email, password, phoneNo,gender,age,role } = req.body;

    if (!firstName || !lastName || !email || !password || !phoneNo || !role ) {
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
      role,
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
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

   
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const token = jwt.sign({ userId: user._id ,role:user.role}, process.env.JWT_SECRET||"secretkey", { expiresIn: '24h' });

    res.cookie('token', token, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 36000000, 
      sameSite: 'Lax', 
    });

  
    return res.status(200).json({succed:true, message: 'Login successful',data:{user,token} });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
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
