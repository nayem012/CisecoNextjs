'use client';

import { useState, useEffect, useCallback } from 'react';

type SetStateAction<T> = T | ((prevState: T) => T);
type Dispatch<A> = (value: A) => void;

interface Options<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  initializeWithDefault?: boolean;
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: Options<T> = {}
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    initializeWithDefault = true,
  } = options;

  // Initialize state from localStorage or defaultValue once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return deserializer(item);
      }
    } catch (error) {
      console.error(`useLocalStorage: Error reading key "${key}":`, error);
    }
    return defaultValue;
  });

  // Hydration-safe flag
  const [isReady, setIsReady] = useState(false);

  // Read and sync storage on mount (only once per key)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(deserializer(item));
      } else if (initializeWithDefault) {
        window.localStorage.setItem(key, serializer(defaultValue));
      }
    } catch (error) {
      console.error(`useLocalStorage: Error reading key "${key}":`, error);
    } finally {
      setIsReady(true);
    }
  }, [key]);

  // Setter that also writes to localStorage
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      try {
        setStoredValue((prev) => {
          const nextValue =
            typeof value === 'function'
              ? (value as (prev: T) => T)(prev)
              : value;
          window.localStorage.setItem(key, serializer(nextValue));
          return nextValue;
        });
      } catch (error) {
        console.error(`useLocalStorage: Error setting key "${key}":`, error);
      }
    },
    [key, serializer]
  );

  // Listen for storage events (sync across tabs)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(deserializer(e.newValue));
        } catch (error) {
          console.error(
            `useLocalStorage: Failed to parse updated value for "${key}":`,
            error
          );
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, deserializer]);

  return [storedValue, setValue, isReady];
}
