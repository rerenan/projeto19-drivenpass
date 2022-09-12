import client from "../config/db";
import { cards as Card } from "@prisma/client";

export type CardInsertType = Omit<Card, "id" | "createdAt">