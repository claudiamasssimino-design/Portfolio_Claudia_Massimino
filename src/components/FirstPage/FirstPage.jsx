import { useState, useEffect, useCallback } from 'react';
import './FirstPage.css';

/**
 * FirstPage
 * Displays a looping GIF for the hello animation.
 */

export default function FirstPage({ onEnter }) {
  const [showHint, setShowHint] = useState(false);

  /* Show hint after 1.5s */
  useEffect(() => {
    const hintTimer = setTimeout(() => setShowHint(true), 1500);
    return () => clearTimeout(hintTimer);
  }, []);

  const handleClick = useCallback(() => {
    if (onEnter) onEnter();
  }, [onEnter]);

  return (
    <div
      className="first-page"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Click to enter the portfolio desktop"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
    >
      {/* GIF greeting */}
      <img
        className="first-page__greeting"
        src={`${import.meta.env.BASE_URL}ue.gif`}
        alt="Greeting"
        draggable="false"
      />

      {/* Subtitle text at bottom */}
      <div className={`first-page__subtitle ${showHint ? 'first-page__subtitle--visible' : ''}`}>
        <p className="first-page__subtitle-line">
          O anche "hello", "bonjour", "hola", "hallo", "olá", "こんにちは", "ciao".
        </p>
        <p className="first-page__subtitle-line">
          Ora che ci siamo capiti, benvenuti nel mio portfolio.
        </p>
        <p className="first-page__subtitle-line first-page__subtitle-line--cta">
          Clicca per entrare.
        </p>
      </div>
    </div>
  );
}
