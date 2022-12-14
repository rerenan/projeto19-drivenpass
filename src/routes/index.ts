import { Router } from "express";
import tokenValidator from "../middlewares/tokenValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { insertUserSchema } from './../schemas/userSchemas';
import credentialRouter from "./credentialRouter";
import userRouter from "./userRouter";
import noteRouter from "./noteRouter";
import cardRouter from "./cardRouter";
import wifiRouter from "./wifiRouter";

const router = Router();

router.use("/user", schemaValidator(insertUserSchema), userRouter);
router.use("/credential", tokenValidator, credentialRouter);
router.use("/note", tokenValidator, noteRouter);
router.use("/card", tokenValidator, cardRouter);
router.use("/wifi", tokenValidator, wifiRouter);

export default router;