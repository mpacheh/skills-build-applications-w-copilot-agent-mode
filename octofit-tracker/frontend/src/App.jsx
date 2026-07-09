import { Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl } from './utils/api';
import './App.css';

function App() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <p className="text-uppercase text-primary fw-semibold mb-3">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Modern fitness tracking for ambitious teams</h1>
              <p className="lead text-muted mb-4">
                A multi-tier application for logging workouts, building leaderboards, and motivating teammates.
              </p>
              <p className="mb-4 text-muted small">
                API base URL: <span className="fw-semibold">{apiBaseUrl}</span>
              </p>
              <p className="text-muted small mb-4">
                Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to target your Codespaces API URL. If it is unset, the app falls back to <code>http://localhost:8000/api</code>.
              </p>
              <nav className="nav nav-pills flex-wrap gap-2 mb-4">
                <Link className="nav-link btn btn-outline-primary" to="/">Overview</Link>
                <Link className="nav-link btn btn-outline-primary" to="/users">Users</Link>
                <Link className="nav-link btn btn-outline-primary" to="/teams">Teams</Link>
                <Link className="nav-link btn btn-outline-primary" to="/activities">Activities</Link>
                <Link className="nav-link btn btn-outline-primary" to="/leaderboard">Leaderboard</Link>
                <Link className="nav-link btn btn-outline-primary" to="/workouts">Workouts</Link>
              </nav>
              <Routes>
                <Route path="/" element={<div><h2 className="h4 mb-3">Overview</h2><p className="text-muted">Use the navigation above to browse users, teams, activities, leaderboard entries, and workouts.</p></div>} />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
