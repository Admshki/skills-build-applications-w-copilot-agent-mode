import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message));
  }, []);

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
