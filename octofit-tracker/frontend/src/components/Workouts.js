import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  const difficultyBadge = (level) => {
    const l = (level || '').toLowerCase();
    if (l === 'easy') return 'badge-easy';
    if (l === 'hard') return 'badge-hard';
    return 'badge-medium';
  };

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center gap-2">
        <span>💪</span>
        <span>Workouts</span>
      </div>
      <div className="card-body p-0">
        {loading && (
          <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <div className="alert alert-danger m-3">Error loading workouts: {error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Workout Name</th>
                  <th>Description</th>
                  <th className="text-center">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr><td colSpan="4" className="text-center text-muted py-4">No workouts found.</td></tr>
                ) : workouts.map((workout, idx) => (
                  <tr key={workout._id || workout.id || idx}>
                    <td className="text-muted">{idx + 1}</td>
                    <td><strong>{workout.name}</strong></td>
                    <td className="text-muted">{workout.description}</td>
                    <td className="text-center">
                      <span className={`badge ${difficultyBadge(workout.difficulty)} text-capitalize px-3`}>
                        {workout.difficulty}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {workouts.length} workout{workouts.length !== 1 ? 's' : ''} loaded
      </div>
    </div>
  );
}

export default Workouts;
