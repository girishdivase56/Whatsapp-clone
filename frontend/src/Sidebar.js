import React from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar src="https://pps.whatsapp.net/v/t61.24694-24/351263182_190843006876464_3971468081897243660_n.jpg?ccb=11-4&oh=01_AdSjvKuYm889v1L6P-mF1825sy168l6jUmibeQze5DKCjg&oe=649E2B56"></Avatar>
        <div className='sidebar__headerRight'>
            <IconButton>
                <DonutLargeIcon />
            </IconButton>

            <IconButton>
                <ChatIcon />
            </IconButton>

            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
            <SearchIcon/>
            <input placeholder='Search or start new chat' type='text' />
        </div>
      </div>

      <div className='sidebar__chats'>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  )
}

export default Sidebar
