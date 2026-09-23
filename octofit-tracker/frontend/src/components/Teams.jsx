import { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
    : 'http://localhost:8000/api/teams';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load teams (${response.status})`);
        }
        return response.json();
      })
      .then((payload) => {
        const nextTeams = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
            ? payload.results
            : Array.isArray(payload.items)
              ? payload.items
              : Array.isArray(payload.data)
                ? payload.data
                : [];
        setTeams(nextTeams);
      })
      .catch((reason) => setError(reason.message));
  }, [apiUrl]);

  return (
    <section className="resource-section">
      <div className="section-heading"><p className="eyebrow">Collective effort</p><h2>Teams</h2></div>
      {error && <p className="error-message">{error}</p>}
      {!error && teams.length === 0 && <p className="empty-state">No teams created yet.</p>}
      <div className="resource-grid">
        {teams.map((team) => (
          <article className="resource-card" key={team._id || team.id}>
            <span className="card-kicker">Team</span>
            <strong>{team.name || team.title || 'Unnamed team'}</strong>
            <span>{team.memberCount ?? team.members?.length ?? 0} members</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Teams;
