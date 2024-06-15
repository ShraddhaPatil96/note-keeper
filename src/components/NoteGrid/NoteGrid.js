import React, { useState } from 'react';
import './NoteGrid.css';
import Note from '../Note/Note';

const NoteGrid = ({ notes, onDeleteNote, onEditNote, onTogglePin, showError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6; // Number of notes per page

  // Logic to calculate pagination
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="NoteGrid">
      {currentNotes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDeleteNote={onDeleteNote}
          onEditNote={onEditNote}
          onTogglePin={onTogglePin}
          showError={showError}
        />
      ))}

      {/* Pagination buttons */}
      <div className="pagination">
        {notes.length > notesPerPage && (
          <ul>
            {Array(Math.ceil(notes.length / notesPerPage))
              .fill()
              .map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NoteGrid;
