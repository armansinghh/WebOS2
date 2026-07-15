'use client';

export default function MenuBarButton({ children, onClick, title }) {
    return (
        <div
            className="flex items-center justify-center px-2 h-full cursor-default hover:bg-white/20 active:bg-black/10 transition-colors"
            onClick={onClick}
            title={title}
        >
            {children}
        </div>
    );
}