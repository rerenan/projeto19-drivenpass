import { WifiInsertData } from './../repositories/wifiRepository';
import joi from "joi";

export const insertWifiSchema = joi.object<WifiInsertData>({
    title: joi.string().required(),
    name: joi.string().required(),
    password: joi.string().required()
});