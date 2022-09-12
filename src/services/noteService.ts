import { NoteInsertType } from "../repositories/noteRepository";
import * as noteRepository from "../repositories/noteRepository"
import { notes as Note } from "@prisma/client";

export async function createNote(noteData:NoteInsertType) {
    const {userId, title, annotation} = noteData;

    const note = await noteRepository.findByTitle(userId, title);

    if(note) throw {type: "conflict", message: "Already exists note with this name"};
    await noteRepository.insert(noteData);
    return;
};

export async function getAllUserNotes(userId:number) {
    const notes = await noteRepository.findByUserId(userId);

    return formatNotes(notes);
};

export async function getUserNoteById(id: number, userId:number) {
    const note = await noteRepository.findById(id);

    if(!note || note.userId !== userId) throw {type: "unauthorized", message: "Access denied"};

    return { 
        ... note, 
        title: note.title.trim(), 
        annotation: note.annotation.trim()
    };
};

export async function deleteUserNoteById(id: number, userId:number) {
    
};

function formatNotes(notes: Note[]) {
    return notes.map(({userId, title, annotation})=>{
        return {
            userId,
            title: title.trim(),
            annotation: annotation.trim()
        }
    })
}