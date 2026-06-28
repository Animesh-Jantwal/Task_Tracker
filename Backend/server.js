import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from './middleware/middleware.js';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();
connectDB();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.',
});

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});