import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
    : 'http://localhost:8000/api/activities';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load activities (${response.status})`);
        }
        return response.json();
      })
      .then((payload) => {
        const nextActivities = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
            ? payload.results
            : Array.isArray(payload.items)
              ? payload.items
              : Array.isArray(payload.data)
                ? payload.data
                : [];
        setActivities(nextActivities);
      })
      .catch((reason) => setError(reason.message));
  }, [apiUrl]);

  return (
    <section className="resource-section">
      <div className="section-heading"><p className="eyebrow">Movement log</p><h2>Activities</h2></div>
      {error && <p className="error-message">{error}</p>}
      {!error && activities.length === 0 && <p className="empty-state">No activities recorded yet.</p>}
      <div className="resource-grid">
        {activities.map((activity) => (
          <article className="resource-card" key={activity._id || activity.id}>
            <span className="card-kicker">{activity.type || 'Activity'}</span>
            <strong>{activity.durationMinutes ?? activity.duration ?? 0} min</strong>
            <span>{activity.calories ?? 0} calories</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Activities;
