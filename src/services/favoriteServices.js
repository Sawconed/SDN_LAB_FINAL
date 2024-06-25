const express = require("express");
const Favorite = require("../models/favorite");
const mongoose = require("mongoose");

module.exports.getfavoriteByUser = async (req, res) => {
  const userId = req.session.user.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const favorite = await Favorite.findOne({ user: userId })
      .populate("user")
      .populate("dishes");

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addFavorite = async (req, res) => {
  const userId = req.session.user.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const favorite = await Favorite.findOne({ user: userId });

    if (favorite) {
      // Exclude duplicates dishes
      const newDishes = req.body.filter(
        (dishId) => !favorite.dishes.includes(dishId._id)
      );

      // Add new dishes to favorite
      favorite.dishes.push(...newDishes);
      await favorite.save();
      res.status(201).json(favorite);
    } else {
      // Create new favorite document
      const newFavorite = new Favorite({
        user: userId,
        dishes: req.body,
      });

      await newFavorite.save();
      res.status(201).json(newFavorite);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.removeFavorite = async (req, res) => {
  const userId = req.session.user.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const favorite = await Favorite.find({ user: userId });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    await Favorite.deleteOne({ user: userId });
    res.status(201).json({ message: "Favorites removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addFavoriteByDishId = async (req, res) => {
  const { dishId } = req.params;
  const userId = req.session.user.id;

  try {
    const favorite = await Favorite.findOne({ user: userId });

    // Check if user has favorite
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    // Check if dish already in favorite
    if (favorite.dishes.includes(dishId)) {
      return res.status(400).json({ message: "Dish already in favorite" });
    }

    favorite.dishes.push(dishId);
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.removeFavoriteByDishId = async (req, res) => {
  const { dishId } = req.params;
  const userId = req.session.user.id;

  try {
    const favorite = await Favorite.findOneAndUpdate(
      { user: userId, dishes: dishId },
      { $pull: { dishes: dishId } },
      { new: true }
    );

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
