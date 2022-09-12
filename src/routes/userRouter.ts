import { insertUserSchema } from './../schemas/userSchemas';
import { Router } from "express";
import { createUser, login } from "../controllers/userController";
import schemaValidator from "../middlewares/schemaValidator";

const userRouter = Router();

userRouter.post("/create", schemaValidator(insertUserSchema), createUser);
userRouter.post("/login", schemaValidator(insertUserSchema), login);

export default userRouter;