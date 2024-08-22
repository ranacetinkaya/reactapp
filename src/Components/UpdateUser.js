import React from 'react'

const UpdateUser = ({onUpdate, userId}) => {
    const handleOnSubmit = (e) => {
      e.preventDefault();
      onUpdate(userId, e.target.name.value, e.target.email.value);
      e.target.name.value = "";
      e.target.email.value = "";
    }
  
    return (
      <div>
        <form onSubmit={handleOnSubmit}>
          <h3>Update User</h3>
          <input placeholder="Name" name='name'/>
          <input placeholder="Email" name='email'/>
          <button onSubmit={handleOnSubmit}>Update</button>
          
        </form>
      </div>
    );
  };

export default UpdateUser