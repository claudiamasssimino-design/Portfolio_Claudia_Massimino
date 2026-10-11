import React, { useState, useEffect, useRef } from 'react';
import Window from '../Window/Window';
import './ImageViewer.css';
import '../QuickTimePlayer/QuickTimePlayer.css';

const COLLECTIONS = {
  crispy: [
    { id: 'img1', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy1.png', name: 'crispy1.png' },
    { id: 'img2', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy2.png', name: 'crispy2.png' },
    { id: 'img3', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy3.png', name: 'crispy3.png' },
    { id: 'img4', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy4.png', name: 'crispy4.png' },
    { id: 'img5', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy5.png', name: 'crispy5.png' }
  ],
  mcd_crispy_ooh: [
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
  'mcd_02_strips___tutto_per_il_dip_01_tvc': [
    { id: 'mcd_02_strips___tutto_per_il_dip_01_tvc_nuove_mccrunchy_chicken_strips___tutto_per_il_dipmp4', name: `Nuove McCrunchy™ Chicken Strips - Tutto per il dip.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/01_TVC/Nuove McCrunchy™ Chicken Strips - Tutto per il dip.mp4` },
  ],
  'mcd_02_strips___tutto_per_il_dip_02_teaser': [
    { id: 'mcd_02_strips___tutto_per_il_dip_02_teaser_png', name: `mistero.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/02_TEASER/mistero.png` },
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
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_dippiamomp4', name: `DIPPIAMO?.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/DIPPIAMO?.mp4` },
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_gatto_che_dippamp4', name: `GATTO CHE DIPPA.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/GATTO CHE DIPPA.mp4` },
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_guess_whatmp4', name: `GUESS WHAT.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/GUESS WHAT.mp4` },
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_libromp4', name: `LIBRO.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/LIBRO.mp4` },
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_top_amomp4', name: `TOP AMO.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/TOP AMO.mp4` },
    { id: 'mcd_02_strips___tutto_per_il_dip_05_contenuti_social_extra_sticker_mp4', name: `🤌🏻.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/02_STRIPS - TUTTO PER IL DIP/05_CONTENUTI SOCIAL EXTRA/STICKER/🤌🏻.mp4` },
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
  'mcd_04_ped_01_social_media_day': [
    { id: 'mcd_04_ped_01_social_media_day_1jpg', name: `1.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/01_SOCIAL MEDIA DAY/1.jpg` },
    { id: 'mcd_04_ped_01_social_media_day_2jpg', name: `2.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/01_SOCIAL MEDIA DAY/2.jpg` },
    { id: 'mcd_04_ped_01_social_media_day_3jpg', name: `3.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/01_SOCIAL MEDIA DAY/3.jpg` },
    { id: 'mcd_04_ped_01_social_media_day_4jpg', name: `4.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/01_SOCIAL MEDIA DAY/4.jpg` },
  ],
  'mcd_04_ped_02_sanremo_fastidio': [
    { id: 'mcd_04_ped_02_sanremo_fastidio_1jpg', name: `1.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/02_SANREMO/FASTIDIO/1.jpg` },
    { id: 'mcd_04_ped_02_sanremo_fastidio_2jpg', name: `2.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/02_SANREMO/FASTIDIO/2.jpg` },
    { id: 'mcd_04_ped_02_sanremo_fastidio_3jpg', name: `3.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/02_SANREMO/FASTIDIO/3.jpg` },
  ],
  'mcd_04_ped_03_matcha_carousel_ig': [
    { id: 'mcd_04_ped_03_matcha_carousel_ig_1jpg', name: `1.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/CAROUSEL IG/1.jpg` },
    { id: 'mcd_04_ped_03_matcha_carousel_ig_2jpg', name: `2.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/CAROUSEL IG/2.jpg` },
    { id: 'mcd_04_ped_03_matcha_carousel_ig_3_jpg', name: `3 .jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/CAROUSEL IG/3 .jpg` },
    { id: 'mcd_04_ped_03_matcha_carousel_ig_4jpg', name: `4.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/CAROUSEL IG/4.jpg` },
    { id: 'mcd_04_ped_03_matcha_carousel_ig_5jpg', name: `5.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/CAROUSEL IG/5.jpg` },
    { id: 'mcd_04_ped_03_matcha_carousel_ig_6jpg', name: `6.jpg`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/CAROUSEL IG/6.jpg` },
  ],
  'mcd_04_ped_02_sanremo_cose_da_fare': [
    { id: 'mcd_04_ped_02_sanremo_cose_da_fare_io_questa_settimana', name: `IO QUESTA SETTIMANA.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/02_SANREMO/COSE DA FARE/IO QUESTA SETTIMANA.png` },
  ],
  'mcd_04_ped_02_sanremo_teaser': [
    { id: 'mcd_04_ped_02_sanremo_teaser_la_settimana_perfetta', name: `LA SETTIMANA PERFETTA.png`, type: 'image-viewer', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/02_SANREMO/TEASER/LA SETTIMANA PERFETTA.png` },
  ],
  'mcd_04_ped_03_matcha_tiktok': [
    { id: 'mcd_04_ped_03_matcha_tiktok_il_suono_del_matchamp4', name: `IL SUONO DEL MATCHA.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/04_PED/03_MATCHA/TIKTOK/IL SUONO DEL MATCHA.mp4` },
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
  'mcd_05_social_03_tiktok': [
    { id: 'mcd_05_social_03_tiktok_allenandomi_per_il_crispymp4', name: `ALLENANDOMI PER IL CRISPY.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/03_TIKTOK/ALLENANDOMI PER IL CRISPY.mp4` },
    { id: 'mcd_05_social_03_tiktok_il_crispy_di_post_seratamp4', name: `IL CRISPY DI POST SERATA.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/03_TIKTOK/IL CRISPY DI POST SERATA.mp4` },
    { id: 'mcd_05_social_03_tiktok_il_pensatoremp4', name: `IL PENSATORE.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/03_TIKTOK/IL PENSATORE.mp4` },
    { id: 'mcd_05_social_03_tiktok_il_segno_del_crispymp4', name: `IL SEGNO DEL CRISPY.mp4`, type: 'video', src: import.meta.env.BASE_URL + `NEW/McDonald's/05_SOCIAL/03_TIKTOK/IL SEGNO DEL CRISPY.mp4` },
  ],
  'mcd_crispy_tvc': [
    { id: 'v1', name: 'McD_Crispy_15sec_Club.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Club.mp4' },
    { id: 'v2', name: 'McD_Crispy_15sec_Corsa.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Corsa.mp4' },
    { id: 'v3', name: 'McD_Crispy_15sec_Famiglia.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Famiglia.mp4' },
    { id: 'v4', name: 'McD_Crispy_15sec_Ufficio.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Ufficio.mp4' },
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
  onClose,
  openTrigger
}) {
  const images = COLLECTIONS[collection] || [{ id: 'fallback', src: initialSrc, name: initialSrc ? initialSrc.split('/').pop() : '', type: initialSrc && initialSrc.match(/\.(mp4|mov|webm)$/i) ? 'video' : 'image-viewer' }];
  const hasMultipleImages = images.length > 1;
  const [currentSrc, setCurrentSrc] = useState(initialSrc || images[0].src);
  
  // Initial size: for pastelli, 810x567 (landscape orientation) or custom dimensions
  const defaultW = initialWidth || (collection === 'pastelli' ? 810 : 900);
  const defaultH = initialHeight || (collection === 'pastelli' ? 567 : 600);
  const [windowSize, setWindowSize] = useState({ width: defaultW, height: defaultH });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const toggleDebounceRef = useRef(0);

  const isVideo = currentSrc ? /\.(mp4|mov|webm)$/i.test(currentSrc) : false;

  const calculateAndSetSize = (width, height) => {
    const naturalAspect = width / height;
    const MAX_WIDTH = Math.min(1200, window.innerWidth * 0.85);
    const MAX_HEIGHT = Math.min(950, window.innerHeight * 0.85);
    const MIN_WIDTH = 400;
    const MIN_HEIGHT = 400;

    let newWidth = width;
    let newHeight = height + 38;

    if (newWidth > MAX_WIDTH || newHeight > MAX_HEIGHT) {
      if (naturalAspect > (MAX_WIDTH / MAX_HEIGHT)) {
        newWidth = MAX_WIDTH;
        newHeight = (MAX_WIDTH / naturalAspect) + 38;
      } else {
        newHeight = MAX_HEIGHT;
        newWidth = (MAX_HEIGHT - 38) * naturalAspect;
      }
    }

    if (newWidth < MIN_WIDTH) { newWidth = MIN_WIDTH; newHeight = (MIN_WIDTH / naturalAspect) + 38; }
    if (newHeight < MIN_HEIGHT) { newHeight = MIN_HEIGHT; newWidth = (MIN_HEIGHT - 38) * naturalAspect; }

    setWindowSize({ width: Math.round(newWidth), height: Math.round(newHeight) });
  };

  useEffect(() => {
    if (initialWidth && initialHeight) {
      setWindowSize({ width: initialWidth, height: initialHeight });
      return;
    }

    if (collection === 'pastelli') {
      setWindowSize({ width: 810, height: 567 });
      return;
    }

    if (!isVideo) {
      const img = new Image();
      img.src = currentSrc;
      img.onload = () => {
        calculateAndSetSize(img.naturalWidth, img.naturalHeight);
      };
    }
  }, [currentSrc, initialWidth, initialHeight, collection, isVideo]);

  const handleKeyDown = (e) => {
    if (isVideo && e.key === ' ') {
      e.preventDefault();
      togglePlay();
      return;
    }
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
    setSidebarVisible(true);
    if (hideTimeout) clearTimeout(hideTimeout);
    const timeout = setTimeout(() => {
      setSidebarVisible(false);
    }, 2500);
    setHideTimeout(timeout);
  };

  const handleMouseLeave = () => {
    setSidebarVisible(false);
  };

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => {
          console.log('Auto-play prevented', e);
          setIsPlaying(false);
        });
    }
  }, [currentSrc, isVideo]);

  const togglePlay = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    // Debounce: prevent double-toggle from event bubbling or spacebar ghost clicks
    const now = Date.now();
    if (now - toggleDebounceRef.current < 200) return;
    toggleDebounceRef.current = now;
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(err => console.log(err));
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

  const currentImageName = currentSrc.split('/').pop();

  const customTitlebar = ({ handleClose, handleMinimize, handleMaximize }) => (
    <div className="iv-titlebar" onMouseMove={handleMouseMove}>
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
      openTrigger={openTrigger}
    >
      <div 
        className="iv-layout" 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSrc(img.src);
                  }}
                >
                  {img.src && img.src.match(/\.(mp4|mov|webm)$/i) ? (
                    <video src={`${img.src}#t=0.1`} className="iv-sidebar-thumb" preload="metadata" muted playsInline style={{ objectFit: 'cover' }} />
                  ) : (
                    <img src={img.src} className="iv-sidebar-thumb" alt={img.name} draggable="false" />
                  )}
                  <div className="iv-sidebar-label">{img.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media Area */}
        <div className="iv-player-area" style={{ position: 'relative', width: '100%', height: '100%' }}>
          {isVideo ? (
            <>
              <video 
                ref={videoRef}
                className="iv-image-element"
                src={currentSrc}
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={(e) => {
                  setDuration(e.target.duration);
                  calculateAndSetSize(e.target.videoWidth, e.target.videoHeight);
                }}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
              />
              {/* Transparent overlay to guarantee click detection on the video area */}
              <div 
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, cursor: 'pointer' }}
                onClick={togglePlay}
              />
              {/* Floating Controls */}
              <div className={`qt-controls-container ${sidebarVisible ? 'visible' : ''}`}>
                <div className="qt-controls-panel" onClick={(e) => e.stopPropagation()}>
                  
                  <div className="qt-controls-row">
                    <button className="qt-btn" tabIndex={-1}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.5 12 L21.5 18.5 L21.5 5.5 Z" />
                        <path d="M2.5 12 L11.5 18.5 L11.5 5.5 Z" />
                      </svg>
                    </button>
                    <button className="qt-btn qt-btn-play" tabIndex={-1} onClick={togglePlay}>
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
                    <button className="qt-btn" tabIndex={-1}>
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
            </>
          ) : (
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
          )}
        </div>
      </div>
    </Window>
  );
}
