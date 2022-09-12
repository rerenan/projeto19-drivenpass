import client from "../config/db";
import { wifis as Wifi } from "@prisma/client";

export type WifiInsertData = Omit<Wifi, "id" | "createdAt">;