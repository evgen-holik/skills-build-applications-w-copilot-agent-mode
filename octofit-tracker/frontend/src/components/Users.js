import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Users: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  const teamBadgeClass = (team) => {
    if (!team) return 'bg-secondary';
    const t = team.toLowerCase();
    if (t === 'marvel') return 'badge-marvel';
    if (t === 'dc') return 'badge-dc';
    return 'bg-secondary';
  };

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center gap-2">
        <span>👤</span>
        <span>Users</span>
      </div>
      <div className="card-body p-0">
        {loading && (
          <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <div className="alert alert-danger m-3">Error loading users: {error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hero Name</th>
                  <th>Email</th>
                  <th>Team</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted py-4">No users found.</td></tr>
                ) : users.map((user, idx) => (
                  <tr key={user._id || user.id || idx}>
                    <td className="text-muted">{idx + 1}</td>
                    <td><strong>{user.name}</strong></td>
                    <td><a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></td>
                    <td>
                      <span className={`badge ${teamBadgeClass(user.team)} text-capitalize px-2 py-1`}>
                        {user.team}
                      </span>
                    </td>
                    <td className="text-center">
                      {user.is_active
                        ? <span className="badge bg-success">Active</span>
                        : <span className="badge bg-secondary">Inactive</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {users.length} user{users.length !== 1 ? 's' : ''} loaded
      </div>
    </div>
  );
}

export default Users;
