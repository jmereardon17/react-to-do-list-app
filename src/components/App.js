import React, { Component } from 'react';
import Header from './Header';
import Task from './Task';

class App extends Component {

  state = {
    tasks: []
  };

  storedTasks = () => {
    let tasks = [];
    const taskCount = localStorage.length;
    if (taskCount > 0) {
      for (let i = 1; i <= taskCount; i += 1) {
        const task = localStorage.getItem(`task-${i}`);
        tasks.push({ task: task, id: i })
      }
    }
    this.setState( prevState => {
      return {
        tasks: prevState.tasks = tasks
      }
    });
  }

  componentDidMount() {
    this.storedTasks()
  }

  // Task id counter variable
  prevTaskId = localStorage.length;

  handleSubmit = (e) => {
    e.preventDefault();
    const input = document.querySelector('.task-field');
    const task = input.value;
    this.addTask(task);
    input.value = '';
  }

  // TODO: transition text-decoration? transition checkbox hover

  handleCheckbox = (e) => {
    const checkbox = e.target;
    const label = checkbox.parentNode;
    checkbox.checked
      ? label.classList.add('strike')
      : label.classList.remove('strike')
  }

  addTask = (task) => {
    // Update the task id counter
    this.prevTaskId += 1;
    // Add task to localStorage
    localStorage.setItem(`task-${this.prevTaskId}`, `${task}`);
    const newTask = localStorage.getItem(`task-${this.prevTaskId}`);
    // Update state
    this.setState( prevState => ({
        tasks: [
          ...prevState.tasks,
          {
            task: newTask,
            id: this.prevTaskId
          }
        ]
       }
    ));
  }

  removeTask = (taskId) => {
    // Remove task from localStorage
    localStorage.removeItem(`task-${taskId}`);
    // Update State
    this.setState( prevState => {
      return {
        tasks: prevState.tasks.filter( task => task.id !== taskId)
      }
    });
  }

  render() {
    return (
      <div className="app">
        <Header 
          title="To Do List"
          lead="An app built with React"
          handleSubmit={ this.handleSubmit }
        />
        <ul className="to-do-list">
          { this.state.tasks.map(task =>
            <Task
              task={task.task}
              id={task.id}
              key={task.id.toString()}
              handleCheckbox={this.handleCheckbox}
              removeTask={this.removeTask}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default App;
