import React, { useContext, useState, useEffect } from 'react';
import TaskContext from './taskcontext'; 
import alertcontext from './alertcontext';

const TaskState = (props) => {
  const host = "http://localhost:5000";
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(''); // Added state for user
  const showalert = useContext(alertcontext);

  // Fetch all tasks
  const getTasks = async () => {
    const url = `/api/notes/fetchnotes`;
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error('Failed to fetch tasks:', error.message);
    }
  };

  // Add a new task
  const addTask = async (title, description) => {
    const url = `/api/notes/createnotes`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTimeout(() => {
        showalert("Task added successfully");
      }, 3000);
    } catch (error) {
      console.error('Failed to add task:', error.message);
    }
  };

  // Update a task
  const updateTask = async (id, title, description) => {
    const url = `/api/notes/updateData/${id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
      setTimeout(() => {
        showalert("Task updated successfully");
      }, 3000);
    } catch (error) {
      console.error('Failed to update task:', error.message);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    const url = `/api/notes/deleteData/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setTasks(tasks.filter((task) => task._id !== id));
      setTimeout(() => {
        showalert("Task deleted successfully");
      }, 3000);
    } catch (error) {
      console.error('Failed to delete task:', error.message);
    }
  };

  const getuser = async () => {
    const url = `/api/auth/getuser`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      console.log(userData);
      setUser(userData.name); // Set user state
    } catch (error) {
      console.error('Failed to fetch user:', error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getTasks();
      getuser();
    }
  }, []); 

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask, getTasks, getuser, user }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
