import React from 'react'
import Main from './views/Main'
import LoginPage from './components/LoginPage';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';

const App = () => {
  return (
    <div>
    <Routes>
    <Route path="/" element={<Main/>} />
    <Route path="/LoginPage" element={<LoginPage/>} />
    <Route path="/RegisterPage" element={<RegisterPage/>} />



   </Routes>
   </div>
  )
  
}

export default App;