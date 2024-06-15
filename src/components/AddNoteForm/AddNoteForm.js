
// export default AddNoteForm;

import React, { useState } from 'react';
import './AddNoteForm.css';

const AddNoteForm = ({ onAddNote, showError }) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [body, setBody] = useState('');

  const handleAddNote = () => {
    if (title.trim() && body.trim()) {
      onAddNote({
        id: Date.now(),
        title: title.trim(),
        tagline: tagline.trim(),
        body: body.trim(),
        pinned: false,
      });
      setTitle('');
      setTagline('');
      setBody('');
    } else {
      showError('Title and body cannot be empty.');
    }
  };

  return (
    <div className="AddNoteForm">
     <h1 className='heading1'>Welcome to Note Keeper App !!</h1>
     <h2 className="heading2">Add Note</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />
      <input
        type="text"
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
        placeholder="Enter tagline"
      />
      <textarea
        rows="5"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Enter your note here..."
      ></textarea>
      <button className="primary-btn" onClick={handleAddNote}>
        Add Note
      </button>
    </div>
  );
};

export default AddNoteForm;
