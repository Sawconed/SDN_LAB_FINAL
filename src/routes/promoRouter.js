const { Router } = require("express");
const {
  getPromotions,
  getPromotionById,
  createPromotion,
  createPromotionWithId,
  updatePromotion,
  deletePromotion,
} = require("../services/promotionServices");

const promotionRouter = Router();

promotionRouter.get("/", getPromotions);

promotionRouter.get("/:promoId", getPromotionById);

promotionRouter.post("/", createPromotion);

promotionRouter.post("/:promoId", createPromotionWithId);

promotionRouter.put("/:promoId", updatePromotion);

promotionRouter.delete("/:promoId", deletePromotion);

module.exports = promotionRouter;
