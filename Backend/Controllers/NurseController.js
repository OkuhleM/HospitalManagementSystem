const { User, NurseModel } = require("../Models/index");

const bcrypt = require("bcrypt");
const {dbConnection } = require("../Config/database");

const createNurse = async (req, res) => {

    const transaction = await dbConnection.transaction();

  try {
    const { first_name, last_name, email, phone, password, assignment, assigned_to } = req.body;

    if (!password) {
                console.log('password', password)
                return res.status(400).json({ message: 'Password is required' });
              }


              if (!first_name || !last_name || !email || !phone || !assignment || !assigned_to ) {
                return res.status(400).json({ message: 'All fields are required' });
              }

            const hashedPassword = await bcrypt.hash(password, 10);

            const assignedTo = assigned_to.toLowerCase();

    const newUser = await User.create({
        first_name,
          last_name,
          email,
          phone,
          password: hashedPassword,
          role: 'nurse',
      isFirstLogin: true,
    }, {transaction: transaction});

    const nurse = await NurseModel.create({
      user_id: newUser.user_id,
      assignment,
      assigned_to: assignedTo
    }, {transaction: transaction});
    await transaction.commit();

    res.status(201).json({ message: 'Nurse created', nurse });
  } catch (error) {
    await transaction.rollback();
console.log('error', error)
    res.status(500).json({ message: 'Failed to create nurse', error });
  }
};

const getAllNurses = async (req, res) => {
  try {
    const nurses = await NurseModel.findAll({ include: User });
console.log('nurses', nurses)
    res.status(200).json({messsage: 'Found Nursers: ',nurses});

  } catch (error) {


    console.log('error', error)
    res.status(500).json({ message: 'Failed to fetch nurses', error });
  }
};

module.exports = { createNurse, getAllNurses };