import React from "react";
import "./WebApp.css";
import Sidebar from "../../components/SideBar/Sidebar";
import { Outlet } from "react-router-dom"


const WebApp = (props) => {



  return (
    <div className='appContainer'>
      <Sidebar user = {props.user}/>
      <Outlet/>


    </div>
  );
};

export default WebApp;
