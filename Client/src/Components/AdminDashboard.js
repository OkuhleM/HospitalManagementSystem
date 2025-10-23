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
        <p>Select a module from the sidebar to get started.</p>
      </main>

    </div>
  );
}

export default AdminDashboard;
