import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Users: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  if (error) return <div className="alert alert-danger">Error loading users: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Team</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id || user.id || idx}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="text-capitalize">{user.team}</td>
              <td>{user.is_active ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
