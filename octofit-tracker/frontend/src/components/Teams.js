import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Teams: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  if (error) return <div className="alert alert-danger">Error loading teams: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Team Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, idx) => (
            <tr key={team._id || team.id || idx}>
              <td className="text-capitalize">{team.name}</td>
              <td>{Array.isArray(team.members) ? team.members.join(', ') : team.members}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
