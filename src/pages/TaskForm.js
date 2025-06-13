import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import "./TaskForm.css";

const TaskForm = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/tasks", task);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="task-form">
      <h3>Create New Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />

        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;