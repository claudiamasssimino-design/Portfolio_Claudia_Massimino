import { useRef } from 'react';
import './Dock.css';

/**
 * Dock items matching the Figma reference, using real PNG icons.
 * Each has a tooltip quip shown on hover.
 */
const DOCK_ITEMS = [
  { id: 'finder',       label: 'Finder',       quip: 'So che quel file è qui da qualche parte',        icon: '/icons/finder.png' },
  { id: 'chrome',       label: 'Chrome',        quip: 'Chiudere le tab porta sfortuna',                 icon: '/icons/chrome.png', action: () => window.open('https://www.linkedin.com/in/claudia-massimino-3a396a241/', '_blank') },
  { id: 'mail',         label: 'Mail',          quip: 'Se ti ho convinto, clicca qui',                   icon: '/icons/mail.png', action: () => window.location.href = 'mailto:claudiamasssimino@gmail.com?subject=Contatto dal Portfolio' },
  { id: 'spotify',      label: 'Spotify',       quip: 'No, Sal Da Vinci non è in playlist',              icon: '/icons/spotify.png' },
  { id: 'photoshop',    label: 'Photoshop',     quip: '02_final_finalissimo_OK',                         icon: '/icons/photoshop.png' },
  { id: 'illustrator',  label: 'Illustrator',   quip: '48 livelli chiamati "Livello 1" (scherzo)',       icon: '/icons/illustrator.png' },
  { id: 'teams',        label: 'Teams',         quip: '«Hai un minuto?» Spoiler: no, ma OVVIO',          icon: '/icons/teams.png' },
  { id: 'outlook',      label: 'Outlook',       quip: 'Le apro dopo, promesso',                          icon: '/icons/outlook.png', action: () => window.location.href = 'mailto:claudiamasssimino@gmail.com?subject=Contatto dal Portfolio' },
];

const TRASH_ITEM = {
  id: 'trash', label: 'Cestino', quip: 'Qui riposa FINAL_07', icon: '/icons/cestino.png'
};

export default function Dock() {
  const dockRef = useRef(null);

  return (
    <nav
      className="dock"
      ref={dockRef}
      role="toolbar"
      aria-label="Application dock"
    >
      <div className="dock__container">
        {DOCK_ITEMS.map((item) => (
          <button
            key={item.id}
            className="dock__icon"
            aria-label={item.label}
            data-quip={item.quip}
            onClick={item.action}
          >
            <img className="dock__icon-img" src={item.icon} alt={item.label} draggable="false" />
          </button>
        ))}

        <div className="dock__separator" />

        <button
          className="dock__icon"
          aria-label={TRASH_ITEM.label}
          data-quip={TRASH_ITEM.quip}
        >
          <img className="dock__icon-img" src={TRASH_ITEM.icon} alt={TRASH_ITEM.label} draggable="false" />
        </button>
      </div>
    </nav>
  );
}
