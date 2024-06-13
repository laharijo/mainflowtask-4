// src/ToDoList.js
import React, { useState } from 'react';
import './ToDoList.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditTask = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index].text);
  };

  const saveEditTask = () => {
    const updatedTasks = tasks.map((task, i) => 
      i === editIndex ? { ...task, text: editTask } : task
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditTask('');
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Add a new task" 
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {editIndex === index ? (
              <>
                <input 
                  type="text" 
                  value={editTask} 
                  onChange={(e) => setEditTask(e.target.value)} 
                />
                <button onClick={saveEditTask}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => completeTask(index)}>{task.text}</span>
                <button onClick={() => startEditTask(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
