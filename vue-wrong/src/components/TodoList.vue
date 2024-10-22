<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-12">
    <div class="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-900">Lista de tareas (Vue)</h1>
    
    <div class="mb-6">
      <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div class="flex flex-col">
          <label for="user-filter" class="mb-1 text-sm font-medium text-gray-700">Usuario</label>
          <select
            id="user-filter"
            v-model="selectedUser"
            class="w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          >
            <option value="">Todos</option>
            <option v-for="user in users" :key="user" :value="user">
              {{ user }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="task-filter" class="mb-1 text-sm font-medium text-gray-700">Estado</label>
          <select
            id="task-filter"
            v-model="filter"
            class="w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          >
            <option value="">Todas</option>
            <option value="completed">Completadas</option>
            <option value="incomplete">Incompletas</option>
          </select>
        </div>
      </div>
    </div>

    <div class="flex flex-row gap-2 items-center">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Añadir nueva tarea..."
        class="w-4/6 md:w-5/6 p-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
      />
      <button @click="addTodo" class="w-2/6 md:w-1/6 p-2.5 md:p-2 rounded-lg text-sm md:text-base bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">Añadir</button>
    </div>

    <div class="space-y-3 mt-4">
      <div
        v-for="(todo, index) in todos"
        :key="index"
        class="flex flex-col sm:flex-row items-start sm:items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
      >
        <div class="flex items-center flex-grow mr-4 mb-2 sm:mb-0">
          <input
            type="checkbox"
            @change="toggleCompleted(todo)"
            :checked="todo.completed"
            class="mr-3 h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
          />
          <div class="flex-grow">
            <input
              v-if="todo.editing"
              v-model="todo.text"
              @blur.stop="finishEdit(index, todo)"
              @keyup.enter="todo.editing = false"

              class="w-full bg-transparent focus:outline-none text-gray-800"
              ref="editInput"
            />
            <span
              v-else
              @click="startEdit(index)"
              :class="{ 'line-through text-gray-400': todo.completed }"
              class="cursor-text"
            >
              {{ todo.text }}
            </span>
          </div>
        </div>
        <div class="flex items-center w-full sm:w-auto justify-between sm:justify-start">
          <select
            @change="(e) => updateUser(todo, e.target.value)"
            class="w-32 bg-gray-100 text-sm rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="" :selected="todo.user === ''">Sin asignar</option>
            <option v-for="user in users" :key="user" :value="user" :selected="todo.user === user">
              {{ user }}
            </option>
          </select>
          <button
            @click="deleteTodo(todo.id)"
            class="ml-4 text-gray-400 hover:text-red-500 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
  
</template>

<script>
export default {
  name: 'TodoList',
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