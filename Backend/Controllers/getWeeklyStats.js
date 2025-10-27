const databaseConnection = require('../Config/database')

 const fetchWeeklyStats = async (req, res) => {
  try {
    const [patients] = await databaseConnection.query("CALL getWeeklyPatients()");
    const [revenue] = await databaseConnection.query("CALL getWeeklyRevenue()");
    const [appointments] = await databaseConnection.query("CALL getWeeklyAppointments()");
    // const [staff] = await databaseConnection.query("CALL getActiveStaff()");
console.log('patients,revenue,appointments', patients,revenue,appointments)
    res.json({ patients, revenue, appointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {fetchWeeklyStats}