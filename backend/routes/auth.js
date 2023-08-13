const router = require('express').Router()

const userController= require('../controllers/user.js')

const {body}= require('express-validator')
const validation = require('../handlers/validation.js')
const tokanHandler = require('../handlers/toaknHandler.js')
const User = require('../schema/userSchema.js')


router.post(
    '/signup',
    body('username').isLength({min:8}).withMessage('username must be atleast 8 character'),
    body('password').isLength({min:8}).withMessage('password must be atleast 8 character'),
    body('confirmPassword').isLength({min:8}).withMessage('confirmPassword must be atleast 8 character'),
    body('username').custom(value =>{
        return User.findOne({username: value}).then( user=>{
            if(user){
                return Promise.reject('username already in use')
            }
        })
    }),
    validation.validate,
    userController.register

)

router.post(
     '/login',
    body('username').isLength({min:8}).withMessage('username must be atleast 8 character'),
    body('password').isLength({min:8}).withMessage('password must be atleast 8 character'), 
    validation.validate,
    userController.login
)

router.post(
    '/verify-token',
    tokanHandler.verifyTokan,
    (req,res)=>{
        res.status(200).json({user : req.user})
    }
)


module.exports = router