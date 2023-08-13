import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Drawer from '@mui/material/Drawer';
import { List, ListItemButton, Box, Typography, IconButton } from '@mui/material';
import { orange } from '@mui/material/colors';
import LogoutOutlined from '@mui/icons-material/LoginOutlined'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
const SideBar = () => {
  const user= useSelector((state)=>state.user.value)
  const navigate = useNavigate()
  const sideWidth=250

  const logout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <Drawer
    container={window.document.body}
        variant="permanent"
        anchor="left"
        open={true}
        sx={{
          width: sideWidth,
          height : '100%',
          '& > div':{borderRight:"none"}
        }}
    >
          <List
          disablePadding
          sx={{
            width: sideWidth,
            height : '100vh',
            background: orange[900]
          }}
          >
                <Box
                sx={{
                  paddingTop: '10px'}}
                >
                     <ListItemButton>
                  <Box sx={{
                    width: '100%',
                    display : 'flex',
                    alignItems:"center",
                    justifyContent: "space-between"
                  }}>
                        <Typography variant='body2' fontWeight='700'>
                         Hi, {user.username}
                        </Typography>
                        <IconButton onClick={logout}>
                          <LogoutOutlined/>
                        </IconButton>
                  </Box>
                </ListItemButton>

                </Box>


                <Box
                sx={{
                  paddingTop: '10px'}}
                >
                <ListItemButton>
                  <Box sx={{
                    width: '100%',
                    display : 'flex',
                    alignItems:"center",
                    justifyContent: "space-between"
                  }}>
                        <Typography variant='body2' fontWeight='700'>
                          Favourites
                        </Typography>
                        <IconButton >
                          <FavoriteIcon/>
                        </IconButton>
                  </Box>
                </ListItemButton>
                </Box>
                <Box
                sx={{
                  paddingTop: '10px'}}
                >
                     <ListItemButton>
                  <Box sx={{
                    width: '100%',
                    display : 'flex',
                    alignItems:"center",
                    justifyContent: "space-between"
                  }}>
                        <Typography variant='body2' fontWeight='700'>
                          Private
                        </Typography>
                        <IconButton >
                          <AddCircleIcon/>
                        </IconButton>
                  </Box>
                </ListItemButton>

                </Box>



                 <Box
                sx={{
                  paddingTop: '10px'}}
                >
                     <ListItemButton>
                  <Box sx={{
                    width: '100%',
                    display : 'flex',
                    alignItems:"center",
                    justifyContent: "space-between"
                  }}>
                        <Typography variant='body2' fontWeight='700'>
                          Private
                        </Typography>
                        <IconButton >
                          <AddCircleIcon/>
                        </IconButton>
                  </Box>
                </ListItemButton>

                </Box>



                 <Box
                sx={{
                  paddingTop: '10px'}}
                >
                     <ListItemButton>
                  <Box sx={{
                    width: '100%',
                    display : 'flex',
                    alignItems:"center",
                    justifyContent: "space-between"
                  }}>
                        <Typography variant='body2' fontWeight='700'>
                          Private
                        </Typography>
                        <IconButton >
                          <AddCircleIcon/>
                        </IconButton>
                  </Box>
                </ListItemButton>

                </Box>


                 <Box
                sx={{
                  paddingTop: '10px'}}
                >
                     <ListItemButton>
                  <Box sx={{
                    width: '100%',
                    display : 'flex',
                    alignItems:"center",
                    justifyContent: "space-between"
                  }}>
                        <Typography variant='body2' fontWeight='700'>
                          Private
                        </Typography>
                        <IconButton >
                          <AddCircleIcon/>
                        </IconButton>
                  </Box>
                </ListItemButton>

                </Box>
                
          </List>
    </Drawer>
  )
}

export default SideBar