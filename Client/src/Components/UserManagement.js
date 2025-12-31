import React from "react";
import "../Styling/UserManagement.css";

function UserManagement() {
  return (
    <div className="management-container">
      <div className="management-grid">
        <div className="card-management">
          <div className="management-header">
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
              <td>
                <span className="badge active">Active</span>
              </td>
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
              <td>
                <span className="badge pending">Pending</span>
              </td>
              <td>Yesterday</td>
              <td className="row-actions">
                <button className="btn-management">Approve</button>
                <button className="btn-management">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="btns-timeline">
            <button className="tbtn">Prev</button>
            <button className="tbtn">1</button>
            <button className="tbtn">2</button>
            <button className="tbtn">3</button>
            <button className="tbtn">Next</button>
        </div>
        </div>


        <div className="card-management">
          <div className="management-header vertical">
            <h2>Add / Edit User</h2>
            <p>Create a new user or update details</p>
          </div>

          <form className="form">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="e.g. John Smith" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="name@hospital.org" />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Role</label>
                <select>
                  <option>Select role</option>
                  <option>Admin</option>
                  <option>Nurse</option>
                  <option>Doctor</option>
                  <option>Receptionist</option>
                  <option>Matron</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Deactivated</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea placeholder="Additional notes..." />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Save User
              </button>
              <button type="button" className="btn-reset">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
