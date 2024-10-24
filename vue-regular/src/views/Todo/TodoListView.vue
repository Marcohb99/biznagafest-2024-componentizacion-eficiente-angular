<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-12">
    <div class="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-2xl font-bold mb-6 text-gray-900">Lista de tareas (Vue)</h1>

      <div class="mb-6">
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <UserFilter
            :selected-user="selectedUser"
            :users="users"
            @update:selected-user="selectedUser = $event"
          />
          <StatusFilter
            :filter="filter"
            @update:filter="filter = $event"
          />
        </div>
      </div>

      <div class="flex flex-row gap-2 items-center">
        <TodoInput
          :new-todo="newTodo"
          @update:new-todo="newTodo = $event"
          @add-todo="addTodo"
        />
      </div>

      <TodoList
        :todos="todos"
        :users="users"
        @toggle-completed="toggleCompleted"
        @update-text="updateText"
        @update-user="updateUser"
        @delete-todo="deleteTodo"
        @start-edit="startEdit"
        @finish-edit="finishEdit"
      />
    </div>
  </div>
</template>

<script>
import UserFilter from '@/components/UserFilter.vue';
import StatusFilter from '@/components/StatusFilter.vue';
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';

export default {
  name: 'App',
  components: {
    UserFilter,
    StatusFilter,
    TodoInput,
    TodoList,
  },
  data() {
    return {
      newTodo: '',
      todos: [],
      users: ['Manu', 'Cris', 'Bob'],
      selectedUser: '',
      filter: '',
    };
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await fetch(`http://localhost:3000/todos?user=${this.selectedUser}&filter=${this.filter}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const {status, data} = await response.json();
        this.todos = status ? data : [];
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async addTodo() {
      if (!this.newTodo.trim()) return;
      try {
        const response = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: this.newTodo,
            user: '',
          }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const {status} = await response.json();

        if (status) {
          this.newTodo = '';
          this.fetchTodos();
        }
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    async toggleCompleted(todo) {
      try {
        const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const {status} = await response.json();

        if (status) {
          this.fetchTodos();
        }
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    async updateText(todo) {
      try {
        const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: todo.text,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const {status} = await response.json();

        if (status) {
          this.fetchTodos();
        }
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    async updateUser(todo, user) {
      if (user === todo.user) return;
      try {
        const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const {status} = await response.json();

        if (status) {
          this.fetchTodos();
        }
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    async deleteTodo(id) {
      try {
        const response = await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const {status} = await response.json();
        if (status) {
          this.fetchTodos();
        }
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    },
    startEdit(index) {
      this.todos[index].editing = true;
      this.$nextTick(() => {
        this.$refs.editInput[0].focus();
      });
    },
    finishEdit(index, todo) {
      this.todos[index].editing = false;
      if (this.todos[index].text.trim() === '') {
        this.deleteTodo(todo.id);
        return;
      }

      this.updateText(todo);
    },
  },
  watch: {
    selectedUser() {
      this.fetchTodos();
    },
    filter() {
      this.fetchTodos();
    },
  },
  mounted() {
    this.fetchTodos();
  },
};
</script>
