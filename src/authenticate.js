const express = require("express");

function verifyAdmin(req, res, next) {
  if (!req.session.user.admin) {
    const err = new Error("You are not authorized to perform this operation!");
    err.status = 403;
    return next(err);
  }
  next();
}

function verifyOrdinaryUser(req, res, next) {
  if (!req.session.user) {
    const err = new Error("You are not authenticated!");
    err.status = 403;
    return next(err);
  }
  next();
}

module.exports = {
  verifyAdmin,
  verifyOrdinaryUser,
};
