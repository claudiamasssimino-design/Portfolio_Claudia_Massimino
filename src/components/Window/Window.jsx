import { useState, useRef, useCallback, useEffect } from 'react';
import './Window.css';

/**
 * Window — macOS Preview-style window with toolbar.
 * Matches the Figma reference: light gray titlebar/toolbar with traffic lights,
 * breadcrumb title, and toolbar icons.
 */
let globalZIndex = 10;

export default function Window({
  title = 'Untitled',
  children,
  initialX = 80,
  initialY = 60,
  width: initialWidth = 640,
  height: initialHeight = 480,
  onClose,
  customTitlebar,
  className = '',
  onKeyDown,
  openTrigger,
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ w: initialWidth, h: initialHeight });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [zIndex, setZIndex] = useState(globalZIndex);

  useEffect(() => {
    if (!isMaximized) {
      setSize({ w: initialWidth, h: initialHeight });
    }
  }, [initialWidth, initialHeight, isMaximized]);

  const preMaxRef = useRef({ position: { x: initialX, y: initialY }, size: { w: initialWidth, h: initialHeight } });
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const windowRef = useRef(null);

  const focusWindow = useCallback(() => {
    globalZIndex += 1;
    setZIndex(globalZIndex);
    if (windowRef.current) {
      windowRef.current.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    focusWindow();
  }, [focusWindow]);

  useEffect(() => {
    if (openTrigger) {
      setIsMinimized(false);
      focusWindow();
    }
  }, [openTrigger, focusWindow]);

  /* ── Drag handlers ─────────────────────────────────────── */
  const handleMouseDown = useCallback((e) => {
    focusWindow();
    if (isMaximized) return;
    e.preventDefault();
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: position.x,
      originY: position.y,
    };
    document.body.style.cursor = 'grabbing';
  }, [position, isMaximized]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const d = dragRef.current;
      if (!d.isDragging) return;
      setPosition({ x: d.originX + (e.clientX - d.startX), y: d.originY + (e.clientY - d.startY) });
    };
    const handleMouseUp = () => {
      if (dragRef.current.isDragging) {
        dragRef.current.isDragging = false;
        document.body.style.cursor = '';
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  /* ── Traffic light actions ─────────────────────────────── */
  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onClose) onClose();
  }, [onClose]);

  const handleMinimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const handleMaximize = useCallback(() => {
    if (isMaximized) {
      setPosition(preMaxRef.current.position);
      setSize(preMaxRef.current.size);
      setIsMaximized(false);
    } else {
      preMaxRef.current = { position: { ...position }, size: { ...size } };
      setPosition({ x: 0, y: 0 });
      setSize({ w: window.innerWidth, h: window.innerHeight });
      setIsMaximized(true);
    }
  }, [isMaximized, position, size]);

  if (!isVisible) return null;

  return (
    <div
      ref={windowRef}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className={`window ${isMaximized ? 'window--maximized' : ''} ${isMinimized ? 'window--minimized' : ''} ${className}`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : size.w,
        height: isMaximized ? '100%' : size.h,
        zIndex: zIndex,
      }}
      role="dialog"
      aria-label={title}
      onMouseDown={focusWindow}
    >
      {/* ── Title bar (light, macOS Preview-style) ──────────── */}
      {customTitlebar ? (
        <div className="window__custom-titlebar-wrapper" onMouseDown={handleMouseDown}>
          {customTitlebar({ handleClose, handleMinimize, handleMaximize, isMaximized })}
        </div>
      ) : (
        <div className="window__titlebar" onMouseDown={handleMouseDown}>
          {/* Traffic lights */}
          <div className="window__traffic-lights">
            <button
              className="window__tl window__tl--close"
              onClick={handleClose}
              aria-label="Close window"
            >
              <svg width="6" height="6" viewBox="0 0 6 6"><path d="M.5.5l5 5m0-5l-5 5" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <button
              className="window__tl window__tl--minimize"
              onClick={handleMinimize}
              aria-label="Minimize window"
            >
              <svg width="6" height="2" viewBox="0 0 6 2"><path d="M.5 1h5" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <button
              className="window__tl window__tl--maximize"
              onClick={handleMaximize}
              aria-label="Maximize window"
            >
              <svg width="6" height="6" viewBox="0 0 8 8">
                <path d="M1 1 L4 1 L1 4 Z M7 7 L4 7 L7 4 Z" fill="rgba(0,0,0,0.6)"/>
              </svg>
            </button>
          </div>

          {/* Breadcrumb-style title */}
          <div className="window__breadcrumb">
            <span className="window__breadcrumb-text">{title}</span>
          </div>
        </div>
      )}



      {/* ── Content ────────────────────────────────────────── */}
      <div className="window__content">
        {children}
      </div>
    </div>
  );
}


