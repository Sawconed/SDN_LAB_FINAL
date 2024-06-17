const { Router } = require("express");
const {
  getLeaders,
  getLeaderById,
  createLeader,
  createLeaderWithId,
  updateLeader,
  deleteLeader,
} = require("../services/leaderServices");
const { verifyOrdinaryUser, verifyAdmin } = require("../authenticate");

const leaderRouter = Router();

leaderRouter.get("/", getLeaders);

leaderRouter.get("/:leaderId", getLeaderById);

leaderRouter.post("/", verifyOrdinaryUser, verifyAdmin, createLeader);

leaderRouter.post(
  "/:leaderId",
  verifyOrdinaryUser,
  verifyAdmin,
  createLeaderWithId
);

leaderRouter.put("/:leaderId", verifyOrdinaryUser, verifyAdmin, updateLeader);

leaderRouter.delete(
  "/:leaderId",
  verifyOrdinaryUser,
  verifyAdmin,
  deleteLeader
);

module.exports = leaderRouter;
