import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Navbar from './Components/Navbar'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
      </Routes>
      <ToastContainer position='top-center'/>
    </BrowserRouter>
  )
}

export default App