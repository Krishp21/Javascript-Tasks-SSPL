import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const styles = {
  container: { padding: "20px", maxWidth: "800px", margin: "auto" },
  button: {
    padding: "10px 15px",
    margin: "5px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  addButton: { backgroundColor: "#4CAF50", color: "white" },
  editButton: { backgroundColor: "#FFC107", color: "white" },
  deleteButton: { backgroundColor: "#F44336", color: "white" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  thTd: { border: "1px solid #ddd", padding: "10px", textAlign: "left" },
  modalOverlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center"
  },
  modal: { background: "white", padding: "20px", borderRadius: "10px", width: "300px", textAlign: "center" },
  input: { width: "90%", padding: "8px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" },
  modalButtons: { display: "flex", justifyContent: "space-between" },
};

const CrudApi = () => {
  const [modal, setModal] = useState({ show: false, mode: "" });
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id: "", title: "", description: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://akashsir.in/myapi/crud/todo-list-api.php");
      setData(res.data.todo_list || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClose = () => setModal({ show: false, mode: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("todo_title", form.title);
      formData.append("todo_details", form.description);
      if (modal.mode === "edit") formData.append("todo_id", form.id);
      
      await axios.post(
        modal.mode === "edit" 
          ? "https://akashsir.in/myapi/crud/todo-update-api.php" 
          : "https://akashsir.in/myapi/crud/todo-add-api.php",
        formData
      );
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`https://akashsir.in/myapi/crud/todo-detail-api.php?todo_id=${id}`);
      setForm({ id, title: res.data.todo_title, description: res.data.todo_details });
      setModal({ show: true, mode: "edit" });
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const formData = new FormData();
      formData.append("todo_id", form.id);
      await axios.post("https://akashsir.in/myapi/crud/todo-delete-api.php", formData);
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>CRUD Operations with API</h2>
      <button style={{ ...styles.button, ...styles.addButton }} onClick={() => setModal({ show: true, mode: "add" })}>
        Add New Item
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.thTd}>ID</th>
            <th style={styles.thTd}>Title</th>
            <th style={styles.thTd}>Details</th>
            <th style={styles.thTd}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.todo_id}>
              <td style={styles.thTd}>{item.todo_id}</td>
              <td style={styles.thTd}>{item.todo_title}</td>
              <td style={styles.thTd}>{item.todo_details}</td>
              <td style={styles.thTd}>
                <button style={{ ...styles.button, ...styles.editButton }} onClick={() => handleEdit(item.todo_id)}>
                  Edit
                </button>
                <button style={{ ...styles.button, ...styles.deleteButton }} onClick={() => setModal({ show: true, mode: "delete" })}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal.show && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            {modal.mode === "delete" ? (
              <>
                <h3>Delete Confirmation</h3>
                <p>Are you sure you want to delete this item?</p>
                <div style={styles.modalButtons}>
                  <button style={styles.deleteButton} onClick={handleDelete}>Yes</button>
                  <button style={styles.addButton} onClick={handleClose}>No</button>
                </div>
              </>
            ) : (
              <>
                <h3>{modal.mode === "edit" ? "Edit" : "Add"} Item</h3>
                <input style={styles.input} type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
                <input style={styles.input} type="text" name="description" placeholder="Details" value={form.description} onChange={handleChange} />
                <div style={styles.modalButtons}>
                  <button style={styles.addButton} onClick={handleSubmit}>Save</button>
                  <button style={styles.deleteButton} onClick={handleClose}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Link to="/" style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#4caf50", color: "white", textDecoration: "none", borderRadius: "25px", display: "inline-block" }}>
        Back to Home
      </Link>
    </div>
  );
};

export default CrudApi;
