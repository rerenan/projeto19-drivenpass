import bcrypt from 'bcrypt';

import { CredentialInsertType } from "../repositories/credentialRepository";
import * as credentialRepository from "../repositories/credentialRepository"

export async function createCredential(credentialData: CredentialInsertType) {
    const {userId, title, url, username, password} = credentialData;
    
    const credential = await credentialRepository.findCredentialByTitle(userId, title);

    if(credential) throw {type: "conflict", message: "Already exists credentials with this name"};
    
    const passwordHash = bcrypt.hashSync(password, 10);

    await credentialRepository.insert({...credentialData, password: passwordHash});

    return;

};
