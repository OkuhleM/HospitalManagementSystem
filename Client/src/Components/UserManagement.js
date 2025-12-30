import React from 'react'
import '../Styling/UserManagement.css'

function UserManagement() {
  return (
    <div className='management-container'>
        <div className='management-header'>
            <h3>User Management
                {/* <p>Manage accounts, roles and status</p> */}

            </h3>
                <button>+ Add User</button>
                <button> Bulk Actions</button>
                </div>
            <div>
                <input type='search'
                placeholder='Search name, email, role...'
                />
                <button> Role: All</button>
                <button>Status: Any</button>
                <p>Table coming soon</p>
            </div>
    </div>
  )
}

export default UserManagement