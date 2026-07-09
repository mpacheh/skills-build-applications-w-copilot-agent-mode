import { useEffect, useState } from 'react';
import { getApiUrl, getRecordsFromPayload } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(getApiUrl('activities/'));
        if (!response.ok) throw new Error('Unable to load activities');
        const payload = await response.json();
        const records = getRecordsFromPayload(payload);
        setActivities(records);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id || activity.type} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6 mb-1">{activity.type}</h3>
                  <p className="mb-0 text-muted">{activity.notes || 'No notes provided'}</p>
                </div>
                <span className="badge bg-info text-dark">{activity.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Activities;
