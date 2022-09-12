import Cryptr from "cryptr";
import dotenv from "dotenv";

import { CredentialInsertType } from "../repositories/credentialRepository";
import * as credentialRepository from "../repositories/credentialRepository";

dotenv.config();

const secretKey = process.env.CRYPTR_KEY || "";
const cryptr = new Cryptr(secretKey);

export async function createCredential(credentialData: CredentialInsertType) {
    const {userId, title, password} = credentialData;
    
    const credential = await credentialRepository.findByTitle(userId, title);

    if(credential) throw {type: "conflict", message: "Already exists credentials with this name"};
    
    const encryptedPassword = cryptr.encrypt(password);

    await credentialRepository.insert({...credentialData, password: encryptedPassword});

    return;

};

export async function getAllUserCredentials(userId:number) {
    
    const credentials = await credentialRepository.findByUserId(userId);
    const decryptedPasswordCredentials = credentials.map((credential)=> {
        return {
            ...credential, 
            password: cryptr.decrypt(credential.password)
        }
    });

    return decryptedPasswordCredentials;
}

export async function getUserCredentialById(userId: number ,id:number) {
    const credential = await credentialRepository.findById(id);
    if(!credential || credential.userId !== userId) throw {type: "unauthorized", message: "Access denied"};
    const decryptedPassword = cryptr.decrypt(credential.password);

    return {...credential, password: decryptedPassword};
};

export async function deleteUserCredentialById(userId: number, id:number) {
    const credential = await credentialRepository.findById(id);
    if(!credential || credential.userId !== userId) throw {type: "unauthorized", message: "Access denied"};

    await credentialRepository.deleteById(id);
    return;
}

