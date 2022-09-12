import { NoteInsertType } from "../repositories/noteRepository";
import * as noteRepository from "../repositories/noteRepository"

export async function createNote(noteData:NoteInsertType) {
    const {userId, title, annotation} = noteData;

    const note = await noteRepository.findByTitle(userId, title);

    if(note) throw {type: "conflict", message: "Already exists note with this name"};
    await noteRepository.insert(noteData);
    return;
};

export async function getAllUserNotes(userId:number) {
    const notes = await noteRepository.findByUserId(userId);

    const formatNote = notes.map(({userId, title, annotation})=>{
        return {
            userId,
            title: title.trim(),
            annotation: annotation.trim()
        }
    })
    return formatNote;
};

export async function getUserNoteById(id: number, userId:number) {
    
};

export async function deleteUserNoteById(id: number, userId:number) {
    
};