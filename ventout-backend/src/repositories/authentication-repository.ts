import { prisma } from "@/config";
import dayjs from "dayjs";

import { Prisma, Session } from "@prisma/client";
import { NewSessionParams, NewUserParams } from "@/services/authentication-service";

async function findByEmail(email: string) {
  const user: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  return prisma.user.findUnique(user);
}

async function createUser(data: NewUserParams) {
  return prisma.user.create({
    data,
  });
}

async function createSession(data: NewSessionParams) {
  return prisma.session.create({
    data,
  });
}

async function closeSession(userId: number) {
  let closedSession: Session | null;

  await prisma.$transaction(async (tx) => {
    const session = await prisma.session.findFirst({
      where: {
        userId,
      }
    });

    if(!session) {
      return closedSession;
    }
  
    closedSession = await prisma.session.delete({
      where: {
        id: session.id,
      }
    });
  });

  return closedSession;
}

const authenticationRepository = {
  findByEmail,
  createUser,
  createSession,
  closeSession,
};

export default authenticationRepository;
