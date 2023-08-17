import React, { useEffect, useState } from 'react'
import {Box, Typography} from '@mui/material'
import Picker from '@emoji-mart/react'

import data from '@emoji-mart/data'


const EmojiPicker = props => {
  const[selectedEmoji, setSelectedEmoji]=useState()
  const [isShowPicker, setShowPicker]= useState(false)


  useEffect(()=>{

    setSelectedEmoji(props.icon)
  },[props.icon])

  const selectEmoji= (e)=>{
    const sym= e.unified.split('-')
    let codeArr =[]
    sym.forEach(el=> codeArr.push('0x'+ el))
    const emoji= String.fromCodePoint(...codeArr)
    setShowPicker(false)
    props.onChange(emoji)

  }

  const showPicker = ()=>{
    setShowPicker(!isShowPicker)
  }


  return (
    <Box sx={{position:'relative',width: 'max-content' }}>
      <Typography variant='h3' fontWeight='700' sx={{cursor: 'pointe'}} onClick={showPicker}>
        {selectedEmoji}
      </Typography>
      <Box sx={{
        display : isShowPicker ? 'block': 'none',
        position : 'absolute',
        top: '100%',
        zIndex : '9999'
      }}>
        <Picker theme= 'dark' data={data} onEmojiSelect={selectEmoji} showPreview= {false}/>
      </Box>
    </Box>
  )
}

export default EmojiPicker