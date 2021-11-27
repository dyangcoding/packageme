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
        removeSessionID();
    }
}