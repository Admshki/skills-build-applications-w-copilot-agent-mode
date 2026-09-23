import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message));
  }, []);

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
