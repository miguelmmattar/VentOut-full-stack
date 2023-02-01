import { Request, Response } from "express";
import httpStatus from "http-status";

import moodService, { UpsertMoodParams } from "@/services/mood-service";
import { DateFilter } from "@/protocols";

export async function getTodaysMood(req: Request, res: Response) {
  const { userId } = res.locals;
  const { filterDate, filterParam } = req.query as { filterDate: string, filterParam: string };

  if(!userId || !filterDate || !filterParam) {
    return res.status(httpStatus.BAD_REQUEST).send({}); 
  }

  const filter: DateFilter = {
    date: new Date(filterDate),
    param: filterParam,
  };

  try {
    const result = await moodService.findTodaysMood({ userId, filter });
    
    return res.status(httpStatus.OK).send(result); 
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}

export async function getUserMoods(req: Request, res: Response) {
  const { userId } = res.locals;
  const offset = Number(req.query.offset);

  if(!userId || (!offset && offset !==0) || isNaN(offset)) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }

  try {
    const result = await moodService.findUserMoods(userId, offset);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }    
}

export async function createOrUpdateMood(req: Request, res: Response) {
  const { newMood, name } = req.body as UpsertMoodParams;
  const { userId } = res.locals;
    
  if(!newMood || !name || !userId) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }

  newMood.updatedAt = new Date(newMood.updatedAt);
  newMood.userId = userId;

  try {
    await moodService.upsertMood({ newMood, name });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}
