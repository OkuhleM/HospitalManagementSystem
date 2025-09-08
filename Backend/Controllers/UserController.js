const bcrypt = require("bcrypt");
const path = require("path");

const User = require("../Models/User");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const registerUser = async (req, res) => {
  const { first_name, last_name, email, phone, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    console.log("existingUser", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("the user", existingUser);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    console.log("new-user", newUser);

    res.status(201).send({ newUser, message: "user created" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: "Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const Users = await User.findAll();
    console.log("user: ", Users);

    res.status(200).json({ Users });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding users", error });
  }
};

const getSingleUser = async (req, res) => {
  const { email } = req.params;

  try {
    const foundUser = await User.findOne({
      where: { email },
    });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("found User: ", foundUser);

    res.status(200).json({ message: "found user", foundUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error, message: "error finding User" });
  }
};

module.exports = { registerUser, getAllUsers, getSingleUser };
