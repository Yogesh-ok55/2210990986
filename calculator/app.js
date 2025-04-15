const express = require("express");
const app=express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("these are api's for calculator")
})

app.listen(port,()=>{
    console.log('app is running fine');
})