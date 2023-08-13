import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import boardApi from '../api/boardApi'
import StarOutlined from '@mui/icons-material/StarOutlined'
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined'
import {Box, IconButton} from '@mui/material'

const Board = () => {
  const {boardId} = useParams()
  const [title, setTitle]=useState('')
  const [description, setDescription]= useState('')
  const [sections, setSections]= useState([])
  const [isFav, setIsFav]= useState(false)
  const [icon, setIcon]= useState('')


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
            </IconButton>
            <IconButton>

            </IconButton>
      </Box>
    </>
  )
}

export default Board