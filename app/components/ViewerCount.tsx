"use client";

import { useState, useEffect } from "react";

export default function ViewerCount() {
    const [viewerCount, setViewerCount] = useState(10); // Fixed initial value to avoid hydration mismatch

    useEffect(() => {
        // Set initial random value on client side only
        setViewerCount(Math.floor(Math.random() * 11) + 5);

        const interval = setInterval(() => {
            setViewerCount(Math.floor(Math.random() * 11) + 5);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-1.5 bg-accent/10 rounded-full px-3 py-1.5 w-fit">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary animate-pulse flex-shrink-0"
            >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span className="text-s font-semibold text-primary whitespace-nowrap">
                {viewerCount} Viewing Now!
            </span>
        </div>
    );
}
