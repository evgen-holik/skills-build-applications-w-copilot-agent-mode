import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  if (error) return <div className="alert alert-danger">Error loading workouts: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, idx) => (
            <tr key={workout._id || workout.id || idx}>
              <td>{workout.name}</td>
              <td>{workout.description}</td>
              <td className="text-capitalize">{workout.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;
