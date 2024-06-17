const { Router } = require("express");
const {
  getPromotions,
  getPromotionById,
  createPromotion,
  createPromotionWithId,
  updatePromotion,
  deletePromotion,
} = require("../services/promotionServices");
const { verifyOrdinaryUser, verifyAdmin } = require("../authenticate");

const promotionRouter = Router();

promotionRouter.get("/", getPromotions);

promotionRouter.get("/:promoId", getPromotionById);

promotionRouter.post("/", verifyOrdinaryUser, verifyAdmin, createPromotion);

promotionRouter.post(
  "/:promoId",
  verifyOrdinaryUser,
  verifyAdmin,
  createPromotionWithId
);

promotionRouter.put(
  "/:promoId",
  verifyOrdinaryUser,
  verifyAdmin,
  updatePromotion
);

promotionRouter.delete(
  "/:promoId",
  verifyOrdinaryUser,
  verifyAdmin,
  deletePromotion
);

module.exports = promotionRouter;
