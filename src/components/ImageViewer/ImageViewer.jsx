import React, { useState, useEffect } from 'react';
import Window from '../Window/Window';
import './ImageViewer.css';

const COLLECTIONS = {
  crispy: [
    { id: 'img1', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy1.png', name: 'crispy1.png' },
    { id: 'img2', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy2.png', name: 'crispy2.png' },
    { id: 'img3', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy3.png', name: 'crispy3.png' },
    { id: 'img4', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy4.png', name: 'crispy4.png' },
    { id: 'img5', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy5.png', name: 'crispy5.png' }
  ],
  '7days': [
    { id: 'img1', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/06:11:25.jpg', name: '06:11:25.jpg' },
    { id: 'img2', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Vincitori_7DAYSBRIEF_2025.JPG', name: 'Vincitori_7DAYSBRIEF_2025.JPG' }
  ],
  'articoli': [
    { id: 'img3', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Screenshot 2026-09-09 alle 21.54.57.png', name: 'Screenshot 2026-09-09 alle 21.54.57.png' },
    { id: 'img4', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/screen_vanityfair.png', name: 'screen_vanityfair.png' }
  ],
  'ped': [
    { id: 'p1', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/WD_PL_1.png', name: 'WD_PL_1.png' },
    { id: 'p2', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/SM_DAY.png', name: 'SM_DAY.png' },
    { id: 'p3', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Sanremo_1.png', name: 'Sanremo_1.png' },
    { id: 'p4', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Sanremo_2.png', name: 'Sanremo_2.png' },
    { id: 'p5', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Launch_Matcha.png', name: 'Launch_Matcha.png' },
    { id: 'p6', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/10_10_MA.png', name: '10/10_MA.png' }
  ],
  'pastelli': [
    { id: 'img1', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Prima di Photoshop usavo i pastelli.png', name: 'Prima di Photoshop usavo i pastelli.png' }
  ]
};

export default function ImageViewer({ 
  initialSrc, 
  collection = 'crispy', 
  sidebarTitle = 'CRISPY OOH', 
  initialWidth,
  initialHeight,
  initialX = 250,
  initialY = 80,
  onClose 
}) {
  const images = COLLECTIONS[collection] || COLLECTIONS['crispy'];
  const hasMultipleImages = images.length > 1;
  const [currentSrc, setCurrentSrc] = useState(initialSrc || images[0].src);
  
  // Initial size: for pastelli, 810x567 (landscape orientation) or custom dimensions
  const defaultW = initialWidth || (collection === 'pastelli' ? 810 : 900);
  const defaultH = initialHeight || (collection === 'pastelli' ? 567 : 600);
  const [windowSize, setWindowSize] = useState({ width: defaultW, height: defaultH });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  useEffect(() => {
    if (initialWidth && initialHeight) {
      setWindowSize({ width: initialWidth, height: initialHeight });
      return;
    }

    if (collection === 'pastelli') {
      setWindowSize({ width: 810, height: 567 });
      return;
    }

    // When image changes, load it to get natural dimensions
    const img = new Image();
    img.src = currentSrc;
    img.onload = () => {
      // Calculate best window size based on natural aspect ratio
      const naturalAspect = img.naturalWidth / img.naturalHeight;
      const MAX_WIDTH = Math.min(1200, window.innerWidth * 0.85);
      const MAX_HEIGHT = Math.min(950, window.innerHeight * 0.85);
      const MIN_WIDTH = 500;
      const MIN_HEIGHT = 500;

      let newWidth = img.naturalWidth;
      let newHeight = img.naturalHeight + 38; // add titlebar height

      // Scale down if too large
      if (newWidth > MAX_WIDTH || newHeight > MAX_HEIGHT) {
        if (naturalAspect > (MAX_WIDTH / MAX_HEIGHT)) {
          newWidth = MAX_WIDTH;
          newHeight = (MAX_WIDTH / naturalAspect) + 38;
        } else {
          newHeight = MAX_HEIGHT;
          newWidth = (MAX_HEIGHT - 38) * naturalAspect;
        }
      }

      // Scale up if too small
      if (newWidth < MIN_WIDTH || newHeight < MIN_HEIGHT) {
        if (naturalAspect < (MIN_WIDTH / MIN_HEIGHT)) {
          newHeight = MIN_HEIGHT;
          newWidth = (MIN_HEIGHT - 38) * naturalAspect;
        } else {
          newWidth = MIN_WIDTH;
          newHeight = (MIN_WIDTH / naturalAspect) + 38;
        }
      }

      setWindowSize({ width: Math.round(newWidth), height: Math.round(newHeight) });
    };
  }, [currentSrc, initialWidth, initialHeight, collection]);

  const handleKeyDown = (e) => {
    if (!hasMultipleImages) return;
    const currentIndex = images.findIndex(img => img.src === currentSrc);
    if (currentIndex === -1) return;

    if (e.key === 'ArrowRight') {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentSrc(images[nextIndex].src);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setCurrentSrc(images[prevIndex].src);
    }
  };

  const handleMouseMove = () => {
    if (!hasMultipleImages) return;
    setSidebarVisible(true);
    if (hideTimeout) clearTimeout(hideTimeout);
    const timeout = setTimeout(() => {
      setSidebarVisible(false);
    }, 2500);
    setHideTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (!hasMultipleImages) return;
    setSidebarVisible(false);
  };

  const currentImageName = currentSrc.split('/').pop();

  const customTitlebar = ({ handleClose, handleMinimize, handleMaximize }) => (
    <div className="iv-titlebar" onMouseMove={hasMultipleImages ? handleMouseMove : undefined}>
      <div className="window__traffic-lights iv-traffic-lights">
        <button className="window__tl window__tl--close" onClick={handleClose}>
          <svg width="6" height="6" viewBox="0 0 6 6"><path d="M.5.5l5 5m0-5l-5 5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </button>
        <button className="window__tl window__tl--minimize" onClick={handleMinimize}>
          <svg width="6" height="2" viewBox="0 0 6 2"><path d="M.5 1h5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </button>
        <button className="window__tl window__tl--maximize" onClick={handleMaximize}>
          <svg width="6" height="6" viewBox="0 0 8 8"><path d="M1 7V2.5C1 1.67 1.67 1 2.5 1H7" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round"/><path d="M7 1v4.5c0 .83-.67 1.5-1.5 1.5H1" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div className="iv-titlebar-title">{currentImageName}</div>
    </div>
  );

  return (
    <Window
      title={currentImageName}
      initialX={initialX}
      initialY={initialY}
      width={windowSize.width}
      height={windowSize.height}
      onClose={onClose}
      customTitlebar={customTitlebar}
      className="iv-window-wrapper"
      onKeyDown={handleKeyDown}
    >
      <div 
        className="iv-layout" 
        onMouseMove={hasMultipleImages ? handleMouseMove : undefined} 
        onMouseLeave={hasMultipleImages ? handleMouseLeave : undefined}
      >
        {/* Left Sidebar for thumbnails (only when there are multiple images) */}
        {hasMultipleImages && (
          <div className={`iv-sidebar ${sidebarVisible ? 'visible' : ''}`}>
            <div className="iv-sidebar-title">{sidebarTitle}</div>
            <div className="iv-sidebar-list">
              {images.map((img) => (
                <div 
                  key={img.id} 
                  className={`iv-sidebar-item ${currentSrc === img.src ? 'active' : ''}`}
                  onClick={() => setCurrentSrc(img.src)}
                >
                  <img src={img.src} className="iv-sidebar-thumb" alt={img.name} draggable="false" />
                  <div className="iv-sidebar-label">{img.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Area */}
        <div className="iv-player-area">
          <img 
            className="iv-image-element"
            src={currentSrc}
            alt={currentImageName}
            draggable="false"
            style={collection === 'pastelli' ? { 
              transform: 'rotate(-90deg)',
              width: `${windowSize.height - 38}px`,
              height: `${windowSize.width}px`
            } : {}}
          />
        </div>
      </div>
    </Window>
  );
}
