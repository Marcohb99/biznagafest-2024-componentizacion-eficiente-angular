import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import TodoInput from '@/components/todo/TodoInput.vue';

describe('TodoInput', () => {
  it('renders input and button', () => {
    const wrapper = mount(TodoInput);

    expect(wrapper.find('input[placeholder="Añadir nueva tarea..."]').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Añadir');
  });

  it('updates inputText when input changes', async () => {
    const wrapper = mount(TodoInput);
    await wrapper.find('input').setValue('New Todo');
    expect(wrapper.find('input').element.value).toBe('New Todo');
  });

  it('emits add-todo when button is clicked', async () => {
    const wrapper = mount(TodoInput);

    await wrapper.find('input').setValue('New Todo');
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('add-todo')).toBeTruthy();
    expect(wrapper.emitted('add-todo')?.[0]).toEqual(['New Todo']);
  });

  it('emits add-todo when Enter key is pressed', async () => {
    const wrapper = mount(TodoInput);

    await wrapper.find('input').setValue('New Todo');
    await wrapper.find('input').trigger('keyup.enter');

    expect(wrapper.emitted('add-todo')).toBeTruthy();
    expect(wrapper.emitted('add-todo')?.[0]).toEqual(['New Todo']);
  });

  it('clears input after submitting', async () => {
    const wrapper = mount(TodoInput);

    await wrapper.find('input').setValue('New Todo');
    await wrapper.find('button').trigger('click');

    expect(wrapper.find('input').element.value).toBe('');
  });
});
