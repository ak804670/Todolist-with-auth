import React from 'react'
import {Box} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

const Home = () => {

  const createBoard=()=>{
    
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
         
        
        sx={{
          
        }}
        >
            click here to create your fist Board
        </LoadingButton>
    </Box>
  )
}

export default Home