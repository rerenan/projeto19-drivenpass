import { Router } from "express";
import { 
    createCredential, 
    getAllUserCredentials, 
    getUserCredential 
} 
from "../controllers/credentialsController";

const credentialRouter = Router();

credentialRouter.post("/create", createCredential);
credentialRouter.get("/", getAllUserCredentials);
credentialRouter.get("/:id", getUserCredential);

export default credentialRouter;