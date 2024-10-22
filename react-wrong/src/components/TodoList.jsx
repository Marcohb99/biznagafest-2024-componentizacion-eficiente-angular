'use client';
import React, { useState, useEffect, useRef } from 'react';

function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [users] = useState(['Manu', 'Cris', 'Bob']);
  const [selectedUser, setSelectedUser] = useState('');
  const [filter, setFilter] = useState('');
  const editInputRef = useRef([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todos?user=${selectedUser}&filter=${filter}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status, data } = await response.json();
      setTodos(status ? data : []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodo, user: '' }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status } = await response.json();
      if (status) {
        setNewTodo('');
        fetchTodos();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleCompleted = async (todo) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status } = await response.json();
      if (status) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const updateText = async (todo) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: todo.text }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status } = await response.json();
      if (status) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const updateUser = async (todo, user) => {
    if (user === todo.user) return;
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status } = await response.json();
      if (status) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status } = await response.json();
      if (status) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const startEdit = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].editing = true;
    setTodos(updatedTodos);
    setTimeout(() => {
      if (editInputRef.current[index]) {
        editInputRef.current[index].focus();
      }
    }, 0);
  };

  const finishEdit = (index, todo) => {
    const updatedTodos = [...todos];
    updatedTodos[index].editing = false;
    if (updatedTodos[index].text.trim() === '') {
      deleteTodo(todo.id);
      return;
    }
    updateText(todo);
  };

  useEffect(() => {
    fetchTodos();
  }, [selectedUser, filter]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Lista de tareas (React)</h1>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col">
              <label htmlFor="user-filter" className="mb-1 text-sm font-medium text-gray-700">
                Usuario
              </label>
              <select
                id="user-filter"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              >
                <option value="">Todos</option>
                {users.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="task-filter" className="mb-1 text-sm font-medium text-gray-700">
                Estado
              </label>
              <select
                id="task-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              >
                <option value="">Todas</option>
                <option value="completed">Completadas</option>
                <option value="incomplete">Incompletas</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Añadir nueva tarea..."
            className="w-4/6 md:w-5/6 p-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
          />
          <button
            onClick={addTodo}
            className="w-2/6 md:w-1/6 p-2.5 md:p-2 rounded-lg text-sm md:text-base bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Añadir
          </button>
        </div>

        <div className="space-y-3 mt-4">
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
            >
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
                      onKeyUp={(e) => e.key === 'Enter' && startEdit(index)}
                      className={`cursor-text bg-transparent border-none p-0 m-0 text-left ${todo.completed ? 'line-through text-gray-400' : ''}`}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
