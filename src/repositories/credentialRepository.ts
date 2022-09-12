import client from "../config/db";
import { credentials as Credendial } from "@prisma/client";

export type CredentialInsertType = Omit<Credendial, "id" | "createdAt">;

export async function findCredentialByTitle(userId: number, title:string) {
    const result = await client.credentials.findUnique({
        where: {
           userId_title: {
                userId,
                title
           }
        }
    });
    return result;
}

export async function insert(credentialData: CredentialInsertType) {
    const {userId, title, url, username, password} = credentialData;

    await client.credentials.create({
        data: {
            userId,
            title,
            url,
            username,
            password
        }
    });
    return;
};