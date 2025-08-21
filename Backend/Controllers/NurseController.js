const { User, NurseModel, wardModel, DoctorModel } = require("../Models/index");

const bcrypt = require("bcrypt");
const {dbConnection } = require("../Config/database");

const createNurse = async (req, res) => {

    const transaction = await dbConnection.transaction();

  try {
    const { first_name, last_name, email, phone, password} = req.body;


              if (!first_name || !last_name || !email || !phone || !password ) {
                return res.status(400).json({ message: 'All fields are required' });
              } 

            const hashedPassword = await bcrypt.hash(password, 10);


    //          const validWardTypes = ['ward','pharmacy','icu','opd','other'];

    // if (!validWardTypes.includes(type)) {

    //   return res.status(400).json({ message: `type must be one of: ${validWardTypes.join(', ')}` });
    // }


    // const toPharmacy = (assigned_to_pharmacy === true || assigned_to_pharmacy === 'true' || assigned_to_pharmacy === 1 || assigned_to_pharmacy === '1');


    // if ((doctor_id && toPharmacy) || (!doctor_id && !toPharmacy)) {
    //   return res.status(400).json({ message: 'Pick exactly one: provide doctor_id OR set assigned_to_pharmacy=true' });
    // }

//  if (doctor_id) {
//       const doctor = await DoctorModel.findByPk(doctor_id, {transaction:transaction});
//       console.log("doctor: ", doctor)
//       if (!doctor) return res.status(404).json({ message: "Doctor not found" });
//     }

// const [ward] = await wardModel.findOrCreate({
//       where: dbConnection.where(
//         dbConnection.fn('LOWER', dbConnection.col('type')),
//         dbConnection.fn('LOWER', type.trim())
//       ),
//       defaults: { type },
//       transaction
//     });


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
      
    }, {transaction: transaction});

    
    await transaction.commit();

    res.status(201).json({ message: 'Nurse created', nurse });


  } catch (error) {

    await transaction.rollback();

console.log('create nurse error', error);

 if (error?.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Duplicate entry', details: error.errors });
    }

    res.status(500).json({ message: 'Failed to create nurse', error: error.message || error  });
  }
};


const getAllNurses= async (req, res) => {

try{

  const nurses = await NurseModel.findAll();
  console.log('nurses', nurses)

  res.status(200).json(nurses);

} catch(error) {

console.error('error', error);
res.status(500).json({message:"error finding nursess",error})
}
}

const getSingleNurse = async (req, res) => {

try {
      const { nurse_id } = req.params;
      const foundNurse = await NurseModel.findOne({ nurse_id: `${nurse_id}` });
      console.log(foundNurse)
  res.status(200).json({foundNurse});

} catch (error) {
  console.error('error', error);
res.status(500).json({message:"error finding Nurse",error})
}

}

module.exports = { createNurse, getAllNurses, getSingleNurse };