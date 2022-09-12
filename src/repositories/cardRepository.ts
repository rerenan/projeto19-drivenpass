import client from "../config/db";
import { cards as Card } from "@prisma/client";

export type CardInsertType = Omit<Card, "id" | "createdAt">;

export async function findByTitle(userId: number, title:string) {
    const result = await client.cards.findUnique({
        where: {
           userId_title: {
                userId,
                title
           }
        }
    });
    return result;
};

export async function insert(cardData: CardInsertType) {
    const {
        userId, 
        title, 
        number, 
        name, 
        securityCode, 
        expirationDate, 
        password, 
        isVirtual, 
        type
    } = cardData;

    await client.cards.create({
        data: {
            userId, 
            title, 
            number, 
            name, 
            securityCode, 
            expirationDate, 
            password, 
            isVirtual, 
            type
        }
    });
    return;
};

export async function findByUserId(userId: number) {
    
    const result = await client.cards.findMany({
        where: {
            userId
        }
    });
    return result;
};

export async function findById(id: number) {
    const result = await client.cards.findUnique({
        where: {
            id
        },
    });
    return result;
};

export async function deleteById(id:number) {
    await client.cards.delete({
        where:{
            id
        }
    });
    return;
};