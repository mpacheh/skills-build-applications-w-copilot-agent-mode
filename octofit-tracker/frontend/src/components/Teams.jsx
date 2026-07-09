import { useEffect, useState } from 'react';
import { getApiUrl, getRecordsFromPayload } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(getApiUrl('teams/'));
        if (!response.ok) throw new Error('Unable to load teams');
        const payload = await response.json();
        const records = getRecordsFromPayload(payload);
        setTeams(records);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div key={team._id || team.name} className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{team.name}</h3>
                  <p className="text-muted small">{team.description}</p>
                  <p className="mb-0 small">Members: {team.members?.length || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Teams;
