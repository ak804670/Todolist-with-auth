import React, { useState } from 'react'
import {Box, TextField, Button} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {Link, useNavigate} from 'react-router-dom'
import '../styles/login.css'
import authApi from '../api/authApi'

const Login = () => {
  const navigate = useNavigate()  
  const [loading, setLoading] = useState(false)
  const [usernameErrText, setUsernameErrText] = useState('')
  const [passwordErrText, setPasswordErrText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsernameErrText('')
    setPasswordErrText('')

    const data = new FormData(e.target)
    const username = data.get('username').trim()
    const password = data.get('password').trim()

    let err = false

    if (username === '') {
      err = true
      setUsernameErrText('Please fill this field')
    }
    if (password === '') {
      err = true
      setPasswordErrText('Please fill this field')
    }

    if (err) return

    setLoading(true)

    try {
      const res = await authApi.login({ username, password })
      setLoading(false)
      localStorage.setItem('token', res.token)
      navigate('/')
    } catch (err) {
      const errors = err.data.errors
      errors.forEach(e => {
        if (e.param === 'username') {
          setUsernameErrText(e.msg)
        }
        if (e.param === 'password') {
          setPasswordErrText(e.msg)
        }
      })
      setLoading(false)
    }
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
        id='username'
        variant="outlined"
        label="UserName"
        name='username'
        disabled={loading}
          error={usernameErrText !== ''}
          helperText={usernameErrText}/>

      <TextField
        margin='normal'
        required
        fullWidth
        id='password'
        type='password'
        name='password'
        label="Password"
        disabled={loading}
          error={passwordErrText !== ''}
          helperText={passwordErrText}/>

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