import { UserInsertType } from "../repositories/userRepository";
import * as userRepository from "../repositories/userRepository"
import bcrypt from "bcrypt";
import generateUserToken from "../utils/generateToken";



export async function createUser(userData:UserInsertType) {
    const {email, password} = userData;
    
    const user = await findUserByEmail(email);
    if(user) throw {type: "conflict", message: "This email already used."};
    const passwordHash = bcrypt.hashSync(password, 10);

    await userRepository.insert({email, password: passwordHash});
    
    return;
};


export async function login(userData:UserInsertType) {
    const {email, password} = userData;
    
    const user = await findUserByEmail(email);
    if(!user) throw {type: "unauthorized", message: "Email or password incorrect"};

    const validatePassword = bcrypt.compareSync(password, user.password);
    if(!validatePassword) throw {type: "unauthorized", message: "Email or password incorrect"};

    const token = generateUserToken();
    
    return token;
};

async function findUserByEmail(email:string) {
    const result = await userRepository.findUserByEmail(email);
    return result;   
};