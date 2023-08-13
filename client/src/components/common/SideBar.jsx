import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Drawer from '@mui/material/Drawer';
import { List, ListItemButton, Box, Typography, IconButton, ListItem } from '@mui/material';
import { orange } from '@mui/material/colors';
import LogoutOutlined from '@mui/icons-material/LoginOutlined'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import boardApi from '../../api/boardApi'
import {setBoards} from '../../redux/features/boardSlice'
import { DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

const SideBar = () => {
  const user= useSelector((state)=>state.user.value)
  const boards= useSelector((state)=>state.board.value)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {boardId}= useParams()
  const [activeIndex, setActiveIndex] = useState(0)
  const sideWidth=250

  useEffect(()=>{
    const getBoards = async ()=>{
     try { const res = await boardApi.getAll()
      console.log(res)
      dispatch(setBoards(res))
    
    }
      catch(err){
        alert(err)
      }
    }
    getBoards()
  },[dispatch])

    useEffect(()=>{
      const activeItem = boards.findIndex(e=> e.id === boardId)
       if(boards.length>0 && boardId === undefined ){
      navigate(`/boards/${boards[0].id}`)
     }
     setActiveIndex(activeItem)
  },[boards, boardId, navigate])


    const addBoard = async () => {
    try {
      const res = await boardApi.create()
      const newList = [res, ...boards]
      dispatch(setBoards(newList))
      navigate(`/boards/${res.id}`)

    } catch (err) {
      alert(err)
    }
  }


  const logout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  const onDragEnd= async({source, destination})=>{
    const newList= [...boards]
    const [removed]= newList.splice(source.index, 1)
    newList.splice(destination.index, 0, removed)
    const activeItem = newList.findIndex(e=> e.id === boardId)
    setActiveIndex(activeItem)
    dispatch(setBoards(newList))

    try{
      await boardApi.updatePosition({boards:newList})
    }catch (err){
      alert(err)
    }

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

                <ListItem>
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
                </ListItem>




        <Box sx={{ paddingTop: '10px' }} />
        <FavoriteIcon />
        <Box sx={{ paddingTop: '10px' }} />

              <ListItem>
                  <Box sx={{
                    width: '100%',
                    display : 'flex',
                    alignItems:"center",
                    justifyContent: "space-between"
                  }}>
                        <Typography variant='body2' fontWeight='700'>
                          Private
                        </Typography>
                        <IconButton onClick={addBoard} >
                          <AddCircleIcon/>
                        </IconButton>
                  </Box>

              </ListItem>


               <DragDropContext onDragEnd={onDragEnd}>
          <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {
                  boards.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <ListItemButton
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          selected={index === activeIndex}
                          component={Link}
                          to={`/boards/${item.id}`}
                          sx={{
                            pl: '20px',
                            cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                          }}
                        >
                          <Typography
                            variant='body2'
                            fontWeight='700'
                            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            {item.icon} {item.title}
                          </Typography>
                        </ListItemButton>
                      )}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
          </List>
    </Drawer>
  )
}

export default SideBar