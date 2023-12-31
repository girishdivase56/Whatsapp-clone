import React, { useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutLined from "@material-ui/icons/SearchOutlined"
import AttachFile from "@material-ui/icons/AttachFile" 
import MoreVertIcon from "@material-ui/icons/MoreVert"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios'


function Chat({messages}) {

    const [input, setInput] = useState("")

    const sendMessage = async(e) => {
        e.preventDefault()

        axios.post('/messages/new', {
            message:input,
            name:"Demo",
            timestamp:"demo",
            received: false

        })
        setInput("")
    }
  return (
    <div className='chat'>
        <div className='chat__header'>
            <Avatar />
            <div className='chat__headerInfo'>
                <h3>room name</h3>
                <p>Last seen at...</p>
            </div>

            <div className='chat__headerRight'>
                <IconButton>
                    <SearchOutLined />
                </IconButton>

                <IconButton>
                    <AttachFile />
                </IconButton>

                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>

        <div className='chat__Body'>
            {messages.map((message) => (
                <p className={`chat__message ${message.received && "chat__reciever"}`}>
                <span className='chat__name'>{message.name}</span>
                    {message.message}
                    <span className='chat__timestamp'>{message.timestamp}</span>
                </p>

            ))}
        </div>
        
        <div className='chat__footer'>
            <InsertEmoticonIcon />
            <form>
                <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                placeholder='Type a message'
                type='text'/>
                <button onClick={sendMessage} type='submit'>
                        send a message
                </button>
            </form>
            <MicIcon />
        </div>
    </div>
  )
}

export default Chat
