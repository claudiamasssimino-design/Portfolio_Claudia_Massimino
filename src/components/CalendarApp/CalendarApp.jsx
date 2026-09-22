import React from 'react';
import Window from '../Window/Window';
import './CalendarApp.css';

export default function CalendarApp({ onClose, initialX = 150, initialY = 100 }) {
  const customTitlebar = ({ handleClose, handleMinimize, handleMaximize }) => (
    <div className="calendar-toolbar">
      <div className="calendar-toolbar__left">
        <div className="window__traffic-lights">
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
        <button className="calendar-icon-btn"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="2.5" width="11" height="10" rx="1.5"/><path d="M4 1v3M10 1v3M1.5 6.5h11"/></svg></button>
        <button className="calendar-icon-btn"><svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1h12L7 7 1 1zM1 11h12V1H1v10z"/></svg></button>
        <button className="calendar-icon-btn"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 1v10M1 6h10"/></svg></button>
      </div>

      <div className="calendar-toolbar__center">
        <div className="calendar-segmented-control">
          <button className="calendar-segment">Giorno</button>
          <button className="calendar-segment">Settimana</button>
          <button className="calendar-segment active">Mese</button>
          <button className="calendar-segment">Anno</button>
        </div>
      </div>

      <div className="calendar-toolbar__right">
        <div className="calendar-search">
          <svg className="calendar-search-icon" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="5"/><path d="M9.5 9.5L14 14"/></svg>
          <input type="text" placeholder="Cerca" className="calendar-search-input" />
        </div>
      </div>
    </div>
  );

  return (
    <Window
      title="Calendario"
      initialX={initialX}
      initialY={initialY}
      width={874}
      height={598}
      onClose={onClose}
      customTitlebar={customTitlebar}
    >
      <div className="calendar-layout">
        
        {/* Header */}
        <div className="calendar-header">
          <h2 className="calendar-title">Ottobre <span>2026</span></h2>
          <div className="calendar-nav">
            <button className="calendar-nav-btn">&lt;</button>
            <button className="calendar-nav-btn today">Oggi</button>
            <button className="calendar-nav-btn">&gt;</button>
          </div>
        </div>

        {/* Days of week */}
        <div className="calendar-weekdays">
          <span>lun</span>
          <span>mar</span>
          <span>mer</span>
          <span>gio</span>
          <span>ven</span>
          <span>sab</span>
          <span>dom</span>
        </div>

        {/* Grid */}
        <div className="calendar-grid">
          {/* Row 1 */}
          <div className="calendar-cell inactive">28</div>
          <div className="calendar-cell inactive">29</div>
          <div className="calendar-cell inactive">30</div>
          <div className="calendar-cell"><strong>1</strong> ott</div>
          <div className="calendar-cell">2</div>
          <div className="calendar-cell">3</div>
          <div className="calendar-cell">4</div>

          {/* Row 2 */}
          <div className="calendar-cell">5</div>
          <div className="calendar-cell">6</div>
          <div className="calendar-cell"><span className="calendar-circle">7</span></div>
          <div className="calendar-cell">8</div>
          <div className="calendar-cell">9</div>
          <div className="calendar-cell">10</div>
          <div className="calendar-cell">11</div>

          {/* Row 3 */}
          <div className="calendar-cell">12</div>
          <div className="calendar-cell">13</div>
          <div className="calendar-cell"><span className="calendar-circle">14</span></div>
          <div className="calendar-cell">15</div>
          <div className="calendar-cell">16</div>
          <div className="calendar-cell">17</div>
          <div className="calendar-cell">18</div>

          {/* Row 4 */}
          <div className="calendar-cell">19</div>
          <div className="calendar-cell">20</div>
          <div className="calendar-cell">21</div>
          <div className="calendar-cell">22</div>
          <div className="calendar-cell">23</div>
          <div className="calendar-cell">
            24
            <div className="calendar-event pink">Ora solare</div>
          </div>
          <div className="calendar-cell">25</div>

          {/* Row 5 */}
          <div className="calendar-cell">26</div>
          <div className="calendar-cell">27</div>
          <div className="calendar-cell">28</div>
          <div className="calendar-cell">29</div>
          <div className="calendar-cell">30</div>
          <div className="calendar-cell">
            <span className="calendar-circle">31</span>
            <div className="calendar-event pink">Ognissanti</div>
          </div>
          <div className="calendar-cell inactive">1 nov</div>

          {/* Row 6 */}
          <div className="calendar-cell inactive">2</div>
          <div className="calendar-cell inactive">3</div>
          <div className="calendar-cell inactive">4</div>
          <div className="calendar-cell inactive">5</div>
          <div className="calendar-cell inactive">6</div>
          <div className="calendar-cell inactive">7</div>
          <div className="calendar-cell inactive">8</div>

          {/* Floating Images */}
          <img src={import.meta.env.BASE_URL + 'calendario_images/STRIPS.png'} alt="Strips" className="calendar-floating-img img-1" draggable="false" />
          <img src={import.meta.env.BASE_URL + 'calendario_images/CHEAT DAY.png'} alt="Cheat Day" className="calendar-floating-img img-2" draggable="false" />
          <img src={import.meta.env.BASE_URL + 'calendario_images/HALLOWEEN.png'} alt="Halloween" className="calendar-floating-img img-3" draggable="false" />

        </div>

      </div>
    </Window>
  );
}
