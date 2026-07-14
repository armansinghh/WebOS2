'use client';
import { useState, useEffect } from 'react';

export function useContextMenu() {
  const [menuState, setMenuState] = useState({
    isVisible: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleClick = () => {
      if (menuState.isVisible) {
        setMenuState({ ...menuState, isVisible: false });
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuState.isVisible) {
        setMenuState({ ...menuState, isVisible: false });
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuState]);

  return { menuState, setMenuState };
}