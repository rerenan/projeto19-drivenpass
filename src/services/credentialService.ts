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

export async function getUserCredentials(userId:number) {
    
    const credentials = await credentialRepository.findByUserId(userId);
    const decryptedPasswordCredentials = credentials.map((credential)=> {
        return {
            ...credential, 
            password: cryptr.decrypt(credential.password)
        }
    });

    return decryptedPasswordCredentials;
}
