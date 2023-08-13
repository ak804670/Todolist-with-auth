import React, { useState } from 'react'
import { useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import authUtils from '../../utils/authUtils'
import SideBar from '../common/SideBar'
import Loading from '../common/Loading'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/features/userSlice'

const Applayout = () => {

  const navigate= useNavigate()
  const [loading,setLoading]= useState(true)
  const dispatch= useDispatch()

    useEffect(()=>{
        const checkAuth = async()=>{
            const user= await authUtils.isAuthenticated()
            if(!user){
                navigate('/login')
            }else{
                dispatch(setUser(user))
                setLoading(false)
            }
        }
        checkAuth()
    },[navigate])
  return (
    
      loading ?(
      <Loading fullHeight/>):(
        
          <Box sx={{
             display: 'flex'
            }}>
            <SideBar/>
            <Box sx={{
                flexGrow:1,
                p:1,
                width:'max-content'
            }}>

                
                <Outlet/>
            </Box>
          </Box>
    
      )

  )
}

export default Applayout