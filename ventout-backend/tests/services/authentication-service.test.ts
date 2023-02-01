import { faker } from "@faker-js/faker";

import { init } from "@/app";
import { prisma } from "@/config";
import { invalidCredentialsError } from "@/errors";
import authenticationService from "@/services/authentication-service";

import { createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe("signIn", () => {
  const generateParams = async () => ({
    email: faker.internet.email(),
    token: await generateValidToken(),
  });

  it("should throw InvalidCredentialError if there is no user for given email", async () => {
    const params = await generateParams();

    try {
      await authenticationService.signIn(params);
      fail("should throw InvalidCredentialError");
    } catch (error) {
      expect(error).toEqual(invalidCredentialsError());
    }
  });

  describe("when email and password are valid", () => {
    it("should return user data if given email and password are valid", async () => {
      const params = await generateParams();
      const user = await createUser(params);

      const { user: signInUser } = await authenticationService.signIn(params);
      expect(user).toEqual(
        expect.objectContaining({
          id: signInUser.id,
          email: signInUser.email,
        }),
      );
    });

    it("should create new session and return given token", async () => {
      const params = await generateParams();
      const user = await createUser(params);

      const { token: createdSessionToken } = await authenticationService.signIn(params);

      expect(createdSessionToken).toBeDefined();
      const session = await prisma.session.findFirst({
        where: {
          token: createdSessionToken,
          userId: user.id,
        },
      });
      expect(session).toBeDefined();
    });
  });
});
