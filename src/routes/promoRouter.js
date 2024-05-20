import { Router } from "express";
import {
  createPromotion,
  createPromotionWithId,
  deletePromotion,
  getPromotionById,
  getPromotions,
  updatePromotion,
} from "../services/promotionServices.js";

const promotionRouter = Router();

promotionRouter.get("/", getPromotions);

promotionRouter.get("/:promoId", getPromotionById);

promotionRouter.post("/", createPromotion);

promotionRouter.post("/:promoId", createPromotionWithId);

promotionRouter.put("/:promoId", updatePromotion);

promotionRouter.delete("/:promoId", deletePromotion);

export default promotionRouter;
