'use client';
import { Battery, BatteryCharging } from 'lucide-react';
import FlyoutShell, { FlyoutFooterLink } from './FlyoutShell';

export default function BatteryFlyout({ isOpen, level, charging }) {
  if (!isOpen) return null;

  const percent = Math.round(level * 100);

  return (
    <FlyoutShell className="absolute right-32 top-9 z-50" style={{ width: '200px' }}>
      <div className="flex items-start gap-3 p-3 bg-white">
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
          <span className="text-[14px] font-bold text-gray-800">{percent}% remaining</span>
          <span className="text-[11px] text-gray-600 mt-0.5">
            {charging ? 'Plugged in, charging' : 'On battery power'}
          </span>
        </div>
      </div>

      <FlyoutFooterLink>More power options</FlyoutFooterLink>
    </FlyoutShell>
  );
}