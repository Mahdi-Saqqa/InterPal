import React from 'react'
import Main from './views/Main/Main'
import LoginPage from './views/LoginPage/LoginPage';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './views/RegisterPage/RegisterPage';
import WebApp from './views/WebApp/WebApp';

const App = () => {
  return (
    <div>
    <Routes>
    <Route path="/" element={<Main/>} />
    <Route path="/LoginPage" element={<LoginPage/>} />
    <Route path="/RegisterPage" element={<RegisterPage/>} />
    <Route path="/app" element={<WebApp/>} />



   </Routes>
   </div>
  )
  
}

export default App;