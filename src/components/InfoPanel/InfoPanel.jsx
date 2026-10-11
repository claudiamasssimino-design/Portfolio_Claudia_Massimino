import React, { useState } from 'react';
import Window from '../Window/Window';
import './InfoPanel.css';

/**
 * A macOS "Get Info" style panel.
 */
export default function InfoPanel({
  folderId,
  folderName = 'Cartella',
  initialX = 820,
  initialY = 100,
  onClose
}) {
  const [openSections, setOpenSections] = useState({
    generali: true,
    scopri: false,
    nome: false,
    commenti: false,
    apri: false,
    anteprima: false,
    condivisione: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Content configuration based on folder
  const contentMap = {
    'crispy_revelation': {
      title: '01_CRISPY REVELATION',
      size: '4,1 MB',
      modified: 'Lunedì 2 marzo 2026 alle ore 18:54',
      description: "Crispy Revelation nasce da un'idea semplice: il Crispy McBacon® è ormai così iconico che basta un piccolo segnale per farlo venire subito in mente. La campagna racconta proprio quei momenti in cui il pensiero del Crispy compare all'improvviso, ovunque e in qualsiasi situazione."
    },
    'mcd_02_strips___tutto_per_il_dip': {
      title: '02_STRIPS - TUTTO PER IL DIP',
      size: '--',
      modified: '--',
      description: "Per il lancio delle nuove McCrunchy™ Chicken Strips, McDonald’s trasforma uno dei gesti più iconici della cultura italiana in un nuovo modo di comunicare: il gesto del dip. Capovolgendo il celebre gesto del “ma che vuoi?”, nasce una campagna pop e ironica che celebra la passione per le salse. Un’idea che prende vita attraverso film, OOH, social e attivazioni digitali, trasformando un semplice gesto quotidiano in un linguaggio universale."
    },
    'mcd_03_winterdays_social': {
      title: '03_WINTERDAYS_SOCIAL',
      size: '--',
      modified: '--',
      description: "Per i WinterDays 2025 di McDonald’s, il Grinch diventa protagonista della comunicazione del brand, portando tutta la sua ironia e il suo spirito dispettoso nella campagna. Anche sui social, abbiamo dato vita alla sua personalità attraverso contenuti che giocano con le espressioni iconiche del personaggio, i suoi piccoli dispetti e la sua voglia di rovinare la festa. Dai post che celebrano il suo arrivo nel mondo McDonald’s a quelli più ironici e provocatori, pensati per stimolare commenti e conversazioni, trasformando il suo lato più irriverente in un’occasione di interazione con la community."
    },
    'mcd_04_ped': {
      title: '04_PED',
      size: '--',
      modified: '--',
      description: "Ho lavorato al PED di McDonald’s Italia, ideando e realizzando contenuti social legati a lanci di prodotto, ricorrenze e momenti di attualità. Un racconto always-on che interpreta trend, meme e conversazioni della community attraverso il tono ironico, immediato e riconoscibile del brand."
    },

    '7days': {
      size: '3,8 MB',
      modified: 'Lunedì 2 marzo 2026 alle ore 19:15',
      description: "Casa Arcobaleno accoglie giovani LGBTQIA+ allontanati o rifiutati dalle proprie famiglie, offrendo loro un luogo sicuro in cui essere sé stessi. La sfida era raccontare questa realtà attraverso un video YouTube di massimo un minuto, realizzato in soli sette giorni. Per catturare subito l’attenzione, abbiamo reinterpretato uno dei format più popolari della piattaforma, la classica “Top 3”, trasformandolo in un contenuto impossibile da ignorare e capace di mostrare ciò che, ogni giorno, accade lontano dalle telecamere."
    },
    'iliad': {
      size: '5,2 MB',
      modified: 'Lunedì 2 marzo 2026 alle ore 19:30',
      description: "“Poche cose sono per sempre” riporta in scena Megan Gale, volto iconico della telefonia degli anni Duemila. Mentre Megan attraversa la città ed entra in uno store iliad, lo spot suggerisce che anche le abitudini e le certezze più consolidate possono cambiare. L’unica cosa destinata a restare è la promessa di iliad: offerte trasparenti e prezzi che non cambiano nel tempo. La chiusura “Come iliad c’è solo iliad” rafforza il posizionamento distintivo del brand."
    },
    'orosaiwa': {
      size: '2,9 MB',
      modified: 'Lunedì 2 marzo 2026 alle ore 19:45',
      description: "La campagna racconta la colazione italiana partendo da un insight semplice: tutti vogliono suggerire il modo giusto di farla, ma ognuno ha le proprie abitudini. Attraverso la campagna TV, Oro Saiwa si posiziona come il biscotto versatile che si adatta alla colazione di tutti, utilizzando i balloon per dare voce al prodotto e accompagnare i diversi momenti quotidiani."
    }
  };

  const content = contentMap[folderId] || {
    size: '--',
    modified: '--',
    description: "Nessuna informazione aggiuntiva disponibile per questa cartella."
  };
  
  const displayTitle = content.title || folderName;

  const customTitlebar = ({ handleClose, handleMinimize, handleMaximize }) => (
    <div className="info-titlebar">
      <div className="window__traffic-lights info-traffic-lights">
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
      <div className="info-titlebar__center">
        <span className="info-titlebar__text">Info su {displayTitle}</span>
      </div>
    </div>
  );

  const AccordionSection = ({ id, title }) => (
    <div className="info-accordion">
      <div className="info-accordion__header" onClick={() => toggleSection(id)}>
        <span className={`info-accordion__chevron ${openSections[id] ? 'open' : ''}`}>›</span>
        {title}
      </div>
      {openSections[id] && <div className="info-accordion__content">Nessun dettaglio</div>}
    </div>
  );

  return (
    <Window
      title={`Info su ${displayTitle}`}
      initialX={initialX}
      initialY={initialY}
      width={320}
      height={500}
      onClose={onClose}
      customTitlebar={customTitlebar}
      className="info-window"
    >
      <div className="info-content">
        <div className="info-header">
          <div className="info-header__details">
            <div className="info-header__top">
              <h2 className="info-header__title">{displayTitle}</h2>
              <span className="info-header__size">{content.size}</span>
            </div>
            <div className="info-header__modified">Modificato: {content.modified}</div>
          </div>
        </div>

        {content.description && (
          <div className="info-description-box">
            {content.description}
          </div>
        )}

        <div className="info-accordions">
          <AccordionSection id="generali" title="Generali:" />
          <AccordionSection id="scopri" title="Scopri di più:" />
          <AccordionSection id="nome" title="Nome ed estensione:" />
          <AccordionSection id="commenti" title="Commenti:" />
          <AccordionSection id="apri" title="Apri con:" />
          <AccordionSection id="anteprima" title="Anteprima:" />
          <AccordionSection id="condivisione" title="Condivisione e permessi:" />
        </div>
      </div>
    </Window>
  );
}
