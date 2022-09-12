import { Request, Response } from "express";
import * as credentialService from "../services/credentialService"


export async function createCredential(req: Request, res: Response) {
    const {userId} = res.locals;
    await credentialService.createCredential({...req.body, userId});

    res.sendStatus(201);

};

export async function getUserCredentials(req: Request, res: Response) {
    const {userId} = res.locals;
    
    const credentials = await credentialService.getAllUserCredentials(userId);

    res.status(200).send(credentials);
};

export async function getUserCredentialById(req: Request, res: Response) {
    const {userId} = res.locals;
    const id = Number(req.params.id);

    const credential = await credentialService.getUserCredentialById(id, userId);

    res.status(200).send(credential);
};

export async function deleteCredential(req: Request, res: Response) {
    const {userId} = res.locals;
    const id = Number(req.params.id);

    await credentialService.deleteUserCredentialById(id, userId);

    res.sendStatus(200);
};