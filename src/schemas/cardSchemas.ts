import joi from "joi";
import { CardInsertType } from './../repositories/cardRepository';

export const insertCardSchema = joi.object<CardInsertType>({
    title: joi.string().required(),
    number: joi.string().required(),
    name: joi.string().required(),
    securityCode: joi.string().length(3).required(),
    expirationDate: joi.date().required(),
    isVirtual: joi.boolean().required(),
    password: joi.string().min(4).pattern(/^[0-9]+$/).required(),
    type: joi.string().pattern(/^credit$|^debit$|^both$/).required()
});