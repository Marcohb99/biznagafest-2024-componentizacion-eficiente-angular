import React from 'react';

function StatusFilter({ filter, setFilter }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="task-filter" className="mb-1 text-sm font-medium text-gray-700">
        Estado
      </label>
      <select
        id="task-filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300"
      >
        <option value="">Todas</option>
        <option value="completed">Completadas</option>
        <option value="incomplete">Incompletas</option>
      </select>
    </div>
  );
}

export default StatusFilter;
