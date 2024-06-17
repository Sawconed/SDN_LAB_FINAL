const Dish = require("../models/dishes");

const dishes = require("../publics/data").dishes;

module.exports.getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.getDishById = async (req, res) => {
  const { dishId } = req.params;

  try {
    const dish = await Dish.findById(dishId);

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.status(200).json(dish);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.createDish = async (req, res) => {
  const dishData = new Dish(req.body);

  try {
    const newDish = await dishData.save();

    res.status(201).json(newDish);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.createDishWithId = async (req, res) => {
  const { dishId } = req.params;

  try {
    const isDishExist = await Dish.findById(dishId);

    if (isDishExist) {
      return res.status(409).json({ message: "Dish already existed" });
    }

    const dishData = new Dish({ _id: dishId, ...req.body });
    const newDish = await dishData.save();

    res.status(201).json(newDish);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.updateDish = async (req, res) => {
  const { dishId } = req.params;

  try {
    const isDishExist = await Dish.findByIdAndUpdate(dishId, {
      ...req.body,
    });

    if (!isDishExist) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.status(201).json({ message: `Dish updated with id of ${dishId}` });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.deleteDish = async (req, res) => {
  const { dishId } = req.params;

  try {
    const isDishExist = await Dish.findByIdAndDelete(dishId);

    if (!isDishExist) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.status(201).json({ message: `Dish deleted with id of ${dishId}` });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.createComment = async (req, res) => {
  const { dishId } = req.params;

  try {
    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    dish.comments.push({ ...req.body, author: req.session.user.id });
    const newDish = await dish.save();

    res.status(201).json(newDish);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.deleteAllComment = async (req, res) => {
  const { dishId } = req.params;

  try {
    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    dish.comments = [];
    const newDish = await dish.save();

    res.status(201).json(newDish);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.updateComment = async (req, res) => {
  const { dishId, commentId } = req.params;

  try {
    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    const comment = dish.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author !== req.session.user.id) {
      return res
        .status(403)
        .json({ message: "You cannot update other user's comment" });
    }

    comment.set(req.body);
    const newDish = await dish.save();

    res.status(201).json(newDish);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.deleteComment = async (req, res) => {
  const { dishId, commentId } = req.params;

  try {
    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    const comment = dish.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author !== req.session.user.id) {
      return res
        .status(403)
        .json({ message: "You cannot delete other user's comment" });
    }

    comment.deleteOne({ _id: commentId });
    const newDish = await dish.save();

    res.status(201).json(newDish);
  } catch (error) {
    res.json({ message: error.message });
  }
};
