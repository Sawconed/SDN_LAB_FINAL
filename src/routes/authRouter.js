const express = require("express");
const { login, logout } = require("../services/authServices");
const { verifyOrdinaryUser } = require("../authenticate");

const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.get("/logout", verifyOrdinaryUser, logout);

module.exports = authRouter;
