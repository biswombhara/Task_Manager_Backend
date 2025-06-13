import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      login(res.data.user, res.data.token); // ✅ Save user + token in context/localStorage
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
