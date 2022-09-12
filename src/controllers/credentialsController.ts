import { Request, Response } from "express";
import * as credentialService from "../services/credentialService"


export async function createCredential(req: Request, res: Response) {
    const {userId} = res.locals;
    await credentialService.createCredential({...req.body, userId});

    res.sendStatus(201);

};

export async function getAllUserCredentials(req: Request, res: Response) {
    const {userId} = res.locals;
    
    const credentials = await credentialService.getUserCredentials(userId);

    res.status(200).send(credentials);
};

export async function getUserCredential(req: Request, res: Response) {
    
};

export async function deleteCredential(req: Request, res: Response) {
    
};