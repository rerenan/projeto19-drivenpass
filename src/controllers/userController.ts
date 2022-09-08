import { Request, Response } from "express";
import * as userService from "../services/userService" 


export async function createUser(req: Request, res: Response){
    const {email, password} = req.body;
    
    await userService.createUser({email, password});
};