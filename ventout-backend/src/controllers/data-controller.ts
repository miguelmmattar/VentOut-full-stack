import { Request, Response } from "express";
import httpStatus from "http-status";

import dataService from "@/services/data-service";
import { DateFilter } from "@/protocols";

export async function getInitialData(req: Request, res: Response) { 
  try {
    const result = await dataService.loadInitialData();

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getFilteredData(req: Request, res: Response) {
  const { date, param } = req.query as DateFilter;
  const { userId } = res.locals;
  
  if(!userId || !date || !param) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  
  const filter: DateFilter = {
    date: new Date(date),
    param,
  };
  
  try {
    const result = await dataService.loadFilteredData(userId, filter);
    
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    //console.log(error); 
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
