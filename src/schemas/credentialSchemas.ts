import joi from "joi";
import { CredentialInsertType } from "../repositories/credentialRepository";

export const insertCredentialSchema = joi.object<CredentialInsertType>({
    title: joi.string().required(),
    url: joi.string().uri().required(),
    username: joi.string().required(),
    password: joi.string().required()
});