import { useEffect, useState } from 'react';
import { getApiUrl, getRecordsFromPayload } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl('workouts/'));
        if (!response.ok) throw new Error('Unable to load workouts');
        const payload = await response.json();
        const records = getRecordsFromPayload(payload);
        setWorkouts(records);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div key={workout._id || workout.title} className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{workout.title}</h3>
                  <p className="text-muted small">{workout.focus}</p>
                  <p className="mb-0 small">Difficulty: {workout.difficulty}</p>
                  <p className="mb-0 small">Duration: {workout.duration} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Workouts;
