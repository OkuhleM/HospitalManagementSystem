import React, { useState, useEffect } from "react";
import Logo from "../Assets/Logo.png";
import "../Styling/AdminDashboard.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../Redux/StatsSlice";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p>Error loading stats 😔</p>;
  if (!data) return null;

  // const { weeklyPatients, weeklyRevenue, weeklyAppointments } = data;
  const weeklyPatients = data.results.total;
  const weeklyRevenue = data.revenue.total
  console.log("data", data);

  return (
    <div className="admin-dashboard">
      <nav className="top-nav">
        <div className="logo">
          <img src={Logo} alt="Hospital Logo" />
          <h2>MedicaHub</h2>
        </div>

        <div className="nav-actions">
          <input
            type="search"
            placeholder="🔍 Search across all modules..."
            className="search-bar"
          />
          <button className="add-btn">+ Add New User</button>
          <span className="stats">📅 Last 30 Days</span>
        </div>
      </nav>

      <aside className="side-nav">
        <ul>
          <li className="active">🏠 Dashboard Overview</li>
          <li>👥 User Management</li>
          <li>💰 Billing & Invoices</li>
          <li>🏥 Department & Staff</li>
          <li>📅 Appointments</li>
          <li>⚙️ System Settings</li>
          <li>🧾 Audit Logs</li>
        </ul>
      </aside>

      <main className="main-content">
        <h1>Welcome, Admin 👋</h1>
        <div className="card-container">
          <div className="card">
            <p> Total Patients</p>
            {/* <h3>12,500</h3> */}
            <p>{weeklyPatients}</p>
            {/* <p>+4% vs last month</p> */}
          </div>
          <div className="card">
            <p> Active Staff</p>
            <h3>342</h3>
            <p>on duty: 128</p>
          </div>
          <div className="card">
            <p> Revenue</p>
            <h3>R{weeklyRevenue}</h3>
            {/* <h3>$1.28M</h3> */}
            {/* <h3>
              R{" "}
              {weeklyRevenue
                ?.reduce((sum, row) => sum + row.total_revenue, 0)
                .toLocaleString()}
            </h3> */}

            <p>+4% YoY</p>
          </div>
          <div className="card">
            <p> Active Appointments</p>
            {/* <h3>1.067</h3> */}
            {/* <p>{weeklyAppointments?.length || 0}</p>   */}

            {/* <p>Today: 142</p> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
