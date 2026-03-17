import React, { useState, useEffect } from 'react';

const MEDAL = ['🥇', '🥈', '🥉'];

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard: fetched data', data);
        const rows = Array.isArray(data) ? data : data.results || [];
        setLeaderboard(rows.sort((a, b) => b.points - a.points));
        setLoading(false);
      })
      .catch(err => {
        console.error('Leaderboard: fetch error', err);
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
        <span>🏆</span>
        <span>Leaderboard</span>
      </div>
      <div className="card-body p-0">
        {loading && (
          <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <div className="alert alert-danger m-3">Error loading leaderboard: {error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th style={{width: '4rem'}}>Rank</th>
                  <th>Team</th>
                  <th>Points</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length === 0 ? (
                  <tr><td colSpan="4" className="text-center text-muted py-4">No entries found.</td></tr>
                ) : leaderboard.map((entry, idx) => {
                  const maxPts = leaderboard[0]?.points || 1;
                  const pct = Math.round((entry.points / maxPts) * 100);
                  return (
                    <tr key={entry._id || entry.id || idx}>
                      <td className="text-center fs-5">{MEDAL[idx] || idx + 1}</td>
                      <td>
                        <span className={`badge ${teamBadgeClass(entry.team)} text-capitalize px-3 py-2`}>
                          {entry.team}
                        </span>
                      </td>
                      <td><strong>{entry.points}</strong> pts</td>
                      <td style={{minWidth: '120px'}}>
                        <div className="progress" style={{height: '1.1rem'}}>
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{width: `${pct}%`}}
                            aria-valuenow={pct}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >{pct}%</div>
                        </div>
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
        {leaderboard.length} team{leaderboard.length !== 1 ? 's' : ''} ranked
      </div>
    </div>
  );
}

export default Leaderboard;
