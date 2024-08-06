import React, { useState } from 'react';

const UpdateForm = ({ task, closeForm, handleUpdateTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdateTask(task._id, { title, description });
  };

  return (
    <div className="update-form">
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" 
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
        />
        <button type="submit">Update Task</button>
        <button type="button" onClick={closeForm}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateForm;
