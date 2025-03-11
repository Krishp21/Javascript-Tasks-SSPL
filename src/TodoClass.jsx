import React, { Component } from "react";
import { Link } from "react-router-dom";

class TodoClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: JSON.parse(localStorage.getItem("tasks")) || [],
      input: "",
      editIndex: null,
    };
  }

  componentDidUpdate(_, prevState) {
    if (prevState.tasks !== this.state.tasks) {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  addOrUpdateTask = () => {
    if (this.state.input.trim()) {
      if (this.state.editIndex !== null) {
        const updatedTasks = [...this.state.tasks];
        updatedTasks[this.state.editIndex] = this.state.input;
        this.setState({ tasks: updatedTasks, input: "", editIndex: null });
      } else {
        this.setState((prevState) => ({
          tasks: [...prevState.tasks, prevState.input],
          input: "",
        }));
      }
    }
  };

  removeTask = (index) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((_, i) => i !== index),
    }));
  };

  clearAllTasks = () => {
    this.setState({ tasks: [] });
    localStorage.removeItem("tasks");
  };

  editTask = (index) => {
    this.setState({ input: this.state.tasks[index], editIndex: index });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.addOrUpdateTask();
    }
  };

  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Todo List with Local Storage</h2>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            value={this.state.input}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress}
            placeholder="Add a task..."
          />
          <button style={styles.button} onClick={this.addOrUpdateTask}>
            {this.state.editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {this.state.tasks.length > 0 && (
          <button style={styles.clearButton} onClick={this.clearAllTasks}>
            Clear All Tasks
          </button>
        )}

        <ul style={styles.list}>
          {this.state.tasks.map((task, index) => (
            <li style={styles.item} key={index}>
              <span style={styles.taskText}>{task}</span>
              <div>
                <button
                  style={styles.editButton}
                  onClick={() => this.editTask(index)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => this.removeTask(index)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div>
          <Link to="/" style={styles.backButton}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: "320px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "8px",
    background: "#f3f3f3",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  header: {
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 12px",
    border: "none",
    background: "#ca5d27",
    color: "white",
    borderRadius: "24px",
    cursor: "pointer",
  },
  clearButton: {
    marginTop: "10px",
    padding: "8px",
    border: "none",
    background: "#ff5722",
    color: "white",
    borderRadius: "24px",
    cursor: "pointer",
  },
  list: {
    marginTop: "10px",
    padding: 0,
    listStyle: "none",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px",
    background: "#ffffff",
    marginBottom: "5px",
    borderRadius: "24px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  },
  taskText: {
    flex: 1,
  },
  editButton: {
    marginRight: "5px",
    padding: "4px 8px",
    background: "#ffcc00",
    border: "none",
    borderRadius: "24px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "4px 8px",
    background: "#d9534f",
    border: "none",
    borderRadius: "24px",
    color: "white",
    cursor: "pointer",
  },
  backButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1.2rem",
    backgroundColor: "#4caf50",
    color: "white",
    textDecoration: "none",
    borderRadius: "25px",
    display: "inline-block",
  },
};

export default TodoClass;
