import React, { useState, useEffect } from 'react';
import './userTable.css';

const UserTable = ({ users, onDelete, onUpdate }) => {
  const [editUserId, setEditUserId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [comments, setComments] = useState({});
  const [photos, setPhotos] = useState([]);
  const [todos, setTodos] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserTodos, setSelectedUserTodos] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = {};
        for (const user of users) {
          const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${user.id}`);
          const data = await res.json();
          commentsData[user.id] = data;
        }
        setComments(commentsData);
      } catch (err) {
        console.log('Error fetching comments:', err);
      }
    };

    const fetchPhotos = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await res.json();
        const photosData = {};
        users.forEach((user, index) => {
          if (index < data.length) {
            photosData[user.id] = data[index];
          }
        });
        setPhotos(photosData);
      } catch (err) {
        console.log('Error fetching photos:', err);
      }
    };

    const fetchTodos = async () => {
      try {
        const todosData = {};
        for (const user of users) {
          const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);
          const data = await res.json();
          todosData[user.id] = data;
        }
        setTodos(todosData);
      } catch (err) {
        console.log('Error fetching todos:', err);
      }
    };

    fetchComments();
    fetchPhotos();
    fetchTodos();
  }, [users]);

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setNewName(user.name);
    setNewEmail(user.email);
  };

  const handleUpdateClick = () => {
    if (editUserId) {
      onUpdate(editUserId, newName, newEmail);
      setEditUserId(null);
      setNewName('');
      setNewEmail('');
    }
  };

  const handleCommentsClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleTodosClick = (userId) => {
    setSelectedUserTodos(todos[userId]);
  };

  const handleCloseComments = () => {
    setSelectedUserId(null);
  };

  const handleCloseTodos = () => {
    setSelectedUserTodos(null);
  };

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {photos[user.id] && (
                  <img src={photos[user.id].url} alt={photos[user.id].title} className="user-photo" />
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <button className="update-btn" onClick={handleUpdateClick}>
                    Update
                  </button>
                ) : (
                  <button className="edit-btn" onClick={() => handleEditClick(user)}>
                    Edit
                  </button>
                )}
                <button className="delete-btn" onClick={() => onDelete(user.id)}>
                  Delete
                </button>
                <button className="comments-btn" onClick={() => handleCommentsClick(user.id)}>
                  Show Comments
                </button>
                <button className="todos-btn" onClick={() => handleTodosClick(user.id)}>
                  Show Todos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUserId !== null && (
        <div className="comments-popup">
          <button className="close-btn" onClick={handleCloseComments}>
            Close
          </button>
          <h3>Comments for {users.find(user => user.id === selectedUserId)?.name}</h3>
          <div className="comments-container">
            {comments[selectedUserId] && comments[selectedUserId].map((comment) => (
              <div key={comment.id} className="comment-box">
                {comment.body}
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedUserTodos !== null && (
        <div className="todos-popup">
          <button className="close-btn" onClick={handleCloseTodos}>
            Close
          </button>
          <h3>Todos for {users.find(user => user.id === selectedUserTodos[0]?.userId)?.name}</h3>
          <div className="todos-container">
            {selectedUserTodos.map((todo) => (
              <div key={todo.id} className="todo-box">
                <strong>{todo.title}</strong>
                <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
