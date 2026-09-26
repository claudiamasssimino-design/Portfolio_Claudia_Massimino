import React from 'react';
import Window from '../Window/Window';
import './FinderWindow.css';

// SVG Icons
const Icons = {
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
  Trash: () => <svg width="18" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  GridCircleFill: () => <svg width="21" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>,
  RectangleGrid1x3: () => <svg width="22" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>,
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
  folderId = 'crispy',
  openTrigger,
  children
}) {
  // Virtual File System
  const [currentPath, setCurrentPath] = React.useState(['root']);

  const vfsData = {
    'crispy': {
      'root': [
        { id: 'ooh', name: '02_OOH', type: 'folder' },
        { id: 'tvc', name: '01_TVC', type: 'folder' }
      ],
      'tvc': [
        { id: 'v1', name: 'McD_Crispy_15sec_Club.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Club.mp4' },
        { id: 'v2', name: 'McD_Crispy_15sec_Corsa.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Corsa.mp4' },
        { id: 'v3', name: 'McD_Crispy_15sec_Famiglia.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Famiglia.mp4' },
        { id: 'v4', name: 'McD_Crispy_15sec_Ufficio.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Ufficio.mp4' }
      ],
      'ooh': []
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
    },
    'ped': {
      'root': [
        { id: 'post', name: '01_POST', type: 'folder' }
      ],
      'post': []
    }
  };

  const vfs = vfsData[folderId] || vfsData['crispy'];
  const currentPathFolderId = currentPath[currentPath.length - 1];
  const items = vfs[currentPathFolderId] || [];

  const handleItemDoubleClick = (item) => {
    if (folderId === 'crispy') {
      if (item.id === 'tvc') {
        if (onOpenFile) {
          onOpenFile({ src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Club.mp4' });
        }
      } else if (item.id === 'ooh') {
        if (onOpenFile) {
          onOpenFile({ type: 'image-viewer', collection: 'crispy', title: 'CRISPY OOH', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy1.png' });
        }
      } else if (item.type === 'folder') {
        setCurrentPath(prev => [...prev, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
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
        setCurrentPath(prev => [...prev, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    } else if (folderId === 'iliad') {
      if (item.id === 'tvc') {
        if (onOpenFile) {
          onOpenFile({ type: 'video', collection: 'iliad', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/Poche cose sono per sempre_Benvenuta, Megan!.mp4' });
        }
      } else if (item.type === 'folder') {
        setCurrentPath(prev => [...prev, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    } else if (folderId === 'orosaiwa') {
      if (item.id === 'orosaiwa_tvc') {
        if (onOpenFile) {
          onOpenFile({ type: 'video', collection: 'orosaiwa', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/La TUA colazione ogni giorno_2026.mp4' });
        }
      } else if (item.type === 'folder') {
        setCurrentPath(prev => [...prev, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    } else if (folderId === 'ped') {
      if (item.id === 'post') {
        if (onOpenFile) {
          onOpenFile({ type: 'image-viewer', collection: 'ped', title: '01_POST', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/WD_PL_1.png' });
        }
      } else if (item.type === 'folder') {
        setCurrentPath(prev => [...prev, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    } else {
      if (item.type === 'folder') {
        setCurrentPath(prev => [...prev, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    }
  };

  const handleBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(prev => prev.slice(0, -1));
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
              <svg width="6" height="6" viewBox="0 0 6 6"><path d="M.5.5l5 5m0-5l-5 5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round"/></svg>
            </button>
            <button className="window__tl window__tl--minimize" onClick={handleMinimize} aria-label="Minimize">
              <svg width="6" height="2" viewBox="0 0 6 2"><path d="M.5 1h5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round"/></svg>
            </button>
            <button className="window__tl window__tl--maximize" onClick={handleMaximize} aria-label="Maximize">
              <svg width="6" height="6" viewBox="0 0 8 8"><path d="M1 7V2.5C1 1.67 1.67 1 2.5 1H7" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round"/><path d="M7 1v4.5c0 .83-.67 1.5-1.5 1.5H1" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round"/></svg>
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
