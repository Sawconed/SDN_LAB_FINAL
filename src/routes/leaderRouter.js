import { Router } from "express";
import {
  createLeader,
  createLeaderWithId,
  deleteLeader,
  getLeaderById,
  getLeaders,
  updateLeader,
} from "../services/leaderServices.js";

const leaderRouter = Router();

leaderRouter.get("/", getLeaders);

leaderRouter.get("/:leaderId", getLeaderById);

leaderRouter.post("/", createLeader);

leaderRouter.post("/:leaderId", createLeaderWithId);

leaderRouter.put("/:leaderId", updateLeader);

leaderRouter.delete("/:leaderId", deleteLeader);

export default leaderRouter;
