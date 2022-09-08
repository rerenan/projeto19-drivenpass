import { insertUserSchema } from './../schemas/userSchemas';
import { Router } from "express";
import { createUser } from "../controllers/userController";
import schemaValidator from "../middlewares/schemaValidator";

const userRouter = Router();

userRouter.post("/create", schemaValidator(insertUserSchema), createUser);

export default userRouter;