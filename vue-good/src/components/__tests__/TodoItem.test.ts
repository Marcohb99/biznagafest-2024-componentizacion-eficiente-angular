import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import TodoItem from '@/components/todo/TodoItem.vue';

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    text: 'Test Todo',
    completed: false,
    user: '',
  };

  const mockUsers = ['User1', 'User2'];

  it('renders todo item correctly', () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
        users: mockUsers,
      },
    });

    expect(wrapper.text()).toContain('Test Todo');
    expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).checked).toBe(false);
  });

  it('emits toggle-completed when checkbox is clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
        users: mockUsers,
      },
    });

    await wrapper.find('input[type="checkbox"]').trigger('change');
    expect(wrapper.emitted('toggle-completed')).toBeTruthy();
    expect(wrapper.emitted('toggle-completed')?.[0]).toEqual([mockTodo]);
  });

  it('enters edit mode when text is clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
        users: mockUsers,
      },
    });

    await wrapper.find('span').trigger('click');
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  it('emits update-text when edit is finished', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
        users: mockUsers,
      },
    });

    await wrapper.find('span').trigger('click');
    const input = wrapper.find('input[type="text"]');
    await input.setValue('Updated Todo');
    await input.trigger('keyup.enter');

    expect(wrapper.emitted('update-text')).toBeTruthy();
    expect(wrapper.emitted('update-text')?.[0]).toEqual([mockTodo, 'Updated Todo']);
  });

  it('emits delete-todo when text is empty', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
        users: mockUsers,
      },
    });

    await wrapper.find('span').trigger('click');
    const input = wrapper.find('input[type="text"]');
    await input.setValue('');
    await input.trigger('keyup.enter');

    expect(wrapper.emitted('delete-todo')).toBeTruthy();
    expect(wrapper.emitted('delete-todo')?.[0]).toEqual([mockTodo.id]);
  });

  it('emits update-user when user is selected', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
        users: mockUsers,
      },
    });

    await wrapper.find('select').setValue('User2');
    expect(wrapper.emitted('update-user')).toBeTruthy();
    expect(wrapper.emitted('update-user')?.[0]).toEqual([mockTodo, 'User2']);
  });

  it('emits delete-todo when delete button is clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
        users: mockUsers,
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('delete-todo')).toBeTruthy();
    expect(wrapper.emitted('delete-todo')?.[0]).toEqual([mockTodo.id]);
  });
});
