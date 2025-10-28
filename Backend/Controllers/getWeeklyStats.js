const { AppointmentModel, PatientModel, Payment } = require("../Models/index");
const { dbConnection } = require("../Config/database");

const fetchWeeklyStats = async (req, res) => {
  try {
    const results = await dbConnection.query("CALL getWeeklyPatients();");
    const patientStats = results[0] || results;
        console.log("Patient Stats:", patientStats);

    const [revenue] = await dbConnection.query(
      "CALL getWeeklyRevenue()"
    );

    const revenueStats = revenue[0] || revenue;
    console.log('revenue', revenue)
    // const [appointments] = await dbConnection.query(
    //   "CALL getWeeklyAppointments()",
    // );
    // const [staff] = await dbConnection.query("CALL getActiveStaff()");
    console.log("patients,revenue,appointments", results);
    res.status(200).json({
      results: {
        total: patientStats.total_patients || 0,
        change: patientStats.week_number || 0,
      },
      revenue: {
        total: revenueStats.total_revenue || 0,
         change: revenueStats.week_number || 0,
      }
    });
  } catch (err) {
        console.error("Error fetching weekly stats:", err);

    res.status(500).json({ message: err.message });
  }
};

module.exports = { fetchWeeklyStats };
