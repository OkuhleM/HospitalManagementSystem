const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const User = require("../Models/User");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const SECRETKEY = process.env.SECRETKEY;

const LogIn = async (req, res) => {
  const { email, password } = req.body;
  console.log("password", password);

  try {
    const user = await User.findOne({ where: { email } });
    console.log("user", user);

    if (!user) {
      console.log("user", user);
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    console.log("validPassword", validPassword);

    console.log("Password from body:", password);
    console.log("Password from DB:", user?.password_hash);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Account doesn't exist, please Register" });
    }

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role, email: user.email },
      SECRETKEY,
      { expiresIn: "12h" }
    );

    console.log("Creating token with:", {
      user_id: user.user_id,
      role: user.role,
      email: user.email,
    });
    res.status(200).json({
      message: "Login successful",
      token,

      user: {
        id: user.user_id,
        role: user.role,
        email: user.email,
      },

      // isFirstLogin: user.isFirstLogin,
    });
    console.log("user", user);
  } catch (error) {
    console.log("error", error);

    return res.json({ error: error, message: "Login failed" }).status(400);
  }
};

module.exports = { LogIn };
