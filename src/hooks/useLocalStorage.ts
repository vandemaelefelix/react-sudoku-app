import { useEffect, useState } from 'react';

const getStorageValue = (key: any, defaultValue: any) => {
    // getting stored value
    const saved = localStorage.getItem(key);
    const initial = saved ? JSON.parse(saved) : null;
    return initial || defaultValue;
};

export const useLocalStorage = (key: any, defaultValue: any) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        // storing input name
        console.log(`Adding item to storage: ${key} | ${value}`);
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
