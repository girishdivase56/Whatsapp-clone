import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from "pusher-js"
import axios from './axios';

function App() {

const [messages, setMessages] =  useState()

useEffect(() => {
  axios.get('messages/sync').then((response) => {
    setMessages(response.data)
  })
})

useEffect(() => {
  var pusher = new Pusher('2a73f7d98c81d65545e8', {
    cluster: 'eu'
  },[]);

  const channel = pusher.subscribe('messages');
  channel.bind('inserted', (newMessages) => {
    alert(JSON.stringify(newMessages));
    setMessages(...messages, newMessages)
  });


  return () => {
    channel.unbind_all()
    channel.unsubscribe()
  }

}, [messages])
console.log(messages)

  return (
    <div className="app">
      <div className='app__body'>
        {/**Sidebar */}
        <Sidebar />
        {/**Chat component */}
        <Chat messages = {messages}/>
      </div>
    </div>
  );
}

export default App;
