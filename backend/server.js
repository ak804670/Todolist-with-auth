
const express = require("express")

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const {connection} = require("./db/connection.js")
const allRoutes=require("./routes/routes.js")
const app= express()
const port= process.env.PORT

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use( cors() );


connection();

app.get("/",(req,res)=>{
    res.send("made with ❤️ from Anish")
})
app.use("/api", allRoutes);

app.listen(port,()=>{
    console.log(`server is up on :${port}`)
})