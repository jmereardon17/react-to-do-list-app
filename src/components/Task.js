import React from 'react';

const Task = (props) => {

  const taskId = props.id;

  return (
    <li className="task">
      <label className="checkbox-container">{ props.task }
        <input 
          type="checkbox" 
          className="completed"
          onChange={ props.handleCheckbox } />
        <span className="checkmark"></span>
      </label>

      <button className="btn delete" onClick={ () => props.removeTask(taskId) }> x </button>
    </li>
  );
}

export default Task;