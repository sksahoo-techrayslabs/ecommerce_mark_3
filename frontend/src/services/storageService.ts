export function setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
}

export function removeItem(key: string): void {
    localStorage.removeItem(key);
}

export function clear(): void {
    localStorage.clear();
}