import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage<{ userId: string }>();

export function getUserId(): string {
    const store = asyncLocalStorage.getStore();
    if (!store) throw new Error("No request context available");
    return store.userId;
}

export function runWithUserId(userId: string, next: () => void) {
    asyncLocalStorage.run({ userId }, next);
}
