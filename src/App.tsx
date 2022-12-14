
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import React, { ReactElement, ReactNode } from 'react';
import Register from './pages/SignUp';
import { useSelector } from 'react-redux';
import { userState } from './redux/slicers/userSlice';
import VideoCall from './components/VideoCall';


function App() {
  const {user,islogin}=useSelector(userState)
  const ProtectedRoute=({children}:any)=>{
     if (!islogin) {
      return <Navigate to="/login"/>
     }
     return children
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
        <Route
        path='/home'
          element={<Home />}/>
        <Route path="register" element={<Register />} />
        <Route path="videoCall" element={<VideoCall />} />
    </Routes>
    
  </BrowserRouter>
  );
}

export default App;
