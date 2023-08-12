const mongoose = require('mongoose')
const {schemaOptions}= require('./modalOptions')

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select : false
    }
}, schemaOptions)


module.exports= mongoose.model('user', userSchema)