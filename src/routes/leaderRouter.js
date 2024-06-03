const { Router } = require("express");
const {
  getLeaders,
  getLeaderById,
  createLeader,
  createLeaderWithId,
  updateLeader,
  deleteLeader,
} = require("../services/leaderServices");

const leaderRouter = Router();

leaderRouter.get("/", getLeaders);

leaderRouter.get("/:leaderId", getLeaderById);

leaderRouter.post("/", createLeader);

leaderRouter.post("/:leaderId", createLeaderWithId);

leaderRouter.put("/:leaderId", updateLeader);

leaderRouter.delete("/:leaderId", deleteLeader);

module.exports = leaderRouter;
