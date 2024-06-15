import React, { useState } from 'react';
import './Note.css';

const Note = ({ note, onDeleteNote, onEditNote, onTogglePin, showError }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedTagline, setEditedTagline] = useState(note.tagline);
  const [editedBody, setEditedBody] = useState(note.body);

  const handleDelete = () => {
    onDeleteNote(note.id);
  };

  const handleEdit = () => {
    if (editedTitle.trim() && editedBody.trim()) {
      onEditNote(note.id, editedTitle.trim(), editedTagline.trim(), editedBody.trim());
      setIsEditing(false);
    } else {
      showError('Title and body cannot be empty.');
    }
  };

  const handleTogglePin = () => {
    onTogglePin(note.id);
  };

  return (
    <div className={`Note ${note.pinned ? 'pinned' : ''}`}>
      <div className="note-content">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Enter title"
            />
            <input
              type="text"
              value={editedTagline}
              onChange={(e) => setEditedTagline(e.target.value)}
              placeholder="Enter tagline"
            />
            <textarea
              rows="5"
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
            ></textarea>
          </>
        ) : (
          <>
            <h3>{note.title}</h3>
            <h4>{note.tagline}</h4>
            <p>{note.body}</p>
          </>
        )}
      </div>
      <div className="note-actions">
        {isEditing ? (
          <button className="primary-btn" onClick={handleEdit}>
            Save
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
        <button className="pin-btn" onClick={handleTogglePin}>
          {note.pinned ? 'Unpin' : 'Pin'}
        </button>
      </div>
    </div>
  );
};

export default Note;
