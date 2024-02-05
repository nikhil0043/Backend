import express, { application } from 'express';
import dotenv from "dotenv";
import connectDB from './db/index.js';
import app from './app.js';

dotenv.config({
  path: "./.env"
})


connectDB()
.then(() => {
  app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
})
.catch((error)=>{
  console.log('Error connecting to the database', error);
})



// Connect to the database Method 1

/*
import { DB_NAME } from './constant.js';
import mongoose from 'mongoose';


;( async ()=> {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", (error) => {
      console.log("ERRR: ", error);
      throw error
    })

    app.listen('3000', ()=> {
  
      console.log('Server is running on port 3000');
  })
  } catch (error) {
    console.log(error);
  }
})()

*/
