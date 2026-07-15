'use client';
import { Wifi, Lock } from 'lucide-react';
import FlyoutShell, { FlyoutDivider, FlyoutFooterLink } from './FlyoutShell';
import { useNetworkState } from '../../hooks/useNetworkState';

export default function WifiFlyout({ isOpen }) {
  const [networkState] = useNetworkState();
  const { wifiEnabled, airplaneMode } = networkState;

  if (!isOpen) return null;

  const networks = [
    { name: 'Aero_Network_5G', strength: 4, secured: true, connected: true },
    { name: 'Guest_WIFI', strength: 3, secured: false, connected: false },
    { name: 'Home_Net_2.4', strength: 2, secured: true, connected: false },
  ];

  return (
    <FlyoutShell className="absolute right-19 top-9 z-50" style={{ width: '240px' }}>
      <div className="flex flex-col p-1 max-h-50 overflow-y-auto bg-white">
        <div className="flex flex-col mb-1">
          <span className="px-2 py-1 text-[11px] font-bold text-gray-800">Currently connected to:</span>
          <div className="flex items-center justify-between p-2 mx-1 border border-[#a6d8ff] bg-[#e5f3ff] rounded-xs">
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-gray-900">{wifiEnabled && !airplaneMode ? networks[0].name : 'Wi-Fi Off'}</span>
              <span className="text-[11px] text-gray-600">{wifiEnabled && !airplaneMode ? 'Internet access' : airplaneMode ? 'Airplane mode enabled' : 'Disabled'}</span>
            </div>
            <div className="flex items-center gap-1">
              {wifiEnabled && !airplaneMode && networks[0].secured && <Lock size={12} color="#555" />}
              <Wifi size={18} color={wifiEnabled && !airplaneMode ? '#18b518' : '#999'} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <FlyoutDivider />

        <span className="px-2 py-1 text-[11px] font-bold text-gray-800">Wireless Network Connection</span>

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

      <FlyoutFooterLink>Open Network and Sharing Center</FlyoutFooterLink>
    </FlyoutShell>
  );
}