'use client';

function IconBase({ size = 28, children, gradId, from, mid, to }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={from} />
          <stop offset="45%" stopColor={mid} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={`${gradId}-gloss`} x1="16" y1="2" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.85" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

function round(n) {
  return Math.round(n * 1000) / 1000;
}

/* ---------------------------------------------------------------------
   GlassTile: rounded-square Frutiger Aero "app tile" base — diagonal
   saturated gradient, light-catching bevel, big specular glare sweep,
   soft drop shadow. Used for app icons (as opposed to the round gadget
   icons like Clock/Weather which stay circular).
--------------------------------------------------------------------- */
function GlassTile({ size = 28, gradId, from, mid, to, children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="5" y1="4" x2="27" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={from} />
          <stop offset="55%" stopColor={mid} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={`${gradId}-glare`} x1="6" y1="3" x2="18" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.95" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${gradId}-floor`} x1="16" y1="20" x2="16" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0.28" />
        </linearGradient>
        <clipPath id={`${gradId}-clip`}>
          <rect x="2" y="2" width="28" height="28" rx="8" />
        </clipPath>
        <filter id={`${gradId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.1" stdDeviation="1" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter={`url(#${gradId}-shadow)`}>
        <rect x="2" y="2" width="28" height="28" rx="8" fill={`url(#${gradId})`} />
        <rect x="2.5" y="2.5" width="27" height="27" rx="7.5"
          stroke="rgba(255,255,255,0.55)" strokeWidth="1" fill="none" />
        <rect x="2" y="2" width="28" height="28" rx="8"
          stroke="rgba(0,0,0,0.25)" strokeWidth="1" fill="none" />
      </g>

      <g clipPath={`url(#${gradId}-clip)`}>
        {/* bottom reflected light, floor-style */}
        <rect x="2" y="20" width="28" height="9" fill={`url(#${gradId}-floor)`} />
        {/* main glyph */}
        {children}
        {/* big diagonal specular glare, classic Aero glass sweep */}
        <path d="M2 11 C 9 3, 16 2, 22 2 L 14 13 C 8 15, 4 14, 2 11 Z"
          fill={`url(#${gradId}-glare)`} opacity="0.8" />
        <path d="M24 2 L30 2 L30 8 C 27 6 25 4 24 2 Z"
          fill="white" opacity="0.35" />
      </g>
    </svg>
  );
}

export function GlobeIcon({ size = 28 }) {
  return (
    <IconBase size={size} gradId="globe" from="#b3ecff" mid="#00A8E8" to="#005f99">
      <circle cx="16" cy="16" r="13" fill="url(#globe)" stroke="rgba(0,50,90,0.45)" strokeWidth="1" />
      <path d="M3 16h26M16 3c4 4 6 8 6 13s-2 9-6 13c-4-4-6-8-6-13s2-9 6-13z"
        stroke="rgba(255,255,255,0.65)" strokeWidth="1" fill="none" />
      <path d="M6 9c3 2 17 2 20 0M6 23c3-2 17-2 20 0"
        stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none" />
      <path d="M4 12a13 13 0 0 1 20-7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
      <ellipse cx="16" cy="10" rx="11" ry="6" fill="url(#globe-gloss)" />
    </IconBase>
  );
}

export function ClockIcon({ size = 28 }) {
  return (
    <IconBase size={size} gradId="clock" from="#d4ffb3" mid="#7CFC00" to="#3a8800">
      <circle cx="16" cy="16" r="13" fill="url(#clock)" stroke="rgba(30,70,0,0.45)" strokeWidth="1" />
      <circle cx="16" cy="16" r="9.5" fill="white" fillOpacity="0.9" stroke="rgba(0,0,0,0.15)" />
      {[...Array(12)].map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const r1 = i % 3 === 0 ? 6.8 : 7.6;
        const x1 = round(16 + r1 * Math.sin(a));
        const y1 = round(16 - r1 * Math.cos(a));
        const x2 = round(16 + 8.6 * Math.sin(a));
        const y2 = round(16 - 8.6 * Math.cos(a));
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3a5f1a" strokeWidth={i % 3 === 0 ? 1.1 : 0.6} />;
      })}
      <line x1="16" y1="16" x2="16" y2="10.5" stroke="#2c4a12" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="16" y1="16" x2="20.5" y2="17.8" stroke="#2c4a12" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.3" fill="#2c4a12" />
      <ellipse cx="16" cy="10" rx="11" ry="6" fill="url(#clock-gloss)" />
    </IconBase>
  );
}

export function NotepadIcon({ size = 28 }) {
  return (
    <IconBase size={size} gradId="pad" from="#ffe9b3" mid="#ffb800" to="#a86a00">
      <rect x="4" y="3" width="24" height="26" rx="3" fill="url(#pad)" stroke="rgba(90,55,0,0.45)" strokeWidth="1" />
      <rect x="7.5" y="7" width="17" height="18" rx="1" fill="white" fillOpacity="0.92" />
      <line x1="9.5" y1="11" x2="22" y2="11" stroke="#c98a00" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="9.5" y1="14.5" x2="22" y2="14.5" stroke="#c98a00" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="9.5" y1="18" x2="18" y2="18" stroke="#c98a00" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="10.5" y="1.5" width="4" height="4" rx="1" fill="#a86a00" />
      <rect x="17.5" y="1.5" width="4" height="4" rx="1" fill="#a86a00" />
      <ellipse cx="16" cy="9" rx="10" ry="5" fill="url(#pad-gloss)" />
    </IconBase>
  );
}

export function WeatherIcon({ size = 28 }) {
  return (
    <IconBase size={size} gradId="wthr" from="#d6f0ff" mid="#5bc8f5" to="#0077b6">
      <circle cx="16" cy="16" r="13" fill="url(#wthr)" stroke="rgba(0,50,90,0.45)" strokeWidth="1" />
      <circle cx="13" cy="14" r="5" fill="#ffd23f" stroke="#e0a800" strokeWidth="0.6" />
      <path d="M10 22c0-3 2.5-5 5.5-5 2 0 3.7 1 4.6 2.6.4-.1.8-.1 1.2-.1 2.3 0 4.2 1.8 4.2 4.1 0 .5-.1.9-.2 1.3H9.3c-.5-.6-.8-1.4-.8-2.3 0-1.5 1-2.8 2.4-3.2z"
        fill="white" fillOpacity="0.95" stroke="rgba(0,60,100,0.25)" strokeWidth="0.5" />
      <ellipse cx="16" cy="9" rx="10" ry="5" fill="url(#wthr-gloss)" />
    </IconBase>
  );
}

export function WifiIcon({ size = 16, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 9c4.5-4 11.5-4 16 0" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M7 13c3-2.5 7-2.5 10 0" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <path d="M10 17c1.5-1.2 2.5-1.2 4 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="20" r="1.4" fill={color} />
    </svg>
  );
}

export function BatteryIcon({ size = 18, color = '#ffffff', level = 0.8 }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 24 12" fill="none">
      <rect x="1" y="1" width="19" height="10" rx="2" stroke={color} strokeWidth="1.4" opacity="0.85" />
      <rect x="21.5" y="4" width="1.8" height="4" rx="0.8" fill={color} opacity="0.85" />
      <rect x="2.5" y="2.5" width={16 * level} height="7" rx="1" fill={color} opacity="0.9" />
    </svg>
  );
}

export function SettingsIcon({ size = 28 }) {
  const teeth = 8;
  const cx = 16, cy = 16;
  const rOuterTip = 13, rOuterBase = 10.4, rInner = 6.4;
  const toothHalfAngle = (Math.PI / teeth) * 0.32;

  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = (i * 2 * Math.PI) / teeth;
    const aNext = ((i + 1) * 2 * Math.PI) / teeth;
    const mid = a + (aNext - a) / 2;

    const p1 = [cx + rOuterBase * Math.sin(a), cy - rOuterBase * Math.cos(a)];
    const p2 = [cx + rOuterBase * Math.sin(mid - toothHalfAngle), cy - rOuterBase * Math.cos(mid - toothHalfAngle)];
    const p3 = [cx + rOuterTip * Math.sin(mid - toothHalfAngle * 0.6), cy - rOuterTip * Math.cos(mid - toothHalfAngle * 0.6)];
    const p4 = [cx + rOuterTip * Math.sin(mid + toothHalfAngle * 0.6), cy - rOuterTip * Math.cos(mid + toothHalfAngle * 0.6)];
    const p5 = [cx + rOuterBase * Math.sin(mid + toothHalfAngle), cy - rOuterBase * Math.cos(mid + toothHalfAngle)];

    d += `${i === 0 ? 'M' : 'L'} ${round(p1[0])} ${round(p1[1])} `;
    d += `L ${round(p2[0])} ${round(p2[1])} `;
    d += `L ${round(p3[0])} ${round(p3[1])} `;
    d += `L ${round(p4[0])} ${round(p4[1])} `;
    d += `L ${round(p5[0])} ${round(p5[1])} `;
  }
  d += 'Z';

  return (
    <IconBase size={size} gradId="settings" from="#eef3f8" mid="#9fb3c8" to="#3d5872">
      <path d={d} fill="url(#settings)" stroke="rgba(20,35,55,0.5)" strokeWidth="1" strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r={rInner} fill="white" fillOpacity="0.95" stroke="rgba(20,35,55,0.35)" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r="2.6" fill="#3d5872" />
      <ellipse cx="16" cy="9.5" rx="9.5" ry="5.5" fill="url(#settings-gloss)" />
    </IconBase>
  );
}

export function MediaPlayerIcon({ size = 28 }) {
  return (
    <IconBase size={size} gradId="media" from="#f1e0ff" mid="#a855f7" to="#5b21b6">
      <circle cx="16" cy="16" r="13" fill="url(#media)" stroke="rgba(45,10,80,0.45)" strokeWidth="1" />
      <circle cx="16" cy="16" r="9.5" fill="white" fillOpacity="0.92" stroke="rgba(45,10,80,0.2)" strokeWidth="0.5" />
      <path d="M13.3 12.2c0-.9.95-1.45 1.7-.98l6 3.8c.7.45.7 1.5 0 1.95l-6 3.8c-.75.47-1.7-.08-1.7-.98z"
        fill="#7c1fd6" />
      <circle cx="16" cy="16" r="1.4" fill="white" />
      <ellipse cx="16" cy="9.5" rx="10" ry="5.5" fill="url(#media-gloss)" />
    </IconBase>
  );
}

export function WelcomeIcon({ size = 28 }) {
  return (
    <GlassTile size={size} gradId="welcome" from="#dff3ff" mid="#4fb8e8" to="#0a5f8f">
      <path d="M 8 24 V 12 A 8 8 0 0 1 24 12 V 24 Z" fill="white" opacity="0.3" />
      <path d="M 12 24 V 14 A 4 4 0 0 1 20 14 V 24 Z" fill="#ffd23f" />
      <line x1="4" y1="24" x2="28" y2="24" stroke="white"strokeWidth="2" strokeLinecap="round" />
    </GlassTile>
  );
}

export function FileExplorerIcon({ size = 28 }) {
  return (
    <GlassTile size={size} gradId="files" from="#eaf2ff" mid="#5c8fe0" to="#173b78">
      <rect x="15.5" y="6" width="9.5" height="12" rx="1" fill="white" fillOpacity="0.95"
        stroke="rgba(10,30,70,0.3)" strokeWidth="0.5" />
      <line x1="17.5" y1="9" x2="23" y2="9" stroke="#8fb0e6" strokeWidth="1" />
      <line x1="17.5" y1="11.5" x2="23" y2="11.5" stroke="#8fb0e6" strokeWidth="1" />
      <line x1="17.5" y1="14" x2="21" y2="14" stroke="#8fb0e6" strokeWidth="1" />
      <path d="M5.5 14V11a1.4 1.4 0 0 1 1.4-1.4h5l1.7 1.9h9.4A1.4 1.4 0 0 1 24.4 13v1z"
        fill="#bcd4ff" stroke="rgba(10,30,70,0.35)" strokeWidth="0.6" />
      <path d="M4.8 15h22.4l-1.9 10.8a1.7 1.7 0 0 1-1.7 1.4H8.4a1.7 1.7 0 0 1-1.7-1.4z"
        fill="white" fillOpacity="0.97" stroke="rgba(10,30,70,0.4)" strokeWidth="0.7" />
      <path d="M4.8 15h22.4l-0.35 2H5.15z" fill="#4a75c9" opacity="0.5" />
      <rect x="14.3" y="13.6" width="3.4" height="7.5" rx="1.2" fill="#dbe6f5"
        stroke="rgba(10,30,70,0.4)" strokeWidth="0.5" />
      <line x1="16" y1="14.6" x2="16" y2="20.2" stroke="rgba(10,30,70,0.25)" strokeWidth="0.5" />
    </GlassTile>
  );
}

export function GamesIcon({ size = 28 }) {
  return (
    <GlassTile size={size} gradId="games" from="#ece3ff" mid="#8b5cf6" to="#3b1e8f">
      <rect x="6" y="10" width="20" height="12" rx="4" fill="#20123f" />
      <path d="M9 18h4 M11 16v4" stroke="#7ee8ff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="19" cy="18" r="1.5" fill="#ff5fa8" />
      <circle cx="22" cy="16" r="1.5" fill="#5fffb0" />
    </GlassTile>
  );
}