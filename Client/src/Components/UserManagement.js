import React from 'react'
import '../Styling/UserManagement.css'

function UserManagement() {
  return (
    <div className='management-container'>
        <div className='management-header'>
             <div>
      <h2>User Management</h2>
      <p>Manage accounts, roles and status</p>
    </div>
                <div className="actions">
      <button className="btn-management">+ Add User</button>
      <button className="btn-management">Bulk Actions</button>
    </div>
                </div>
             <div className="tabs">
    <button className="tab active">All Users</button>
    <button className="tab">Active</button>
    <button className="tab">Pending</button>
    <button className="tab">Deactivated</button>
  </div>



<table className="table">
    <thead>
      <tr>
        <th>User</th>
        <th>Email</th>
        <th>Role</th>
        <th>Status</th>
        <th>Last Active</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dr. Zayn Malik</td>
        <td>zain@hospital.com</td>
        <td>Physician</td>
        <td><span className="badge active">Active</span></td>
        <td>Today 09:24</td>
        <td className="row-actions">
          <button className="btn-management">Edit</button>
          <button className="btn-management">Deactivate</button>
        </td>
      </tr>

      <tr>
        <td>Christopher Brown</td>
        <td>chrisbrown@medicore.org</td>
        <td>Doctor</td>
        <td><span className="badge pending">Pending</span></td>
        <td>Yesterday</td>
        <td className="row-actions">
          <button className="btn-management">Approve</button>
          <button className="btn-management">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

    </div>
  )
}

export default UserManagement