import { useState, useEffect } from 'react';
import './MenuBar.css';

/**
 * MenuBar — macOS-style top menu bar.
 * Displays Apple logo, app menus, and system status icons (Wi-Fi, battery, clock).
 */
export default function MenuBar() {
  const [time, setTime] = useState(formatTime());

  /* Update clock every 10 seconds */
  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime()), 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="menubar" role="menubar" aria-label="Menu bar">
      {/* Left: Apple logo + menus */}
      <nav className="menubar__left">
        <button className="menubar__item menubar__apple" aria-label="Apple menu">
          <svg width="14" height="14" viewBox="0 0 170 170" fill="currentColor" style={{transform: 'translateY(-1px)'}}>
            <path d="M109.91,62.88C110.19,43.2 126.85,32 127.56,31.5C118.4,18.15 103.71,15.93 98.74,15.71C86.72,14.49 75.1,22.75 68.96,22.75C62.82,22.75 53.33,16.03 43.43,16.23C30.4,16.42 18.39,23.82 11.66,35.53C-2.07,59.39 8.16,94.57 21.57,113.88C28.09,123.28 35.83,134.02 45.89,133.6C55.6,133.18 59.36,127.35 71.16,127.35C82.95,127.35 86.32,133.6 96.48,133.4C106.94,133.18 113.62,123.59 120.14,114.07C127.67,103.04 130.8,92.3 130.98,91.73C130.7,91.6 110.13,83.94 109.91,62.88ZM90.54,10.66C95.9,4.2 99.53,-4.8 98.54,-13.73C90.72,-13.43 81.33,-8.53 75.82,-2.16C70.91,3.47 66.86,12.7 68.04,21.43C76.81,22.11 85.18,17.13 90.54,10.66Z"/>
          </svg>
        </button>
        <span className="menubar__item menubar__app-name">Finder</span>
        {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map((menu) => (
          <button key={menu} className="menubar__item" aria-label={`${menu} menu`}>
            {menu}
          </button>
        ))}
      </nav>

      {/* Right: System status */}
      <div className="menubar__right">
        {/* Wi-Fi icon */}
        <button className="menubar__icon" aria-label="Wi-Fi">
          <svg width="15" height="11" viewBox="0 0 24 17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="currentColor" stroke="none" />
            <path d="M5 8a10 10 0 0 1 14 0" />
            <path d="M8.5 11.5a5 5 0 0 1 7 0" />
            <path d="M1.5 4.5a15 15 0 0 1 21 0" />
          </svg>
        </button>

        {/* Battery icon */}
        <button className="menubar__icon" aria-label="Battery">
          <svg width="23" height="11" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="1" width="20" height="10" rx="3" />
            <path d="M23 4v4" />
            <rect x="2.5" y="2.5" width="17" height="7" rx="1.5" fill="currentColor" stroke="none" />
          </svg>
        </button>

        {/* Spotlight icon */}
        <button className="menubar__icon" aria-label="Spotlight search">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="M17.5 17.5L12.5 12.5" />
          </svg>
        </button>

        {/* Control Center icon */}
        <button className="menubar__icon" aria-label="Control Center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4.5" y="10" width="5" height="11" rx="2.5" />
            <rect x="14.5" y="3" width="5" height="11" rx="2.5" />
            <circle cx="7" cy="17" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="17" cy="7" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </button>

        {/* Clock */}
        <span className="menubar__clock" aria-label={`Current time: ${time}`}>
          {time}
        </span>
      </div>
    </header>
  );
}

/** Format current time as HH:MM */
function formatTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}
