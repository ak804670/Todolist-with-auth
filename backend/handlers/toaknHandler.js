const JWT = require('jsonwebtoken')
const User = require('../schema/userSchema.js')


const tokanDecode= (req)=>{
    const bearerHeader = req.headers['authorization']
    if(bearerHeader){

        const bearer = bearerHeader.split(' ')[1]
        try{
            const tokenDecoded= JWT.verify(
                bearer,
                process.env.TOKAN_SECRATE_KEY
            )
            return tokenDecoded
        }catch{
            return false
        }
    }else{
        return false
    }
}

const verifyTokan = async(req,res,next)=>{
    const tokenDecoded= tokanDecode(req)
    if(tokenDecoded){
        const user= await User.findById(tokenDecoded.id)
        if(!User) return res.status(401).json('unauthorized')

        req.user= user
        next()
    }else{
        res.status(401).json('unauthorized')
    }
}

module.exports={verifyTokan}