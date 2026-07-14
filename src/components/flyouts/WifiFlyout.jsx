'use client';
import { Wifi, Lock } from 'lucide-react';

export default function WifiFlyout({ isOpen }) {
  if (!isOpen) return null;

  const networks = [
    { name: 'Aero_Network_5G', strength: 4, secured: true, connected: true },
    { name: 'Guest_WIFI', strength: 3, secured: false, connected: false },
    { name: 'Home_Net_2.4', strength: 2, secured: true, connected: false },
  ];

  return (
    <div
      className="absolute right-19 top-9 z-50 flex flex-col shadow-lg select-none"
      style={{
        width: '240px',
        background: '#ffffff',
        border: '1px solid #979797',
        boxShadow: '2px 4px 8px rgba(0,0,0,0.2)',
        fontFamily: '"Tahoma", "Segoe UI", sans-serif',
        WebkitFontSmoothing: 'none'
      }}
    >
      <div className="flex flex-col p-1 max-h-50 overflow-y-auto">
        <div className="flex flex-col mb-1">
          <span className="px-2 py-1 text-[11px] font-bold text-gray-800">
            Currently connected to:
          </span>
          <div
            className="flex items-center justify-between p-2 mx-1 border border-[#a6d8ff] bg-[#e5f3ff] rounded-xs"
          >
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-gray-900">{networks[0].name}</span>
              <span className="text-[11px] text-gray-600">Internet access</span>
            </div>
            <div className="flex items-center gap-1">
              {networks[0].secured && <Lock size={12} color="#555" />}
              <Wifi size={18} color="#18b518" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="border-t border-[#e0e0e0] mx-2 my-1" />

        <span className="px-2 py-1 text-[11px] font-bold text-gray-800">
          Wireless Network Connection
        </span>

        {networks.slice(1).map((net) => (
          <div
            key={net.name}
            className="flex items-center justify-between p-2 mx-1 border border-transparent hover:border-[#b8d6fb] hover:bg-[#f2f7fd] cursor-pointer rounded-xs"
          >
            <span className="text-[12px] text-gray-800">{net.name}</span>
            <div className="flex items-center gap-1">
              {net.secured && <Lock size={12} color="#777" />}
              <Wifi size={16} color="#555" opacity={net.strength * 0.25} />
            </div>
          </div>
        ))}
      </div>

      <div
        className="py-2 px-3 border-t border-[#d4d4d4]"
        style={{ background: '#f0f0f0' }}
      >
        <button className="text-[12px] text-[#003399] hover:underline bg-transparent border-none cursor-pointer p-0">
          Open Network and Sharing Center
        </button>
      </div>
    </div>
  );
}