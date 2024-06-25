const express = require("express");
const User = require("../models/users");

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username,
      password,
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.user = { id: user.id, admin: user.admin };
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.logout = async (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logout successful" });
};
