
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface RouteStateOptions {
  key: string;
  defaultValue?: any;
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
  debounce?: number;
}

export const useRouteState = <T = any>({
  key,
  defaultValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  debounce = 100
}: RouteStateOptions) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getValueFromURL = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const value = searchParams.get(key);
    
    if (value === null) {
      return defaultValue;
    }

    try {
      return deserialize(value);
    } catch {
      return defaultValue;
    }
  }, [location.search, key, defaultValue, deserialize]);

  const [value, setValue] = useState<T>(getValueFromURL);

  const updateURL = useCallback((newValue: T) => {
    const searchParams = new URLSearchParams(location.search);
    
    if (newValue === defaultValue || newValue === null || newValue === undefined) {
      searchParams.delete(key);
    } else {
      try {
        searchParams.set(key, serialize(newValue));
      } catch (error) {
        console.warn(`Failed to serialize route state for key: ${key}`, error);
        return;
      }
    }

    const newSearch = searchParams.toString();
    const newPath = `${location.pathname}${newSearch ? `?${newSearch}` : ''}${location.hash}`;
    
    navigate(newPath, { replace: true });
  }, [location, navigate, key, defaultValue, serialize]);

  // Debounced URL update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateURL(value);
    }, debounce);

    return () => clearTimeout(timeoutId);
  }, [value, updateURL, debounce]);

  // Sync state with URL changes
  useEffect(() => {
    const urlValue = getValueFromURL();
    if (JSON.stringify(urlValue) !== JSON.stringify(value)) {
      setValue(urlValue);
    }
  }, [location.search, getValueFromURL]);

  return [value, setValue] as const;
};
