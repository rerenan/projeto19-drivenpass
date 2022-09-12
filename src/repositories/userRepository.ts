import client from "../config/db";

export interface User {
    "id": number;
    "email": string;
    "password": string;
    "createdAt": Date;
};

export type UserInsertType = Omit<User, "id" | "createdAt">;

export async function insert(userData: UserInsertType) {
    const {email, password } = userData;

    await client.users.create({
        data: {
            email,
            password
        }
    });
    return;
};

export async function findUserByEmail(email:string) {
    const result = await client.users.findUnique({
        where: {
            email
        }
    });
    return result;
}