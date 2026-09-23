import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { apiBaseUrl } from './api.js';
import './App.css';

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Workouts', path: '/workouts' },
  { label: 'Teams', path: '/teams' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Users', path: '/users' },
];

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">Octofit Tracker / daily brief</p>
      <h1>Train with intent.</h1>
      <p className="overview-copy">A clear view of the work behind your next personal best.</p>
      <div className="overview-links">
        <NavLink className="primary-link" to="/activities">Log activity</NavLink>
        <NavLink className="quiet-link" to="/leaderboard">See the leaderboard</NavLink>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/" end>
          <span className="brand-mark">O</span>
          <span>Octofit</span>
        </NavLink>
        <span className="api-status">API · {apiBaseUrl.replace('/api', '')}</span>
      </header>
      <div className="app-layout">
        <nav className="sidebar" aria-label="Primary navigation">
          <p className="nav-label">Workspace</p>
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={item.path === '/'}
              key={item.path}
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <main className="main-content">
          <Routes>
            <Route element={<Overview />} path="/" />
            <Route element={<Activities />} path="/activities" />
            <Route element={<Leaderboard />} path="/leaderboard" />
            <Route element={<Teams />} path="/teams" />
            <Route element={<Users />} path="/users" />
            <Route element={<Workouts />} path="/workouts" />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
