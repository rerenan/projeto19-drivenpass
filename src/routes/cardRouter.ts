import { insertCardSchema } from './../schemas/cardSchemas';
import { Router } from "express";
import { createCard, deleteCard, getUserCardById, getUserCards } from "../controllers/cardController";
import schemaValidator from "../middlewares/schemaValidator";


const cardRouter = Router();

cardRouter.post("/create", schemaValidator(insertCardSchema), createCard);
cardRouter.get("/", getUserCards);
cardRouter.get("/:id", getUserCardById);
cardRouter.delete("/:id", deleteCard);

export default cardRouter;