import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to Mongo");
})
.catch((err) => {
        console.log("Mongodb not connected: ", err)
    })


const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

const port = 8000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
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

