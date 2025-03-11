import React, { Component } from "react";
import { Link } from "react-router-dom";

class MiniCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: "",
      num2: "",
      result: "",
    };
  }

  calculate = (operator) => {
    const { num1, num2 } = this.state;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      this.setState({ result: "❌ Invalid Input" });
      return;
    }

    let res = 0;
    switch (operator) {
      case "+":
        res = n1 + n2;
        break;
      case "-":
        res = n1 - n2;
        break;
      case "*":
        res = n1 * n2;
        break;
      case "/":
        res = n2 !== 0 ? (n1 / n2).toFixed(2) : "❌ Cannot divide by zero";
        break;
      default:
        res = "❌ Invalid Operation";
    }

    this.setState({ result: res });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, result: "" });
  };

  clearFields = () => {
    this.setState({ num1: "", num2: "", result: "" });
  };

  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Mini Calculator</h2>
        <input
          type="number"
          name="num1"
          value={this.state.num1}
          onChange={this.handleChange}
          placeholder="Enter number"
          style={styles.input}
        />
        <input
          type="number"
          name="num2"
          value={this.state.num2}
          onChange={this.handleChange}
          placeholder="Enter number"
          style={styles.input}
        />
        <div style={styles.buttonContainer}>
          <button onClick={() => this.calculate("+")} style={styles.button}>
            ➕
          </button>
          <button onClick={() => this.calculate("-")} style={styles.button}>
            ➖
          </button>
          <button onClick={() => this.calculate("*")} style={styles.button}>
            ✖️
          </button>
          <button onClick={() => this.calculate("/")} style={styles.button}>
            ➗
          </button>
          <button onClick={this.clearFields} style={styles.clearButton}>
            🔄 Clear
          </button>
        </div>
        <h3 style={styles.result}>Result: {this.state.result}</h3>
        <Link to="/" style={styles.link}>
          🔙 Back to Home
        </Link>
      </div>
    );
  }
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1e1e1e",
    color: "#61dafb",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  input: {
    margin: "10px",
    padding: "10px",
    fontSize: "1.2rem",
    width: "200px",
    borderRadius: "5px",
    border: "1px solid #61dafb",
    backgroundColor: "#2c2c2c",
    color: "#fff",
  },
  buttonContainer: {
    marginTop: "10px",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "1.5rem",
    cursor: "pointer",
    backgroundColor: "#61dafb",
    border: "none",
    color: "#282c34",
    borderRadius: "5px",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#4fa3d1",
  },
  clearButton: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "1.2rem",
    cursor: "pointer",
    backgroundColor: "#ff4f4f",
    border: "none",
    color: "#fff",
    borderRadius: "5px",
    transition: "0.3s",
  },
  result: {
    marginTop: "20px",
    fontSize: "1.5rem",
  },
  link: {
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

export default MiniCalculator;
