import { useState, useEffect, useRef } from 'react';
import './DesktopIcon.css';

/**
 * DesktopIcon — macOS desktop icon (folder, calendar, or note).
 * Positioned absolutely on the desktop via x/y props.
 *
 * Props:
 *  - label: text label below the icon
 *  - x: left position
 *  - y: top position
 *  - type: icon type ('folder', 'calendar', 'note')
 */
export default function DesktopIcon({ label, x, y, type, onDoubleClick, iconSrc }) {
  const [now, setNow] = useState(new Date());
  const [position, setPosition] = useState({ x, y });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialLeft: 0, initialTop: 0 });

  // Update at midnight if the page stays open
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000); // Check every minute
    return () => clearInterval(timer);
  }, []);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click

    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement.getBoundingClientRect();

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: rect.left - parentRect.left,
      initialTop: rect.top - parentRect.top,
    };

    setIsDragging(true);

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;
      
      setPosition({
        x: `${dragRef.current.initialLeft + dx}px`,
        y: `${dragRef.current.initialTop + dy}px`
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  let content;
  if (type === 'calendar') {
    const dayName = new Intl.DateTimeFormat('it-IT', { weekday: 'short' }).format(now);
    const dayNameCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    const dayNumber = now.getDate();

    content = (
      <div className="desktop-icon__calendar">
        <div className="desktop-icon__calendar-month">{dayNameCapitalized}</div>
        <div className="desktop-icon__calendar-day">{dayNumber}</div>
      </div>
    );
  } else {
    let src = '/icons/cartella.png';
    if (type === 'note') {
      src = '/icons/note.png';
    } else if (iconSrc) {
      src = iconSrc;
    }
    content = <img src={src} alt={`${label} icon`} className={`desktop-icon__png ${type === 'image' ? 'desktop-icon--image-thumb' : ''}`} draggable="false" />;
  }

  return (
    <button 
      className={`desktop-icon ${isDragging ? 'desktop-icon--dragging' : ''}`}
      style={{ left: position.x, top: position.y, zIndex: isDragging ? 100 : 1 }}
      type="button"
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <div className="desktop-icon__graphic">
        {content}
      </div>
      <span className="desktop-icon__label">{label}</span>
    </button>
  );
}
