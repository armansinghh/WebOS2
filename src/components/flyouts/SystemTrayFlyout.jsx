'use client';

import { Bluetooth, ShieldAlert, Usb, Monitor, Printer } from 'lucide-react';

export default function SystemTrayFlyout({ isOpen }) {
  if (!isOpen) return null;

  const iconWrapperStyle = "w-7 h-7 flex items-center justify-center border border-transparent hover:border-[#b8d6fb] hover:bg-[#f2f7fd] rounded-[2px] cursor-default";

  return (
    <div
      className="absolute right-38.5 top-9 z-50 flex flex-col shadow-lg select-none"
      style={{
        width: '150px',
        background: '#ffffff',
        border: '1px solid #979797',
        boxShadow: '2px 4px 8px rgba(0,0,0,0.2)',
        fontFamily: '"Tahoma", "Segoe UI", sans-serif',
        WebkitFontSmoothing: 'none'
      }}
    >
      <div className="grid grid-cols-4 gap-1 p-2">
        <div className={iconWrapperStyle} title="Bluetooth Devices">
          <Bluetooth size={16} color="#0058a3" />
        </div>
        <div className={iconWrapperStyle} title="Action Center: 1 message">
          <ShieldAlert size={16} color="#d90000" />
        </div>
        <div className={iconWrapperStyle} title="Safely Remove Hardware and Eject Media">
          <Usb size={16} color="#444" />
        </div>
        <div className={iconWrapperStyle} title="Intel(R) HD Graphics">
          <Monitor size={16} color="#444" />
        </div>
        <div className={iconWrapperStyle} title="Devices and Printers">
          <Printer size={16} color="#444" />
        </div>
      </div>

      <div
        className="py-1.5 px-3 border-t border-[#d4d4d4]"
        style={{ background: '#f0f0f0' }}
      >
        <button className="text-[11px] text-[#003399] hover:underline bg-transparent border-none cursor-pointer p-0">
          Customize...
        </button>
      </div>
    </div>
  );
}