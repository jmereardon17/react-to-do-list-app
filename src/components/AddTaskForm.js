import React  from 'react';

const AddTaskForm = (props) => {
  return (
    <form>
      <input
        type="text"
        className="task-field"
        placeholder="What needs doing?"
      />

      <button
        type="submit"
        className="btn add"
        onClick={ props.handleSubmit }>
        Add Task
    </button>
    </form>
  );
}

export default AddTaskForm;