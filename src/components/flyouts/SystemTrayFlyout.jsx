'use client';
import { Bluetooth, ShieldAlert, Usb, Monitor, Printer } from 'lucide-react';
import FlyoutShell, { FlyoutFooterLink } from './FlyoutShell';

export default function SystemTrayFlyout({ isOpen }) {
  if (!isOpen) return null;

  const iconWrapperStyle =
    'w-7 h-7 flex items-center justify-center border border-transparent hover:border-[#b8d6fb] hover:bg-[#f2f7fd] rounded-[2px] cursor-default';

  return (
    <FlyoutShell className="absolute right-38.5 top-9 z-50" style={{ width: '150px' }}>
      <div className="grid grid-cols-4 gap-1 p-2 bg-white">
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

      <FlyoutFooterLink>Customize...</FlyoutFooterLink>
    </FlyoutShell>
  );
}