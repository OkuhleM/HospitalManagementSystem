const bcrypt = require("bcrypt");
// const { validationResults} = require("express-validator");
const User = require("../Models/User");

const Changepassword = async (req, res) => {
  const userId = req.user.user_id; // From middleware

  const { newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateUserPassword = await User.update(
      { password_hash: hashedPassword, isFirstLogin: false },
      { where: { user_id: userId } }
    );

    res.status(200).json({ message: "Password updated successfully" });
    console.log("updateUserPassword", updateUserPassword);
  } catch (error) {
    console.log("error", error);

    return res.status(500).json({ error: error });
  }
};

module.exports = { Changepassword };
