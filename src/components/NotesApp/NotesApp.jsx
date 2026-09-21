import { useState, useCallback, useRef, useEffect } from 'react';
import Window from '../Window/Window';
import './NotesApp.css';

const initialNote = {
  id: 1,
  title: 'Piacere, Claudia Massimino 👋',
  html: "<b>Piacere, Claudia Massimino 👋</b><br><br>Napoletana d'origine e milanese d'adozione.<br>Classe '01.<br><br>Laureata in <b>Design della Comunicazione</b> presso lo IUAD di Napoli.<br><br>Prima in <b>Antville 🐜</b>,<br>oggi in <b>Leo Italia, Publicis 🦁</b>,<br>sempre come <b>Art Director Intern.</b>",
  text: "Piacere, Claudia Massimino 👋\n\nNapoletana d'origine e milanese d'adozione.\nClasse '01.\n\nLaureata in Design della Comunicazione presso lo IUAD di Napoli.\n\nPrima in Antville 🐜,\noggi in Leo Italia, Publicis 🦁,\nsempre come Art Director Intern.",
  date: 'Oggi'
};

export default function NotesApp({ onClose, initialX = 100, initialY = 80 }) {
  const [notes, setNotes] = useState([initialNote]);
  const [selectedNoteId, setSelectedNoteId] = useState(1);
  const editorRef = useRef(null);

  const selectedNote = notes.find(n => n.id === selectedNoteId);

  useEffect(() => {
    if (editorRef.current && selectedNote) {
      if (editorRef.current.innerHTML !== selectedNote.html) {
        editorRef.current.innerHTML = selectedNote.html;
      }
    }
  }, [selectedNoteId, selectedNote?.html]);

  const handleAddNote = useCallback(() => {
    const newNote = {
      id: Date.now(),
      title: 'Nuova nota',
      html: '',
      text: '',
      date: 'Oggi'
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
  }, []);

  const handleDeleteNote = useCallback(() => {
    if (!selectedNoteId) return;
    setNotes(prev => {
      const filtered = prev.filter(n => n.id !== selectedNoteId);
      if (filtered.length > 0) {
        setSelectedNoteId(filtered[0].id);
      } else {
        setSelectedNoteId(null);
      }
      return filtered;
    });
  }, [selectedNoteId]);

  const handleInput = useCallback((e) => {
    const newHtml = e.currentTarget.innerHTML;
    // Extract plain text for the title and preview, replacing <br> and blocks with newlines
    const plainText = e.currentTarget.innerText || '';
    const newTitle = plainText.split('\n')[0].substring(0, 30) || 'Nuova nota';

    setNotes(prev => prev.map(n => 
      n.id === selectedNoteId ? { ...n, html: newHtml, text: plainText, title: newTitle } : n
    ));
  }, [selectedNoteId]);

  const customTitlebar = ({ handleClose, handleMinimize, handleMaximize }) => (
    <div className="notes-toolbar">
      {/* Sidebar section */}
      <div className="notes-toolbar__section notes-toolbar__sidebar">
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
        <button className="notes-btn" title="Nascondi cartelle">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="14" height="12" rx="2"/><path d="M5 1V13"/></svg>
        </button>
      </div>

      {/* List section */}
      <div className="notes-toolbar__section notes-toolbar__list">
        <div className="notes-btn-group">
          <button className="notes-btn active"><svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor"><path d="M2 3a1 1 0 11-2 0 1 1 0 012 0zm12 0H5v-1h9v1zM2 7a1 1 0 11-2 0 1 1 0 012 0zm12 0H5v-1h9v1zm-12 4a1 1 0 11-2 0 1 1 0 012 0zm12 0H5v-1h9v1z"/></svg></button>
          <button className="notes-btn"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="5" height="5" rx="1"/><rect x="8" y="1" width="5" height="5" rx="1"/><rect x="1" y="8" width="5" height="5" rx="1"/><rect x="8" y="8" width="5" height="5" rx="1"/></svg></button>
        </div>
        <button className="notes-btn" onClick={handleDeleteNote} title="Elimina"><svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 4h12M4 4V2a1 1 0 011-1h4a1 1 0 011 1v2M2.5 4v10a1 1 0 001 1h7a1 1 0 001-1V4"/></svg></button>
      </div>

      {/* Editor section */}
      <div className="notes-toolbar__section notes-toolbar__editor">
        <button className="notes-btn" onClick={handleAddNote} title="Nuova nota">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11.5 1.5l3 3-9 9H2.5v-3l9-9z"/></svg>
        </button>
        <button className="notes-btn">Aa</button>
        <button className="notes-btn"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="4" cy="4" r="2"/><path d="M8 4h7M8 12h7"/><circle cx="4" cy="12" r="2"/></svg></button>
        <button className="notes-btn"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M2 6h12M6 2v12"/></svg></button>
        <button className="notes-btn"><svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 1v14M3 5v6M11 5v6"/></svg></button>
        <button className="notes-btn"><svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="14" height="12" rx="2"/><circle cx="5" cy="5" r="1.5"/><path d="M1 10l5-5 9 9"/></svg></button>
        
        <div className="notes-toolbar__spacer" />
        
        <button className="notes-btn"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="5"/><path d="M10.5 10.5L15 15"/></svg></button>
        <div className="notes-search">
          <svg className="notes-search-icon" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="5"/><path d="M9.5 9.5L14 14"/></svg>
          <input type="text" placeholder="Cerca" className="notes-search-input" />
        </div>
      </div>
    </div>
  );

  return (
    <Window
      title="Note"
      initialX={initialX}
      initialY={initialY}
      width={900}
      height={550}
      onClose={onClose}
      customTitlebar={customTitlebar}
    >
      <div className="notes-layout">
        {/* Sidebar */}
        <div className="notes-sidebar">
          <div className="notes-sidebar__section">
            <h3 className="notes-sidebar__title">Sul mio Mac</h3>
            <ul className="notes-sidebar__list">
              <li className="notes-sidebar__item active">
                <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor"><path d="M1 1h5l1.5 2h5.5v8H1V1z"/></svg>
                Note
              </li>
            </ul>
          </div>
          <div className="notes-sidebar__bottom">
            <button className="notes-new-folder-btn">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 1v10M1 6h10"/></svg>
              Nuova cartella
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div className="notes-list-col">
          {notes.map(note => (
            <div 
              key={note.id} 
              className={`notes-list-item ${note.id === selectedNoteId ? 'active' : ''}`}
              onClick={() => setSelectedNoteId(note.id)}
            >
              <div className="notes-list-item__title">{note.title || 'Nuova nota'}</div>
              <div className="notes-list-item__preview">
                {note.date} <span className="notes-list-item__excerpt">{note.text.split('\n').slice(1).join(' ').substring(0, 40)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="notes-editor">
          {selectedNote ? (
            <div className="notes-editor__content">
              <div className="notes-editor__date">{selectedNote.date} alle {new Date().toLocaleTimeString('it-IT', {hour: '2-digit', minute:'2-digit'})}</div>
              <div 
                ref={editorRef}
                className="notes-editor__textarea notes-editor__rich-text"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={handleInput}
                data-placeholder="Inizia a scrivere..."
              />
            </div>
          ) : (
            <div className="notes-editor__empty">Nessuna nota selezionata</div>
          )}
        </div>
      </div>
    </Window>
  );
}
