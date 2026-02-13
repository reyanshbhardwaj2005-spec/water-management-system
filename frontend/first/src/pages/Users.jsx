import { useState } from 'react'
import './Users.css'

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Admin',
      email: 'john.admin@watermanagement.com',
      role: 'Administrator',
      status: 'Active',
      lastLogin: '2 hours ago',
    },
    {
      id: 2,
      name: 'Sarah Manager',
      email: 'sarah.manager@watermanagement.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: '1 day ago',
    },
    {
      id: 3,
      name: 'Mike Technician',
      email: 'mike.tech@watermanagement.com',
      role: 'Technician',
      status: 'Active',
      lastLogin: '3 hours ago',
    },
    {
      id: 4,
      name: 'Emily Monitor',
      email: 'emily.monitor@watermanagement.com',
      role: 'Monitor',
      status: 'Inactive',
      lastLogin: '1 week ago',
    },
  ])

  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Monitor',
  })

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([
        ...users,
        {
          id: users.length + 1,
          ...newUser,
          status: 'Active',
          lastLogin: 'Just now',
        },
      ])
      setNewUser({ name: '', email: '', role: 'Monitor' })
      setShowAddUser(false)
    }
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>User Management</h2>
        <p>Manage system users and their permissions.</p>
      </header>

      <div className="users-header">
        <button className="btn-add-user" onClick={() => setShowAddUser(!showAddUser)}>
          + Add New User
        </button>
      </div>

      {showAddUser && (
        <div className="card add-user-form">
          <h3>Add New User</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter user name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="Administrator">Administrator</option>
                <option value="Manager">Manager</option>
                <option value="Technician">Technician</option>
                <option value="Monitor">Monitor</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" onClick={handleAddUser}>
              Add User
            </button>
            <button className="btn-secondary" onClick={() => setShowAddUser(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <h3>Active Users</h3>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <span className="user-avatar">{user.name.charAt(0)}</span>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className="role-badge">{user.role}</span>
                </td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit">✏️</button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="roles-grid">
        <div className="card">
          <h3>Role Permissions</h3>
          <div className="permissions-list">
            <div className="permission-group">
              <h4>Administrator</h4>
              <ul>
                <li>✓ Full system access</li>
                <li>✓ Manage users</li>
                <li>✓ System configuration</li>
                <li>✓ View all reports</li>
              </ul>
            </div>
            <div className="permission-group">
              <h4>Manager</h4>
              <ul>
                <li>✓ View all data</li>
                <li>✓ Create reports</li>
                <li>✓ Manage alerts</li>
                <li>✗ System configuration</li>
              </ul>
            </div>
            <div className="permission-group">
              <h4>Technician</h4>
              <ul>
                <li>✓ View zone data</li>
                <li>✓ Report issues</li>
                <li>✓ Update maintenance</li>
                <li>✗ Manage users</li>
              </ul>
            </div>
            <div className="permission-group">
              <h4>Monitor</h4>
              <ul>
                <li>✓ View alerts</li>
                <li>✓ Read-only access</li>
                <li>✗ Modify settings</li>
                <li>✗ Manage users</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Activity Log</h3>
          <div className="activity-log">
            <div className="log-entry">
              <span className="log-time">2:45 PM</span>
              <span className="log-action">John Admin</span>
              <span className="log-detail">Generated monthly report</span>
            </div>
            <div className="log-entry">
              <span className="log-time">1:30 PM</span>
              <span className="log-action">Sarah Manager</span>
              <span className="log-detail">Acknowledged system alert</span>
            </div>
            <div className="log-entry">
              <span className="log-time">12:15 PM</span>
              <span className="log-action">Mike Technician</span>
              <span className="log-detail">Updated maintenance schedule</span>
            </div>
            <div className="log-entry">
              <span className="log-time">11:00 AM</span>
              <span className="log-action">System</span>
              <span className="log-detail">Automatic backup completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
