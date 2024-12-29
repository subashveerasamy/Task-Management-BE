 import express from 'express';
 import dotenv from 'dotenv';
 import cors from 'cors';
import dbConnection from './Database/DbConfig.js';
import userRouter from './Routers/User.router.js';
 dotenv.config();

 const app=express();
 app.use(express.json());

 app.use(cors());

 app.get('/', (req, res) => {
    res.status(200).send('App is running');
 })
dbConnection();
app.use("/user", userRouter)
 app.listen(process.env.port, ()=>{
    console.log("app is listening")
 })