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
  ],
  'mcd_02_strips___tutto_per_il_dip_01_tvc': [
    { id: 'mcd_02_strips___tutto_per_il_dip_01_tvc_nuove_mccrunchy_chicken_strips___tutto_per_il_dipmp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/01_TVC/Nuove McCrunchy™ Chicken Strips - Tutto per il dip.mp4`, name: `Nuove McCrunchy™ Chicken Strips - Tutto per il dip` },
  ],
  'mcd_02_strips___tutto_per_il_dip_02_teaser': [
    { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser_che_succedemp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/02_TEASER/Che succede.mp4`, name: `Che succede` },
    { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser_gazzoli_reelmp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/02_TEASER/Gazzoli_reel.mp4`, name: `Gazzoli_reel` },
    { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser_prelanciomp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/02_TEASER/PRELANCIO.mp4`, name: `PRELANCIO` },
    { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser_qualcuno_ha_indizimp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/02_TEASER/QUALCUNO HA INDIZI.mp4`, name: `QUALCUNO HA INDIZI` },
    { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser_stay_tunedmp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/02_TEASER/STAY TUNED.mp4`, name: `STAY TUNED` },
  ],
  'mcd_02_strips___tutto_per_il_dip_03_lancio_reel': [
    { id: 'mcd_02_strips___tutto_per_il_dip_03_lancio_reel_professionisti_del_dipmp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/03_LANCIO/REEL/PROFESSIONISTI DEL DIP.mp4`, name: `PROFESSIONISTI DEL DIP` },
    { id: 'mcd_02_strips___tutto_per_il_dip_03_lancio_reel_prova_a_non_dipparemp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/03_LANCIO/REEL/PROVA A NON DIPPARE.mp4`, name: `PROVA A NON DIPPARE` },
  ],
  'mcd_02_strips___tutto_per_il_dip_04_filtro_tiktok': [
    { id: 'mcd_02_strips___tutto_per_il_dip_04_filtro_tiktok_dippa_la_strips_ttmp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/04_FILTRO TIKTOK/DIPPA LA STRIPS_TT.mp4`, name: `DIPPA LA STRIPS_TT` },
  ],
  'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker': [
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_dip_eramp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/DIP ERA.mp4`, name: `DIP ERA` },
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_dippandomp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/DIPPANDO.mp4`, name: `DIPPANDO` },
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_dippiamomp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/DIPPIAMO?.mp4`, name: `DIPPIAMO?` },
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_gatto_che_dippamp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/GATTO CHE DIPPA.mp4`, name: `GATTO CHE DIPPA` },
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_guess_whatmp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/GUESS WHAT.mp4`, name: `GUESS WHAT` },
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_libromp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/LIBRO.mp4`, name: `LIBRO` },
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_top_amomp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/TOP AMO.mp4`, name: `TOP AMO` },
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_mp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/🤌🏻.mp4`, name: `🤌🏻` },
  ],
  'mcd_03_winterdays_social_01_post_engagemet_stories_carte': [
    { id: 'mcd_03_winterdays_social_01_post_engagemet_stories_carte_quale_carta_sceglimp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/03_WINTERDAYS_SOCIAL/01_POST ENGAGEMET/STORIES_CARTE/QUALE CARTA SCEGLI.mp4`, name: `QUALE CARTA SCEGLI` },
  ],
  'mcd_04_ped_03_matcha_tiktok': [
    { id: 'mcd_04_ped_03_matcha_tiktok_il_suono_del_matchamp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/TIKTOK/IL SUONO DEL MATCHA.mp4`, name: `IL SUONO DEL MATCHA` },
  ],
  'mcd_05_social_01_teaser': [
    { id: 'mcd_05_social_01_teaser_pronti_a_scoprirlo_reelmp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/01_TEASER/PRONTI A SCOPRIRLO_REEL.mp4`, name: `PRONTI A SCOPRIRLO_REEL` },
  ],
  'mcd_05_social_03_tiktok': [
    { id: 'mcd_05_social_03_tiktok_allenandomi_per_il_crispymp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/03_TIKTOK/ALLENANDOMI PER IL CRISPY.mp4`, name: `ALLENANDOMI PER IL CRISPY` },
    { id: 'mcd_05_social_03_tiktok_il_crispy_di_post_seratamp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/03_TIKTOK/IL CRISPY DI POST SERATA.mp4`, name: `IL CRISPY DI POST SERATA` },
    { id: 'mcd_05_social_03_tiktok_il_pensatoremp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/03_TIKTOK/IL PENSATORE.mp4`, name: `IL PENSATORE` },
    { id: 'mcd_05_social_03_tiktok_il_segno_del_crispymp4', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/03_TIKTOK/IL SEGNO DEL CRISPY.mp4`, name: `IL SEGNO DEL CRISPY` },
  ],
  'mcd_crispy_tvc': [
    { id: 'v1', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Club.mp4', name: 'McD_Crispy_15sec_Club' },
    { id: 'v2', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Corsa.mp4', name: 'McD_Crispy_15sec_Corsa' },
    { id: 'v3', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Famiglia.mp4', name: 'McD_Crispy_15sec_Famiglia' },
    { id: 'v4', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Ufficio.mp4', name: 'McD_Crispy_15sec_Ufficio' },
  ],
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
  const [windowSize, setWindowSize] = useState({ width: 1035, height: 635 });

  // Adapt window size to video dimensions
  const handleVideoMetadata = (e) => {
    const video = e.target;
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;
    
    const aspect = vw / vh;
    const MAX_W = Math.min(1200, window.innerWidth * 0.85);
    const MAX_H = Math.min(900, window.innerHeight * 0.85);
    const MIN_W = 400;
    const MIN_H = 400;
    
    let w = vw;
    let h = vh + 38;
    
    if (w > MAX_W || h > MAX_H) {
      if (aspect > MAX_W / MAX_H) {
        w = MAX_W;
        h = (MAX_W / aspect) + 38;
      } else {
        h = MAX_H;
        w = (MAX_H - 38) * aspect;
      }
    }
    
    if (w < MIN_W) { w = MIN_W; h = (MIN_W / aspect) + 38; }
    if (h < MIN_H) { h = MIN_H; w = (MIN_H - 38) * aspect; }
    
    setWindowSize({ width: Math.round(w), height: Math.round(h) });
    setDuration(video.duration);
  };

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

  const togglePlay = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(e => console.log(e));
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
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
      width={windowSize.width}
      height={windowSize.height}
      onClose={onClose}
      customTitlebar={customTitlebar}
      className="qt-window-wrapper"
    >
      <div className="qt-layout" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={togglePlay}>
        
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSrc(vid.src);
                  }}
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
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleVideoMetadata}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            src={currentSrc}
          />
          {/* Transparent overlay to guarantee click detection on the video area */}
          <div 
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, cursor: 'pointer' }}
            onClick={togglePlay}
          />

          {/* Floating Controls */}
          <div className={`qt-controls-container ${showControls ? 'visible' : ''}`}>
            <div className="qt-controls-panel" onClick={(e) => e.stopPropagation()}>
              
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
