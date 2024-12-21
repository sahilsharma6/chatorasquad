dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js';
import cors from 'cors';

const app = express();

app.use(cors());


app.use(express.json()); 
app.use(cookieParser()); 

app.use('/api/auth', authRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});