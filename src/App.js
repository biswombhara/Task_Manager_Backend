import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import TaskDetail from './pages/TaskDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/task/new" element={<TaskForm />} />
        <Route path="/task/:id/edit" element={<TaskForm />} />
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
