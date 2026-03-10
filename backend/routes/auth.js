const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const usersFile = path.join(__dirname, "../users.json");


// SIGNUP
router.post("/signup", (req, res) => {

  const { name, email, password } = req.body;

  let users = [];

  if (fs.existsSync(usersFile)) {
    const data = fs.readFileSync(usersFile);
    users = JSON.parse(data);
  }

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password
  };

  users.push(newUser);

  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({
    message: "Signup successful",
    user: newUser
  });

});


// LOGIN
router.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (!fs.existsSync(usersFile)) {
    return res.status(400).json({ message: "No users found" });
  }

  const data = fs.readFileSync(usersFile);
  const users = JSON.parse(data);

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    message: "Login successful",
    user
  });

});

module.exports = router;