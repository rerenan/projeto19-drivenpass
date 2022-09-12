import { Router } from "express";
import { 
    createCredential, 
    deleteCredential, 
    getUserCredentials, 
    getUserCredentialById
} 
from "../controllers/credentialsController";
import schemaValidator from "../middlewares/schemaValidator";
import { insertCredentialSchema } from "../schemas/credentialSchemas";

const credentialRouter = Router();

credentialRouter.post("/create",schemaValidator(insertCredentialSchema), createCredential);
credentialRouter.get("/", getUserCredentials);
credentialRouter.get("/:id", getUserCredentialById);
credentialRouter.delete("/:id", deleteCredential);

export default credentialRouter;