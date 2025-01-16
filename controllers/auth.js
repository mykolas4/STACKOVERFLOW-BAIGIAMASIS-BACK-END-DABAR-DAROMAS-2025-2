const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const users = require("../models/auth.js");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User dont exist" });
    }
    const isPasswordCrt = awwaitbcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

module.exports = { login, signup };
