import { WifiInsertData } from "../repositories/wifiRepository";
import * as wifiRepository from "../repositories/wifiRepository"

export async function createWifi(wifiData:WifiInsertData) {
    await wifiRepository.insert(wifiData);
    return;
};

export async function getAllUserWifis(userId: number) {
    const wifi = await wifiRepository.findByUserId(userId);

    return wifi;
};

export async function getUserWifiById(id: number, userId: number) {
    const wifi = await wifiRepository.findById(id);
    if(!wifi || wifi.userId !== userId) throw {type: "unauthorized", message: "Access denied"};

    return wifi;
};

export async function deleteUserWifiById(id:number, userId: number) {
    
};