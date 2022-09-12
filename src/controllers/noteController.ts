import { Request, Response } from "express";
import * as noteService from "../services/noteService"

export async function createNote(req: Request, res: Response) {
    const {title, annotation} = req.body;
    const {userId} = res.locals;
    await noteService.createNote({...req.body, userId});

    res.sendStatus(201);
};

export async function getUserNotes(req: Request, res: Response) {
    const {userId} = res.locals;
};

export async function getUserNoteById(req: Request, res: Response) {
    const {userId} = res.locals;
    const {id} = req.params;
};

export async function deleteNote(req: Request, res: Response) {
    const {userId} = res.locals;
    const {id} = req.params;
};