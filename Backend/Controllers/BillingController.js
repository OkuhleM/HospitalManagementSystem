const { where } = require("sequelize");
const { Billings, PatientModel, medicalAid } = require("../Models/index");

const patientsBillings = async (req, res) => {
  try {
    const {
      id_Number,
      amount,
      billing_date,
      medical_aid_id,
      paid_by_medical_aid,
      status,
    } = req.body;

    const patient = await PatientModel.findOne({
      where: { id_Number: `${id_Number}` },
    });

    let medicalAidFound = null;

    if (!medical_aid_id) {
      medicalAidFound = await medicalAid.findOne({ where: { medical_aid_id } });
      if (!medicalAidFound) {
        return res.status(404).json({ message: "medical aid not found" });
      }
    }
    if (!patient) {
      return res.status(404).json({ message: "patient not found" });
    }

    const accountSettled = await Billings.create({
      patient_id: patient.patient_id,
      amount,
      billing_date,
      medical_aid_id: medicalAidFound.medical_aid_id,
      paid_by_medical_aid,
      status,
    });
    console.log("account settled: ", accountSettled);
    res.status(200).json({ message: "account settled: ", accountSettled });
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ message: "error: ", error });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Billings.findAll({
      include: [
        {
          model: PatientModel,
          attributes: ["first_name", "last_name", "id_Number"],
        },
        {
          model: medicalAid,
          attributes: ["medical_aid_name", "policy_number"],
        },
      ],
    });

    console.log("accounts", accounts);

    res.status(200).json({ message: "accounts: ", data: accounts });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding accouts", error });
  }
};

const getAPatientsAccount = async (req, res) => {
  try {
    const { bill_id } = req.params;
    const foundBill = await Billings.findOne({
      where: { bill_id },
      include: [
        {
          model: PatientModel,
          attributes: ["first_name", "last_name", "id_Number"],
        },
        {
          model: medicalAid,
          attributes: ["medical_aid_name", "policy_number"],
        },
      ],
    });

    if (!foundBill) {
      return res.status(404).json({
        message: "Billing record retrieved successfully",
        data: foundBill,
      });
    }
    console.log(foundBill);
    res.status(200).json({ message: "available bills", foundBill });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding foundBill", error });
  }
};

module.exports = {
  patientsBillings,
  getAllAccounts,
  getAPatientsAccount,
};
