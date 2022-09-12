import { Request, Response } from "express";
import * as noteService from "../services/noteService"

export async function createNote(req: Request, res: Response) {
    const {userId} = res.locals;
    await noteService.createNote({...req.body, userId});

    res.sendStatus(201);
};

export async function getUserNotes(req: Request, res: Response) {
    const {userId} = res.locals;
    const notes = await noteService.getAllUserNotes(userId);
    res.status(200).send(notes);
};

export async function getUserNoteById(req: Request, res: Response) {
    const {userId} = res.locals;
    const id = Number(req.params.id);

    const note = await noteService.getUserNoteById(id, userId);

    res.status(200).send(note);

};

export async function deleteNote(req: Request, res: Response) {
    const {userId} = res.locals;
    const {id} = req.params;
};