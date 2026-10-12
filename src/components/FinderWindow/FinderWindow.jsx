import React from 'react';
import Window from '../Window/Window';
import './FinderWindow.css';

// SVG Icons
const Icons = {
  ChevronLeft: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>,
  ChevronRight: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Shared: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="2"></circle><path d="M12 15v3"></path></svg>,
  Apps: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="19" x2="13" y2="5" /><line x1="11" y1="5" x2="17" y2="19" /><line x1="4" y1="15" x2="18" y2="15" /></svg>,
  Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
  Desktop: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="3" ry="3"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
  Document: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  Cloud: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>,
  Home: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  View: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect></svg>,
  ChevronDown: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  Group: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="4" height="4" rx="1"></rect><rect x="10" y="4" width="4" height="4" rx="1"></rect><rect x="17" y="4" width="4" height="4" rx="1"></rect><rect x="3" y="11" width="4" height="4" rx="1"></rect><rect x="10" y="11" width="4" height="4" rx="1"></rect><rect x="17" y="11" width="4" height="4" rx="1"></rect><rect x="3" y="18" width="4" height="4" rx="1"></rect><rect x="10" y="18" width="4" height="4" rx="1"></rect><rect x="17" y="18" width="4" height="4" rx="1"></rect></svg>,
  Share: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>,
  Tag: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
  More: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Trash: () => <svg width="18" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>,
  GridCircleFill: () => <svg width="21" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2v20" /><path d="M2 12h20" /></svg>,
  RectangleGrid1x3: () => <svg width="22" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /><path d="M15 3v18" /></svg>,
  Folder: () => <img src={import.meta.env.BASE_URL + 'icons/cartella.png'} alt="Cartella" style={{ width: '48px', height: '48px', objectFit: 'contain' }} draggable="false" />
};

/**
 * A macOS Finder window perfectly replicating the provided UI.
 */
export default function FinderWindow({
  title = "Tom's Guide",
  initialX = 100,
  initialY = 80,
  width = 900,
  height = 500,
  onClose,
  onOpenFile, // New prop to notify parent when a file is double clicked
  onPathChange, // New prop to notify parent of active path
  folderId = 'mcdonalds',
  openTrigger,
  children
}) {
  // Virtual File System
  const [history, setHistory] = React.useState([['root']]);
  const [historyIndex, setHistoryIndex] = React.useState(0);
  const currentPath = history[historyIndex];

  const navigateTo = (newPath) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, newPath];
    });
    setHistoryIndex(prev => prev + 1);
  };

  const vfsData = {
    'mcdonalds': {
      'root': [
        { id: 'crispy_revelation', name: '01_CRISPY\nREVELATION', type: 'folder' },
        { id: 'mcd_02_strips___tutto_per_il_dip', name: '02_STRIPS -\nTUTTO PER IL DIP', type: 'folder' },
        { id: 'mcd_03_winterdays_social', name: '03_WINTERDAYS\n_SOCIAL', type: 'folder' },
        { id: 'mcd_04_ped', name: '04_PED', type: 'folder' },

      ],
      'crispy_revelation': [
        { id: 'mcd_crispy_tvc', name: '01_TVC', type: 'folder' },
        { id: 'mcd_crispy_ooh', name: '02_OOH', type: 'folder' },
        { id: 'mcd_05_social', name: '03_SOCIAL', type: 'folder' }
      ],
      'mcd_crispy_tvc': [
        { id: 'v1', name: 'McD_Crispy_15sec_Club.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Club.mp4' },
        { id: 'v2', name: 'McD_Crispy_15sec_Corsa.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Corsa.mp4' },
        { id: 'v3', name: 'McD_Crispy_15sec_Famiglia.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Famiglia.mp4' },
        { id: 'v4', name: 'McD_Crispy_15sec_Ufficio.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Ufficio.mp4' }
      ],
      'mcd_crispy_ooh': [
        { id: 'ooh1', name: 'crispy1.png', type: 'image-viewer', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy1.png' },
        { id: 'ooh2', name: 'crispy2.png', type: 'image-viewer', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy2.png' },
        { id: 'ooh3', name: 'crispy3.png', type: 'image-viewer', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy3.png' },
        { id: 'ooh4', name: 'crispy4.png', type: 'image-viewer', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy4.png' },
        { id: 'ooh5', name: 'crispy5.png', type: 'image-viewer', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy5.png' }
      ],
      'mcd_02_strips___tutto_per_il_dip_01_tvc': [
        { id: 'mcd_02_strips___tutto_per_il_dip_01_tvc_nuove_mccrunchy_chicken_strips___tutto_per_il_dipmp4', name: `Nuove McCrunchy™ Chicken Strips - Tutto per il dip.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/01_TVC/Nuove McCrunchy™ Chicken Strips - Tutto per il dip.mp4` },
      ],
      'mcd_02_strips___tutto_per_il_dip_02_teaser': [
        { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser_png', name: `MISTERO.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/02_TEASER/MISTERO.png` },
        { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser_che_succedemp4', name: `Che succede.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/02_TEASER/Che succede.mp4` },
        { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser_gazzoli_reelmp4', name: `Gazzoli_reel.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/02_TEASER/Gazzoli_reel.mp4` },
        { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser_prelanciomp4', name: `PRELANCIO.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/02_TEASER/PRELANCIO.mp4` },
        { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser_qualcuno_ha_indizimp4', name: `QUALCUNO HA INDIZI.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/02_TEASER/QUALCUNO HA INDIZI.mp4` },
        { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser_stay_tunedmp4', name: `STAY TUNED.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/02_TEASER/STAY TUNED.mp4` },
      ],
      'mcd_02_strips___tutto_per_il_dip_03_lancio_carousel_ig': [
        { id: 'mcd_02_strips___tutto_per_il_dip_03_lancio_carousel_ig_1png', name: `1.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/03_LANCIO/CAROUSEL IG/1.png` },
        { id: 'mcd_02_strips___tutto_per_il_dip_03_lancio_carousel_ig_2png', name: `2.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/03_LANCIO/CAROUSEL IG/2.png` },
        { id: 'mcd_02_strips___tutto_per_il_dip_03_lancio_carousel_ig_3png', name: `3.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/03_LANCIO/CAROUSEL IG/3.png` },
      ],
      'mcd_02_strips___tutto_per_il_dip_03_lancio_fb': [
        { id: 'mcd_02_strips___tutto_per_il_dip_03_lancio_fb_cardpng', name: `CARD.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/03_LANCIO/FB/CARD.png` },
      ],
      'mcd_02_strips___tutto_per_il_dip_03_lancio_reel': [
        { id: 'mcd_02_strips___tutto_per_il_dip_03_lancio_reel_professionisti_del_dipmp4', name: `PROFESSIONISTI DEL DIP.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/03_LANCIO/REEL/PROFESSIONISTI DEL DIP.mp4` },
        { id: 'mcd_02_strips___tutto_per_il_dip_03_lancio_reel_prova_a_non_dipparemp4', name: `PROVA A NON DIPPARE.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/03_LANCIO/REEL/PROVA A NON DIPPARE.mp4` },
      ],
      'mcd_02_strips___tutto_per_il_dip_03_lancio': [
        { id: 'mcd_02_strips___tutto_per_il_dip_03_lancio_carousel_ig', name: 'CAROUSEL IG', type: 'folder' },
        { id: 'mcd_02_strips___tutto_per_il_dip_03_lancio_fb', name: 'FB', type: 'folder' },
        { id: 'mcd_02_strips___tutto_per_il_dip_03_lancio_reel', name: 'REEL', type: 'folder' },
      ],
      'mcd_02_strips___tutto_per_il_dip_04_filtro_tiktok': [
        { id: 'mcd_02_strips___tutto_per_il_dip_04_filtro_tiktok_dippa_la_strips_ttmp4', name: `DIPPA LA STRIPS_TT.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/04_FILTRO TIKTOK/DIPPA LA STRIPS_TT.mp4` },
      ],
      'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_carousel_ig': [
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_carousel_ig_1png', name: `1.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/CAROUSEL IG/1.png` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_carousel_ig_2png', name: `2.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/CAROUSEL IG/2.png` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_carousel_ig_3png', name: `3.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/CAROUSEL IG/3.png` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_carousel_ig_4png', name: `4.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/CAROUSEL IG/4.png` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_carousel_ig_5png', name: `5.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/CAROUSEL IG/5.png` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_carousel_ig_6png', name: `6.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/CAROUSEL IG/6.png` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_carousel_ig_7png', name: `7.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/CAROUSEL IG/7.png` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_carousel_ig_8png', name: `8.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/CAROUSEL IG/8.png` },
      ],
      'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker': [
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_dip_eramp4', name: `DIP ERA.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/DIP ERA.mp4` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_dippandomp4', name: `DIPPANDO.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/DIPPANDO.mp4` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_dippamp4', name: `DIPPA.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/DIPPA.mp4` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_gatto_che_dippamp4', name: `GATTO CHE DIPPA.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/GATTO CHE DIPPA.mp4` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_guess_whatmp4', name: `GUESS WHAT.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/GUESS WHAT.mp4` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_libromp4', name: `LIBRO.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/LIBRO.mp4` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_top_amomp4', name: `TOP AMO.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/TOP AMO.mp4` },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_mp4', name: `🤌🏻.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/🤌🏻.mp4` },
      ],
      'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra': [
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_carousel_ig', name: 'CAROUSEL IG', type: 'folder' },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker', name: 'STICKER', type: 'folder' },
      ],
      'mcd_02_strips___tutto_per_il_dip': [
        { id: 'mcd_02_strips___tutto_per_il_dip_01_tvc', name: '01_TVC', type: 'folder' },
        { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser', name: '02_TEASER', type: 'folder' },
        { id: 'mcd_02_strips___tutto_per_il_dip_03_lancio', name: '03_LANCIO', type: 'folder' },
        { id: 'mcd_02_strips___tutto_per_il_dip_04_filtro_tiktok', name: '04_FILTRO TIKTOK', type: 'folder' },
        { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra', name: '05_CONTENUTI SOCIAL EXTRA', type: 'folder' },
      ],
      'mcd_03_winterdays_social_01_post_engagemet_carousel_ig': [
        { id: 'mcd_03_winterdays_social_01_post_engagemet_carousel_ig_1png', name: `1.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/03_WINTERDAYS_SOCIAL/01_POST ENGAGEMET/CAROUSEL IG/1.png` },
        { id: 'mcd_03_winterdays_social_01_post_engagemet_carousel_ig_2png', name: `2.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/03_WINTERDAYS_SOCIAL/01_POST ENGAGEMET/CAROUSEL IG/2.png` },
        { id: 'mcd_03_winterdays_social_01_post_engagemet_carousel_ig_3png', name: `3.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/03_WINTERDAYS_SOCIAL/01_POST ENGAGEMET/CAROUSEL IG/3.png` },
        { id: 'mcd_03_winterdays_social_01_post_engagemet_carousel_ig_4png', name: `4.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/03_WINTERDAYS_SOCIAL/01_POST ENGAGEMET/CAROUSEL IG/4.png` },
        { id: 'mcd_03_winterdays_social_01_post_engagemet_carousel_ig_5png', name: `5.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/03_WINTERDAYS_SOCIAL/01_POST ENGAGEMET/CAROUSEL IG/5.png` },
      ],
      'mcd_03_winterdays_social_01_post_engagemet_stories_carte': [
        { id: 'mcd_03_winterdays_social_01_post_engagemet_stories_carte_quale_carta_sceglimp4', name: `QUALE CARTA SCEGLI.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/03_WINTERDAYS_SOCIAL/01_POST ENGAGEMET/STORIES_CARTE/QUALE CARTA SCEGLI.mp4` },
        { id: 'mcd_03_winterdays_social_01_post_engagemet_stories_carte_risultatopng', name: `RISULTATO.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/03_WINTERDAYS_SOCIAL/01_POST ENGAGEMET/STORIES_CARTE/RISULTATO.png` },
      ],
      'mcd_03_winterdays_social_01_post_engagemet_stories_luce': [
        { id: 'mcd_03_winterdays_social_01_post_engagemet_stories_luce_1png', name: `1.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/03_WINTERDAYS_SOCIAL/01_POST ENGAGEMET/STORIES_LUCE/1.png` },
        { id: 'mcd_03_winterdays_social_01_post_engagemet_stories_luce_2png', name: `2.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/03_WINTERDAYS_SOCIAL/01_POST ENGAGEMET/STORIES_LUCE/2.png` },
        { id: 'mcd_03_winterdays_social_01_post_engagemet_stories_luce_3png', name: `3.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/03_WINTERDAYS_SOCIAL/01_POST ENGAGEMET/STORIES_LUCE/3.png` },
      ],
      'mcd_03_winterdays_social_01_post_engagemet': [
        { id: 'mcd_03_winterdays_social_01_post_engagemet_carousel_ig', name: 'CAROUSEL IG', type: 'folder' },
        { id: 'mcd_03_winterdays_social_01_post_engagemet_stories_carte', name: 'STORIES_CARTE', type: 'folder' },
        { id: 'mcd_03_winterdays_social_01_post_engagemet_stories_luce', name: 'STORIES_LUCE', type: 'folder' },
      ],
      'mcd_03_winterdays_social_02_post_love': [
      ],
      'mcd_03_winterdays_social': [
        { id: 'mcd_03_winterdays_social_01_post_engagemet', name: '01_POST ENGAGEMET', type: 'folder' },
        { id: 'mcd_03_winterdays_social_02_post_love', name: '02_POST LOVE', type: 'folder' },
      ],
      'mcd_04_ped_01_social_media_day': [
        { id: 'mcd_04_ped_01_social_media_day_1jpg', name: `1.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/01_SOCIAL MEDIA DAY/1.jpg` },
        { id: 'mcd_04_ped_01_social_media_day_2jpg', name: `2.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/01_SOCIAL MEDIA DAY/2.jpg` },
        { id: 'mcd_04_ped_01_social_media_day_3jpg', name: `3.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/01_SOCIAL MEDIA DAY/3.jpg` },
        { id: 'mcd_04_ped_01_social_media_day_4jpg', name: `4.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/01_SOCIAL MEDIA DAY/4.jpg` },
      ],
      'mcd_04_ped_02_sanremo_cose_da_fare': [
        { id: 'mcd_04_ped_02_sanremo_cose_da_fare_io_questa_settimana', name: `IO QUESTA SETTIMANA.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/02_SANREMO/COSE DA FARE/IO QUESTA SETTIMANA.png` },
      ],
      'mcd_04_ped_02_sanremo_fastidio': [
        { id: 'mcd_04_ped_02_sanremo_fastidio_1jpg', name: `1.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/02_SANREMO/FASTIDIO/1.jpg` },
        { id: 'mcd_04_ped_02_sanremo_fastidio_2jpg', name: `2.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/02_SANREMO/FASTIDIO/2.jpg` },
        { id: 'mcd_04_ped_02_sanremo_fastidio_3jpg', name: `3.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/02_SANREMO/FASTIDIO/3.jpg` },
      ],
      'mcd_04_ped_02_sanremo_teaser': [
        { id: 'mcd_04_ped_02_sanremo_teaser_la_settimana_perfetta', name: `LA SETTIMANA PERFETTA.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/02_SANREMO/TEASER/LA SETTIMANA PERFETTA.png` },
      ],
      'mcd_04_ped_02_sanremo': [
        { id: 'mcd_04_ped_02_sanremo_cose_da_fare', name: 'COSE DA FARE', type: 'folder' },
        { id: 'mcd_04_ped_02_sanremo_fastidio', name: 'FASTIDIO', type: 'folder' },
        { id: 'mcd_04_ped_02_sanremo_teaser', name: 'TEASER', type: 'folder' },
      ],
      'mcd_04_ped_03_matcha_carousel_ig': [
        { id: 'mcd_04_ped_03_matcha_carousel_ig_1jpg', name: `1.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/CAROUSEL IG/1.jpg` },
        { id: 'mcd_04_ped_03_matcha_carousel_ig_2jpg', name: `2.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/CAROUSEL IG/2.jpg` },
        { id: 'mcd_04_ped_03_matcha_carousel_ig_3_jpg', name: `3 .jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/CAROUSEL IG/3 .jpg` },
        { id: 'mcd_04_ped_03_matcha_carousel_ig_4jpg', name: `4.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/CAROUSEL IG/4.jpg` },
        { id: 'mcd_04_ped_03_matcha_carousel_ig_5jpg', name: `5.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/CAROUSEL IG/5.jpg` },
        { id: 'mcd_04_ped_03_matcha_carousel_ig_6jpg', name: `6.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/CAROUSEL IG/6.jpg` },
      ],
      'mcd_04_ped_03_matcha_tiktok': [
        { id: 'mcd_04_ped_03_matcha_tiktok_il_suono_del_matchamp4', name: `IL SUONO DEL MATCHA.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/TIKTOK/IL SUONO DEL MATCHA.mp4` },
      ],
      'mcd_04_ped_03_matcha': [
        { id: 'mcd_04_ped_03_matcha_carousel_ig', name: 'CAROUSEL IG', type: 'folder' },
        { id: 'mcd_04_ped_03_matcha_tiktok', name: 'TIKTOK', type: 'folder' },
      ],
      'mcd_04_ped_04_trend_messaggi': [
        { id: 'mcd_04_ped_04_trend_messaggi_1jpg', name: `1.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/MESSAGGI/1.jpg` },
        { id: 'mcd_04_ped_04_trend_messaggi_2jpg', name: `2.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/MESSAGGI/2.jpg` },
        { id: 'mcd_04_ped_04_trend_messaggi_3jpg', name: `3.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/MESSAGGI/3.jpg` },
        { id: 'mcd_04_ped_04_trend_messaggi_4jpg', name: `4.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/MESSAGGI/4.jpg` },
        { id: 'mcd_04_ped_04_trend_messaggi_5jpg', name: `5.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/MESSAGGI/5.jpg` },
      ],
      'mcd_04_ped_04_trend_scegli_il_posto': [
        { id: 'mcd_04_ped_04_trend_scegli_il_posto_dove_ti_siedijpg', name: `DOVE TI SIEDI.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/SCEGLI IL POSTO/DOVE TI SIEDI.jpg` },
      ],
      'mcd_04_ped_04_trend_six_seven': [
        { id: 'mcd_04_ped_04_trend_six_seven_1jpg', name: `1.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/SIX SEVEN/1.jpg` },
        { id: 'mcd_04_ped_04_trend_six_seven_2jpg', name: `2.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/SIX SEVEN/2.jpg` },
        { id: 'mcd_04_ped_04_trend_six_seven_3jpg', name: `3.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/SIX SEVEN/3.jpg` },
        { id: 'mcd_04_ped_04_trend_six_seven_4jpg', name: `4.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/SIX SEVEN/4.jpg` },
      ],
      'mcd_04_ped_04_trend_un_10_ma': [
        { id: 'mcd_04_ped_04_trend_un_10_ma_1jpg', name: `1.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/UN 10 MA.../1.jpg` },
        { id: 'mcd_04_ped_04_trend_un_10_ma_2jpg', name: `2.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/UN 10 MA.../2.jpg` },
        { id: 'mcd_04_ped_04_trend_un_10_ma_3jpg', name: `3.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/UN 10 MA.../3.jpg` },
        { id: 'mcd_04_ped_04_trend_un_10_ma_4jpg', name: `4.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/UN 10 MA.../4.jpg` },
        { id: 'mcd_04_ped_04_trend_un_10_ma_5jpg', name: `5.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/04_TREND/UN 10 MA.../5.jpg` },
      ],
      'mcd_04_ped_04_trend': [
        { id: 'mcd_04_ped_04_trend_messaggi', name: 'MESSAGGI', type: 'folder' },
        { id: 'mcd_04_ped_04_trend_scegli_il_posto', name: 'SCEGLI IL POSTO', type: 'folder' },
        { id: 'mcd_04_ped_04_trend_six_seven', name: 'SIX SEVEN', type: 'folder' },
        { id: 'mcd_04_ped_04_trend_un_10_ma', name: 'UN 10 MA...', type: 'folder' },
      ],
      'mcd_04_ped': [
        { id: 'mcd_04_ped_01_social_media_day', name: '01_SOCIAL MEDIA DAY', type: 'folder' },
        { id: 'mcd_04_ped_02_sanremo', name: '02_SANREMO', type: 'folder' },
        { id: 'mcd_04_ped_03_matcha', name: '03_MATCHA', type: 'folder' },
        { id: 'mcd_04_ped_04_trend', name: '04_TREND', type: 'folder' },
      ],
      'mcd_05_social_01_teaser': [
        { id: 'mcd_05_social_01_teaser_mi_dica_cosa_vedejpg', name: `MI DICA COSA VEDE.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/01_TEASER/MI DICA COSA VEDE.jpg` },
        { id: 'mcd_05_social_01_teaser_pronti_a_scoprirlo_reelmp4', name: `PRONTI A SCOPRIRLO_REEL.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/01_TEASER/PRONTI A SCOPRIRLO_REEL.mp4` },
      ],
      'mcd_05_social_02_lancio_carousel_ig': [
        { id: 'mcd_05_social_02_lancio_carousel_ig_1jpg', name: `1.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/02_LANCIO/CAROUSEL IG/1.jpg` },
        { id: 'mcd_05_social_02_lancio_carousel_ig_2jpg', name: `2.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/02_LANCIO/CAROUSEL IG/2.jpg` },
        { id: 'mcd_05_social_02_lancio_carousel_ig_3jpg', name: `3.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/02_LANCIO/CAROUSEL IG/3.jpg` },
        { id: 'mcd_05_social_02_lancio_carousel_ig_4jpg', name: `4.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/02_LANCIO/CAROUSEL IG/4.jpg` },
      ],
      'mcd_05_social_02_lancio_extra': [
        { id: 'mcd_05_social_02_lancio_extra_io_quandojpg', name: `IO QUANDO.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/02_LANCIO/EXTRA/IO QUANDO.jpg` },
        { id: 'mcd_05_social_02_lancio_extra_tutte_le_strade_portano_al_crispyjpg', name: `TUTTE LE STRADE PORTANO AL CRISPY.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/02_LANCIO/EXTRA/TUTTE LE STRADE PORTANO AL CRISPY.jpg` },
      ],
      'mcd_05_social_02_lancio': [
        { id: 'mcd_05_social_02_lancio_carousel_ig', name: 'CAROUSEL IG', type: 'folder' },
        { id: 'mcd_05_social_02_lancio_extra', name: 'EXTRA', type: 'folder' },
      ],
      'mcd_05_social_03_tiktok': [
        { id: 'mcd_05_social_03_tiktok_allenandomi_per_il_crispymp4', name: `ALLENANDOMI PER IL CRISPY.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/03_TIKTOK/ALLENANDOMI PER IL CRISPY.mp4` },
        { id: 'mcd_05_social_03_tiktok_il_crispy_di_post_seratamp4', name: `IL CRISPY DI POST SERATA.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/03_TIKTOK/IL CRISPY DI POST SERATA.mp4` },
        { id: 'mcd_05_social_03_tiktok_il_pensatoremp4', name: `IL PENSATORE.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/03_TIKTOK/IL PENSATORE.mp4` },
        { id: 'mcd_05_social_03_tiktok_il_segno_del_crispymp4', name: `IL SEGNO DEL CRISPY.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/03_TIKTOK/IL SEGNO DEL CRISPY.mp4` },
      ],
      'mcd_05_social': [
        { id: 'mcd_05_social_01_teaser', name: '01_TEASER', type: 'folder' },
        { id: 'mcd_05_social_02_lancio', name: '02_LANCIO', type: 'folder' },
        { id: 'mcd_05_social_03_tiktok', name: '03_TIKTOK', type: 'folder' },
      ],
    },
    '7days': {
      'root': [
        { id: 'abbiamo_vinto', name: 'ABBIAMO VINTO', type: 'folder' },
        { id: 'film', name: '01_TVC', type: 'folder' },
        { id: 'articoli', name: '02_ARTICOLI', type: 'folder' }
      ],
      'abbiamo_vinto': [],
      'film': [
        { id: 'f1', name: '7DAYSBRIEF_2025_Video mai pubblicato.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/7DAYSBRIEF_2025_Video mai pubblicato.mp4' }
      ],
      'articoli': []
    },
    'iliad': {
      'root': [
        { id: 'tvc', name: '01_TVC', type: 'folder' }
      ],
      'tvc': []
    },
    'orosaiwa': {
      'root': [
        { id: 'orosaiwa_tvc', name: '01_TVC', type: 'folder' }
      ],
      'orosaiwa_tvc': []
    }
  };

  const vfs = vfsData[folderId] || vfsData['mcdonalds'];
  const currentPathFolderId = currentPath[currentPath.length - 1];
  const items = vfs[currentPathFolderId] || [];

  React.useEffect(() => {
    if (onPathChange) {
      onPathChange(currentPathFolderId === 'root' ? folderId : currentPathFolderId, currentPath);
    }
  }, [currentPathFolderId, folderId, onPathChange, currentPath]);

  const handleItemDoubleClick = (item) => {
    if (folderId === 'mcdonalds') {
      if (item.type === 'folder') {
        // Check if folder has only media files (no subfolders) -> open directly
        const folderContents = vfs[item.id] || [];
        const hasSubfolders = folderContents.some(child => child.type === 'folder');
        if (folderContents.length > 0 && !hasSubfolders) {
          // Open the first item and pass the collection id
          const firstItem = folderContents[0];
          const hasImages = folderContents.some(child => child.type === 'image-viewer');
          const typeToLaunch = hasImages ? 'image-viewer' : firstItem.type;
          if (onOpenFile) {
            onOpenFile({ type: typeToLaunch, collection: item.id, title: item.name, src: firstItem.src });
          }
        } else {
          navigateTo([...currentPath, item.id]);
        }
      } else if ((item.type === 'video' || item.type === 'image-viewer') && onOpenFile) {
        // Direct file click - find which folder we're in for the collection
        onOpenFile({ type: item.type, collection: currentPathFolderId, title: item.name, src: item.src });
      }
    } else if (folderId === '7days') {
      if (item.id === 'abbiamo_vinto') {
        if (onOpenFile) {
          onOpenFile({ type: 'image-viewer', collection: '7days', title: 'ABBIAMO VINTO', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/06:11:25.jpg' });
        }
      } else if (item.id === 'film') {
        if (onOpenFile) {
          onOpenFile({ type: 'video', collection: '7days', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/7DAYSBRIEF_2025_Video mai pubblicato.mp4' });
        }
      } else if (item.id === 'articoli') {
        if (onOpenFile) {
          onOpenFile({ type: 'image-viewer', collection: 'articoli', title: '02_ARTICOLI', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Screenshot 2026-09-09 alle 21.54.57.png' });
        }
      } else if (item.type === 'folder') {
        navigateTo([...currentPath, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    } else if (folderId === 'iliad') {
      if (item.id === 'tvc') {
        if (onOpenFile) {
          onOpenFile({ type: 'video', collection: 'iliad', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/Poche cose sono per sempre_Benvenuta, Megan!.mp4' });
        }
      } else if (item.type === 'folder') {
        navigateTo([...currentPath, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    } else if (folderId === 'orosaiwa') {
      if (item.id === 'orosaiwa_tvc') {
        if (onOpenFile) {
          onOpenFile({ type: 'video', collection: 'orosaiwa', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/La TUA colazione ogni giorno_2026.mp4' });
        }
      } else if (item.type === 'folder') {
        navigateTo([...currentPath, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    } else {
      if (item.type === 'folder') {
        navigateTo([...currentPath, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
    }
  };


  // Custom titlebar rendering the top controls (Traffic Lights + Sidebar Header + Main Toolbar)
  const customTitlebar = ({ handleClose, handleMinimize, handleMaximize, isMaximized }) => (
    <div className="finder-sidebar">
      <div className="finder-sidebar-bg"></div>
      <div className="finder-sidebar-luminosity"></div>
      <div className="finder-sidebar-saturation"></div>

      <div className="finder-sidebar-composed">
        <div className="finder-traffic-lights-container">
          <div className="window__traffic-lights finder-traffic-lights">
            <button className="window__tl window__tl--close" onClick={handleClose} aria-label="Close">
              <svg width="6" height="6" viewBox="0 0 6 6"><path d="M.5.5l5 5m0-5l-5 5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round" /></svg>
            </button>
            <button className="window__tl window__tl--minimize" onClick={handleMinimize} aria-label="Minimize">
              <svg width="6" height="2" viewBox="0 0 6 2"><path d="M.5 1h5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round" /></svg>
            </button>
            <button className="window__tl window__tl--maximize" onClick={handleMaximize} aria-label="Maximize">
              <svg width="6" height="6" viewBox="0 0 8 8"><path d="M1 7V2.5C1 1.67 1.67 1 2.5 1H7" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round" /><path d="M7 1v4.5c0 .83-.67 1.5-1.5 1.5H1" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
        <div className="finder-sidebar-items">
          <div className="finder-sidebar__item">
            <div className="finder-sidebar__item-leading">
              <span className="finder-sidebar__item-icon"><Icons.Clock /></span>
              <span className="finder-sidebar__item-label">Recents</span>
            </div>
          </div>
          <div className="finder-sidebar__item">
            <div className="finder-sidebar__item-leading">
              <span className="finder-sidebar__item-icon"><Icons.Shared /></span>
              <span className="finder-sidebar__item-label">Shared</span>
            </div>
          </div>

          <div className="finder-sidebar__section">
            <div className="finder-sidebar__section-title">Favourites</div>
          </div>
          <div className="finder-sidebar__item">
            <div className="finder-sidebar__item-leading">
              <span className="finder-sidebar__item-icon"><Icons.Apps /></span>
              <span className="finder-sidebar__item-label">Applications</span>
            </div>
          </div>
          <div className="finder-sidebar__item">
            <div className="finder-sidebar__item-leading">
              <span className="finder-sidebar__item-icon"><Icons.Download /></span>
              <span className="finder-sidebar__item-label">Downloads</span>
            </div>
          </div>
          <div className="finder-sidebar__item">
            <div className="finder-sidebar__item-leading">
              <span className="finder-sidebar__item-icon"><Icons.Desktop /></span>
              <span className="finder-sidebar__item-label">Desktop</span>
            </div>
          </div>
          <div className="finder-sidebar__item">
            <div className="finder-sidebar__item-leading">
              <span className="finder-sidebar__item-icon"><Icons.Document /></span>
              <span className="finder-sidebar__item-label">Documents</span>
            </div>
          </div>

          <div className="finder-sidebar__section">
            <div className="finder-sidebar__section-title">Locations</div>
          </div>
          <div className="finder-sidebar__item">
            <div className="finder-sidebar__item-leading">
              <span className="finder-sidebar__item-icon"><Icons.Cloud /></span>
              <span className="finder-sidebar__item-label">iCloud Drive</span>
            </div>
          </div>
          <div className="finder-sidebar__item">
            <div className="finder-sidebar__item-leading">
              <span className="finder-sidebar__item-icon"><Icons.Home /></span>
              <span className="finder-sidebar__item-label">claudiamassimino</span>
            </div>
          </div>
          <div className="finder-sidebar__item">
            <div className="finder-sidebar__item-leading">
              <span className="finder-sidebar__item-icon"><Icons.Document /></span>
              <span className="finder-sidebar__item-label">LibreOffice</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Window
      title={title}
      initialX={initialX}
      initialY={initialY}
      width={840}
      height={400}
      onClose={onClose}
      customTitlebar={customTitlebar}
      className="finder-window-wrapper"
      openTrigger={openTrigger}
    >
      <div className="finder-main-area">
        <div className="finder-toolbar">
          <div className="finder-toolbar-scroll-edge"></div>

          <div className="finder-segmented-control-wrapper">
            <div className="finder-segmented-bg"></div>
            <div className="finder-segmented-glass"></div>
            <div className="finder-segmented-items">
              <button
                className={`finder-segmented-btn ${historyIndex === 0 ? 'disabled' : ''}`}
                onClick={handleBack}
              >
                <Icons.ChevronLeft />
              </button>
              <div className="finder-segmented-divider-container">
                <div className="finder-segmented-divider"></div>
              </div>
              <button
                className={`finder-segmented-btn ${historyIndex === history.length - 1 ? 'disabled' : ''}`}
                onClick={handleForward}
              >
                <Icons.ChevronRight />
              </button>
            </div>
          </div>

          <div className="finder-toolbar-title">
            <div className="finder-toolbar-title-text">{title}</div>
          </div>

          <div className="finder-toolbar-spacer"></div>

          <div className="finder-toolbar-button-group">
            <div className="finder-liquid-glass">
              <div className="finder-liquid-glass-fill"></div>
              <div className="finder-liquid-glass-glass"></div>
            </div>
            <div className="finder-toolbar-buttons">
              <span className="finder-toolbar-btn-icon finder-toolbar-btn-trash"><Icons.Trash /></span>
              <span className="finder-toolbar-btn-icon finder-toolbar-btn-square-up"><Icons.Share /></span>
              <span className="finder-toolbar-btn-icon finder-toolbar-btn-square-grid-3x3"><Icons.Group /></span>
              <span className="finder-toolbar-btn-icon finder-toolbar-btn-rectangle-grid"><Icons.RectangleGrid1x3 /></span>
              <span className="finder-toolbar-btn-icon finder-toolbar-btn-square-grid-2x2"><Icons.View /></span>
            </div>
          </div>

          <div className="finder-toolbar-search">
            <div className="finder-liquid-glass">
              <div className="finder-liquid-glass-fill"></div>
              <div className="finder-liquid-glass-glass"></div>
            </div>
            <span className="finder-toolbar-search-icon"><Icons.Search /></span>
            <span className="finder-toolbar-search-label">Search</span>
          </div>
        </div>

        <div className="finder-content-container">
          <div className="finder-content-grid">
            {[...items].sort((a, b) => a.name.localeCompare(b.name)).map(item => (
              <div
                key={item.id}
                className="finder-folder-item"
                onDoubleClick={() => handleItemDoubleClick(item)}
              >
                <div className="finder-folder-icon-wrapper">
                  {item.type === 'folder' ? <Icons.Folder /> : <svg width="48" height="48" viewBox="0 0 24 24" fill="#67b2f6" stroke="#fff" strokeWidth="1"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><polygon points="10 8 16 12 10 16 10 8" fill="#fff"></polygon></svg>}
                </div>
                <div className="finder-folder-label">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}
