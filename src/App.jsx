import { useState, useCallback, useEffect } from 'react';
import FirstPage from './components/FirstPage/FirstPage';
import DesktopPage from './components/DesktopPage/DesktopPage';

/**
 * App — Root component managing page navigation.
 * Handles transitions between FirstPage (boot greeting) and DesktopPage (macOS desktop).
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('first');   // 'first' | 'desktop'
  const [transitioning, setTransitioning] = useState(false); // controls fade animation

  const handleEnterDesktop = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
  }, [transitioning]);

  /* After exit animation completes, switch the page */
  useEffect(() => {
    if (!transitioning) return;
    const timer = setTimeout(() => {
      setCurrentPage('desktop');
      setTransitioning(false);
    }, 400); // matches CSS transition duration
    return () => clearTimeout(timer);
  }, [transitioning]);

  return (
    <>
      {currentPage === 'first' && (
        <div
          className={`page-transition ${
            transitioning ? 'page-transition--exiting' : 'page-transition--visible'
          }`}
        >
          <FirstPage onEnter={handleEnterDesktop} />
        </div>
      )}

      {currentPage === 'desktop' && (
        <div className="page-transition page-transition--visible">
          <DesktopPage />
        </div>
      )}
    </>
  );
}
