import React from 'react'
import '../Styling/AdmissionsAndDischarges.css'

function AdmissionsAndDischarges() {
  return (
    <div className='admissions-container'>
<div className='panel admissions-panel'>
    <div className='panel-header'>

<h2>Admission And Discharges</h2>
<div className="time-filters">
            <button className='btn'>previous</button>
            <p>1</p>
            <button className='btn'>next</button>
          </div>
</div>


            <div className="panel-body">
          <h3>Place holder data</h3>
          <p className="empty-state">No data available</p>
        </div>
    
</div>
<div className="panel appointments-panel">
        <div className="panel-header">
          <h2>Appointment Status</h2>
          <p className="subheading">Approved / Pending / Cancelled</p>
        </div>
        <div className="panel-body">
          <h3> placeholder data </h3>
          <p className="empty-state">No data available</p>
        </div>
    </div>
    </div>
  )
}

export default AdmissionsAndDischarges