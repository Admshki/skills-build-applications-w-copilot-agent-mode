import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  useEffect(() => {
    fetch(`${apiBaseUrl}/users/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load users (${response.status})`);
        }
        return response.json();
      })
      .then((payload) => {
        const nextUsers = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
            ? payload.results
            : Array.isArray(payload.items)
              ? payload.items
              : Array.isArray(payload.data)
                ? payload.data
                : [];
        setUsers(nextUsers);
      })
      .catch((reason) => setError(reason.message));
  }, [apiBaseUrl]);

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
