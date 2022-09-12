import { Router } from "express";
import tokenValidator from "../middlewares/tokenValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { insertUserSchema } from './../schemas/userSchemas';
import credentialRouter from "./credentialRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/user", schemaValidator(insertUserSchema), userRouter);
router.use("/credential", tokenValidator, credentialRouter);

export default router;