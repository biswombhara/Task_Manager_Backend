import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/api";
import "./TaskDetails.css";
import EditIcon from '@mui/icons-material/Edit';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await axios.get(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTask(res.data);
      setForm({
        title: res.data.title,
        description: res.data.description,
        dueDate: res.data.dueDate.split("T")[0],
        priority: res.data.priority || "medium",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/tasks/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false);
      fetchTask();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`/tasks/${id}`);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleStatusToggle = async () => {
    try {
      await axios.put(`/tasks/${id}`, {
        ...task,
        status: task.status === "pending" ? "completed" : "pending",
      });
      fetchTask();
    } catch (err) {
      console.error(err);
    }
  };

  if (!task) return <p>Loading task...</p>;

  return (
    <div className="task-details">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <h2>Edit Task</h2>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className={`task-view priority-${task.priority}`}>
          <span className="edit-btn" onClick={() => setIsEditing(true)}>< EditIcon /></span>
          
          <h3>{task.title}</h3>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Priority:</strong> {task.priority}</p>

          <div className="bottom">
            <div className="actions">
              <button onClick={handleStatusToggle}>
                {task.status === "pending" ? "Mark as Completed" : "Mark as Pending"}
              </button>
              <button className="delete" onClick={handleDelete}>Delete Task</button>
            </div>
            <button className="go-back-btn" onClick={() => navigate(-1)}>← Go Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
