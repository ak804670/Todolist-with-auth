import React, { useState } from 'react'
import {Box, TextField, Button} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {Link, useNavigate} from 'react-router-dom'
import authApi from '../api/authApi'



const Signup = () => {

  const navigate= useNavigate()
  const [loading, setLoading] = useState(false)
  const [userNameErrText,setuserNameErrText]= useState('')
  const [passwordErrText,setPasswordErrText]= useState('')
  const [confirmPasswordErrText,setConfirmPasswordErrText]= useState('')

    const handleSubmit=async(e)=>{

      e.preventDefault()
      setuserNameErrText('')
      setPasswordErrText('')
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
        setPasswordErrText("Please fill the password")
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

      setLoading(true)

      try{
        const res= await authApi.signup({
          username,password, confirmPassword
        })
        setLoading(false)
        localStorage.setItem('token', res.token)
        navigate('/')}
        catch (err) {
      const errors = err.data.errors
      errors.forEach(e => {
        if (e.param === 'username') {
          setuserNameErrText(e.msg)
        }
        if (e.param === 'password') {
          setPasswordErrText(e.msg)
        }
        if (e.param === 'confirmPassword') {
          setConfirmPasswordErrText(e.msg)
        }
      })
         setLoading(false)
      }


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
        id='username'
        variant="outlined"
        label="UserName"
        name='username'
        disabled={loading}
        error={userNameErrText !== ''}
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
        error={passwordErrText !== ''}
        helperText={passwordErrText}/>

         <TextField
        margin='normal'
        required
        fullWidth
        id='confirmPassword'
        name ='confirmPassword'
        type='password'
        label="Confirm Password"
        error={confirmPasswordErrText !== ''}
        helperText={confirmPasswordErrText}/>

        <LoadingButton
        sx={{mb:2, mt:3}}
        fullWidth
        color='success'
        type='submit'
        loading={loading}
        variant="outlined"
        >
          Signup
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