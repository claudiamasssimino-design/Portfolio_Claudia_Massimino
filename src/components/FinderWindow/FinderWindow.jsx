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
  Folder: () => <img src="/icons/cartella.png" alt="Cartella" style={{ width: '48px', height: '48px', objectFit: 'contain' }} draggable="false" />
};

/**
 * A macOS Finder window perfectly replicating the provided UI.
 */
export default function FinderWindow({
  title = "Tom's Guide",
  initialX = 100,
  initialY = 80,
  width = 800,
  height = 500,
  onClose,
  onOpenFile, // New prop to notify parent when a file is double clicked
  folderId = 'crispy',
  children
}) {
  // Virtual File System
  const [currentPath, setCurrentPath] = React.useState(['root']);

  const vfsData = {
    'crispy': {
      'root': [
        { id: 'ooh', name: 'OOH', type: 'folder' },
        { id: 'tvc', name: 'TVC', type: 'folder' }
      ],
      'tvc': [
        { id: 'v1', name: 'McD_Crispy_15sec_16x9_McDrive_20260313_mix web_sub ita.mp4', type: 'video', src: '/TVC PORTFOLIO/McD_Crispy_15sec_16x9_McDrive_20260313_mix web_sub ita.mp4' },
        { id: 'v2', name: 'McD_Crispy_15sec_16x9_McDrive_20260313_mix web.mp4', type: 'video', src: '/TVC PORTFOLIO/McD_Crispy_15sec_16x9_McDrive_20260313_mix web.mp4' },
        { id: 'v3', name: 'McD_Crispy_15sec_16x9_Mom_20260313_mix web_sub ita.mp4', type: 'video', src: '/TVC PORTFOLIO/McD_Crispy_15sec_16x9_Mom_20260313_mix web_sub ita.mp4' }
      ],
      'ooh': []
    },
    '7days': {
      'root': [
        { id: 'abbiamo_vinto', name: 'ABBIAMO VINTOOO', type: 'folder' },
        { id: 'film', name: 'film', type: 'folder' }
      ],
      'abbiamo_vinto': [],
      'film': [
        { id: 'f1', name: '7 DAYS BRIEF 2025 _ Video mai pubblicato..mp4', type: 'video', src: '/TVC PORTFOLIO/7 DAYS BRIEF 2025 _ Video mai pubblicato..mp4' }
      ]
    },
    'iliad': {
      'root': [
        { id: 'tvc', name: 'tvc', type: 'folder' }
      ],
      'tvc': []
    },
    'orosaiwa': {
      'root': [
        { id: 'orosaiwa_tvc', name: 'OROSAIWA_TVC', type: 'folder' }
      ],
      'orosaiwa_tvc': []
    },
    'ped': {
      'root': [
        { id: 'post', name: 'POST', type: 'folder' }
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
          onOpenFile({ src: '/TVC PORTFOLIO/McD_Crispy_15sec_16x9_McDrive_20260313_mix web_sub ita.mp4' });
        }
      } else if (item.id === 'ooh') {
        if (onOpenFile) {
          onOpenFile({ type: 'image-viewer', collection: 'crispy', title: 'CRISPY OOH', src: '/FOTO PORTFOLIO/crispy1.png' });
        }
      } else if (item.type === 'folder') {
        setCurrentPath(prev => [...prev, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    } else if (folderId === '7days') {
      if (item.id === 'abbiamo_vinto') {
        if (onOpenFile) {
          onOpenFile({ type: 'image-viewer', collection: '7days', title: 'ABBIAMO VINTOOO', src: '/FOTO PORTFOLIO/06:11:25.jpg' });
        }
      } else if (item.id === 'film') {
        if (onOpenFile) {
          onOpenFile({ type: 'video', collection: '7days', src: '/TVC PORTFOLIO/7 DAYS BRIEF 2025 _ Video mai pubblicato..mp4' });
        }
      } else if (item.type === 'folder') {
        setCurrentPath(prev => [...prev, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    } else if (folderId === 'iliad') {
      if (item.id === 'tvc') {
        if (onOpenFile) {
          onOpenFile({ type: 'video', collection: 'iliad', src: '/TVC PORTFOLIO/iliad_tvc_1.mp4' });
        }
      } else if (item.type === 'folder') {
        setCurrentPath(prev => [...prev, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    } else if (folderId === 'orosaiwa') {
      if (item.id === 'orosaiwa_tvc') {
        if (onOpenFile) {
          onOpenFile({ type: 'video', collection: 'orosaiwa', src: '/TVC PORTFOLIO/Spot Oro Saiwa_La TUA colazione ogni giorno.mp4' });
        }
      } else if (item.type === 'folder') {
        setCurrentPath(prev => [...prev, item.id]);
      } else if (item.type === 'video' && onOpenFile) {
        onOpenFile(item);
      }
    } else if (folderId === 'ped') {
      if (item.id === 'post') {
        if (onOpenFile) {
          onOpenFile({ type: 'image-viewer', collection: 'ped', title: 'POST', src: '/FOTO PORTFOLIO/WD_PL_1.png' });
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
    <div className="finder-topbar">
      <div className="finder-topbar__sidebar">
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

      <div className="finder-topbar__main">
        {/* Main Toolbar */}
        <div className="finder-toolbar">
          <div className="finder-toolbar__nav">
            <div className="finder-nav-buttons">
              <button className="finder-nav-btn" onClick={handleBack} disabled={currentPath.length <= 1}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <div className="finder-nav-divider"></div>
              <button className="finder-nav-btn" disabled>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

          <div className="finder-toolbar__title">
            <div className="finder-title-container">
              <span>{title}</span>
            </div>
          </div>

          <div className="finder-toolbar__actions">
            <div className="finder-action-group">
              <button className="finder-action-btn with-dropdown">
                <Icons.View />
                <Icons.ChevronDown />
              </button>
              <span className="finder-toolbar-label">View</span>
            </div>

            <div className="finder-action-group">
              <button className="finder-action-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </button>
              <span className="finder-toolbar-label">Finder</span>
            </div>

            <div className="finder-action-group">
              <button className="finder-action-btn with-dropdown">
                <Icons.Group />
                <Icons.ChevronDown />
              </button>
              <span className="finder-toolbar-label">Group</span>
            </div>

            <div className="finder-action-group">
              <button className="finder-action-btn">
                <Icons.Share />
              </button>
              <span className="finder-toolbar-label">Share</span>
            </div>

            <div className="finder-action-group">
              <button className="finder-action-btn">
                <Icons.Tag />
              </button>
              <span className="finder-toolbar-label">Add Tags</span>
            </div>

            <div className="finder-action-group">
              <button className="finder-action-btn circle-btn">
                <Icons.More />
              </button>
              <span className="finder-toolbar-label">Action</span>
            </div>

            <div className="finder-action-group search-group">
              <button className="finder-action-btn">
                <Icons.Search />
              </button>
              <span className="finder-toolbar-label">Search</span>
            </div>
          </div>
        </div>

        {/* Path Bar under Toolbar */}
        <div className="finder-pathbar-container">
          <div className="finder-pathbar">
            <span>{title}</span>
            <button className="finder-pathbar-plus">+</button>
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
      width={width}
      height={height}
      onClose={onClose}
      customTitlebar={customTitlebar}
      className="finder-window-wrapper"
    >
      <div className="finder-layout">
        {/* Sidebar */}
        <div className="finder-sidebar">
          <div className="finder-sidebar__group">
            <div className="finder-sidebar__item">
              <Icons.Clock /> <span>Recents</span>
            </div>
            <div className="finder-sidebar__item">
              <Icons.Shared /> <span>Shared</span>
            </div>
          </div>

          <div className="finder-sidebar__section">Favourites</div>
          <div className="finder-sidebar__group">
            <div className="finder-sidebar__item">
              <span className="icon-app"><Icons.Apps /></span> <span>Applications</span>
            </div>
            <div className="finder-sidebar__item">
              <span className="icon-down"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></span> <span>Downloads</span>
            </div>
            <div className="finder-sidebar__item">
              <span className="icon-desktop"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></span> <span>Desktop</span>
              <span className="cloud-badge"><Icons.Cloud /></span>
            </div>
            <div className="finder-sidebar__item">
              <span className="icon-doc"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></span> <span>Documents</span>
              <span className="cloud-badge"><Icons.Cloud /></span>
            </div>
          </div>

          <div className="finder-sidebar__section">Locations</div>
          <div className="finder-sidebar__group">
            <div className="finder-sidebar__item">
              <Icons.Cloud /> <span>iCloud Drive</span>
            </div>
            <div className="finder-sidebar__item">
              <Icons.Home /> <span>davidcrookes</span>
            </div>
            <div className="finder-sidebar__item">
              <Icons.Document /> <span>LibreOffice</span>
            </div>
          </div>
          
        </div>

        {/* Main Content Area */}
        <div className="finder-main-area">
          <div className="finder-content-grid">
            {items.map(item => (
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

          {/* Status Bar */}
          <div className="finder-statusbar">
            <div className="finder-statusbar-text">1 of 3 selected, 72.2 GB available on iCloud</div>
            <div className="finder-statusbar-slider">
              <div className="slider-icon"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></div>
              <div className="slider-track"><div className="slider-thumb"></div></div>
              <div className="slider-icon large"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
