import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import jwtDecode from "jwt-decode";

dotenv.config();

export default async function tokenValidator(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if(!authorization) throw {type: "Unauthorized", message: "Token invalid"};
    const token = authorization?.replace("Bearer ", "").trim();
    try{
        const JWT_SECRET = process.env.JWT_SECRET
        const validation = jwt.verify(token, JWT_SECRET ||"secret");
        const tokenPayload: {userId?: number} = jwtDecode(token)
        if (!tokenPayload) throw  {type: "unauthorized", message: "not authorized"};
        res.locals.userId = tokenPayload.userId;
        next();
    }catch(err){
        throw {type: "unauthorized", message: "not authorized"};
    }; 
};