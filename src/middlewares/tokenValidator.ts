import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET || "";

export default async function tokenValidator(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if(!authorization) throw {type: "Unauthorized", message: "Token invalid"};
    const token = authorization?.replace("Bearer ", "").trim();
    
    const tokenPayload = jwt.verify(token, secret);

    if (!tokenPayload) throw  {type: "unauthorized", message: "not authorized"};


    next();
}