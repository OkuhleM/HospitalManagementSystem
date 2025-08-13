const ReceptionistHistoryModel = require("../Models/ReceptionistHistory")
const {User, Receptionist} = require("../Models/index")
const bcrypt = require("bcrypt")
const { dbConnection } = require("../Config/database")


const createReceptionist = async (req, res) => {

  const transaction = await dbConnection.transaction();

try {
    const { first_name, last_name, email, phone, password, start_date } = req.body;

    if (!password) {
      console.log('password', password)
      return res.status(400).json({ message: 'Password is required' });
    }

    // const hashedPassword = await bcrypt.hash(password,10);
                const hashedPassword = await bcrypt.hash(password, 10);
                const existingUser = await User.findOne({ where: { email } });

                if (existingUser) {
                  return res.status(409).json({ message: 'Email already in use' });
                }

    const newUser = await User.create({
        first_name,
          last_name,
          email,
          phone,
          password: hashedPassword,
          role: 'receptionist',
    //   isFirstLogin: true,
    }, { transaction: transaction});

    const currentReceptionist = await Receptionist.create({
        user_id: newUser.user_id,
        start_date
      }, {transaction: transaction});

      await transaction.commit();


      await ReceptionistHistoryModel.create({
        user_id: newUser.user_id,
        start_date,
        end_date: null // will update when they leave
      }, {transaction: transaction});

      res.status(201).json({ message: 'Receptionist added', currentReceptionist });

  

} catch (error) {
  await transaction.rollback();

    console.log('error', error);
    res.status(500).json({ message: 'Failed to create receptionist', error });

    
}

}

module.exports = {createReceptionist}