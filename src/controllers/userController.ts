import { Request, Response } from "express";
import * as userService from "../services/userService" 


export async function createUser(req: Request, res: Response){
    const {email, password} = req.body;

    await userService.createUser({email, password});

    res.sendStatus(201);
};

export async function login(req: Request, res: Response){
    const {email, password} = req.body;

    const token = await userService.login({email, password});

    res.status(201).send(token);
};