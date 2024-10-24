import React from 'react';

function TodoInput({ newTodo, setNewTodo, addTodo }) {
  return (
    <>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && addTodo()}
        placeholder="Añadir nueva tarea..."
        className="w-4/6 md:w-5/6 p-2 rounded-lg bg-white border border-gray-300"
      />
      <button
        onClick={addTodo}
        className="w-2/6 md:w-1/6 p-2.5 md:p-2 rounded-lg bg-blue-500 text-white"
      >
        Añadir
      </button>
    </>
  );
}

export default TodoInput;
