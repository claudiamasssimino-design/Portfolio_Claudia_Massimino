import React, { useState, useRef, useEffect } from 'react';
import Window from '../Window/Window';
import './QuickTimePlayer.css';

const VIDEO_COLLECTIONS = {
  crispy: [
    { id: 'v1', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Club.mp4', name: 'McD_Crispy_15sec_Club' },
    { id: 'v2', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Corsa.mp4', name: 'McD_Crispy_15sec_Corsa' },
    { id: 'v3', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Famiglia.mp4', name: 'McD_Crispy_15sec_Famiglia' },
    { id: 'v4', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Ufficio.mp4', name: 'McD_Crispy_15sec_Ufficio' }
  ],
  '7days': [
    { id: 'f1', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/7DAYSBRIEF_2025_Video mai pubblicato.mp4', name: '7DAYSBRIEF_2025_Video mai pubblicato' }
  ],
  'iliad': [
    { id: 'i1', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/Poche cose sono per sempre_Benvenuta, Megan!.mp4', name: 'Poche cose sono per sempre_Benvenuta, Megan!' },
    { id: 'i2', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/Poche cose sono per sempre_parlano i fatti.mp4', name: 'Poche cose sono per sempre_parlano i fatti' }
  ],
  'orosaiwa': [
    { id: 'o1', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/La TUA colazione ogni giorno_2026.mp4', name: 'La TUA colazione ogni giorno_2026' }
  ]
};

export default function QuickTimePlayer({ initialSrc, collection = 'crispy', onClose }) {
  const videos = VIDEO_COLLECTIONS[collection] || [{ id: 'custom', src: initialSrc, name: initialSrc.split('/').pop() }];
  const hasSidebar = videos.length > 1;
  const [currentSrc, setCurrentSrc] = useState(initialSrc || videos[0].src);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  
  const videoRef = useRef(null);
  const hideControlsTimeout = useRef(null);

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  const handleMouseLeave = () => {
    if (isPlaying) setShowControls(false);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = currentSrc;
      videoRef.current.play().catch(e => console.log('Auto-play prevented', e));
      setIsPlaying(true);
    }
  }, [currentSrc]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (timeInSeconds) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentVideoName = currentSrc.split('/').pop();

  const customTitlebar = ({ handleClose, handleMinimize, handleMaximize }) => (
    <div className="qt-titlebar" onMouseMove={handleMouseMove}>
      <div className="window__traffic-lights qt-traffic-lights">
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
      <div className="qt-titlebar-title">{currentVideoName}</div>
    </div>
  );

  return (
    <Window
      title={currentVideoName}
      initialX={200}
      initialY={100}
      width={1035}
      height={635}
      onClose={onClose}
      customTitlebar={customTitlebar}
      className="qt-window-wrapper"
    >
      <div className="qt-layout" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        
        {/* Left Sidebar for thumbnails */}
        {hasSidebar && (
          <div className={`qt-sidebar ${showControls ? 'visible' : ''}`}>
            <div className="qt-sidebar-title">
              {collection.toUpperCase()} VIDEOS
            </div>
            <div className="qt-sidebar-list">
              {videos.map((vid) => (
                <div 
                  key={vid.id} 
                  className={`qt-sidebar-item ${currentSrc === vid.src ? 'active' : ''}`}
                  onClick={() => setCurrentSrc(vid.src)}
                >
                  <video src={`${vid.src}#t=0.1`} className="qt-sidebar-thumb" muted preload="metadata" />
                  <div className="qt-sidebar-label">{vid.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Player Area */}
        <div className="qt-player-area">
          <video 
            ref={videoRef}
            className="qt-video-element"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            src={currentSrc}
          />

          {/* Floating Controls */}
          <div className={`qt-controls-container ${showControls ? 'visible' : ''}`}>
            <div className="qt-controls-panel">
              
              <div className="qt-controls-row">
                <button className="qt-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.5 12 L21.5 18.5 L21.5 5.5 Z" />
                    <path d="M2.5 12 L11.5 18.5 L11.5 5.5 Z" />
                  </svg>
                </button>
                <button className="qt-btn qt-btn-play" onClick={togglePlay}>
                  {isPlaying ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4.5" height="16" rx="1.5"></rect>
                      <rect x="13.5" y="4" width="4.5" height="16" rx="1.5"></rect>
                    </svg>
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 4 L20 12 L7 20 Z" />
                    </svg>
                  )}
                </button>
                <button className="qt-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.5 12 L2.5 5.5 L2.5 18.5 Z" />
                    <path d="M21.5 12 L12.5 5.5 L12.5 18.5 Z" />
                  </svg>
                </button>
              </div>

              <div className="qt-progress-row">
                <span className="qt-time">{formatTime(currentTime)}</span>
                <input 
                  type="range" 
                  min="0" 
                  max={duration || 100} 
                  value={currentTime} 
                  onChange={handleSeek}
                  className="qt-scrubber"
                />
                <span className="qt-time">{formatTime(duration)}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
