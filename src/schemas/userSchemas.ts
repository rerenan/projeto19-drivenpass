import joi from "joi";
import { UserInsertType } from "../repositories/userRepository";

export const insertUserSchema = joi.object<UserInsertType>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
});