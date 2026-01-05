import React from 'react'

function PatientsManagement() {
  return (
    <div className="management-container">
      <div className="management-grid">
        <div className="card-management">
          <div className="management-header">
            <div>
              <h2>Patient Management</h2>
              <p>Registery, filters, and quick actions</p>
            </div>
            <div className="actions">
              <button className="btn-management">+ New Patient</button>
              <button className="btn-management">Export</button>
            </div>
          </div>
          <div className="tabs">
            <input type='search' placeholder='Search patient name, ID...' />
            <select  name='operation'>

                <option>Admitted:</option>
                <option>Any</option>
                
                
            </select>
            <select>
                <option>Department:</option>
                <option>All</option>
                <option>ICU</option>
            </select>
          </div>
        <table className="table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>ID </th>
              <th>Doctor</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Siyanda Bongani</td>
              <td>97122412370854</td>
              <td>Dr Zayn Malik</td>
              <td>
                <span className="badge active">In patient</span>
              </td>
              
              <td className="row-actions">
                <button className="btn-management">Details</button>
                {/* <button className="btn-management">Deactivate</button> */}
              </td>
            </tr>

            <tr>
              <td>Mira Chen</td>
              <td>5810091237967</td>
              <td>Dr Christopher Brown</td>
              <td>
                <span className="badge pending">Out Patient</span>
              </td>
              <td className="row-actions">
                <button className="btn-management">Details</button>
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
            <h2>New Patient Registration</h2>
            <p>Capture essential details</p>
          </div>

          <form className="form">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="e.g. John doe" />
              </div>

              <div className="form-group">
                <label>Patient ID
</label>
                <input type="email" placeholder="Auto-generated" />
              </div>
            </div>
            <div className='grid-row'>
                <label> Age</label>
                <input type='number' placeholder='32' />
                <label>Gender</label>
                <selcet>
                    <option>Select:</option>
                    <option>Female</option>
                    <option>Male</option>
                </selcet>
                <label>Phone</label>
                <input type='text' placeholder='011 2345 879' />
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
  )
}

export default PatientsManagement