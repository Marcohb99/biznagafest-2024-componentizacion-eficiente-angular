import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import StatusFilter from '@/components/filter/StatusFilter.vue';

describe('StatusFilter', () => {
  it('renders correctly with default filter', () => {
    const wrapper = mount(StatusFilter, {
      props: {
        modelValue: '',
      },
    });

    expect(wrapper.find('label').text()).toBe('Estado');
    expect(wrapper.find('select').element.value).toBe('');
    expect(wrapper.findAll('option').length).toBe(3);
  });

  it('renders correctly with completed filter', () => {
    const wrapper = mount(StatusFilter, {
      props: {
        modelValue: 'completed',
      },
    });

    expect(wrapper.find('select').element.value).toBe('completed');
  });

  it('renders correctly with incomplete filter', () => {
    const wrapper = mount(StatusFilter, {
      props: {
        modelValue: 'incomplete',
      },
    });

    expect(wrapper.find('select').element.value).toBe('incomplete');
  });

  it('emits update:modelValue when selection changes', async () => {
    const wrapper = mount(StatusFilter, {
      props: {
        modelValue: '',
      },
    });

    await wrapper.find('select').setValue('completed');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['completed']);
  });

  it('applies correct styles', () => {
    const wrapper = mount(StatusFilter, {
      props: {
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
