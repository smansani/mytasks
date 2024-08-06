import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskContext from './taskcontext';
import Noteitem from './Noteitem';
import './style/note.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Note = () => {
  const { tasks, addTask, getTasks} = useContext(TaskContext);
  const [handleAdd, setHandleAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const updateAdd = () => {
    setHandleAdd(true);
  };

  const closeAddForm = () => {
    setHandleAdd(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title, description);
    setTitle('');
    setDescription('');
    closeAddForm();
  };

  return (
    <>
      {localStorage.getItem('token') ? (
        <>
          <div className='container'>
            <div className='row'>
              {tasks.map((task) => (
                <div className="col-md-4" key={task._id}>
                  <Noteitem task={task} />
                </div>
              ))}
            </div>
          </div>
          <div className='add'>
            <div className="addbutton">
              <FontAwesomeIcon icon={faPlus} size="2x" className="plus" onClick={updateAdd} />
            </div>
          </div>
          {handleAdd && (
            <>
              <div className='overlay' onClick={closeAddForm}></div>
              <div className='addtask-form'>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Add Task</button>
                  <button type="button" className="btn btn-secondary" onClick={closeAddForm}>Cancel</button>
                </form>
              </div>
            </>
          )}
        </>
      ) : (
        <p>Please log in to view your tasks.</p>
      )}
    </>
  );
};

export default Note;
