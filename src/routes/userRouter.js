const express = require("express");
const { verifyOrdinaryUser, verifyAdmin } = require("../authenticate");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../services/userServices");

const userRouter = express.Router();

userRouter.get("/", verifyOrdinaryUser, verifyAdmin, getAllUsers);

userRouter.get("/:userId", getUserById);

userRouter.post("/", createUser);

userRouter.put("/:userId", verifyOrdinaryUser, updateUser);

userRouter.delete("/:userId", verifyOrdinaryUser, deleteUser);

module.exports = userRouter;
