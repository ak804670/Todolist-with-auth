const board = require('../schema/board.js')
const Board= require('../schema/board.js')
const section = require('../schema/section.js')
const Section= require('../schema/section.js')
const Task = require('../schema/task.js')

const create = async(req,res)=>{
    try{
        const boardsCount= await Board.find().count()
        const board = await Board.create({
            user: req.user._id,
            position: boardsCount> 0 ? boardsCount : 0
        })
        res.status(201).json(board)
    }
    catch{
        res.status(500).json(err)
    }
}

const getAll= async (req,res)=>{
    try{
        const boards = await Board.find({user:req.user._id}).sort('-position ')
        res.status(200).json(boards)
    }
    catch{
        res.status(500).json(err)
    }
}

const updatePosition = async(req,res)=>{
    const {boards}= req.body
    try{
            for (const key in boards.reverse()) {
                const board = boards[key];
                await Board.findByIdAndUpdate(
                    board.id,
                    {$set : { position:key}}
                )
            }
            res.status(200).json('updated')
    }catch(err){
        res.status(500).json(err)
    }
}


const getOne= async (req,res)=>{
    const {boardId}=  req.params
    try{
        const board = await Board.findOne({user: req.user._id, _id: boardId})
        if(!board) return res.status(404).json('Board not Found') 
        const sections = await Section.find({board:boardId})
        for(const section of sections){
            const tasks = await Task.find({section:section.id}).populate('section').sort('-position')
            section._doc.tasks= tasks
        }
        board._doc.sections = sections
        res.status(200).json(board)
    }catch(err){
        res.status(500).json(err)
    }
}

const update= async(req,res)=>{

    const {boardId}=req.params
    const {title, description, favourite}=req.body

    try{

        if(title==="") req.body.title = 'untitled'
        if(description==="") req.body.description = 'Add description'
        const currentBoard = await Board.filedById(boardId)
        if(!currentBoard) return res.status(404).json('Board not Found') 
        if(favourite !== undefined && currentBoard.favourite !== favourite)  {
            const favourites = await Borad.find({
                user: currentBoard.user,
                favourite: true,
                _id: { $ne: boardId}
            })
            if(favourite){
                req.body.favouritePosition= favourites.length >0 ? favourites.length : 0
            }else{
                for (const key in favourites) {
                  const element = favourites[key]
                  await board.findByIdAndUpdate(
                    element.id,
                    {$set:{ favouritePosition:key}}
                  )
                }
            }
        } 
        

        const board = await Board.findByIdAndUpdate(
            boardId,
            {$set: req.body}
        )
        res.status(200).json(Borad)
    }catch(err){
        res.status(500).json(err)
    }
}


module.exports={create,getAll, updatePosition,getOne, update }