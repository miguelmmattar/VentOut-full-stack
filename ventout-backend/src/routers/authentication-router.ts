import { signOut, singInPost, singUpPost } from "../controllers";
import { validateBody } from "../middlewares";
import { signInSchema, signUpSchema } from "../schemas";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter
  .post("/sign-up", validateBody(signUpSchema), singUpPost)
  .post("/sign-in", validateBody(signInSchema), singInPost)
  .delete("/sign-out/:userId", signOut);

export { authenticationRouter };
