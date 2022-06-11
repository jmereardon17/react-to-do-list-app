import React, { Component } from 'react';
import Header from './Header';
import Task from './Task';

class App extends Component {

  store = require('store');

  state = {
    tasks: []
  };

  storedTasks = () => {
    const tasks = [];
    this.store.each(item => item.task && tasks.push(item));
    this.setState(prevState => ({ tasks: prevState.tasks = tasks }));
  }

  componentDidMount() {
    this.storedTasks()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const input = document.querySelector('.task-field');
    const task = input.value;
    this.addTask(task);
    input.value = '';
  }

  handleCheckbox = (taskId, e) => {
    const checkbox = e.target;
    const label = checkbox.parentNode;
    checkbox.checked ? label.classList.add('strike') : label.classList.remove('strike');
    this.updateTask(taskId, checkbox.checked);
  }

  addTask = (task) => {
    // set a variable to the highest task id number, or set it 0 if there are no tasks
    let prevTask;
    this.state.tasks.length > 0
      ? prevTask = Math.max.apply(Math, this.state.tasks.map(task => { return task.id }))
      : prevTask = 0;
    // Update the task id counter by 1 to get a higher unique task id
    const prevTaskId = prevTask += 1;
    // Add task to storage
    this.store.set(`task-${prevTaskId}`, { task: task, isDone: false, id: prevTaskId });
    const newTask = this.store.get(`task-${prevTaskId}`);
    // Update state
    this.setState( prevState => ({
        tasks: [
          ...prevState.tasks,
          newTask
        ]
       }
    ));
  }

  removeTask = (taskId) => {
    // Remove task from storage
    this.store.remove(`task-${taskId}`);
    // Update State
    this.setState( prevState => ({ tasks: prevState.tasks.filter( task => task.id !== taskId) }));
  }

  updateTask = (taskId, status) => {
    // copy current state
    const { tasks } = { ...this.state };
    // assign value to currentState
    const currentState = tasks;
    // loop over the array and find the task where the id matches the task id argument
    currentState.forEach( task => {
      if (task.id === taskId) {
        // update the property isDone with boolean value
        task.isDone = status;
      }
    });
    // update state with the new value for the isDone property
    this.setState( prevState => ({ tasks: prevState.tasks = currentState }));
    // loop over storage and find the task where the id matches the task id argument
    this.store.each((task) => {
      if (task.id === taskId) {
        // duplicate the original task object
        const copiedTask = this.store.get(`task-${taskId}`);
        // update the property isDone with boolean value
        copiedTask.isDone = status;
        // delete the original task from storage
        this.store.remove(`task-${taskId}`);
        // add the copied task with updated property
        this.store.set(`task-${taskId}`, copiedTask);
      }
    })
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
          { this.state.tasks.map(task => (
            <Task
              task={task.task}
              id={task.id}
              key={task.id.toString()}
              handleCheckbox={this.handleCheckbox}
              isDone={task.isDone}
              removeTask={this.removeTask}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
