import express from "express";
import cors from "express";
import cookieParser from "cookie-parser";
// import upload from "./middlewares/multer.middleware.js"

const app  = express(); 

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true, limits: "16kb"}))
app.use(express.static("public"))

// import router
import userRouter from "./routers/user.router.js"

// use router
app.use("/api/v1/users", userRouter)


export default app;