import React from 'react'
import IsLoading from './IsLoading'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage';


function Display() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </Router>
        {/* <IsLoading/> */}
    </div>
  )
}

export default Display