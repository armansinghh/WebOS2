'use client';
import { ChevronRight } from 'lucide-react';

export default function ContextMenu({ isVisible, x, y, items }) {
  if (!isVisible) return null;

  const menuItemStyle = "flex items-center justify-between px-4 py-[3px] mx-[2px] cursor-default select-none border border-transparent hover:border-[#b8d6fb] hover:bg-[#f2f7fd] rounded-[2px]";

  return (
    <div
      className="fixed z-9999 flex flex-col py-0.5 shadow-lg"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        width: '220px',
        background: '#f0f0f0',
        border: '1px solid #979797',
        boxShadow: '2px 4px 8px rgba(0,0,0,0.2)',
        fontFamily: '"Tahoma", "Segoe UI", sans-serif',
        fontSize: '12px',
        color: '#000000',
        WebkitFontSmoothing: 'none'
      }}
      onClick={(e) => e.stopPropagation()}
    >

      {items.map((item, index) => {
        if (item.type === 'divider') {
          return (
            <div
              key={`div-${index}`}
              className="mx-1 my-1 border-t border-[#d4d4d4] shadow-[0_1px_0_#ffffff]"
            />
          );
        }

        return (
          <div
            key={item.label}
            className={`${menuItemStyle} ${item.disabled ? 'text-[#8c8c8c] hover:bg-transparent hover:border-transparent' : ''}`}
            onClick={() => {
              if (!item.disabled && item.onClick) item.onClick();
            }}
          >
            <div className="flex items-center gap-2 relative z-10">
              {item.icon && <span className="mr-1">{item.icon}</span>}
              <span>{item.label}</span>
            </div>

            {item.hasSubmenu && (
              <ChevronRight size={14} className="text-gray-600 relative z-10" />
            )}
          </div>
        );
      })}
    </div>
  );
}