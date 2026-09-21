import { useState, useEffect, useCallback } from 'react';
import './FirstPage.css';

/**
 * FirstPage — Apple-style smooth left-to-right writing reveal.
 *
 * Uses a CSS mask-image gradient that sweeps horizontally across the SVG,
 * creating a smooth "ink appearing" effect from left to right.
 * Much smoother than stroke-dashoffset since it's a GPU-accelerated CSS animation.
 */

const GREETINGS = Array.from({ length: 16 }, (_, i) => `/svg_hello/hello${i + 1}.svg`);

const DRAW_DURATION = 1680;     // ms for the left-to-right reveal (+20%)
const PAUSE_AFTER_DRAW = 960;   // ms to hold fully visible (+20%)
const FADE_OUT_DURATION = 360;  // ms fade out (+20%)
const TOTAL_CYCLE = DRAW_DURATION + PAUSE_AFTER_DRAW + FADE_OUT_DURATION;

export default function FirstPage({ onEnter }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('revealing'); // 'revealing' | 'visible' | 'fading-out'
  const [showHint, setShowHint] = useState(false);

  /* Preload all SVGs to avoid flicker */
  useEffect(() => {
    GREETINGS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  /* Animation cycle */
  useEffect(() => {
    setPhase('revealing');

    const t1 = setTimeout(() => setPhase('visible'), DRAW_DURATION);
    const t2 = setTimeout(() => setPhase('fading-out'), DRAW_DURATION + PAUSE_AFTER_DRAW);
    const t3 = setTimeout(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, TOTAL_CYCLE);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [index]);

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
      {/* SVG greeting with smooth left-to-right reveal */}
      <img
        key={index}
        className={`first-page__greeting first-page__greeting--${phase}`}
        src={GREETINGS[index]}
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
