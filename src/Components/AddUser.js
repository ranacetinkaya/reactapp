import React from 'react';

const AddUser = ({ onAdd }) => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    onAdd(e.target.name.value, e.target.email.value);
    e.target.name.value = "";
    e.target.email.value = "";
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <h3>Add User</h3>
        <input placeholder="Name" name='name' />
        <input placeholder="Email" name='email' />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddUser;
