import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Activities: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  if (error) return <div className="alert alert-danger">Error loading activities: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, idx) => (
            <tr key={activity._id || activity.id || idx}>
              <td>{activity.user}</td>
              <td>{activity.type}</td>
              <td>{activity.duration}</td>
              <td>{activity.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
