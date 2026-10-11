import { useState, useCallback, useEffect } from 'react';
import MenuBar from '../MenuBar/MenuBar';
import Dock from '../Dock/Dock';
import Window from '../Window/Window';
import DesktopIcon from '../DesktopIcon/DesktopIcon';
import NotesApp from '../NotesApp/NotesApp';
import CalendarApp from '../CalendarApp/CalendarApp';
import StickyNote from '../StickyNote/StickyNote';
import FinderWindow from '../FinderWindow/FinderWindow';
import InfoPanel from '../InfoPanel/InfoPanel';
import QuickTimePlayer from '../QuickTimePlayer/QuickTimePlayer';
import ImageViewer from '../ImageViewer/ImageViewer';
import MapsApp from '../MapsApp/MapsApp';
import './DesktopPage.css';

/**
 * Desktop folder icons — positioned to match the Figma reference.
 * Percentages used for responsive placement.
 */
const DESKTOP_FOLDERS = [
  { id: 'mcdonalds',label: "McDonald's",        x: '8%',  y: '12%' },
  { id: '7days',    label: '7DAYSBRIEF',        x: '6%',  y: '38%' },
  { id: 'iliad',    label: 'ILIAD',             x: '9%',  y: '62%' },
  { id: 'orosaiwa', label: 'OROSAIWA',          x: '82%', y: '15%' },
];

/**
 * DesktopPage — macOS desktop environment.
 * Purple checker wallpaper, folder icons, Preview window, and dock.
 * (HMR trigger)
 */
export default function DesktopPage() {
  const [showWindow, setShowWindow] = useState(true);
  const [windowTrigger, setWindowTrigger] = useState(Date.now());
  const [showNotes, setShowNotes] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMaps, setShowMaps] = useState(false);
  const [openFolders, setOpenFolders] = useState([]);
  const [folderTriggers, setFolderTriggers] = useState({});
  const [activeFolderPaths, setActiveFolderPaths] = useState({});
  const [openInfoPanels, setOpenInfoPanels] = useState([]);
  const [playingVideos, setPlayingVideos] = useState([]);
  const [viewingImages, setViewingImages] = useState([]);

  const handleOpenWindow = useCallback(() => {
    setShowWindow(true);
    setWindowTrigger(Date.now());
  }, []);

  const handleCloseWindow = useCallback(() => {
    setShowWindow(false);
  }, []);

  const handleOpenFolder = useCallback((folderId) => {
    setOpenFolders(prev => {
      if (!prev.includes(folderId)) {
        return [...prev, folderId];
      }
      return prev;
    });
    setFolderTriggers(prev => ({ ...prev, [folderId]: Date.now() }));
    setOpenInfoPanels(prev => {
      if (folderId === 'mcdonalds') return prev;
      if (!prev.includes(folderId)) {
        return [...prev, folderId];
      }
      return prev;
    });
  }, []);

  const handleCloseFolder = useCallback((folderId) => {
    setOpenFolders(prev => prev.filter(id => id !== folderId));
    setOpenInfoPanels(prev => prev.filter(id => id !== folderId));
  }, []);

  const handleCloseInfoPanel = useCallback((folderId) => {
    setOpenInfoPanels(prev => prev.filter(id => id !== folderId));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        if (openFolders.length > 0) {
          const activeFolderId = openFolders[openFolders.length - 1];
          setOpenInfoPanels(prev => {
            if (prev.includes(activeFolderId)) {
              return prev.filter(id => id !== activeFolderId);
            } else {
              return [...prev, activeFolderId];
            }
          });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openFolders]);

  return (
    <div className="desktop" role="main" aria-label="macOS Desktop">
      {/* Desktop Area — checker wallpaper + folder icons + windows */}
      <div className="desktop__area">
        {/* Desktop folder icons */}
        {DESKTOP_FOLDERS.map((folder) => (
          <DesktopIcon
            key={folder.id}
            label={folder.label}
            x={folder.x}
            y={folder.y}
            type="folder"
            onDoubleClick={() => handleOpenFolder(folder.id)}
          />
        ))}

        {/* Calendar icon */}
        <DesktopIcon
          label="Calendario"
          x="16%"
          y="38%"
          type="calendar"
          onDoubleClick={() => setShowCalendar(true)}
        />

        {/* Note icon */}
        <DesktopIcon
          label="Note"
          x="78%"
          y="58%"
          type="note"
          onDoubleClick={() => setShowNotes(true)}
        />

        {/* Immagine "Prima di Photoshop" */}
        <DesktopIcon
          label="Prima di Photoshop usavo i pastelli.png"
          x="88%"
          y="8%"
          type="image"
          iconSrc={import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Prima di Photoshop usavo i pastelli.png'}
          onDoubleClick={handleOpenWindow}
        />

        {/* Maps icon */}
        <DesktopIcon
          label="Mappe"
          x="18%"
          y="62%"
          type="app"
          iconSrc={import.meta.env.BASE_URL + 'icons/maps.png'}
          onDoubleClick={() => setShowMaps(true)}
        />

        {showNotes && (
          <NotesApp onClose={() => setShowNotes(false)} />
        )}

        {showCalendar && (
          <>
            <CalendarApp onClose={() => setShowCalendar(false)} initialX={100} initialY={260} />
            <StickyNote onClose={() => setShowCalendar(false)} initialX={800} initialY={460} />
          </>
        )}

        {showMaps && (
          <MapsApp onClose={() => setShowMaps(false)} initialX={200} initialY={100} />
        )}

        {/* Opened Folders (Finder and InfoPanel) */}
        {openFolders.map((folderId) => {
          const folder = DESKTOP_FOLDERS.find(f => f.id === folderId);
          if (!folder) return null;
          return (
            <div key={`open-folder-${folderId}`}>
              <FinderWindow 
                title={folder.label} 
                folderId={folderId}
                onClose={() => handleCloseFolder(folderId)}
                onOpenFile={(item) => {
                  if (item.type === 'image-viewer') {
                    setViewingImages(prev => [
                      ...prev, 
                      { id: Date.now() + Math.random(), src: item.src, collection: item.collection || 'crispy', title: item.title }
                    ]);
                  } else {
                    setPlayingVideos(prev => [
                      ...prev,
                      { id: Date.now() + Math.random(), src: item.src, collection: item.collection || 'crispy' }
                    ]);
                  }
                }}
                initialX={150}
                initialY={150}
                openTrigger={folderTriggers[folderId]}
                onPathChange={(pathId, currentPathArray) => {
                  if (folderId === 'mcdonalds') {
                    if (currentPathArray && currentPathArray.length > 1) {
                      const mainSubfolder = currentPathArray[1];
                      setActiveFolderPaths(prev => ({ ...prev, [folderId]: mainSubfolder }));
                      setOpenInfoPanels(prev => prev.includes(folderId) ? prev : [...prev, folderId]);
                    } else {
                      setActiveFolderPaths(prev => ({ ...prev, [folderId]: pathId }));
                      setOpenInfoPanels(prev => prev.filter(id => id !== folderId));
                    }
                  } else {
                    setActiveFolderPaths(prev => ({ ...prev, [folderId]: pathId }));
                  }
                }}
              />
              {openInfoPanels.includes(folderId) && (activeFolderPaths[folderId] || folderId) !== 'mcdonalds' && (
                <InfoPanel 
                  folderId={activeFolderPaths[folderId] || folderId}
                  folderName={folder.label}
                  onClose={() => handleCloseInfoPanel(folderId)}
                  initialX={860}
                  initialY={175}
                />
              )}
            </div>
          );
        })}

        {/* QuickTime Players */}
        {playingVideos.map((video) => (
          <QuickTimePlayer 
            key={video.id}
            initialSrc={video.src} 
            collection={video.collection}
            onClose={() => setPlayingVideos(prev => prev.filter(v => v.id !== video.id))} 
          />
        ))}

        {/* Image Viewers */}
        {viewingImages.map((viewer) => (
          <ImageViewer 
            key={viewer.id}
            initialSrc={viewer.src} 
            collection={viewer.collection}
            sidebarTitle={viewer.title}
            onClose={() => setViewingImages(prev => prev.filter(v => v.id !== viewer.id))} 
          />
        ))}

        {/* Default window: "Prima di Photoshop usavo i pastelli" */}
        {showWindow && (
          <ImageViewer
            initialSrc={import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Prima di Photoshop usavo i pastelli.png'}
            collection="pastelli"
            sidebarTitle="Prima di Photoshop"
            initialWidth={810}
            initialHeight={567}
            initialX={240}
            initialY={70}
            onClose={handleCloseWindow}
            openTrigger={windowTrigger}
          />
        )}
      </div>

      {/* Dock */}
      <Dock />
    </div>
  );
}
