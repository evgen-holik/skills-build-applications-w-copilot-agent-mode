import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  const navLinkClass = ({ isActive }) =>
    'nav-link' + (isActive ? ' active' : '');

  return (
    <div>
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <span className="navbar-brand">🐙 OctoFit Tracker</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink className={navLinkClass} to="/users">👤 Users</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} to="/teams">🦸 Teams</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} to="/activities">🏃 Activities</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} to="/leaderboard">🏆 Leaderboard</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} to="/workouts">💪 Workouts</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>

      <div className="page-footer">
        &copy; {new Date().getFullYear()} OctoFit Tracker &mdash; Powered by GitHub Codespaces
      </div>
    </div>
  );
}

export default App;
