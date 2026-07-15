'use client';

export const FLYOUT_BASE_STYLE = {
    border: '1px solid #979797',
    boxShadow: '2px 4px 8px rgba(0,0,0,0.2)',
    fontFamily: '"Tahoma", "Segoe UI", sans-serif',
    WebkitFontSmoothing: 'none',
};

export default function FlyoutShell({ className = '', style = {}, children }) {
    return (
        <div
            className={`flex flex-col select-none ${className}`}
            style={{
                background: '#f0f0f0',
                fontSize: '12px',
                color: '#000000',
                ...FLYOUT_BASE_STYLE,
                ...style,
            }}
        >
            {children}
        </div>
    );
}

export function FlyoutDivider({ className = '' }) {
    return (
        <div className={`border-t border-[#d4d4d4] shadow-[0_1px_0_#ffffff] mx-2 my-1 ${className}`} />
    );
}

export function FlyoutFooterLink({ children, onClick }) {
    return (
        <div className="py-1.5 px-3 border-t border-[#d4d4d4]" style={{ background: '#f0f0f0' }}>
            <button
                onClick={onClick}
                className="text-[11px] text-[#003399] hover:underline bg-transparent border-none cursor-pointer p-0"
            >
                {children}
            </button>
        </div>
    );
}