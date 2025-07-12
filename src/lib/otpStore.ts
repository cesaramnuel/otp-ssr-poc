const store = new Map<string, string>();

export function saveOTP(email: string, secret: string) {
    store.set(email, secret);
}

export function getOTPSecret(email: string): string | undefined {
    return store.get(email);
}

export function clearOTP(email: string) {
    store.delete(email);
}