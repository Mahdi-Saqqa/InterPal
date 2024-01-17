import React, { useEffect } from "react";
import "./WebApp.css";
import Sidebar from "../../components/SideBar/Sidebar";
import { Outlet } from "react-router-dom"


const WebApp = (props) => {
  const [darkMode, setDarkMode] = React.useState(''); 


  return (
    <div className='appContainer'>
      <Sidebar user = {props.user} setDarkMode={setDarkMode}/>
      <Outlet context={[darkMode]} />


    </div>
  );
};

export default WebApp;
