import joi from "joi";
import { CardInsertType } from './../repositories/cardRepository';

export const insertCredentialSchema = joi.object<CardInsertType>({
    title: joi.string().required(),
    number: joi.string().creditCard(),
    name: joi.string().required(),
    securityCode: joi.number().required(),
    expirationDate: joi.date().required(),
    isVirtual: joi.boolean().required(),
    password: joi.string().required(),
    type: joi.string().allow("credit", "debit", "both").required()
});