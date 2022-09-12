import { insertWifiSchema } from './../schemas/wifiSchemas';
import { Router } from "express";
import { createWifi, deleteWifi, getUserWifiById, getUserWifis } from "../controllers/wifiController";
import schemaValidator from "../middlewares/schemaValidator";

const wifiRouter = Router();

wifiRouter.post("/create",schemaValidator(insertWifiSchema), createWifi);
wifiRouter.get("/", getUserWifis);
wifiRouter.get("/:id", getUserWifiById);
wifiRouter.delete("/:id", deleteWifi);

export default wifiRouter;