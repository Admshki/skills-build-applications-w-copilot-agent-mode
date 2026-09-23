import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('leaderboard').then(setEntries).catch((reason) => setError(reason.message));
  }, []);

  return (
    <section className="resource-section">
      <div className="section-heading"><p className="eyebrow">Team pulse</p><h2>Leaderboard</h2></div>
      {error && <p className="error-message">{error}</p>}
      {!error && entries.length === 0 && <p className="empty-state">No leaderboard entries yet.</p>}
      <ol className="ranking-list">
        {entries.map((entry, index) => (
          <li className="ranking-row" key={entry._id || entry.id || index}>
            <span className="rank-number">{index + 1}</span>
            <strong>{entry.username || entry.displayName || entry.name || entry.userId || 'Athlete'}</strong>
            <span>{entry.points ?? entry.score ?? 0} pts</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;
