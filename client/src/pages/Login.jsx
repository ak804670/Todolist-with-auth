import React, { useState } from 'react'
import {Box, TextField, Card, CardContent, Button} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {Link} from 'react-router-dom'
import '../styles/login.css'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const handleSubmit=()=>{

  }


  return (
    <div className='container'>
      <h1>Login</h1>
       <Box
    component='form'
    sx={{mt:1, p:2}}
    onSubmit={handleSubmit}
    noValidate
    >
      <TextField
        margin='normal'
        required
        fullWidth
        // id='username'
        variant="outlined"
        id="outlined-basic"
        label="UserName"
        name='username'
        disabled={loading}/>

      <TextField
        margin='normal'
        required
        fullWidth
        id='password'
        type='password'
        label="Password"/>

        <LoadingButton
        sx={{mb:2, mt:3}}
        fullWidth
        color='success'
        type='submit'
        loading={loading}
        variant="outlined"
        >
          Login
        </LoadingButton>

        <Button
        component={Link}
        to='/signup'
        sx={{textTransform: 'none'}}
        fullWidth
        variant="outlined"
        >
          Don't have an Account!!  SignUp
        </Button>
    </Box>

    </div>
  )
}

export default Login