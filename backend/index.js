import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();

app.use(express.json());
app.use(cookieParser());

// ✅ Replace this with your actual frontend domain
app.use(cors({
  origin: ["https://note-app-mern-frontend.vercel.app"],
  credentials: true
}));

import authRouter from './routes/auth.route.js';
import noteRouter from './routes/note.route.js';

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// ✅ Clean error handler
app.use((err, req, res, next) => {
    const statusCode  = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
