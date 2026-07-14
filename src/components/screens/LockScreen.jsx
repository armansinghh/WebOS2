'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function GuestGlyph({ size = 56 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges">
            <circle cx="12" cy="8" r="4" fill="#ffffff" />
            <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="#ffffff" />
        </svg>
    );
}

function PowerGlyph({ size = 18, color = '#ffffff' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges">
            <path d="M12 4v8" stroke={color} strokeWidth="2" />
            <path d="M7 6.5a8 8 0 1 0 10 0" stroke={color} strokeWidth="2" fill="none" />
        </svg>
    );
}

export default function LockScreen() {
    const router = useRouter();

    useEffect(() => {
        let flow = null;
        try { flow = window.sessionStorage.getItem('aeroos-flow'); } catch { }
        if (flow !== 'lock') router.replace('/shutdown');
    }, [router]);

    function handleGuestSignIn() {
        try { window.sessionStorage.removeItem('aeroos-flow'); } catch { }
        router.push('/desktop');
    }

    function handleShutdown() {
        try { window.sessionStorage.removeItem('aeroos-flow'); } catch { }
        router.push('/shutdown');
    }

    return (
        <div
            className="w-screen h-screen relative overflow-hidden select-none flex flex-col"
            style={{
                background: "url('/wallpapers/wallpaper-3.jpg') no-repeat center center",
                backgroundSize: 'cover',
            }}
        >

            <div className="flex-1 flex flex-col items-center justify-center relative z-10 -mt-16">

                <div
                    style={{
                        padding: '4px',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                        border: '1px solid rgba(255,255,255,0.6)',
                        borderRadius: '6px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.8)',
                        marginBottom: '12px'
                    }}
                >
                    <div
                        className="flex items-center justify-center"
                        style={{
                            width: '96px',
                            height: '96px',
                            background: 'linear-gradient(180deg, #6ba1c4 0%, #3a759c 100%)',
                            border: '1px solid #1a3c54',
                            borderRadius: '3px',
                            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                        }}
                    >
                        <GuestGlyph />
                    </div>
                </div>

                <span style={{
                    fontFamily: '"Tahoma", "Segoe UI", sans-serif',
                    fontSize: '20px',
                    color: '#ffffff',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    marginBottom: '16px',
                    WebkitFontSmoothing: 'none'
                }}>
                    Guest
                </span>

                <button
                    onClick={handleGuestSignIn}
                    style={{
                        fontFamily: '"Tahoma", "Segoe UI", sans-serif',
                        fontSize: '13px',
                        color: '#000',
                        background: 'linear-gradient(180deg, #f2f2f2 0%, #e0e0e0 49%, #cccccc 50%, #d4d4d4 100%)',
                        border: '1px solid #707070',
                        borderRadius: '3px',
                        padding: '4px 20px',
                        boxShadow: 'inset 0 1px 0 #ffffff, 1px 1px 2px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        WebkitFontSmoothing: 'none'
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.background = '#cccccc';
                        e.currentTarget.style.boxShadow = 'inset 1px 2px 3px rgba(0,0,0,0.3)';
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(180deg, #f2f2f2 0%, #e0e0e0 49%, #cccccc 50%, #d4d4d4 100%)';
                        e.currentTarget.style.boxShadow = 'inset 0 1px 0 #ffffff, 1px 1px 2px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(180deg, #f2f2f2 0%, #e0e0e0 49%, #cccccc 50%, #d4d4d4 100%)';
                        e.currentTarget.style.boxShadow = 'inset 0 1px 0 #ffffff, 1px 1px 2px rgba(0,0,0,0.3)';
                    }}
                >
                    Log on
                </button>
            </div>

            <div
                className="w-full relative z-10 flex items-center justify-end px-8 py-3"
                style={{
                    background: 'linear-gradient(180deg, rgba(30,70,110,0.45) 0%, rgba(15,40,70,0.65) 100%)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderTop: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 -1px 10px rgba(0,0,0,0.2)'
                }}
            >
                <button
                    onClick={handleShutdown}
                    title="Shut down"
                    aria-label="Shut down"
                    className="relative flex items-center justify-center outline-none transition-none"
                    style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '4px',
                        background: 'linear-gradient(180deg, #d90000 0%, #990000 100%)',
                        border: '1px solid #4a0000',
                        boxShadow: 'inset 0px 1px 0px rgba(255,150,150,0.8), 1px 1px 0px rgba(0,0,0,0.5)',
                        cursor: 'pointer',
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(180deg, #8a0000 0%, #5c0000 100%)';
                        e.currentTarget.style.boxShadow = 'inset 1px 2px 4px rgba(0,0,0,0.8)';
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(180deg, #d90000 0%, #990000 100%)';
                        e.currentTarget.style.boxShadow = 'inset 0px 1px 0px rgba(255,150,150,0.8), 1px 1px 0px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(180deg, #d90000 0%, #990000 100%)';
                        e.currentTarget.style.boxShadow = 'inset 0px 1px 0px rgba(255,150,150,0.8), 1px 1px 0px rgba(0,0,0,0.5)';
                    }}
                >
                    <div
                        className="absolute top-0 left-0 right-0 pointer-events-none"
                        style={{
                            height: '50%',
                            background: 'rgba(255, 255, 255, 0.25)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    />
                    <PowerGlyph size={14} color="#ffffff" />
                </button>
            </div>
        </div>
    );
}