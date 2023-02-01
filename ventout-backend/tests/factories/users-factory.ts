import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { prisma } from "@/config";

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const name = params.name || faker.name.fullName();

  return prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      name,
    },
  });
}
