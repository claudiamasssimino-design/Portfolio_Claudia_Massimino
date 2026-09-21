import React from 'react';
import Window from '../Window/Window';
import './StickyNote.css';

export default function StickyNote({ onClose, initialX = 550, initialY = 250 }) {
  const customTitlebar = ({ handleClose }) => (
    <div className="sticky-note-toolbar">
      <button className="sticky-note-btn" onClick={handleClose} title="Chiudi">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1"><rect x="1" y="1" width="6" height="6"/></svg>
      </button>
      <div className="sticky-note-spacer" />
      <button className="sticky-note-btn" title="Espandi">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1"><path d="M1 7L7 1M4 1H7V4M1 4V7H4"/></svg>
      </button>
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
