import { deleteSession } from "../app/mongo-client";

export function getSessionItem(key: string): string | undefined {
    const item = localStorage.getItem(key);
    if (!item) {
        return undefined;
    }
    return item;
}

export function setSessionID(value: string): void {
    localStorage.setItem('SID', value);
}

export function removeSessionID(): void {
    localStorage.removeItem('SID');
}

export async function Logout() {
    const sessionID = getSessionItem('SID');
    if (sessionID) {
        const date = new Date().toUTCString();
        await deleteSession(sessionID)
            .then(result => console.log(`Deleted ${result.deletedCount} session. Date: ${date}`))
            .catch(error => console.log(`Delete Session ${sessionID} failed: ${error}. Date: ${date}`));
        removeSessionID();
    }
}