import React, { useState, useRef, useEffect } from 'react';
import Window from '../Window/Window';
import './MapsApp.css';

export default function MapsApp({ onClose, initialX = 150, initialY = 100 }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isDraggingState, setIsDraggingState] = useState(false);
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const mapAreaRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: position.x,
      originY: position.y
    };
    setIsDraggingState(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragRef.current.isDragging) return;
      const d = dragRef.current;
      
      let newX = d.originX + (e.clientX - d.startX);
      let newY = d.originY + (e.clientY - d.startY);
      
      if (mapAreaRef.current) {
        const container = mapAreaRef.current.getBoundingClientRect();
        // Image is 125% of container width/height
        const minX = container.width * -0.25;
        const minY = container.height * -0.25;
        
        if (newX > 0) newX = 0;
        if (newX < minX) newX = minX;
        if (newY > 0) newY = 0;
        if (newY < minY) newY = minY;
      }
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (dragRef.current.isDragging) {
        dragRef.current.isDragging = false;
        setIsDraggingState(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const customTitlebar = ({ handleClose, handleMinimize, handleMaximize }) => (
    <div className="maps-titlebar">
      <div className="window__traffic-lights">
        <button className="window__tl window__tl--close" onClick={handleClose} aria-label="Close">
          <svg width="6" height="6" viewBox="0 0 6 6"><path d="M.5.5l5 5m0-5l-5 5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </button>
        <button className="window__tl window__tl--minimize" onClick={handleMinimize} aria-label="Minimize">
          <svg width="6" height="2" viewBox="0 0 6 2"><path d="M.5 1h5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </button>
        <button className="window__tl window__tl--maximize" onClick={handleMaximize} aria-label="Maximize">
          <svg width="6" height="6" viewBox="0 0 8 8"><path d="M1 7V2.5C1 1.67 1.67 1 2.5 1H7" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round"/><path d="M7 1v4.5c0 .83-.67 1.5-1.5 1.5H1" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div className="maps-toolbar">
        <div className="maps-sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
        </div>
        <div className="maps-search-bar">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input type="text" placeholder="Cerca in Mappe" defaultValue="Afragola" readOnly />
        </div>
        <div className="maps-toolbar-spacer"></div>
      </div>
    </div>
  );

  return (
    <Window
      title="Mappe"
      initialX={initialX}
      initialY={initialY}
      width={913}
      height={666}
      onClose={onClose}
      customTitlebar={customTitlebar}
      className="maps-window"
    >
      <div className="maps-content">
        {isSidebarOpen && (
          <div className="maps-sidebar">
            <div className="maps-sidebar-header">
              <h2>Afragola</h2>
              <div className="maps-sidebar-subtitle">Città metropolitana di Napoli</div>
            </div>
            <div className="maps-sidebar-img-wrapper">
               <img src={`${import.meta.env.BASE_URL}Afragola.png`} className="maps-sidebar-thumb" alt="Afragola Thumb" />
            </div>
            <div className="maps-sidebar-info">
               <p>Afragola è un comune italiano di 61 432 abitanti della città metropolitana di Napoli in Campania.</p>
               <br />
               <p>Posizione: 80021 Afragola NA Italia</p>
               <p>Coordinate: 40,92318° N, 14,31036° E</p>
            </div>
          </div>
        )}
        <div className="maps-map-area" ref={mapAreaRef}>
          <img 
            src={`${import.meta.env.BASE_URL}Afragola.png`} 
            alt="Mappa di Afragola" 
            className="maps-map-image" 
            style={{ 
              transform: `translate(${position.x}px, ${position.y}px)`,
              cursor: isDraggingState ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
          />
        </div>
      </div>
    </Window>
  );
}
