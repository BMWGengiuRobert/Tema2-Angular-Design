import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    EXPIRATION_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

    setItem(key: string, value: any): void {
        const item = {
            value: value,
            timestamp: new Date().getTime()
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    getItem(key: string): any | null {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }
        const item = JSON.parse(itemStr);
        const now = new Date().getTime();

        if (now - item.timestamp > this.EXPIRATION_TIME) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

}