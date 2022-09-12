import jwtDecode from "jwt-decode"
import { Request, Response, NextFunction } from "express";

export default async function tokenValidator(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if(!authorization) throw {type: "Unauthorized", message: "Token invalid"};
    const token = authorization?.replace("Bearer ", "").trim();
    
    const tokenPayload: {userId?: number} = jwtDecode(token)

    if (!tokenPayload) throw  {type: "unauthorized", message: "not authorized"};
    res.locals.userId = tokenPayload.userId;

    next();
}