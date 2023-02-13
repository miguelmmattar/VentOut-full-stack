import { LoginParams } from "../protocols";
import authenticationService, { SignUpParams } from "../services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function singInPost(req: Request, res: Response) {
  const { email, token } = req.body as LoginParams;

  if(!email || !token) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }

  try {
    const result = await authenticationService.signIn({ email, token });

    return res.status(httpStatus.OK).send(result);
  } catch (error) { 
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function singUpPost(req: Request, res: Response) {
  const { name, email } = req.body as SignUpParams;

  if(!email || !name) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }

  try {
    const result = await authenticationService.signUp({ name, email });

    return res.status(httpStatus.OK).send(result);
  } catch (error) { 
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}

export async function signOut(req: Request, res: Response) {
  const userId = Number(req.params.userId);

  if(!userId || isNaN(userId)) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    await authenticationService.signOut(userId);

    return res.sendStatus(httpStatus.OK);
  } catch(error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
