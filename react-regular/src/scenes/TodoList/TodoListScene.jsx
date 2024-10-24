'use client';
import React, { useState, useEffect, useRef } from 'react';
import UserFilter from '@/components/UserFilter';
import StatusFilter from '@/components/StatusFilter';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';

function TodoListScene() {
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
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Lista de tareas (React + Componentes)</h1>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <UserFilter
              users={users}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
            <StatusFilter
              filter={filter}
              setFilter={setFilter}
            />
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <TodoInput
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            addTodo={addTodo}
          />
        </div>

        <TodoList
          todos={todos}
          users={users}
          toggleCompleted={toggleCompleted}
          updateText={updateText}
          updateUser={updateUser}
          deleteTodo={deleteTodo}
          startEdit={startEdit}
          finishEdit={finishEdit}
          editInputRef={editInputRef}
          setTodos={setTodos}
        />
      </div>
    </div>
  );
}

export default TodoListScene;
