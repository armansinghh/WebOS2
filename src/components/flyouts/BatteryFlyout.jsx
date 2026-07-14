'use client';
import { Battery, BatteryCharging } from 'lucide-react';

export default function BatteryFlyout({ isOpen, level, charging }) {
  if (!isOpen) return null;

  const percent = Math.round(level * 100);

  return (
    <div
      className="absolute right-32 top-9 z-50 flex flex-col p-3 shadow-lg select-none"
      style={{
        width: '200px',
        background: '#f0f0f0',
        border: '1px solid #979797',
        boxShadow: '2px 4px 8px rgba(0,0,0,0.2)',
        fontFamily: '"Tahoma", "Segoe UI", sans-serif',
        WebkitFontSmoothing: 'none'
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex items-center justify-center rounded p-1"
          style={{ background: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%)', border: '1px solid #b3b3b3' }}
        >
          {charging ? (
            <BatteryCharging size={24} color="#18b518" strokeWidth={2.5} />
          ) : (
            <Battery size={24} color="#333" strokeWidth={2.5} />
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-[14px] font-bold text-gray-800">
            {percent}% remaining
          </span>
          <span className="text-[12px] text-gray-600 mt-0.5">
            {charging ? 'Plugged in, charging' : 'On battery power'}
          </span>
        </div>
      </div>

      <div className="mt-3 mb-2 border-t border-[#d4d4d4] shadow-[0_1px_0_#ffffff]" />

      <button className="text-left px-2 py-1 text-[12px] text-[#003399] hover:underline hover:bg-transparent border-none cursor-pointer">
        More power options
      </button>
    </div>
  );
}