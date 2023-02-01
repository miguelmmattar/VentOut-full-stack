import { Router } from "express";

import { getReportById, getUserReports, postReport } from "@/controllers";
import { validateBody } from "@/middlewares";
import { postReportSchema } from "@/schemas";
import { authenticateToken } from "@/middlewares";
 
const reportRouter = Router();

reportRouter
  .all("/*", authenticateToken)
  .post("", validateBody(postReportSchema), postReport)
  .get("", getUserReports)
  .get("/:reportId", getReportById);
 
export { reportRouter };
