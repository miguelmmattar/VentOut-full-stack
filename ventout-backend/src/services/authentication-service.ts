import dayjs from "dayjs";

import { notFoundError, invalidCredentialsError } from "../errors";
import { LoginParams } from "../protocols";
import authenticationRepository from "../repositories/authentication-repository";
import { Session, User } from "@prisma/client";

async function signUp(params: SignUpParams): Promise<SignUpResult> {
  const { email, name } = params;

  await checkNewUserOrFail(email);

  const { id } = await createUser(email, name);

  return {
    id,
    email,
    name,
  };
}

async function signIn(params: LoginParams): Promise<SignInResult> {
  const { email, token } = params;

  const user = await getUserOrFail(email);

  await createSession(user.id, token);

  return {
    user,
    token,
  };
}

async function signOut(userId: number) {
  const closedSession = await authenticationRepository.closeSession(userId);

  if(!closedSession) {
    throw notFoundError();
  }
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await authenticationRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();

  return user;
}

async function checkNewUserOrFail(email: string) {
  const user = await authenticationRepository.findByEmail(email);
  if (user) throw invalidCredentialsError();
}

async function createUser(email: string, name: string) {
  const newUser = await authenticationRepository.createUser({
    name,
    email,
    updatedAt: dayjs().toDate(),
  });
  return newUser;
}

async function createSession(userId: number, token: string) {
  const newSession = await authenticationRepository.createSession({
    userId,
    token,
  });

  return newSession;
}

export type SignUpParams = Pick<User, "email" | "name">;

export type NewUserParams = Pick<User, "email" | "name" | "updatedAt">;

export type NewSessionParams = Pick<Session, "userId" | "token">;

type SignInResult = {
    user: Pick<User, "id" | "email" | "name">;
    token: string;
};

type SignUpResult = Pick<User, "id" | "email" | "name">;
  
type GetUserOrFailResult = Pick<User, "id" | "email" | "name">;
  
const authenticationService = {
  signUp,
  signIn,
  signOut,
};
  
export default authenticationService;
