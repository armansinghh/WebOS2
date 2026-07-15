'use client';
import AeroSlider from '../ui/AeroSlider';
import FlyoutShell from './FlyoutShell';

export default function VolumeFlyout({ isOpen, volume, setVolume }) {
  if (!isOpen) return null;

  return (
    <FlyoutShell className="absolute right-25 top-9 z-50 items-center pt-3 pb-1" style={{ width: '70px' }}>
      <AeroSlider value={volume} onChange={setVolume} />
      <span className="text-[10px] font-bold text-gray-500">{volume}</span>
    </FlyoutShell>
  );
}