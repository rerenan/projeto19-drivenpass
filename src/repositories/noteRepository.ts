import client from "../config/db";
import { notes as Note } from "@prisma/client";

export type NoteInsertType = Omit<Note, "id" | "createdAt">;

export async function findByTitle(userId: number, title:string) {
    const result = await client.notes.findUnique({
        where: {
            userId_title: {
                userId,
                title
            }
        }
    });

    return result;
};


export async function insert(noteData:NoteInsertType) {
    const {userId, title, annotation} = noteData;

    await client.notes.create({
        data:{
            userId,
            title,
            annotation
        }
    });

    return;
};

export async function findByUserId(userId:number) {
    const result = client.notes.findMany({
        where:{
            userId
        }
    });
    return result;
}

export async function findById(id: number) {
    const result = client.notes.findUnique({
        where:{
            id
        }
    });
    return result;
}

export async function deleteById(id: number) {
    await client.notes.delete({
        where: {
            id
        }
    });
    return;
}
