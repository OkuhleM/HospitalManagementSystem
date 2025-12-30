import React, { useState, useEffect } from "react";
import Logo from "../Assets/Logo.png";
import "../Styling/AdminDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../Redux/StatsSlice";
import { fetchBillings } from "../Redux/Features/Payments/BillingSlice";
import AdmissionsAndDischarges from "./AdmissionsAndDischarges";

function AdminDashboard() {
  const dispatch = useDispatch();
  // const { data, loading, error } = useSelector((state) => state.stats);

  // Stats slice
  const {
    data: statsData,
    loading: statsLoading,
    error: statsError,
  } = useSelector((state) => state.stats);

  // Billing slice
  const {
    data: billingData,
    loading: billingLoading,
    error: billingError,
  } = useSelector((state) => state.billings);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchBillings());
  }, [dispatch]);

  const handlePageChange = (page) => setCurrentPage(page);

  // if (loading) return <p>Loading stats...</p>;
  // if (error) return <p>Error loading stats 😔</p>;
  // if (!data) return null;

  //Billing paging
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = billingData?.slice(indexOfFirst, indexOfLast) || [];
  const totalPages = Math.ceil((billingData?.length || 0) / recordsPerPage);

  if (statsLoading || billingLoading) return <p>Loading dashboard...</p>;
  if (statsError || billingError) return <p>Error loading stats data 😔</p>;

  const weeklyPatients = statsData?.results?.total || 0;
  const weeklyRevenue = statsData?.revenue?.total || 0;
  const weeklyAppointments = statsData?.appointments?.total || 0;
  const revenueChange = Number(statsData?.revenue?.change || 0);
  const patientChange = Number(statsData?.results?.change ?? 0);
  console.log("patientsChange", patientChange, revenueChange);

  const calculateChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    const change = ((current - previous) / previous) * 100;
    console.log("change.toFixed(2", change.toFixed(2));
    return change.toFixed(2);
  };

  const calculateRevenueChange = (current, prev) => {
    if (!prev || prev === 0) return 0;
    const change = ((current - prev) / prev) * 100;
    console.log("change.toFixed(2", change.toFixed(2));
    return change.toFixed(2);
  };

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

            <div
              className={`stat-change ${patientChange >= 0 ? "green" : "red"}`}
            >
              {patientChange >= 0 ? "+" : ""}
              {patientChange}% vs last month
            </div>
          </div>
          <div className="card">
            <p> Active Staff</p>
            <h3>342</h3>
            <p>on duty: 128</p>
          </div>
          <div className="card">
            <p> Revenue</p>
            <h3>R{weeklyRevenue}</h3>

          

            <div className={`stat-change ${revenueChange ? "green" : "red"}`}>
    {revenueChange ? "▲" : "▼"}{" "}
    {Math.abs(revenueChange)}% vs last month
  </div>
          </div>
          <div className="card">
            <p> Active Appointments</p>
            {/* <h3>1.067</h3> */}
            <p>{weeklyAppointments}</p>

            {/* <p>Today: 142</p> */}
          </div>
        </div>


<section className="admissions-discharges">
  <AdmissionsAndDischarges />

</section>


      <div className="billing-dashboard">
        <h2>💸 Billing Overview</h2>
        <table className="billing-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Amount (R)</th>
              <th>Status</th>
              <th>Date</th>
              <th>Medical Aid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((bill) => (
                <tr key={bill.bill_id}>
                  <td>
                    {bill.Patient?.first_name} {bill.Patient?.last_name} <br />
                    <small>{bill.Patient?.id_Number}</small>
                  </td>
                  <td>{bill.amount}</td>
                  <td> <span className={`status-pill ${bill.status ? "paid" : "pending"}`}>
    {bill.status ? "Paid" : "Pending"}
  </span></td>
                  <td>{new Date(bill.billing_date).toLocaleDateString()}</td>
                  <td>
                    {bill.medicalAid
                      ? bill.medicalAid.medical_aid_name
                      : "— No Medical Aid —"}
                  </td>
                  <td>
                    <button className="view-btn">View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No billing records found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      </div>
      </main>      

    </div>
  );
}

export default AdminDashboard;
