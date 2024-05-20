import { Router } from "express";
import {
  createDish,
  createDishWithId,
  deleteDish,
  getDishById,
  getDishes,
  updateDish,
} from "../services/dishServices.js";

const dishRouter = Router();

dishRouter.get("/", getDishes);

dishRouter.get("/:dishId", getDishById);

dishRouter.post("/", createDish);

dishRouter.post("/:dishId", createDishWithId);

dishRouter.put("/:dishId", updateDish);

dishRouter.delete("/:dishId", deleteDish);

export default dishRouter;
