import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Servidor is running on port ${PORT}`));