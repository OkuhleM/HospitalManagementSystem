import React from 'react'
import Logo from "../Assets/Logo.png";


function AdminDashboard() {
  return (
    <div>
      <nav className='top-nav'>
        <div className="logo">
                  <img src={Logo} alt="Hospital Logo" />
                </div>
        <ul>
          <li><input type='search' placeholder='search across all modules'/></li>
          <li><button>Add new user</button></li>
          <li>Last 30 Days</li>
          
        </ul>
      </nav>

      <nav className='side-nav'>
        <ul>
          <li>Dashboard Overview</li>
          <li><button>User Management</button></li>
          <li><button>Billing$ & Invoices</button></li>
          <li><button>Department & Staff</button></li>
          <li><button>Apppointments</button></li>
          <li><button>System Settings</button></li>
          <li><button>Audit Logs</button></li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminDashboard