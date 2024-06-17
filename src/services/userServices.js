const express = require("express");
const User = require("../models/users");

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.createUser = async (req, res) => {
  const userData = new User(req.body);

  try {
    const newUser = await userData.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      ...req.body,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: "User updated" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
