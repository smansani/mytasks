import React, { useState, useContext } from 'react';
import taskContext from './taskcontext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import UpdateForm from './UpdateForm';
import "./style/noteitem.css";

const NoteItem = ({ task }) => {
  const { deleteTask, updateTask } = useContext(taskContext);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };
  const handledelete=()=>{
    deleteTask(task._id)
  }
  const closeUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleUpdateTask = (id, updatedTask) => {
    updateTask(id, updatedTask.title, updatedTask.description);
    closeUpdateForm();
  };

  return (
    <div>
      <div className={`noteitem ${showUpdateForm ? 'blurred-background' : ''}`}>
        <span className="title">{task.title}</span>
        <p className="description">{task.description}</p>
        <p className="date">{new Date(task.date).toLocaleString()}</p>
        <div className="actions">
          <FontAwesomeIcon icon={faPenToSquare} onClick={handleUpdateClick} />
          <FontAwesomeIcon icon={faSquareCheck} onClick={handledelete} />
        </div>
      </div>
      {showUpdateForm && (
        <UpdateForm task={task} closeForm={closeUpdateForm} handleUpdateTask={handleUpdateTask} />
      )}
    </div>
  );
};

export default NoteItem;
