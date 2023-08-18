import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import boardApi from '../api/boardApi'
import StarOutlined from '@mui/icons-material/StarOutlined'
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined'
import {Box, IconButton, TextField, Button, Typography, Divider} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiPicker from '../components/common/EmojiPicker'
import {useDispatch, useSelector} from 'react-redux'
import { setBoards } from '../redux/features/boardSlice'

let timer
const timeOut= 500

const Board = () => {
  const dispatch= useDispatch()
  
  const {boardId} = useParams()
  const [title, setTitle]=useState('')
  const [description, setDescription]= useState('')
  const [sections, setSections]= useState([])
  const [isFav, setIsFav]= useState(false)
  const [icon, setIcon]= useState('')

  const boards = useSelector((state) => state.board.value)

  useEffect(()=>{
    const getBoard= async()=>{
      try{
        const res= await boardApi.getOne(boardId)
        setTitle(res.title)
        setDescription(res.description)
        setSections(res.sections)
        setIsFav(res.favourite)
        setIcon(res.icon)
        console.log(res)

      }catch(err){
        alert(err)
        console.log(err)
      }
    }
    getBoard()

  },[boardId])

  const onIconChange=async(newIcon)=>{
    let temp= [...boards]
    const index= temp.findIndex(e=> e.id===boardId)
    temp[index]={...temp[index], icon: newIcon}
    setIcon(newIcon)
    dispatch(setBoards(temp))
    try{
      await boardApi.update(boardId, {icon: newIcon})
    }catch(err){
      alert(err)
    }
  }

  const updateTitle=async(e)=>{
    clearTimeout(timer)
    const newTitle= e.target.value
    setTitle(newTitle)
    let temp= [...boards]
    const index= temp.findIndex(e=> e.id===boardId)
    temp[index]={...temp[index], title: newTitle}
    dispatch(setBoards(temp))
    timer = setTimeout(async()=>{
      
      try{
        await boardApi.update(boardId, {title: newTitle})
      }catch(err){
        alert(err)
      }
    }, timeOut)
  }
  return (
    <>
      <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'

      }}
      >
            <IconButton variant="outlined">
              {
                isFav ? (
                  <StarOutlined color='warning'/>
                ):(
                    <StarBorderOutlined/>
                )
              }
            </IconButton >
            <IconButton  variant='outlined' color='error'>
              <DeleteIcon/>
            </IconButton>
            </Box>
            <Box sx={{padding:'10px 50px'}}>
              {/* emojipicker */}
                <EmojiPicker icon={icon} onChange={onIconChange}/>
            <Box>
              <TextField value={title} onChange={updateTitle}
              placeholder='untitled' variant='outlined' fullWidth
              sx={{'& .MuiOutlinedInput-input': {padding :0}, 
                  '& .MuiOutlinedInput-notchedOutline':{border:'unset'},
                  '& .MuiOutlinedInput-root': {fontSize : '2rem', fontWeight: '700'}
            }}
              />

              <TextField value={description}
              placeholder='Add a Description' variant='outlined' fullWidth multiline
              sx={{'& .MuiOutlinedInput-input': {padding :0}, 
                  '& .MuiOutlinedInput-notchedOutline':{border:'unset'},
                  '& .MuiOutlinedInput-root': {fontSize : '1rem'}
            }}
              />      
        </Box>
        <Box>
              <Box sx=
              {{
                display: 'flex',
                alignItems: 'center',
                justifyContent:'space-between'
              }}>
                <Button>
                  Add Section
                </Button>
                <Typography sx={{variant:"body2", fontWeight: '700'}}> 
                  {sections.length} sections
                </Typography>
              </Box>
        </Box>
        <Divider sx={{margin:'10px 0'}}/>
      </Box>
    </>
  )
}

export default Board