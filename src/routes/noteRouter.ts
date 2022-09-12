import { Router } from "express";
import { createNote, deleteNote, getUserNoteById, getUserNotes } from "../controllers/noteController";
import schemaValidator from "../middlewares/schemaValidator";
import { insertNoteSchema } from "../schemas/noteSchema";

const noteRouter = Router();

noteRouter.post("/create", schemaValidator(insertNoteSchema), createNote);
noteRouter.get("/", getUserNotes);
noteRouter.get("/:id", getUserNoteById);
noteRouter.delete("/:id", deleteNote);

export default noteRouter;