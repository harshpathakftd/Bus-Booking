import { useState } from "react";
import { api, withAuth } from "../api";

const AdminDashboardPage = () => {
  const [token, setToken] = useState("");
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    const res = await api.get("/bookings/dashboard", withAuth(token));
    setStats(res.data);
  };

  return (
    <section className="card">
      <div className="section-head">
        <h2>Admin Dashboard</h2>
        <p className="muted">Track bookings, revenue and active buses.</p>
      </div>
      <div className="admin-actions">
        <input
          placeholder="Admin JWT token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button onClick={loadStats} disabled={!token} className="primary-btn">
          Load Stats
        </button>
      </div>
      {stats && (
        <div className="stats">
          <article className="stat-card">
            <span>Total Bookings</span>
            <strong>{stats.totalBookings}</strong>
          </article>
          <article className="stat-card">
            <span>Total Revenue</span>
            <strong>Rs {stats.totalRevenue}</strong>
          </article>
          <article className="stat-card">
            <span>Active Buses</span>
            <strong>{stats.activeBuses}</strong>
          </article>
        </div>
      )}
    </section>
  );
};

export default AdminDashboardPage;
