/**
 * Storage utility for web using localStorage, ensuring compatibility with the mobile application's API.
 */

export function setItem(key, value, callback) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
        if (callback) callback(true);
    } catch (e) {
        console.error("Storage error:", e);
        if (callback) callback(false);
    }
}

export function removeItem(key, callback) {
    try {
        window.localStorage.removeItem(key);
        if (callback) callback(true);
    } catch (e) {
        console.error("Storage error:", e);
        if (callback) callback(false);
    }
}

export function inquireItem(key, callback) {
    try {
        const item = window.localStorage.getItem(key);
        if (item !== null) {
            callback(true, JSON.parse(item));
        } else {
            callback(false, null);
        }
    } catch (e) {
        console.error("Storage error:", e);
        callback(false, null);
    }
}
