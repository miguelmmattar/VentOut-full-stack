import { Session } from "@prisma/client";
import { createUser } from "./users-factory";
import { prisma } from "@/config";

export async function createSession(token: string, userId?: number): Promise<Session> {
  const user = await createUser();

  return prisma.session.create({
    data: {
      token,
      userId: userId || user.id,
    },
  });
}
