const { Router } = require("express");
const {
  getDishes,
  getDishById,
  createDish,
  createDishWithId,
  updateDish,
  deleteDish,
} = require("../services/dishServices");

const dishRouter = Router();

dishRouter.get("/", getDishes);

dishRouter.get("/:dishId", getDishById);

dishRouter.post("/", createDish);

dishRouter.post("/:dishId", createDishWithId);

dishRouter.put("/:dishId", updateDish);

dishRouter.delete("/:dishId", deleteDish);

module.exports = dishRouter;
