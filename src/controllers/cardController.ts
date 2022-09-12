import { Request, Response } from "express";
import * as cardService from "../services/cardService"

export async function createCard(req:Request, res: Response) {
    const {userId} = res.locals;
    await cardService.createCard({...req.body, userId});

    res.sendStatus(201);
};

export async function getUserCards(req:Request, res: Response) {
    const {userId} = res.locals;
    
    const cards = await cardService.getAllUserCards(userId);

    res.status(200).send(cards);
};

export async function getUserCardById(req:Request, res: Response) {
    
};

export async function deleteCard(req:Request, res: Response) {
    
};