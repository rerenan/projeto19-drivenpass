import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

const secret = process.env.JWT_SECRET || "";

export default async function tokenValidator(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if(!authorization) throw {type: "Unauthorized", message: "Token invalid"};
    const token = authorization?.replace("Bearer ", "");
    
    jwt.verify(token, secret);

    next();
}