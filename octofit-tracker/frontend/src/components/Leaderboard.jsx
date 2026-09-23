import { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
    : 'http://localhost:8000/api/leaderboard';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load leaderboard (${response.status})`);
        }
        return response.json();
      })
      .then((payload) => {
        const nextEntries = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
            ? payload.results
            : Array.isArray(payload.items)
              ? payload.items
              : Array.isArray(payload.data)
                ? payload.data
                : [];
        setEntries(nextEntries);
      })
      .catch((reason) => setError(reason.message));
  }, [apiUrl]);

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
