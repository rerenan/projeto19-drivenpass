import { WifiInsertData } from "../repositories/wifiRepository";
import * as wifiRepository from "../repositories/wifiRepository"

export async function createWifi(wifiData:WifiInsertData) {
    await wifiRepository.insert(wifiData);
    return;
};

export async function getAllUserWifis(userId: number) {
    
};

export async function getUserWifiById(id: number, userId: number) {
    
};

export async function deleteUserWifiById(id:number, userId: number) {
    
};