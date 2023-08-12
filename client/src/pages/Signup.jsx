import React, { useState } from 'react'
import {Box, TextField, Card, CardContent, Button} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {Link, useNavigate} from 'react-router-dom'




const Signup = () => {

  const navigate= useNavigate
  const [loading, setLoading] = useState(false)
  const [userNameErrText,setuserNameErrText]= useState()
  const [passwordErrText,setPassword]= useState()
  const [confirmPasswordErrText,setConfirmPasswordErrText]= useState()

    const handleSubmit=(e)=>{

      e.preventDefault()
      setuserNameErrText('')
      setPassword('')
      setConfirmPasswordErrText('')

      const data= new FormData(e.target)
      const username = data.get('username').trim()
      const password = data.get('password').trim()
      const confirmPassword = data.get('confirmPassword').trim()

      let err= false


      if(username===''){
        err= true
        setuserNameErrText("Please fill the Username")
      }

      if(password===''){
        err= true
        setPassword("Please fill the password")
      }

      if(confirmPassword===''){
        err= true
        setConfirmPasswordErrText("Please fill the confirmPassword")
      }

        if(password !== confirmPassword){
        err= true
        setConfirmPasswordErrText("Confirm password should be same as password")
      }

      if(err) return
    }
  return (
  
     <div className='container'>
      <h1>SignUp</h1>
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
        disabled={loading}
        error={userNameErrText != ''}
        helperText={userNameErrText}
        />

      <TextField
        margin='normal'
        required
        fullWidth
        id='password'
        name='password'
        type='password'
        label="Password"
        error={passwordErrText != ''}
        helperText={passwordErrText}/>

         <TextField
        margin='normal'
        required
        fullWidth
        id='confirmPassword'
        name ='confirmPassword'
        type='password'
        label="Confirm Password"
        error={confirmPasswordErrText != ''}
        helperText={confirmPasswordErrText}/>

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
        to='/login'
        sx={{textTransform: 'none'}}
        fullWidth
        variant="outlined"
        >
          Already have an Account!!  Login
        </Button>
    </Box>

    </div>
  )
}

export default Signup