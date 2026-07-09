import { useEffect, useState } from 'react';
import { getApiUrl, getRecordsFromPayload } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(getApiUrl('leaderboard/'));
        if (!response.ok) throw new Error('Unable to load leaderboard');
        const payload = await response.json();
        const records = getRecordsFromPayload(payload);
        setEntries(records);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {entries.map((entry) => (
            <div key={entry._id || entry.userId} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h3 className="h6 mb-1">Rank #{entry.rank}</h3>
                <p className="mb-0 text-muted">User ID: {entry.userId}</p>
              </div>
              <span className="badge bg-success">{entry.score} pts</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
