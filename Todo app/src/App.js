import React from "react";
import "./App.css";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], task: "", date: "" };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTask = this.handleChangeTask.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItemhandler = this.removeItemhandler.bind(this);
  }

  removeItemhandler(id) {
    this.state.items.forEach((item, index) => {
      if (item.id === id) {
        this.state.items.splice(index, 1);
      }
    });
    console.log(this.state.items);
    this.setState({ item: this.state.items });
  }

  render() {
    return (
      <div className="main">
        <TodoList removeFN={this.removeItemhandler} items={this.state.items} />
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-item">
            <label htmlFor="task">Task</label>
            <input
              id="task"
              onChange={this.handleChangeTask}
              value={this.state.task}
            />
          </div>
          <div className="form-item">
            <label htmlFor="Date">Date</label>
            <input
              type="date"
              id="date"
              onChange={this.handleChangeDate}
              value={this.state.date}
            />
          </div>

          <div>
            <button>Add task</button>
          </div>
        </form>
      </div>
    );
  }

  handleChangeTask(e) {
    this.setState({ task: e.target.value });
  }
  handleChangeDate(e) {
    this.setState({ date: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.task.length === 0) {
      return;
    }

    // we are setting form value to 'newItem' variable
    const newItem = {
      task: this.state.task,
      date: this.state.date,
      id: Date.now(),
    };

    // we are updating state with 'newItem'
    this.setState((state) => ({
      items: state.items.concat(newItem),
      task: "",
      date: "",
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul className="items">
        {this.props.items.map((item) => (
          <li key={item.id} className="list">
            <div>{item.task}</div>
            <div> {item.date} </div>
            <button onClick={() => this.props.removeFN(item.id)}>X</button>
          </li>
        ))}
      </ul>
    );
  }
}

export default TodoApp;
