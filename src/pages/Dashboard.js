import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="dashboard">Loading...</div>;

  if (!token) {
    return (
      <div className="dashboard no-access">
        <h2>Welcome to Task Manager</h2>
        <p>Please log in to start creating and managing your tasks efficiently.</p>
        <Link to="/login" className="btn-primary">Login Now</Link>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Hello {user.name}</h1>
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="empty-state">You have no tasks yet. Get started by creating one.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className={`priority-${task.priority}`}>
              <h4>{task.title}</h4>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Status: {task.status}</p>
              <Link to={`/task/${task._id}`} className="view-btn">View Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
