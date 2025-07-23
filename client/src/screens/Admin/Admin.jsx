import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/admin/logs", {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (res.status === 401 || res.status === 403) {
          // pas autorisé → retour à l'accueil
          navigate("/");
          return;
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur récupération logs");
        setLogs(data.logs || data); // selon la forme renvoyée
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [navigate]);

  if (isLoading) return <p className="loading-text">Chargement des logs…</p>;
  if (error)     return <p className="error-message">{error}</p>;

  return (
    <div className="admin-container">
      <h1>Tableau de bord Admin</h1>
      <table className="logs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.user_id ?? "-"}</td>
              <td>{log.action}</td>
              <td>{new Date(log.created).toLocaleString()}</td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr>
              <td colSpan={12}>Aucun log disponible.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};