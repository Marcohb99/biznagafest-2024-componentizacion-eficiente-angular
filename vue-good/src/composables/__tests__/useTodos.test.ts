import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { ref } from 'vue';

import useTodos from '@/composables/useTodos';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from '@/services/api';

vi.mock('@/services/api');

const mockTodo = { id: 1, text: 'Test Todo', completed: false, user: '' };

describe('useTodos', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
  });

  it('adds a new todo', async () => {
    (createTodo as Mock).mockResolvedValue(undefined);
    (fetchTodos as Mock).mockResolvedValue([]);

    const selectedUser = ref('');
    const filter = ref('');
    const { addTodo } = useTodos(selectedUser, filter);

    await addTodo('New Todo');

    expect(createTodo).toHaveBeenCalledWith('New Todo');
    expect(fetchTodos).toHaveBeenCalledTimes(1);
  });

  it('updates a todo completed field', async () => {
    (updateTodo as Mock).mockResolvedValue(undefined);
    (fetchTodos as Mock).mockResolvedValue([]);

    const selectedUser = ref('');
    const filter = ref('');
    const { toggleCompleted } = useTodos(selectedUser, filter);

    await toggleCompleted({...mockTodo, completed: false });

    expect(updateTodo).toHaveBeenCalledWith(1, { completed: true });
    expect(fetchTodos).toHaveBeenCalledTimes(1);
  });

  it('updates a todo text field', async () => {
    (updateTodo as Mock).mockResolvedValue(undefined);
    (fetchTodos as Mock).mockResolvedValue([]);

    const selectedUser = ref('');
    const filter = ref('');
    const { updateText } = useTodos(selectedUser, filter);

    await updateText(mockTodo, 'Updated Todo');

    expect(updateTodo).toHaveBeenCalledWith(1, { text: 'Updated Todo' });
    expect(fetchTodos).toHaveBeenCalledTimes(1);
  });

  it('updates a todo user field', async () => {
    (updateTodo as Mock).mockResolvedValue(undefined);
    (fetchTodos as Mock).mockResolvedValue([]);

    const selectedUser = ref('');
    const filter = ref('');
    const { updateUser } = useTodos(selectedUser, filter);

    await updateUser(mockTodo, 'User1');

    expect(updateTodo).toHaveBeenCalledWith(1, { user: 'User1' });
    expect(fetchTodos).toHaveBeenCalledTimes(1);
  });

  it('deletes a todo', async () => {
    (deleteTodo as Mock).mockResolvedValue(undefined);
    (fetchTodos as Mock).mockResolvedValue([]);

    const selectedUser = ref('');
    const filter = ref('');
    const { deleteTodo: deleteTodoFn } = useTodos(selectedUser, filter);

    await deleteTodoFn(1);

    expect(deleteTodo).toHaveBeenCalledWith(1);
    expect(fetchTodos).toHaveBeenCalledTimes(1);
  });

  it('refetches todos when selectedUser or filter changes', async () => {
    (fetchTodos as Mock).mockResolvedValue([]);

    const selectedUser = ref('');
    const filter = ref('');
    useTodos(selectedUser, filter);

    selectedUser.value = 'User1';
    await vi.runAllTimers();

    expect(fetchTodos).toHaveBeenCalledWith('User1', '');

    filter.value = 'completed';
    await vi.runAllTimers();

    expect(fetchTodos).toHaveBeenCalledWith('User1', 'completed');
  });
});
