const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { createUser, findUserByEmail } = require("../models/User");

const register = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing email or password" });

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: "Error hashing password" });

    createUser(email, hash, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Error creating user", details: err });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing email or password" });

  findUserByEmail(email, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error fetching user", details: err });
    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err)
        return res.status(500).json({ error: "Error comparing passwords" });
      if (!result)
        return res.status(403).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ token });
    });
  });
};

module.exports = { register, login };
