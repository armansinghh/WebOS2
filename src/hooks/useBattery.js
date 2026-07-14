'use client';
import { useState, useEffect } from 'react';

export function useBattery() {
  const [batteryState, setBatteryState] = useState({
    level: 0.82, // fallback
    charging: false,
    supported: true,
  });

  useEffect(() => {
    if (!('getBattery' in navigator)) {
      setBatteryState(prev => ({ ...prev, supported: false }));
      return;
    }

    let batteryManager = null;

    const updateBattery = () => {
      if (batteryManager) {
        setBatteryState({
          level: batteryManager.level,
          charging: batteryManager.charging,
          supported: true,
        });
      }
    };

    navigator.getBattery().then((battery) => {
      batteryManager = battery;
      updateBattery();
      
      battery.addEventListener('levelchange', updateBattery);
      battery.addEventListener('chargingchange', updateBattery);
    });

    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener('levelchange', updateBattery);
        batteryManager.removeEventListener('chargingchange', updateBattery);
      }
    };
  }, []);

  return batteryState;
}