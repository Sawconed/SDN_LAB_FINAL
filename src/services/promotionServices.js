const promotions = require("../publics/data").promotions;

module.exports.getPromotions = (req, res) => {
  const promotionList = promotions;
  res.status(200).json(promotionList);
};

module.exports.getPromotionById = (req, res) => {
  const { promoId } = req.params;

  const promo = promotions.find((promotion) => promotion.id === promoId);

  if (!promo) {
    res.status(404).json({ message: "Promotion not found" });
  } else {
    res.status(200).json(promo);
  }
};

module.exports.createPromotion = (req, res) => {
  const { name, description } = req.body;

  const newPromo = {
    id: `p${promotions.length}`,
    name,
    description,
  };

  promotions.push(newPromo);

  res.status(201).json(newPromo);
};

module.exports.createPromotionWithId = (req, res) => {
  const { promoId } = req.params;

  const isExist = promotions.find((promotion) => promotion.id === promoId);

  if (isExist) {
    res
      .status(409)
      .json({ message: `Promotion with id=${promoId} already exist` });
  } else {
    const { name, description } = req.body;

    const newPromo = {
      id: promoId,
      name,
      description,
    };

    promotions.push(newPromo);

    res.status(201).json(newPromo);
  }
};

module.exports.updatePromotion = (req, res) => {
  const { promoId } = req.params;

  const isExist = promotions.find((promotion) => promotion.id === promoId);

  if (isExist) {
    const { name, description } = req.body;

    promotions.forEach((promotion) => {
      if (promotion.id === promoId) {
        promotion.name = name;
        promotion.description = description;
      }
    });

    res
      .status(201)
      .json({ message: `Promotion updated with id of ${promoId}` });
  } else {
    res.status(404).json({ message: "Promotion not found" });
  }
};

module.exports.deletePromotion = (req, res) => {
  const { promoId } = req.params;

  const isExist = promotions.findIndex((promotion) => promotion.id === promoId);

  if (isExist !== -1) {
    promotions.splice(isExist, 1);

    res
      .status(201)
      .json({ message: `Promotion deleted with id of ${promoId}` });
  } else {
    res.status(404).json({ message: "Promotion not found" });
  }
};
