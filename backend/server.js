
const express = require("express")  //importing express 

const cors = require("cors");   //importing cors
const bodyParser = require("body-parser"); // importing bodyparser
require("dotenv").config(); // importing and using dotenv npm library to read data from .env file

const {connection} = require("./db/connection.js") //importing database connection
const allRoutes=require("./routes/routes.js")  // importing routes
const app= express()  //using express 
const port= process.env.PORT        // reading port data from .env file

app.use( bodyParser.urlencoded({ extended: false }) );      // using bodyparser
app.use( bodyParser.json() );   // using bodyparser
app.use( cors() );   // using cors for cross origin requests


connection();  //executing mongodb connection file

app.get("/",(req,res)=>{
    res.send("made with ❤️ from Anish")     //base api
})
app.use("/api", allRoutes);     //middleware 

app.listen(port,()=>{
    console.log(`server is up on :${port}`)   //execution of express with particuler port
})