import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";

import { createUser, createSession } from "./factories";
import { prisma } from "@/config";

export async function cleanDb() {
  await prisma.user.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.myMoods.deleteMany({});
  await prisma.myReports.deleteMany({});  
  await prisma.myEmotions.deleteMany({}); 
  await prisma.mySymptoms.deleteMany({}); 
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);
  
  await createSession(token);

  return token;
}
