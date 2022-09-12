import Cryptr from "cryptr";
import dotenv from "dotenv";

import { cards as Card } from '@prisma/client';
import { CardInsertType } from './../repositories/cardRepository';
import * as cardRepository from "../repositories/cardRepository";
import { conflictError, notFoundError, unauthorizedError } from "../handlers/errorHandler";

dotenv.config();

const secretKey = process.env.CRYPTR_KEY || "";
const cryptr = new Cryptr(secretKey);

export async function createCard(cardData: CardInsertType) {
    const {userId, title, password, securityCode, expirationDate} = cardData;

    const card = await cardRepository.findByTitle(userId, title);
    if(card) throw conflictError("card");

    const encryptedPassword = cryptr.encrypt(password);
    const encryptedSecurityCode = cryptr.encrypt(securityCode);
    const dateTimeExpirationDate = new Date(expirationDate);

    await cardRepository.insert({
        ... cardData, 
        password: encryptedPassword, 
        securityCode: encryptedSecurityCode,
        expirationDate: dateTimeExpirationDate
    });
    return;
};

export async function getAllUserCards(userId: number) {

    const cards = await cardRepository.findByUserId(userId);

    return decryptedPasswordCards(cards);
};

export async function getUserCardById(id: number, userId: number) {
    const card = await cardRepository.findById(id);
    if(!card) throw notFoundError("card");
    if(card.userId !== userId) throw unauthorizedError("card");

    const decryptedPassword = cryptr.decrypt(card.password);
    const decryptSecurityCode = cryptr.decrypt(card.securityCode);

    return {
        ...card, 
        password: decryptedPassword,
        securityCode: decryptSecurityCode
    };
};

export async function deleteUserCardById(id: number, userId: number) {
    const card = await cardRepository.findById(id);
    if(!card) throw notFoundError("card");
    if(card.userId !== userId) throw unauthorizedError("card");

    await cardRepository.deleteById(id);
    return;
};

function decryptedPasswordCards(cards: Card[]){
    return cards.map((card)=> {
        return {
            ...card, 
            password: cryptr.decrypt(card.password),
            securityCode: cryptr.decrypt(card.securityCode)
        }
    });
};