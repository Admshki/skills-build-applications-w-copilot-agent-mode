import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message));
  }, []);

  return (
    <section className="resource-section">
      <div className="section-heading"><p className="eyebrow">Next session</p><h2>Workouts</h2></div>
      {error && <p className="error-message">{error}</p>}
      {!error && workouts.length === 0 && <p className="empty-state">No workouts suggested yet.</p>}
      <div className="resource-grid">
        {workouts.map((workout) => (
          <article className="resource-card" key={workout._id || workout.id}>
            <span className="card-kicker">Workout</span>
            <strong>{workout.name || workout.title || workout.type || 'Untitled workout'}</strong>
            <span>{workout.durationMinutes ?? workout.duration ?? 0} min</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
