import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import UserFilter from '@/components/filter/UserFilter.vue';

describe('UserFilter', () => {
  const mockUsers = ['User1', 'User2', 'User3'];

  it('renders correctly with default selection', () => {
    const wrapper = mount(UserFilter, {
      props: {
        users: mockUsers,
        modelValue: '',
      },
    });

    expect(wrapper.find('label').text()).toBe('Usuario');
    expect(wrapper.find('select').element.value).toBe('');
    expect(wrapper.findAll('option').length).toBe(mockUsers.length + 1); // +1 for "Todos" option
  });

  it('renders all users in the dropdown', () => {
    const wrapper = mount(UserFilter, {
      props: {
        users: mockUsers,
        modelValue: '',
      },
    });

    const options = wrapper.findAll('option');
    expect(options[0].text()).toBe('Todos');
    mockUsers.forEach((user, index) => {
      expect(options[index + 1].text()).toBe(user);
    });
  });

  it('emits update:modelValue when selection changes', async () => {
    const wrapper = mount(UserFilter, {
      props: {
        users: mockUsers,
        modelValue: '',
      },
    });

    await wrapper.find('select').setValue('User2');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['User2']);
  });

  it('applies correct styles', () => {
    const wrapper = mount(UserFilter, {
      props: {
        users: mockUsers,
        modelValue: '',
      },
    });

    const select = wrapper.find('select');
    expect(select.classes()).toContain('w-full');
    expect(select.classes()).toContain('sm:w-40');
    expect(select.classes()).toContain('bg-white');
    expect(select.classes()).toContain('text-sm');
    expect(select.classes()).toContain('rounded-lg');
  });
});
