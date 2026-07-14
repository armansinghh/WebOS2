'use client';

import { useState, useEffect, useRef } from 'react';
import { Wifi, BatteryMedium, BatteryCharging, Volume2, ChevronUp } from 'lucide-react';
import { useBattery } from '../../hooks/useBattery';

import CalendarFlyout from '../flyouts/CalendarFlyout';
import VolumeFlyout from '../flyouts/VolumeFlyout';
import SystemTrayFlyout from '../flyouts/SystemTrayFlyout';
import BatteryFlyout from '../flyouts/BatteryFlyout';
import WifiFlyout from '../flyouts/WifiFlyout';

export default function TopMenuBar({ activeTitle }) {
  const [now, setNow] = useState(() => new Date());
  const [activeMenu, setActiveMenu] = useState(null);
  const [volume, setVolume] = useState(65);
  const { level, charging } = useBattery();

  const menuBarRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuBarRef.current && !menuBarRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const dateFormatted = `${dd}/${mm}/${yyyy}`;

  const navItemClass = "flex items-center justify-center px-2 h-full cursor-default hover:bg-white/20 active:bg-black/10 transition-colors";
  const textStyle = { fontFamily: '"Tahoma", "Segoe UI", sans-serif', color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.5)', WebkitFontSmoothing: 'none' };

  const macMenus = ['File', 'Edit', 'View', 'Help'];

  return (
    <div
      ref={menuBarRef}
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-2 select-none"
      style={{
        height: '36px',
        background: 'rgba(125, 162, 193, 0.45)',
        backdropFilter: 'blur(10px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(10px) saturate(1.2)',
        boxShadow: 'inset 0 1px 0px rgba(255, 255, 255, 0.7), 0 2px 4px rgba(0,0,0,0.3)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)' }}
      />
      {/* left */}
      <div className="flex items-center z-10 h-full">
        <div className="flex items-center h-full px-3">
          <span style={{ ...textStyle, fontWeight: 700, fontSize: '13px', letterSpacing: '0.02em' }}>
            AeroOS
          </span>
        </div>
        <div className="flex items-center ml-2 h-full">
          {macMenus.map((menu) => (
            <div key={menu} className={navItemClass}>
              <span style={{ ...textStyle, fontSize: '12px' }}>{menu}</span>
            </div>
          ))}
        </div>

        {activeTitle && (
          <div className="flex items-center gap-3 h-full">
            <div style={{ width: '1px', height: '16px', background: 'rgba(0,0,0,0.3)', boxShadow: '1px 0 0 rgba(255,255,255,0.3)' }} />
            <span style={{ ...textStyle, fontWeight: 700, fontSize: '12px' }}>
              {activeTitle}
            </span>
          </div>
        )}
      </div>

      {/* right */}
      <div className="flex items-center h-full z-10 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>

        <div className={navItemClass} onClick={() => toggleMenu('tray')}>
          <ChevronUp size={14} strokeWidth={2.5} />
        </div>

        <div className={navItemClass} onClick={() => toggleMenu('battery')} title={`${Math.round(level * 100)}%`}>
          {charging ? (
            <BatteryCharging size={15} strokeWidth={2} className="text-[#4ade80]" />
          ) : (
            <BatteryMedium size={14} strokeWidth={2} />
          )}
        </div>

        <div className={navItemClass} onClick={() => toggleMenu('volume')}>
          <Volume2 size={14} strokeWidth={2} />
        </div>

        <div className={navItemClass} onClick={() => toggleMenu('wifi')}>
          <Wifi size={14} strokeWidth={2} />
        </div>

        <div className="mx-1" style={{ width: '1px', height: '16px', background: 'rgba(0,0,0,0.3)', boxShadow: '1px 0 0 rgba(255,255,255,0.3)' }} />

        <div
          className="flex flex-col items-center justify-center px-3 h-full cursor-default hover:bg-white/20 active:bg-black/10 transition-colors"
          onClick={() => toggleMenu('calendar')}
        >
          <span style={{ ...textStyle, fontSize: '11px', lineHeight: '12px', fontVariantNumeric: 'tabular-nums' }}>
            {time}
          </span>
          <span style={{ ...textStyle, fontSize: '10px', lineHeight: '12px', color: 'rgba(255,255,255,0.85)', fontVariantNumeric: 'tabular-nums' }}>
            {dateFormatted}
          </span>
        </div>
      </div>

      {/* flyouts */}
      <CalendarFlyout isOpen={activeMenu === 'calendar'} onClose={() => setActiveMenu(null)} />
      <VolumeFlyout isOpen={activeMenu === 'volume'} volume={volume} setVolume={setVolume} />
      <SystemTrayFlyout isOpen={activeMenu === 'tray'} />
      <BatteryFlyout isOpen={activeMenu === 'battery'} level={level} charging={charging} />
      <WifiFlyout isOpen={activeMenu === 'wifi'} />
    </div>
  );
}