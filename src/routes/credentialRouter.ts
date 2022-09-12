import { Router } from "express";
import { 
    createCredential, 
    getAllUserCredentials, 
    getUserCredential 
} 
from "../controllers/credentialsController";
import schemaValidator from "../middlewares/schemaValidator";
import { insertCredentialSchema } from "../schemas/credentialSchemas";

const credentialRouter = Router();

credentialRouter.post("/create",schemaValidator(insertCredentialSchema), createCredential);
credentialRouter.get("/", getAllUserCredentials);
credentialRouter.get("/:id", getUserCredential);

export default credentialRouter;