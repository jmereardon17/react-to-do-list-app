import React from 'react';

const Task = (props) => {

  const taskId = props.id;
  const status = props.isDone

  return (
    <li className="task">
      <label className={`checkbox-container ${status ? "strike" : ""}`}>{props.task}
        <input
          type="checkbox"
          className="completed"
          onChange={(e) => props.handleCheckbox(taskId, e)}
          checked={status}
        />
        <span className="checkmark"></span>
      </label>

      <button className="btn delete" onClick={ () => props.removeTask(taskId) }> x </button>
    </li>
  );
}

export default Task;