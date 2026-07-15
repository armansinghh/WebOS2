'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'aero_network_state';

const defaultState = {
  wifiEnabled: true,
  airplaneMode: false,
};

let currentState = defaultState;
const listeners = new Set();

function readStoredState() {
  if (typeof window === 'undefined') {
    return defaultState;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultState;
    }

    return { ...defaultState, ...JSON.parse(stored) };
  } catch {
    return defaultState;
  }
}

function emitState(nextState) {
  currentState = nextState;
  listeners.forEach((listener) => listener(nextState));
}

function persistState(nextState) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }
}

export function useNetworkState() {
  const [networkState, setNetworkState] = useState(() => {
    currentState = readStoredState();
    return currentState;
  });

  useEffect(() => {
    const listener = (nextState) => setNetworkState(nextState);
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          const nextState = { ...defaultState, ...JSON.parse(event.newValue) };
          emitState(nextState);
        } catch {
          // ignore malformed state
        }
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const updateNetworkState = useCallback((patch) => {
    const nextState = { ...currentState, ...patch };
    persistState(nextState);
    emitState(nextState);
  }, []);

  return [networkState, updateNetworkState];
}
