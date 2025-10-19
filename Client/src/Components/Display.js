import React from "react";
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
import IsLoading from "./IsLoading";

function Display() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Receptionist dashboard */}
        <Route
          path="/r-dashboard"
          element={
            <PrivateRoute allowedRoles={["receptionist"]}>
              <ReceptionistDashBoard />
            </PrivateRoute>
          }
        />

      
        {/* Nurse dashboard */}
        <Route
          path="/nurse-dashboard"
          element={
            <PrivateRoute allowedRoles={["nurse"]}>
              <NurseDashboard />
            </PrivateRoute>
          }
        />

        {/* Matron dashboard */}
        <Route
          path="/matron-dashboard"
          element={
            <PrivateRoute allowedRoles={["matron"]}>
              <MatronDashboard />
            </PrivateRoute>
          }
        />

        {/* Patients dashboard */}
        <Route
          path="/patients-dashboard"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <PatientsDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/doctor-dashboard"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </PrivateRoute>
          }
        />

        {/* Loading component */}
        <Route path="/isloading" element={<IsLoading />} />
      </Routes>
    </Router>
  );
}

export default Display;
