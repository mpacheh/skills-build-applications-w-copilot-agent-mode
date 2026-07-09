import { useEffect, useState } from 'react';
import { getApiUrl, getRecordsFromPayload } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(getApiUrl('users/'));
        if (!response.ok) throw new Error('Unable to load users');
        const payload = await response.json();
        const records = getRecordsFromPayload(payload);
        setUsers(records);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {users.map((user) => (
            <div key={user._id || user.email} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6 mb-1">{user.name}</h3>
                  <p className="mb-0 text-muted">{user.email}</p>
                </div>
                <span className="badge bg-primary">{user.role || 'member'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Users;
