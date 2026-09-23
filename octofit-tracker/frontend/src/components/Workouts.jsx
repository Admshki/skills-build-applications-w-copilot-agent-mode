import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
    : 'http://localhost:8000/api/workouts';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load workouts (${response.status})`);
        }
        return response.json();
      })
      .then((payload) => {
        const nextWorkouts = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
            ? payload.results
            : Array.isArray(payload.items)
              ? payload.items
              : Array.isArray(payload.data)
                ? payload.data
                : [];
        setWorkouts(nextWorkouts);
      })
      .catch((reason) => setError(reason.message));
  }, [apiUrl]);

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
