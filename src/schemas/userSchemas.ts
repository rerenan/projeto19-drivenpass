import joi from "joi";

export const insertUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
});