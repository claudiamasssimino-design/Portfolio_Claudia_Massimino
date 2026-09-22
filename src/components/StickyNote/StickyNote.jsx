import React from 'react';
import Window from '../Window/Window';
import './StickyNote.css';

export default function StickyNote({ onClose, initialX = 550, initialY = 250 }) {
  const customTitlebar = ({ handleClose, handleMinimize, handleMaximize }) => (
    <div className="sticky-note-toolbar">
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
      <div className="sticky-note-spacer" />
    </div>
  );

  return (
    <Window
      title="Sticky Note"
      initialX={initialX}
      initialY={initialY}
      width={300}
      height={180}
      onClose={onClose}
      customTitlebar={customTitlebar}
      className="sticky-note-window"
    >
      <div className="sticky-note-content">
        <p className="sticky-note-text">
          <strong>ALTRE CARTELLE STANNO<br/>PER RIEMPIRSI 🤫</strong>
        </p>
        <p className="sticky-note-text">
          ...ma non posso ancora dirti tutto
        </p>
      </div>
    </Window>
  );
}
