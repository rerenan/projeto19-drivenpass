import { credentials as Credential } from '@prisma/client';
import Cryptr from "cryptr";
import dotenv from "dotenv";

import { CredentialInsertType } from "../repositories/credentialRepository";
import * as credentialRepository from "../repositories/credentialRepository";
import { conflictError, notFoundError, unauthorizedError } from '../handlers/errorHandler';

dotenv.config();

const secretKey = process.env.CRYPTR_KEY || "";
const cryptr = new Cryptr(secretKey);

export async function createCredential(credentialData: CredentialInsertType) {
    const {userId, title, password} = credentialData;
    
    const credential = await credentialRepository.findByTitle(userId, title);

    if(credential) throw conflictError("credential");
    
    const encryptedPassword = cryptr.encrypt(password);

    await credentialRepository.insert({...credentialData, password: encryptedPassword});

    return;

};

export async function getAllUserCredentials(userId:number) {
    
    const credentials = await credentialRepository.findByUserId(userId);

    return decryptedPasswordCredentials(credentials);
}

export async function getUserCredentialById(id:number, userId: number) {

    const credential = await credentialRepository.findById(id);
    if(!credential) throw notFoundError("credential");
    if(credential.userId !== userId) throw unauthorizedError("credential");

    const decryptedPassword = cryptr.decrypt(credential.password);

    return {...credential, password: decryptedPassword};
};

export async function deleteUserCredentialById( id:number, userId: number) {
    const credential = await credentialRepository.findById(id);
    if(!credential) throw notFoundError("credential");
    if(credential.userId !== userId) throw unauthorizedError("credential");

    await credentialRepository.deleteById(id);
    return;
}

function decryptedPasswordCredentials(credentials: Credential[]){
    return credentials.map((credential)=> {
        return {
            ...credential, 
            password: cryptr.decrypt(credential.password)
        }
    });
};
