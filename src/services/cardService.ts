import Cryptr from "cryptr";
import dotenv from "dotenv";

import { CardInsertType } from './../repositories/cardRepository';
import * as cardRepository from "../repositories/cardRepository";

dotenv.config();

const secretKey = process.env.CRYPTR_KEY || "";
const cryptr = new Cryptr(secretKey);

export async function createCard(cardData: CardInsertType) {
    const {userId, title, password, securityCode, expirationDate} = cardData;

    const card = await cardRepository.findByTitle(userId, title);
    if(card) throw {type: "conflict", message: "Already exists card with this name"};

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
    
};

export async function getUserCardById(id: number, userId: number) {
    
};

export async function deleteCardById(id: number, userId: number) {
    
};