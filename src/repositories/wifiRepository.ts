import client from "../config/db";
import { wifis as Wifi } from "@prisma/client";

export type WifiInsertData = Omit<Wifi, "id" | "createdAt">;

export async function insert(wifiData:WifiInsertData) {
    const {userId, title, name, password} = wifiData;

    await client.wifis.create({
        data:{
            userId,
            title,
            name,
            password
        }
    });

    return;
};

export async function findByUserId(userId:number) {
    const result = client.wifis.findMany({
        where:{
            userId
        }
    });
    return result;
}

export async function findById(id: number) {
    const result = client.wifis.findUnique({
        where:{
            id
        }
    });
    return result;
}

export async function deleteById(id: number) {
    await client.wifis.delete({
        where: {
            id
        }
    });
    return;
}
