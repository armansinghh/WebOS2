'use client';
import React from 'react';

export default function Dock({ apps, openWindows, onOpen }) {
  function isOpen(appId) {
    return openWindows.some((w) => w.id === appId && !w.minimized);
  }
  function isMinimized(appId) {
    return openWindows.some((w) => w.id === appId && w.minimized);
  }

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-end gap-2 px-5 py-3 rounded-3xl"
        style={{
          background:     'rgba(255, 255, 255, 0.20)',
          backdropFilter: 'blur(24px) saturate(1.9) brightness(1.06)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.9) brightness(1.06)',
          border:         '1px solid rgba(255, 255, 255, 0.42)',
          boxShadow: `
            inset 0 1px 1px rgba(255, 255, 255, 0.82),
            inset 0 -1px 1px rgba(255, 255, 255, 0.12),
            0 8px 32px 0 rgba(31, 38, 135, 0.18),
            0 2px 8px 0 rgba(0, 0, 0, 0.20)
          `,
        }}
      >
        {apps.map((app) => (
          <DockIcon
            key={app.id}
            app={app}
            open={isOpen(app.id)}
            minimized={isMinimized(app.id)}
            onClick={() => onOpen(app.id)}
          />
        ))}

        {/* Vertical divider */}
        <div style={{
          width:        '1px',
          height:       '42px',
          alignSelf:    'center',
          marginLeft:   '4px',
          marginRight:  '4px',
          background:   'linear-gradient(to bottom, transparent, rgba(255,255,255,0.45), transparent)',
        }} />

        <SystemClock />
      </div>
    </div>
  );
}


function DockIcon({ app, open, minimized, onClick }) {
  return (
    <div
      className="flex flex-col items-center gap-0.75 cursor-pointer"
      style={{ minWidth: '60px' }}
      onClick={onClick}
    >      
    <div
        className="dock-icon relative w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          fontSize:   '2rem',
          background: app.tileBg || 'linear-gradient(135deg, #a8e4ff 0%, #00A8E8 55%, #0055aa 100%)',
          border:     '1px solid rgba(255, 255, 255, 0.65)',
          boxShadow: `
            inset 0 2px 3px rgba(255, 255, 255, 0.75),
            inset 0 -1px 2px rgba(0, 0, 0, 0.12),
            0 6px 16px rgba(0, 40, 100, 0.35),
            0 2px 4px rgba(0, 0, 0, 0.20)
          `,
        }}
        title={app.label}
      >
        {/* The emoji / icon itself */}
        <span style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.35))' }}>
          {app.icon}
        </span>
        <div
          className="absolute top-0 left-0 right-0 rounded-t-2xl pointer-events-none"
          style={{
            height:     '48%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.0) 100%)',
          }}
        />
      </div>

      <span
        style={{
          color:      '#ffffff',
          fontSize:   '10px',
          fontWeight: 600,
          letterSpacing: '0.03em',
          lineHeight: 1.2,
          textShadow: '0 1px 3px rgba(0,0,0,0.65), 0 0 6px rgba(0,0,0,0.30)',
        }}
      >
        {app.label}
      </span>

      <div style={{ height: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {(open || minimized) && (
          <div
            className={open ? 'glow-orb' : 'glow-orb-lime'}
            style={{ transition: 'all 0.25s ease' }}
          />
        )}
      </div>
    </div>
  );
}

function SystemClock() {
  const [time, setTime] = React.useState(() => formatTime(new Date()));

  React.useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ minWidth: '54px', padding: '0 4px' }}
    >
      <span style={{
        color:       '#ffffff',
        fontSize:    '15px',
        fontWeight:  700,
        fontVariantNumeric: 'tabular-nums',
        lineHeight:  1.1,
        textShadow:  '0 1px 3px rgba(0,0,0,0.55), 0 0 8px rgba(0,168,232,0.35)',
        letterSpacing: '0.02em',
      }}>
        {time.hhmm}
      </span>
      <span style={{
        color:       'rgba(255,255,255,0.75)',
        fontSize:    '9px',
        fontWeight:  600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        textShadow:  '0 1px 2px rgba(0,0,0,0.50)',
        marginTop:   '1px',
      }}>
        {time.ampm}
      </span>
    </div>
  );
}

function formatTime(date) {
  let hours   = date.getHours();
  const mins  = date.getMinutes().toString().padStart(2, '0');
  const ampm  = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return { hhmm: `${hours}:${mins}`, ampm };
}