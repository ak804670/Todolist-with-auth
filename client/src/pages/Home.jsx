import React, { useState } from 'react'
import {Box} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch } from 'react-redux'
import { setBoards } from '../redux/features/boardSlice'
import { useNavigate } from 'react-router-dom'
import boardApi from '../api/boardApi'

const Home = () => {
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const [loading, setLoading]= useState(false)


  const createBoard=async()=>{
    setLoading(true)
    try{
      const res = await boardApi.create()
        dispatch(setBoards([res]))
        navigate(`/boards/${res.id}`)
       
    }catch(err){
      alert(err)
    }finally{
      setLoading(false)
    }
  }


  return (
    <Box
    sx={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 1,
      overflow: 'hidden'
    }}
    >
        <LoadingButton
        variant='outlined'
        color='success'
         onClick={createBoard}
         loading={loading}

        >
            click here to create your fist Board
        </LoadingButton>
    </Box>
  )
}

export default Home