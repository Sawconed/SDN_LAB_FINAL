const express = require("express");
const { verifyOrdinaryUser } = require("../authenticate");
const {
  getfavoriteByUser,
  addFavorite,
  removeFavorite,
  addFavoriteByDishId,
  removeFavoriteByDishId,
} = require("../services/favoriteServices");

const favoriteRouter = express.Router();

favoriteRouter.get("/", verifyOrdinaryUser, getfavoriteByUser);
favoriteRouter.post("/", verifyOrdinaryUser, addFavorite);
favoriteRouter.post("/:dishId", verifyOrdinaryUser, addFavoriteByDishId);
favoriteRouter.delete("/", verifyOrdinaryUser, removeFavorite);
favoriteRouter.delete("/:dishId", verifyOrdinaryUser, removeFavoriteByDishId);

module.exports = favoriteRouter;
