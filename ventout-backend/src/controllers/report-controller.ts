import reportService, { ReportParams } from "../services/report-service";
import { Request, Response } from "express"; 
import httpStatus from "http-status"; 

export async function postReport(req: Request, res: Response) {
  const { date, emotions, symptoms, text } = req.body as ReportParams;
  const { userId } = res.locals;
    
  if(!date || !text || !userId ! || !symptoms || !emotions || !symptoms[0] || !emotions[0]) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  } 

  try {
    await reportService.createNewReport({ date, emotions, symptoms, text }, userId);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function getUserReports(req: Request, res: Response) {
  const offset = Number(req.query.offset);
  const { userId } = res.locals;

  if(!userId || (!offset && offset !==0) || isNaN(offset)) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }

  try {
    const result = await reportService.loadUserReports(userId, offset);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getReportById(req: Request, res: Response) {
  const reportId = Number(req.params.reportId);
  const { userId } = res.locals;

  if(!userId || !reportId || isNaN(reportId)) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }

  try {
    const result = await reportService.loadById(reportId, userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
