import React from 'react';
import AddTaskForm from './AddTaskForm';

const Header = (props) => {
  return (
    <header className="app-header">
      <h1 className="app-title">{ props.title }</h1>
      <h2 className="app-lead">{ props.lead }</h2>
      <AddTaskForm handleSubmit={ props.handleSubmit } />
    </header>
  );
}

export default Header;