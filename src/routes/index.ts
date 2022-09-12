import { Router } from "express";
import tokenValidator from "../middlewares/tokenValidator";
import credentialRouter from "./credentialRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/user", userRouter);
router.use("/credential", tokenValidator, credentialRouter);

export default router;