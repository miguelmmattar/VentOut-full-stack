import { Router } from "express";

import { createOrUpdateMood, getTodaysMood, getUserMoods } from "../controllers";
import { validateBody, authenticateToken } from "../middlewares";
import { postMoodSchema } from "../schemas";

const moodRouter = Router();

moodRouter
  .all("/*", authenticateToken)
  .get("/today", getTodaysMood)
  .post("", validateBody(postMoodSchema), createOrUpdateMood)
  .get("/history", getUserMoods);

export { moodRouter }; 
