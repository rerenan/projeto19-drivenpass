import { Request, Response } from "express";
import * as wifiService from "../services/wifiService"

export async function createWifi(req:Request, res: Response) {
    const {userId} = res.locals;
    await wifiService.createWifi({...req.body, userId});

    res.sendStatus(201);
};

export async function getUserWifis(req:Request, res: Response) {
    const {userId} = res.locals;
    const wifis = await wifiService.getAllUserWifis(userId);

    res.status(200).send(wifis);
};

export async function getUserWifiById(req:Request, res: Response) {
    const {userId} = res.locals;
    const id = Number(req.params.id);

    const wifi = await wifiService.getUserWifiById(id, userId);

    res.status(200).send(wifi);
};

export async function deleteWifi(req:Request, res: Response) {
    const {userId} = res.locals;
    const id = Number(req.params.id);

    await wifiService.deleteUserWifiById(id, userId);

    res.sendStatus(200);
};