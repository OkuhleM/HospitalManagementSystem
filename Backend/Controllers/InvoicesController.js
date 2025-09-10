const { invoices, DoctorModel, PatientModel } = require("../Models/index");

const createInvoices = async (req, res) => {
  const {
    patient_id,
    license_number,
    id_Number,
    doctor_id,
    total_amount,
    status,
    payment_method,
    created_at,
    updated_at,
  } = req.body;

  try {
    const patient = await PatientModel.findOne({
      where: { id_Number: `${id_Number}` },
    });

    const doctor = await DoctorModel.findOne({
      where: { license_number: `${license_number}` },
    });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (!patient) {
      return res.status(404).json({ message: "patient not found" });
    }

    const createdBillsInvoices = await invoices.create({
      patient_id: patient.patient_id,
      doctor_id: doctor.doctor_id,
      total_amount,
      status,
      payment_method,
      created_at,
      updated_at,
    });
    console.log(" added invoice: ", createdBillsInvoices);
    return res
      .status(200)
      .json({ message: "all the created invoices: ", createdBillsInvoices });
  } catch (error) {
    console.error("error: ", error);
    return res.status(500).json({ message: "found an error: ", error });
  }
};

const getInvoices = async (req, res) => {
  try {
    const accounts = await invoices.findAll();

    console.log("accounts", accounts);

    res.status(200).json({ message: "accounts: ", accounts });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding accouts", error });
  }
};

const getSingleInvoice = async (req, res) => {
  try {
    const { invoice_id } = req.params;
    const foundInvoices = await Billings.findOne({
      invoice_id: `${invoice_id}`,
    });
    console.log(foundInvoices);
    res.status(200).json({ message: "available foundInvoices", foundInvoices });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding foundInvoices", error });
  }
};

module.exports = { createInvoices, getInvoices, getSingleInvoice };
