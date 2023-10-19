// useLocalStorage.js
import { useState } from 'react';

function useLocalStorage(key: string, initialValue: any) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value: any) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Failed to set ${key} in localStorage: ${error}`);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
