import React , {useState,useEffect} from 'react'
import ChatBar from './ChatBar'
import { Outlet, useOutletContext } from 'react-router-dom'
import './Chat.css'
import io from 'socket.io-client';





const Chat = (props) => {
  const [darkMode] = useOutletContext();
  const socket = io.connect('http://localhost:8000');	

  useEffect(()=>{

    socket.emit('login',{userId:localStorage.getItem('id')});

    return () => {
      socket.emit('logout',{userId:localStorage.getItem('id')});
    }
  },[])
  return (
    <div className="layout">

<div className={`sidebar ${darkMode === true ? 'dark' : ''}`} id="sidebar">
    <div className="container">
      <div className="col-md-12">
        <div className="tab-content">
          <ChatBar socket={socket} darkMode={darkMode} />
        </div>
      </div>
    </div>
  </div>
    {/* <NewChat setNewChat={setNewChat} newChat={newChat} darkMode={darkMode}/> */}
    <div className={`main ${darkMode === true ? 'dark' : ''}`}>
				<div className="tab-content" id="nav-tabContent">
        <Outlet   />
    </div>
    </div>
  </div>
  )
}

export default Chat