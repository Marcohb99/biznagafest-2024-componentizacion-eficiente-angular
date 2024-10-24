import React from 'react';
import TodoItem from './TodoItem';

function TodoList({
  todos,
  users,
  toggleCompleted,
  updateText,
  updateUser,
  deleteTodo,
  startEdit,
  finishEdit,
  editInputRef,
  setTodos,
}) {
  return (
    <div className="space-y-3 mt-4">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
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
      ))}
    </div>
  );
}

export default TodoList;
