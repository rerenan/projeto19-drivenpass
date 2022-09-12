import joi from "joi";
import { NoteInsertType } from "../repositories/noteRepository";

export const insertNoteSchema = joi.object<NoteInsertType>({
    title: joi.string().max(50).required(),
    annotation: joi.string().max(1000).required()
});