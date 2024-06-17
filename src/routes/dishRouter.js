const { Router } = require("express");
const {
  getDishes,
  getDishById,
  createDish,
  createDishWithId,
  updateDish,
  deleteDish,
  createComment,
  deleteAllComment,
  updateComment,
  deleteComment,
} = require("../services/dishServices");
const { verifyOrdinaryUser, verifyAdmin } = require("../authenticate");

const dishRouter = Router();

dishRouter.get("/", getDishes);

dishRouter.get("/:dishId", getDishById);

dishRouter.post("/", verifyOrdinaryUser, verifyAdmin, createDish);

dishRouter.post("/:dishId", verifyOrdinaryUser, verifyAdmin, createDishWithId);

dishRouter.put("/:dishId", verifyOrdinaryUser, verifyAdmin, updateDish);

dishRouter.delete("/:dishId", verifyOrdinaryUser, verifyAdmin, deleteDish);

dishRouter.put("/:dishId/comments", verifyOrdinaryUser, createComment);

dishRouter.delete(
  "/:dishId/comments",
  verifyOrdinaryUser,
  verifyAdmin,
  deleteAllComment
);

dishRouter.put(
  "/:dishId/comments/:commentId",
  verifyOrdinaryUser,
  updateComment
);
dishRouter.delete(
  "/:dishId/comments/:commentId",
  verifyOrdinaryUser,
  deleteComment
);

module.exports = dishRouter;
