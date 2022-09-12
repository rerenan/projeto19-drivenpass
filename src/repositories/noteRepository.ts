import client from "../config/db";
import { notes as Note } from "@prisma/client";

export type NoteInsertType = Omit<Note, "id" | "createdAt">;

