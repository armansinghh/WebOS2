'use client';
import AeroSlider from '../ui/AeroSlider';

export default function VolumeFlyout({ isOpen, volume, setVolume }) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute right-25 top-9 z-50 flex flex-col items-center pt-3 pb-1 shadow-lg"
      style={{
        width: '70px',
        background: '#f0f0f0',
        border: '1px solid #979797',
        borderTop: 'none',
        boxShadow: '2px 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 #ffffff',
      }}
    >
      <AeroSlider value={volume} onChange={setVolume} />
      <span className="text-[10px] font-bold text-gray-500 font-tahoma">{volume}</span>
    </div>
  );
}