import { NoteInsertType } from "../repositories/noteRepository";
import * as noteRepository from "../repositories/noteRepository"
import { notes as Note } from "@prisma/client";
import { conflictError, notFoundError, unauthorizedError } from "../handlers/errorHandler";

export async function createNote(noteData:NoteInsertType) {
    const {userId, title, annotation} = noteData;

    const note = await noteRepository.findByTitle(userId, title);

    if(note) throw conflictError("note");
    await noteRepository.insert(noteData);
    return;
};

export async function getAllUserNotes(userId:number) {
    const notes = await noteRepository.findByUserId(userId);

    return formatNotes(notes);
};

export async function getUserNoteById(id: number, userId:number) {
    const note = await noteRepository.findById(id);
    if(!note) throw notFoundError("note");
    if(note.userId !== userId) throw unauthorizedError("note");

    return { 
        ... note, 
        title: note.title.trim(), 
        annotation: note.annotation.trim()
    };
};

export async function deleteUserNoteById(id: number, userId:number) {
    const note = await noteRepository.findById(id);
    if(!note) throw notFoundError("note");
    if(note.userId !== userId) throw unauthorizedError("note");

    await noteRepository.deleteById(id);
    return;
};

function formatNotes(notes: Note[]) {
    return notes.map(({id, userId, title, annotation})=>{
        return {
            id,
            userId,
            title: title.trim(),
            annotation: annotation.trim()
        }
    })
}