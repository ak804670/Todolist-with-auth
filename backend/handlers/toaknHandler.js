const JWT = require('jsonwebtoken')
const User = require('../schema/userSchema.js')


const tokanDecode= (req)=>{
    const bearerHeader = req.headers['authorization']
    if(bearerHeader){

        const bearer = bearerHeader.split(' ')[1]
        try{
            const tokanDecode= JWT.verify(
                bearer,
                process.env.TOKAN_SECRATE_KEY
            )
            return tokanDecode
        }catch{
            return false
        }
    }else{
        return false
    }
}

const verifyTokan = async(req,res,next)=>{
    const tokanDecode= tokanDecode(req)
    if(tokanDecode){
        const user= await User.findById(tokanDecode.id)
        if(!User) res.status(401).json('unauthorized')

        req.user= user
    }else{
        res.status(401).json('unauthorized')
    }
}

module.exports={verifyTokan}