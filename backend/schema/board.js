const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {schemaOptions}= require("./modalOptions")

const  boardSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    icon:{
        type: String,
        default: '📝'
    },
    title:{
        type: String,
        default: 'untitle'
    },
    description:{
        type: String,
        default : `Add description here 
        ⚫ you can add multiline desription 
        ⚫ Let's Start.......   `
    },
    position:{
        type: Number
    },
    favourite:{
        type: Boolean,
        default : false
    },
    favouritePosition:{
        type : Number,
        default : 0
    }
}, schemaOptions)


module.exports= mongoose.Model('Board', boardSchema)
