import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User'; 

// SignUp Controller
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, phoneNo } = req.body;

    if (!fullName || !email || !password || !phoneNo) {
      return res.status(400).json({ message: 'Please provide all the required fields' });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      fullName,
      email,
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


    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 36000000, 
    });

    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};
