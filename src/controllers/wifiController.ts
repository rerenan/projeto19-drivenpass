import { Request, Response } from "express";

export async function createWifi(req:Request, res: Response) {
    const {userId} = res.locals;
};

export async function getUserWifis(req:Request, res: Response) {
    const {userId} = res.locals;
};

export async function getUserWifiById(req:Request, res: Response) {
    const {userId} = res.locals;
    const id = Number(req.params.id);
};

export async function deleteWifi(req:Request, res: Response) {
    const {userId} = res.locals;
    const id = Number(req.params.id);
};