const Promotion = require("../models/promotions");

const handleError = (error) => {
  const errors = { name: "", price: "" };

  if (error.code === 11000) {
    errors.name = "Promotion with this name already existed";

    return errors;
  }

  if (error.message.includes("Promotion validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getPromotionById = async (req, res) => {
  const { promoId } = req.params;

  try {
    const promotion = await Promotion.findById(promoId);

    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    res.status(200).json(promotion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.createPromotion = async (req, res) => {
  const promotionData = new Promotion(req.body);

  try {
    const newPromotion = await promotionData.save();

    res.status(201).json(newPromotion);
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};

module.exports.createPromotionWithId = async (req, res) => {
  const { promoId } = req.params;

  try {
    const isPromotionExist = await Promotion.findById(promoId);

    if (isPromotionExist) {
      return res.status(409).json({ message: "Promotion already existed" });
    }

    const promotionData = new Promotion({ _id: promoId, ...req.body });
    const newPromotion = await promotionData.save();

    res.status(201).json(newPromotion);
  } catch (error) {
    const errors = handleError(error);
    res.status(500).json(errors);
  }
};

module.exports.updatePromotion = async (req, res) => {
  const { promoId } = req.params;

  try {
    const isPromotionExist = await Promotion.findByIdAndUpdate(promoId, {
      ...req.body,
    });

    if (!isPromotionExist) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    res.status(201).json({ message: "Promotion updated" });
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};

module.exports.deletePromotion = async (req, res) => {
  const { promoId } = req.params;

  try {
    const deletePromotion = await Promotion.findByIdAndDelete(promoId);

    if (!deletePromotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    res.status(201).json({ message: "Promotion deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
