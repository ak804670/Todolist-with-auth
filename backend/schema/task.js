const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {schemaOptions}= require("./modalOptions")

const  taskSchema = new Schema({
    section:{
        type: Schema.Types.ObjectId,
        ref:'Section',
        require: true
    },
    title:{
        type: String,
        default: 'untitle'
    },
    content:{
        type: String,
        default: ''
    },
    position:{
        type: Number
    }
}, schemaOptions)


module.exports= mongoose.Model('Task', taskSchema)
