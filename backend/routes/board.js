const router = require('express').Router()
const {param}= require('express-validator')
const validation = require('../handlers/validation.js')
const tokanHandler = require('../handlers/toaknHandler.js')
const boardController = require('../controllers/board.js')

router.post(
    '/',
    tokanHandler.verifyTokan,
    boardController.create 
)

router.get(
    '/',
    tokanHandler.verifyTokan,
    boardController.getAll 
)

router.put(
    '/',
     tokanHandler.verifyTokan,
    boardController.updatePosition 
)

router.get(
    '/:boardId',
    param('boardId').custom(value=>{
        if(!validation.isObjectId(value)){
            return Promise.reject('invalid Id')
        }else return Promise.resolve()
    }),
    tokanHandler.verifyTokan,
    boardController.getOne
)
module.exports = router