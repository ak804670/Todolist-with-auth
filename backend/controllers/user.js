const User= require('../schema/userSchema.js')
const CryptoJS= require('crypto-js')
const JWT = require('jsonwebtoken')

const register = async(req, res)=>{
    const {password}= req.body
    try{
        req.body.password = CryptoJS.AES.encrypt(
            password,
            process.env.PASSWORD_SECRATE_KEY,
        )

        const user = await User.create(req.body)
        const tokan = JWT.sign(
            {id:user._id},
            process.env.TOKAN_SECRATE_KEY,
            {expiresIn: '24h'}
        )
        res.status(201).json({user,tokan})

    }
    catch (err){
        
        res.status(500).json(err)
    }
}

const login= async(req,res)=>{
    const {username, password}= req.body

    try{

        const user= await User.findOne({username}).select('password username')
        if(!user){
            return res.status(401).json({
                errors:[{
                    param: 'username',
                    msg: 'invalid username or password'
                }]
            })
        }

        const decryptPass=  CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRATE_KEY
        ).toString(CryptoJS.enc.Utf8)

        if(decryptPass !== password){
              return res.status(401).json({
                errors:[{
                    param: 'username',
                    msg: 'invalid username or password'
                }]
            })
        }

        user.password= undefined 

        const tokan = JWT.sign(
            {id:user._id},
            process.env.TOKAN_SECRATE_KEY,
            {expiresIn: '24h'}
        )


        res.status(200).json({user, tokan})
    }
    catch(err){
        res.status(500).json(err)
    }
}


module.exports ={register, login} 