import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Admin from "./view/admin";
import Dashboard from "./view/dashboard";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isAuthentified = () => {
  return localStorage.getItem("token") !== null;
};

const isAdmin = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token); 
      return decoded.role === "admin"; 
    } catch (err) {
      console.error("Invalid token:", err);
      return false;
    }
  }
  return false;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/dashboard" element={isAdmin() ? <Dashboard /> : <Navigate to="/admin" /> } />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
