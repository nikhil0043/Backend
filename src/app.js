import express from "express";
import cors from "express";
import cookieParser from "cookie-parser";

const app  = express(); 

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true, limits: "16kb"}))
app.use(express.static("public"))

// app.get('/', (req, res) => {
//     res.send('Hello World');
// })

export default app;