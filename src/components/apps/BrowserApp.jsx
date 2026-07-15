'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Globe2, AlertTriangle, X } from 'lucide-react';

const DEFAULT_URL = 'https://en.wikipedia.org/wiki/Main_Page';

function normalizeUrl(value) {
    const trimmed = value.trim();
    if (!trimmed) return DEFAULT_URL;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
}

export default function BrowserApp() {
    const [urlInput, setUrlInput] = useState(DEFAULT_URL);
    const [currentUrl, setCurrentUrl] = useState(DEFAULT_URL);
    const [showNotice, setShowNotice] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    const navigate = (value) => {
        let normalized = normalizeUrl(value);

        if (!normalized.toLowerCase().includes('wikipedia.org')) {
            const searchQuery = value.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
            normalized = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(searchQuery)}`;
            setShowNotice(true);
        }

        setUrlInput(normalized);
        setCurrentUrl(normalized);
    };

    const refresh = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className="flex h-full w-full flex-col bg-[#f3f6fb] text-gray-800" style={{ fontFamily: '"Segoe UI", Tahoma, sans-serif' }}>

            <div
                className="border-b border-[#d0d7e2] px-3 py-2"
                style={{ background: 'linear-gradient(180deg, #f2f7fc 0%, #e1eaf4 100%)' }}
            >
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 mr-1">
                        <button
                            disabled
                            className="rounded-full border border-[#b7c4d4] bg-white p-1.5 opacity-40 shadow-sm cursor-not-allowed"
                            title="Back (Disabled)"
                        >
                            <ArrowLeft size={16} color="#333" />
                        </button>
                        <button
                            disabled
                            className="rounded-full border border-[#b7c4d4] bg-white p-1.5 opacity-40 shadow-sm cursor-not-allowed"
                            title="Forward (Disabled)"
                        >
                            <ArrowRight size={16} color="#333" />
                        </button>
                    </div>

                    {/* Address Bar */}
                    <form
                        onSubmit={(e) => { e.preventDefault(); navigate(urlInput); }}
                        className="flex flex-1 items-center gap-2 rounded border border-[#a3b8cc] bg-white px-2 py-1 shadow-inner hover:border-[#7ca8d4] transition-colors focus-within:border-[#3399ff]"
                    >
                        <Globe2 size={14} className="text-gray-400" />
                        <input
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            className="flex-1 bg-transparent text-[13px] outline-none text-gray-800"
                            placeholder="Enter a website..."
                        />

                        {/* Reload and Home */}
                        <div className="flex items-center gap-1 border-l border-gray-200 pl-1">
                            <button type="button" onClick={refresh} className="rounded p-1 hover:bg-[#e5f3ff] transition-colors" title="Refresh">
                                <RotateCw size={14} color="#666" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {showNotice && (
                <div className="flex items-center justify-between bg-[#ffffe1] px-3 py-1.5 border-b border-[#c5c5c5] shadow-sm select-none animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-3">
                        <AlertTriangle size={16} className="text-yellow-600 fill-yellow-200 drop-shadow-sm" />
                        <span className="text-[12px] text-gray-800 leading-tight">
                            <strong>Internet Explorer Security:</strong> Modern websites are claustrophobic and hate being put inside an iframe.
                            To protect you from a depressing "Connection Refused" error, we have quarantined you to Wikipedia!
                        </span>
                    </div>
                    <button
                        onClick={() => setShowNotice(false)}
                        className="p-1 rounded hover:bg-[#e5c58a]/30 transition-colors"
                        title="Dismiss"
                    >
                        <X size={14} className="text-gray-600" />
                    </button>
                </div>
            )}

            <div className="flex-1 bg-white p-1 pb-0">
                <iframe
                    key={`${currentUrl}-${refreshKey}`}
                    src={currentUrl}
                    title="Web Browser Viewport"
                    className="h-full w-full border border-[#d0d7e2] border-b-0 bg-white shadow-sm"
                    sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                />
            </div>
        </div>
    );
}