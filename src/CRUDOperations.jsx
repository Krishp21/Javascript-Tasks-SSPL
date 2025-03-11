import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CRUDOperations = () => {
const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.name)) {
      setError("Name must contain only letters");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const addOrUpdateUser = () => {
    if (!validateForm()) return;

    const updatedUsers = editIndex !== null
      ? users.map((user, i) => (i === editIndex ? formData : user))
      : [...users, formData];

    setUsers(updatedUsers);
    setFormData({ name: "", gender: "", email: "", password: "", confirmPassword: "" });
    setEditIndex(null);
  };

  const removeUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const editUser = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>User Management</h2>
      
      {/* Form */}
      <div style={styles.formContainer}>
        <input
          style={styles.input}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <select style={styles.input} name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          style={styles.input}
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          style={styles.input}
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.button} onClick={addOrUpdateUser}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* User Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.gender}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>
                <button style={styles.editButton} onClick={() => editUser(index)}>
                  Edit
                </button>
                <button style={styles.deleteButton} onClick={() => removeUser(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Back to Home */}
      <Link to="/" style={styles.link}>Back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    width: "600px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "8px",
    background: "#f3f3f3",
    boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.4)",
  },
  header: { textAlign: "center", color: "#333" },
  formContainer: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "8px", border: "1px solid #ccc", borderRadius: "4px" },
  button: { padding: "8px 12px", background: "rgb(202 93 39)", color: "white", borderRadius: "24px", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  th: { border: "1px solid #ddd", padding: "8px", background: "#f4f4f4", textAlign: "left" },
  td: { border: "1px solid #ddd", padding: "8px" },
  editButton: { marginRight: "5px", padding: "4px 8px", background: "#ffcc00", borderRadius: "24px", cursor: "pointer" },
  deleteButton: { padding: "4px 8px", background: "#d9534f", borderRadius: "24px", color: "white", cursor: "pointer" },
  error: { color: "red", textAlign: "center" },
  link: { marginTop: "20px", padding: "10px 20px", fontSize: "1.2rem", backgroundColor: "#4caf50", color: "white", textDecoration: "none", borderRadius: "25px", display: "inline-block" },
};

export default CRUDOperations;
