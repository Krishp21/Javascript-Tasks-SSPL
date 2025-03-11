import React, { Component } from "react";
import { Link } from "react-router-dom";

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isRunning: false,
    };
    this.timer = null;
  }

  handleStartStop = () => {
    this.setState((prevState) => {
      if (prevState.isRunning) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(() => {
          this.setState((prev) => ({ time: prev.time + 1 }));
        }, 1000);
      }
      return { isRunning: !prevState.isRunning };
    });
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ time: 0, isRunning: false });
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  render() {
    const styles = {
      container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dee0e3",
        borderRadius: "10px",
        padding: "20px",
        marginTop: "100px",
        height: "300px",
        boxShadow: "0 12px 12px rgba(0, 0, 0, 0.5)",
      },
      title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
      },
      timeDisplay: {
        fontSize: "28px",
        fontWeight: "bold",
        margin: "10px 0",
      },
      buttonGroup: {
        display: "flex",
        gap: "10px",
      },
      button: {
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        borderRadius: "30px",
        transition: "background 0.3s ease",
      },
      startButton: { backgroundColor: "green" },
      stopButton: {
        backgroundColor: "red",
        opacity: this.state.isRunning ? "1" : "0.6",
        cursor: this.state.isRunning ? "pointer" : "not-allowed",
      },
      resetButton: { backgroundColor: "gray" },
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

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>⏱ Stopwatch</h1>
        <p style={styles.timeDisplay}>{this.formatTime(this.state.time)}</p>
        <div style={styles.buttonGroup}>
          <button
            onClick={this.handleStartStop}
            style={{ ...styles.button, ...styles.startButton }}
          >
            {this.state.isRunning ? "Pause" : this.state.time > 0 ? "Resume" : "Start"}
          </button>
          <button
            onClick={this.handleStartStop}
            style={{ ...styles.button, ...styles.stopButton }}
            disabled={!this.state.isRunning}
          >
            Stop
          </button>
          <button
            onClick={this.handleReset}
            style={{ ...styles.button, ...styles.resetButton }}
          >
            Reset
          </button>
        </div>
        <Link to="/" style={styles.backButton}>🔙 Back to Home</Link>
      </div>
    );
  }
}

export default Stopwatch;
