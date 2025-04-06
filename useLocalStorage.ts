import { useState, useEffect } from 'react';

type StorageType = 'localStorage' | 'sessionStorage';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  storageType: StorageType = 'localStorage'
): [T, (value: T | ((val: T) => T)) => void] {
  // Get storage object based on type
  const storageObject = storageType === 'localStorage' 
    ? window.localStorage 
    : window.sessionStorage;

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from storage by key
      const item = storageObject.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading ${storageType} key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to storage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to storage
      storageObject.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting ${storageType} key "${key}":`, error);
    }
  };

  // Listen for changes to this localStorage key in other windows
  useEffect(() => {
    if (storageType !== 'localStorage') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, storageType]);

  return [storedValue, setValue];
}
