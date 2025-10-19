import React from "react";
import IsLoading from "./IsLoading";

import { Provider } from "react-redux";
import store from "../Redux/Store";
import { AuthProvider } from "../Context/AuthContext";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import LoginPage from "../Pages/LoginPage";
import ReceptionistDashBoard from "../Pages/ReceptionistDashBoard";
import AdminDashboard from "./AdminDashboard";
import DoctorDashboard from "./DoctorDashboard";
import MatronDashboard from "./MatronDashboard";
import NurseDashboard from "./NurseDashboard";
import PatientsDashboard from "./PatientsDashboard";
import PrivateRoute from "./PrivateRoute";

function Display() {
  return (
  <div>       
     <Router>
          <Routes>
            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route
              path="/r-dashboard"
              element={
              <PrivateRoute allowedRoles={["admin"]}>
              <ReceptionistDashBoard 
              />
             </PrivateRoute>
              }
            ></Route>
            <Route path="/isloading" element={<IsLoading />}>
              {" "}
            </Route>
          </Routes>
        </Router>
        </div>
      
  );
}

export default Display;
