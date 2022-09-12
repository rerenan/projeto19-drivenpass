import { Request, Response, NextFunction } from 'express';

export async function errorHandler(
    error: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
){
    if(error.type === "unauthorized") res.status(401).send(error.message);
    if(error.type === "notFound") res.status(404).send(error.message);
    if(error.type === "conflict") res.status(409).send(error.message);
    if(error.type === "unprocessableEntity") res.status(422).send(error.message)
    console.log(error);
    res.sendStatus(500);
};

export function notFoundError(entity: string){
   
    return {
		type: "notFound",
		message: `Could not find specified ${entity}!`
	};
};

export function conflictError(entity: string){
    return {
		type: "conflict",
		message: `Already exists ${entity} with this title!`
	};
};

export function unauthorizedError(entity: string){
    return {
		type: "unauthorized",
		message: `Acess denied for this ${entity}!`
	};
};
