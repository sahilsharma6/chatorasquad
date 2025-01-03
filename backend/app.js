dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import main from './routes/main.js';
import cors from 'cors';
import uploadMiddleware from './middlewares/uploadMiddleware.js';
import path from 'path';
const __dirname = path.resolve();



const app = express();

app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
    
  }

));


app.use(express.json()); 
app.use(cookieParser()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', main);
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});