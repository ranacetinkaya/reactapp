import React, { useEffect, useState } from 'react';
import './App.css';
import AddUser from './Components/AddUser';
import UserTable from './Components/UserTable';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log('Error fetching users:', err);
    }
  };

  const onAdd = async (name, email) => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (res.status !== 201) {
        console.log('Failed to add user');
        return;
      }

      const data = await res.json();
      setUsers((users) => [...users, data]);
    } catch (err) {
      console.log('Error adding user:', err);
    }
  };

  const onDelete = async (id) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });

      if (res.status !== 200) {
        console.log('Failed to delete user');
        return;
      }

      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.log('Error deleting user:', err);
    }
  };

  const onUpdate = async (id, name, email) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          name: name,
          email: email,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (res.status !== 200) {
        console.log('Failed to update user');
        return;
      }

      const data = await res.json();
      setUsers(users.map((user) => (user.id === id ? data : user)));
    } catch (err) {
      console.log('Error updating user:', err);
    }
  };

  return (
    <div className="App">
      <h3>React CRUD Using JSONPlaceholder</h3>
      <AddUser onAdd={onAdd} />
      <UserTable users={users} onDelete={onDelete} onUpdate={onUpdate} />
    </div>
  );
}

export default App;
