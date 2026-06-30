'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

// ─── Window ───────────────────────────────────────────────────────────────────
// A single draggable, closable, minimizable Aero-glass window.
// Position is controlled state (x, y) lifted up to WindowManager so it
// persists correctly across re-renders and z-index changes.

export default function Window({
  id,
  title,
  icon,
  x,
  y,
  width  = 480,
  height = 360,
  zIndex,
  minimized,
  onClose,
  onMinimize,
  onFocus,
  onMove,
  children,
}) {
  const dragState = useRef({ dragging: false, offsetX: 0, offsetY: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const handleTitleMouseDown = useCallback((e) => {
    // Only left click starts a drag
    if (e.button !== 0) return;
    onFocus(id);
    dragState.current = {
      dragging: true,
      offsetX: e.clientX - x,
      offsetY: e.clientY - y,
    };
    setIsDragging(true);
  }, [id, x, y, onFocus]);

  useEffect(() => {
    function handleMouseMove(e) {
      if (!dragState.current.dragging) return;
      const newX = e.clientX - dragState.current.offsetX;
      // Clamp Y so the title bar can't be dragged above the visible viewport
      const newY = Math.max(0, e.clientY - dragState.current.offsetY);
      onMove(id, newX, newY);
    }
    function handleMouseUp() {
      if (dragState.current.dragging) {
        dragState.current.dragging = false;
        setIsDragging(false);
      }
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [id, onMove]);

  if (minimized) return null;

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left:   `${x}px`,
        top:    `${y}px`,
        width:  `${width}px`,
        height: `${height}px`,
        zIndex,
        transition: isDragging ? 'none' : 'box-shadow 0.15s ease',
      }}
      onMouseDown={() => onFocus(id)}
    >
      {/* ── Aero Glass Window Frame ── */}
      <div
        className="w-full h-full flex flex-col overflow-hidden"
        style={{
          background:            'rgba(255, 255, 255, 0.25)',
          backdropFilter:        'blur(24px) saturate(2.0) brightness(1.08)',
          WebkitBackdropFilter:  'blur(24px) saturate(2.0) brightness(1.08)',
          border:                '1px solid rgba(255, 255, 255, 0.50)',
          borderRadius:          '1.25rem',
          boxShadow: isDragging
            ? `inset 0 1px 1px rgba(255,255,255,0.85),
               inset 0 -1px 1px rgba(255,255,255,0.10),
               0 28px 70px rgba(31,38,135,0.30),
               0 6px 20px rgba(0,0,0,0.30)`
            : `inset 0 1px 1px rgba(255,255,255,0.85),
               inset 0 -1px 1px rgba(255,255,255,0.10),
               0 20px 60px rgba(31,38,135,0.22),
               0 4px 16px rgba(0,0,0,0.25)`,
        }}
      >
        {/* ── Title Bar ── */}
        <div
          onMouseDown={handleTitleMouseDown}
          className="flex items-center gap-2 px-3 py-2 cursor-grab active:cursor-grabbing shrink-0"
          style={{
            background: `linear-gradient(
              180deg,
              rgba(140, 210, 255, 0.75) 0%,
              rgba(0,  168, 232, 0.55) 45%,
              rgba(0,  119, 182, 0.45) 100%
            )`,
            backdropFilter:       'blur(12px) saturate(2.0)',
            WebkitBackdropFilter: 'blur(12px) saturate(2.0)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.90),
              inset 0 -1px 0 rgba(0,100,180,0.30),
              0 1px 4px rgba(0,0,0,0.20)
            `,
            borderRadius: '1.25rem 1.25rem 0 0',
          }}
        >
          {/* Traffic-light controls */}
          <div className="flex items-center gap-2">
            <button
              className="win-ctrl"
              style={{ background: 'radial-gradient(circle at 35% 30%, #ff8a80 0%, #ff3b30 60%, #c1271b 100%)' }}
              onClick={(e) => { e.stopPropagation(); onClose(id); }}
              title="Close"
            />
            <button
              className="win-ctrl"
              style={{ background: 'radial-gradient(circle at 35% 30%, #ffe082 0%, #ffb300 60%, #c17e00 100%)' }}
              onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
              title="Minimize"
            />
            <button
              className="win-ctrl"
              style={{ background: 'radial-gradient(circle at 35% 30%, #b9f6ca 0%, #4caf50 60%, #2e7d32 100%)', cursor: 'not-allowed', opacity: 0.6 }}
              title="Maximize (not implemented)"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Title */}
          <div
            className="flex items-center gap-1.5 flex-1 justify-center select-none"
            style={{ marginRight: '52px' /* visually re-center against the 3 dots */ }}
          >
            {icon && <span style={{ fontSize: '13px', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))' }}>{icon}</span>}
            <span
              style={{
                color:      '#ffffff',
                fontSize:   '12.5px',
                fontWeight: 600,
                letterSpacing: '0.01em',
                textShadow: '0 1px 2px rgba(0,0,0,0.45)',
              }}
            >
              {title}
            </span>
          </div>
        </div>

        {/* ── Window Body ── */}
        <div className="flex-1 overflow-auto relative">
          {children}
        </div>
      </div>
    </div>
  );
}