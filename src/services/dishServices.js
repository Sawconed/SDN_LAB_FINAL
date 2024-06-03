const dishes = require("../publics/data").dishes;

module.exports.getDishes = (req, res) => {
  const dishList = dishes;
  res.status(200).json(dishList);
};

module.exports.getDishById = (req, res) => {
  const { dishId } = req.params;

  const dish = dishes.find((dish) => dish.id === dishId);

  if (!dish) {
    res.status(404).json({ message: "Dish not found" });
  } else {
    res.status(200).json(dish);
  }
};

module.exports.createDish = (req, res) => {
  const { name, description } = req.body;

  const newDish = {
    id: `d${dishes.length}`,
    name,
    description,
  };

  dishes.push(newDish);

  res.status(201).json(newDish);
};

module.exports.createDishWithId = (req, res) => {
  const { dishId } = req.params;

  const isExist = dishes.find((dish) => dish.id === dishId);

  if (isExist) {
    res.status(409).json({ message: `Dish with id=${dishId} already exist` });
  } else {
    const { name, description } = req.body;

    const newDish = {
      id: dishId,
      name,
      description,
    };

    dishes.push(newDish);

    res.status(201).json(newDish);
  }
};

module.exports.updateDish = (req, res) => {
  const { dishId } = req.params;

  const isExist = dishes.find((dish) => dish.id === dishId);

  if (isExist) {
    const { name, description } = req.body;

    dishes.forEach((dish) => {
      if (dish.id === dishId) {
        dish.name = name;
        dish.description = description;
      }
    });

    res.status(201).json({ message: `Dish updated with id of ${dishId}` });
  } else {
    res.status(404).json({ message: "Dish not found" });
  }
};

module.exports.deleteDish = (req, res) => {
  const { dishId } = req.params;

  const isExist = dishes.findIndex((dish) => dish.id === dishId);

  if (isExist !== -1) {
    dishes.splice(isExist, 1);

    res.status(200).json({ message: `Dish deleted with id of ${dishId}` });
  } else {
    res.status(404).json({ message: "Dish not found" });
  }
};
