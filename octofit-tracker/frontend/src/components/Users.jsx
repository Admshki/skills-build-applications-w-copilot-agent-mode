import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((reason) => setError(reason.message));
  }, []);

  return (
    <section className="resource-section">
      <div className="section-heading"><p className="eyebrow">Your crew</p><h2>Users</h2></div>
      {error && <p className="error-message">{error}</p>}
      {!error && users.length === 0 && <p className="empty-state">No users found.</p>}
      <div className="resource-grid">
        {users.map((user) => (
          <article className="resource-card" key={user._id || user.id}>
            <span className="card-kicker">Athlete</span>
            <strong>{user.displayName || user.username || 'Unnamed user'}</strong>
            <span>{user.email || 'No email listed'}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Users;
