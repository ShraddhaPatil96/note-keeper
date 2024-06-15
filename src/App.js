import React, { useState, useEffect } from 'react';
import AddNoteForm from './components/AddNoteForm/AddNoteForm';
import NoteGrid from './components/NoteGrid/NoteGrid';
import Pagination from './components/Pagination/Pagination';
import ErrorToast from './components/ErrorToast/ErrorToast';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (note) => {
    setNotes([note, ...notes]);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (id, editedTitle, editedTagline, editedBody) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, title: editedTitle, tagline: editedTagline, body: editedBody }
          : note
      )
    );
  };

  const handleTogglePin = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  return (
    <div className="App">
      
      <nav class="nav">
        <div>
             <a class="logo" href='#'><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
                 <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                 <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                 <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
               </svg> Note Keeper </a>
         </div>
   </nav>
      <AddNoteForm onAddNote={handleAddNote} showError={showError} />
      {error && <div className="error">{error}</div>}
      <NoteGrid
        notes={notes}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
        onTogglePin={handleTogglePin}
        showError={showError}
      />
      <Pagination />
      <ErrorToast />
      <Footer />
    </div>
  );
};

export default App;
