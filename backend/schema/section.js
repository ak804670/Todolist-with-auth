const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {schemaOptions}= require("./modalOptions")

const  sectionSchema = new Schema({
    Board:{
        type: Schema.Types.ObjectId,
        ref:'Board',
        require: true
    },
    title:{
        type: String,
        default: 'untitle'
    }
}, schemaOptions)


module.exports= mongoose.model('Section', sectionSchema)
