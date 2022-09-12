import { WifiInsertData } from "../repositories/wifiRepository";
import * as wifiRepository from "../repositories/wifiRepository"
import { conflictError, unauthorizedError } from "../handlers/errorHandler";

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
    if(!wifi) throw conflictError("wifi");
    if(wifi.userId !== userId) throw unauthorizedError("wifi");

    return wifi;
};

export async function deleteUserWifiById(id:number, userId: number) {
    const wifi = await wifiRepository.findById(id);
    if(!wifi) throw conflictError("wifi");
    if(wifi.userId !== userId) throw unauthorizedError("wifi");

    await wifiRepository.deleteById(id);
    return;
};