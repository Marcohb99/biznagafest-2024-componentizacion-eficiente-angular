import React from 'react';

function TodoItem({
  todo,
  index,
  users,
  toggleCompleted,
  updateText,
  updateUser,
  deleteTodo,
  startEdit,
  finishEdit,
  editInputRef,
  todos,
  setTodos,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
      <div className="flex items-center flex-grow mr-4 mb-2 sm:mb-0">
        <input
          type="checkbox"
          onChange={() => toggleCompleted(todo)}
          checked={todo.completed}
          className="mr-3 h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
        />
        <div className="flex-grow">
          {todo.editing ? (
            <input
              value={todo.text}
              onChange={(e) => {
                const updatedTodos = [...todos];
                updatedTodos[index].text = e.target.value;
                setTodos(updatedTodos);
              }}
              onBlur={() => finishEdit(index, todo)}
              onKeyUp={(e) => e.key === 'Enter' && finishEdit(index, todo)}
              className="w-full bg-transparent focus:outline-none text-gray-800"
              ref={(el) => (editInputRef.current[index] = el)}
            />
          ) : (
            <button
              onClick={() => startEdit(index)}
              className={`cursor-text bg-transparent border-none p-0 m-0 text-left ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.text}
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
        <select
          onChange={(e) => updateUser(todo, e.target.value)}
          value={todo.user}
          className="w-32 bg-gray-100 text-sm rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        >
          <option value="">Sin asignar</option>
          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="ml-4 text-gray-400 hover:text-red-500 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
