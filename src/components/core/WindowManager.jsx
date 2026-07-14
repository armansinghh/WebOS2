'use client';

import { useState, useCallback, useEffect } from 'react';
import Window from './Window';
import WelcomeApp from '../apps/WelcomeApp';
import ClockApp from '../apps/ClockApp';
import NotepadApp from '../apps/NotepadApp';
import WeatherApp from '../apps/WeatherApp';
import SettingsApp from '../apps/SettingsApp';
import { GlobeIcon, ClockIcon, NotepadIcon, WeatherIcon, SettingsIcon } from '../icons/AeroIcons';

export const APP_CONFIG = {
  welcome: { title: 'Welcome', icon: <GlobeIcon size={15} />, width: 440, height: 380, content: <WelcomeApp /> },
  clock: { title: 'Clock', icon: <ClockIcon size={15} />, width: 280, height: 280, content: <ClockApp /> },
  notepad: { title: 'Notepad', icon: <NotepadIcon size={15} />, width: 420, height: 340, content: <NotepadApp /> },
  weather: { title: 'Weather', icon: <WeatherIcon size={15} />, width: 320, height: 400, content: <WeatherApp /> },
  // Settings content here acts as a fallback; we will override it in the render loop below to inject props
  settings: { title: 'Settings', icon: <SettingsIcon size={15} />, width: 600, height: 400, content: <SettingsApp /> },
};

export default function WindowManager({
  openWindows,
  onClose,
  onMinimize,
  onUpdatePosition,
  onActiveChange,
  wallpaperProps
}) {
  const [zOrder, setZOrder] = useState([]);

  const bringToFront = useCallback((id) => {
    setZOrder((prev) => [...prev.filter((wid) => wid !== id), id]);
  }, []);

  function getZIndex(id) {
    const idx = zOrder.indexOf(id);
    return idx === -1 ? 10 : 10 + idx;
  }

  useEffect(() => {
    const visible = zOrder.filter((id) => {
      const w = openWindows.find((ow) => ow.id === id);
      return w && !w.minimized;
    });
    const topId = visible[visible.length - 1];
    onActiveChange?.(topId ? APP_CONFIG[topId]?.title ?? null : null);
  }, [zOrder, openWindows, onActiveChange]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {openWindows.map((win) => {
        const config = APP_CONFIG[win.id];
        if (!config) return null;

        const content = win.id === 'settings'
          ? <SettingsApp wallpaperProps={wallpaperProps} />
          : config.content;

        return (
          <Window
            key={win.id}
            id={win.id}
            title={config.title}
            icon={config.icon}
            x={win.x}
            y={win.y}
            width={config.width}
            height={config.height}
            zIndex={getZIndex(win.id)}
            minimized={win.minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            onFocus={bringToFront}
            onMove={onUpdatePosition}
          >
            {content}
          </Window>
        );
      })}
    </div>
  );
}