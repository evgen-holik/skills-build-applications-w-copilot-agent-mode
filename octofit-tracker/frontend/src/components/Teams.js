import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  const teamBadgeClass = (name) => {
    if (!name) return 'bg-secondary';
    const t = name.toLowerCase();
    if (t === 'marvel') return 'badge-marvel';
    if (t === 'dc') return 'badge-dc';
    return 'bg-secondary';
  };

  const parsedMembers = (members) => {
    if (Array.isArray(members)) return members;
    try { return JSON.parse(members.replace(/'/g, '"')); } catch { return [members]; }
  };

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center gap-2">
        <span>🦸</span>
        <span>Teams</span>
      </div>
      <div className="card-body p-0">
        {loading && (
          <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <div className="alert alert-danger m-3">Error loading teams: {error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>Members</th>
                  <th className="text-center">Size</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr><td colSpan="4" className="text-center text-muted py-4">No teams found.</td></tr>
                ) : teams.map((team, idx) => {
                  const members = parsedMembers(team.members);
                  return (
                    <tr key={team._id || team.id || idx}>
                      <td className="text-muted">{idx + 1}</td>
                      <td>
                        <span className={`badge ${teamBadgeClass(team.name)} text-capitalize px-3 py-2 fs-6`}>
                          {team.name}
                        </span>
                      </td>
                      <td>
                        {members.map((m, i) => (
                          <span key={i} className="badge bg-light text-dark border me-1 mb-1">{m}</span>
                        ))}
                      </td>
                      <td className="text-center">
                        <span className="badge bg-primary rounded-pill">{members.length}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {teams.length} team{teams.length !== 1 ? 's' : ''} loaded
      </div>
    </div>
  );
}

export default Teams;
