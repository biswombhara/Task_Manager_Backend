import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/tasks/${taskToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
      setOpenDialog(false);
      setTaskToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  const openDeleteDialog = (taskId) => {
    setTaskToDelete(taskId);
    setOpenDialog(true);
  };

  return (
    <div className="task-list">
      <h3>Your Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={`priority-${task.priority}`}>
            <h4>{task.title}</h4>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Status: {task.status}</p>
            <Link to={`/task/${task._id}`} className="view-btn">View Details</Link>
            <button
              onClick={() => openDeleteDialog(task._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskList;
