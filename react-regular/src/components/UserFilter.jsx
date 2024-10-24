import React from 'react';

function UserFilter({ users, selectedUser, setSelectedUser }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="user-filter" className="mb-1 text-sm font-medium text-gray-700">
        Usuario
      </label>
      <select
        id="user-filter"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300"
      >
        <option value="">Todos</option>
        {users.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UserFilter;
