import React from "react";
import Logo from "../Assets/Logo.png";
import "../Styling/AdminDashboard.css";

function AdminDashboard() {
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
            <h3>12,500</h3>
             <p>+4%</p> <p>vs</p> <p>last month</p>
          </div>
           <div className="card">
            <p> Active Staff</p>
            <h3>342</h3>
           <p>on duty: 128</p>
          </div>
           <div className="card">
            <p> Revenue</p>
            <h3>$1.28M</h3>
             <p>+4%</p> <p>YoY</p>
          </div>
           <div className="card">
            <p> Active Appointments</p>
            <h3>1.067</h3>
            <p>Today: 142</p>
          </div>
           </div>
      </main>

    </div>
  );
}

export default AdminDashboard;
