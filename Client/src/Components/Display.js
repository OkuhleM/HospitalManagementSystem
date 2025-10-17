import React from 'react'
import IsLoading from './IsLoading'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage';
import LoginPage from '../Pages/LoginPage';
import Dashboard from '../Pages/Dashboard'


function Display() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
        {/* <IsLoading/> */}
    </div>
  )
}

export default Display