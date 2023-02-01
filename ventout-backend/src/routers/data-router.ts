import { Router } from "express";

import { getFilteredData, getInitialData } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const dataRouter = Router();

dataRouter
  .all("/*", authenticateToken)
  .get("", getInitialData)
  .get("/filter", getFilteredData);

export { dataRouter }; 
