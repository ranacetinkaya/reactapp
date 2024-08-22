// Components/User.js
import React, { useState, useEffect } from 'react';
import './user.css';
import Comments from './comments';

const User = ({ id, email, name, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [showComments, setShowComments] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums/1/photos`)
      .then((response) => response.json())
      .then((photos) => {
        setPhotoUrl(photos[id % photos.length]?.thumbnailUrl);
      })
      .catch((error) => console.log('Error fetching photos:', error));
  }, [id]);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    if (isEditing) {
      onUpdate(id, newName, newEmail);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="user-card">
      <div className="user-info">
        {isEditing ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </>
        ) : (
          <>
            <img src={photoUrl} alt={`${name}'s avatar`} className="user-photo" />
            <div className="user-details">
              <h3>{name}</h3>
              <p>{email}</p>
            </div>
          </>
        )}
      </div>
      <div className="user-actions">
        <button className="edit-btn" onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
      <button className="comments-toggle" onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && <Comments postId={id} />}
    </div>
  );
};

export default User;
