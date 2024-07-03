import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
// import cors from 'cors'
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to Mongo");
    })
    .catch((err) => {
        console.log("Mongodb not connected: ", err)
    })
const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     origin: "http://localhost:8000",
//     credentials: true
// }))
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)

// console.log(req.cookies.access_token)
app.listen(8000, () => {
    console.log('Server is running on port 8000')
});


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});