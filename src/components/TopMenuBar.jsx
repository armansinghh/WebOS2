'use client';

import { useState, useEffect } from 'react';
import { WifiIcon, BatteryIcon } from './icons/AeroIcons';

function AeroLogoMark({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <radialGradient id="logo-orb" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#a8e4ff" />
          <stop offset="45%" stopColor="#00A8E8" />
          <stop offset="100%" stopColor="#0058a3" />
        </radialGradient>
        <linearGradient id="logo-gloss" x1="16" y1="2" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#logo-orb)" stroke="rgba(0,40,80,0.4)" strokeWidth="1" />
      <ellipse cx="16" cy="10" rx="10.5" ry="6" fill="url(#logo-gloss)" />
    </svg>
  );
}

export default function TopMenuBar({ activeTitle }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 select-none"
      style={{
        height: '34px',
        background: `linear-gradient(
          180deg,
          rgba(140, 210, 255, 0.30) 0%,
          rgba(0, 168, 232, 0.18) 45%,
          rgba(0, 119, 182, 0.14) 100%
        ), rgba(255, 255, 255, 0.12)`,
        backdropFilter: 'blur(18px) saturate(1.7)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.7)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.40)',
        boxShadow: `
          inset 0 1px 0 rgba(255, 255, 255, 0.85),
          0 2px 10px rgba(0, 20, 50, 0.18)
        `,
      }}
    >
      {/* Left: logo mark + wordmark + active window title */}
      <div className="flex items-center gap-2.5">
        <AeroLogoMark size={16} />
        <span
          style={{
            fontFamily: '"Segoe UI", Tahoma, sans-serif',
            fontWeight: 700,
            fontSize: '12.5px',
            color: '#ffffff',
            textShadow: '0 1px 2px rgba(0,0,0,0.55)',
            letterSpacing: '0.02em',
          }}
        >
          AeroOS
        </span>

        {activeTitle && (
          <div className="flex items-center gap-2.5 ml-1">
            <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.35)' }} />
            <span
              style={{
                fontFamily: '"Segoe UI", Tahoma, sans-serif',
                fontWeight: 600,
                fontSize: '12px',
                color: 'rgba(255,255,255,0.92)',
                textShadow: '0 1px 2px rgba(0,0,0,0.45)',
              }}
            >
              {activeTitle}
            </span>
          </div>
        )}
      </div>

      {/* Right: status icons + divider + date/time */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 opacity-90">
          <WifiIcon size={14} />
          <BatteryIcon size={15} level={0.82} />
        </div>

        <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.35)' }} />

        <span
          style={{
            fontFamily: '"Segoe UI", Tahoma, sans-serif',
            fontSize: '11.5px',
            fontWeight: 600,
            color: '#ffffff',
            textShadow: '0 1px 2px rgba(0,0,0,0.55)',
            fontVariantNumeric: 'tabular-nums',
            whiteSpace: 'nowrap',
          }}
        >
          {date} · {time}
        </span>
      </div>
    </div>
  );
}