'use client';

import { useState, useEffect } from 'react';

export default function CalendarFlyout({ isOpen, onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  if (!isOpen) return null;

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="text-gray-400" />); // Empty slots
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    days.push(
      <div
        key={d}
        className={`flex items-center justify-center cursor-default
          ${isToday
            ? 'bg-[#cce8ff] border border-[#99d1ff] text-black font-semibold' // Classic Windows selection blue
            : 'hover:bg-[#e5f3ff] hover:border hover:border-[#d9f0ff] border border-transparent'
          }
        `}
        style={{ width: '28px', height: '28px' }}
      >
        {d}
      </div>
    );
  }

  return (
    <div
      className="absolute right-2 top-9 z-50 flex flex-col select-none"
      style={{
        width: '230px',
        background: '#f0f0f0',
        border: '1px solid #979797',
        boxShadow: '2px 4px 8px rgba(0,0,0,0.2)',
        fontFamily: '"Tahoma", "Segoe UI", sans-serif',
        fontSize: '12px',
        WebkitFontSmoothing: 'none'
      }}
    >
      {/* Month Header */}
      <div
        className="flex items-center justify-center py-2"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #e5e5e5 100%)',
          borderBottom: '1px solid #d4d4d4',
          fontWeight: 'bold',
          color: '#003399'
        }}
      >
        {currentDate.toLocaleDateString([], { month: 'long', year: 'numeric' })}
      </div>

      <div className="p-2 bg-white">
        <div className="grid grid-cols-7 mb-1 pb-1 border-b border-[#e0e0e0]">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center font-bold text-gray-600" style={{ fontSize: '11px' }}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {days}
        </div>
      </div>

      <div
        className="py-2 text-center text-gray-600 border-t border-[#d4d4d4]"
        style={{ fontSize: '11px', background: '#f5f5f5' }}
      >
        Today: {today.toLocaleDateString()}
      </div>
    </div>
  );
}