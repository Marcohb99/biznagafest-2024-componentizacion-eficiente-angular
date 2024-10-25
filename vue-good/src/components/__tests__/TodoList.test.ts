import { mount } from '@vue/test-utils'
import { describe, expect,it } from 'vitest'

import TodoList from '@/components/todo/TodoList.vue'

describe('TodoList', () => {
  it('renders the title prop correctly', () => {
    const wrapper = mount(TodoList, {
      props: {
        title: 'My Todo List'
      }
    })
    expect(wrapper.find('h1').text()).toBe('My Todo List')
  })

  it('renders the default slot content', () => {
    const wrapper = mount(TodoList, {
      props: {
        title: 'Test List'
      },
      slots: {
        default: '<div class="test-slot">Slot Content</div>'
      }
    })
    expect(wrapper.find('.test-slot').exists()).toBe(true)
    expect(wrapper.find('.test-slot').text()).toBe('Slot Content')
  })

  it('has the correct structure and classes', () => {
    const wrapper = mount(TodoList, {
      props: {
        title: 'Structure Test'
      }
    })
    expect(wrapper.find('.min-h-screen').exists()).toBe(true)
    expect(wrapper.find('.bg-gray-100').exists()).toBe(true)
    expect(wrapper.find('.bg-white').exists()).toBe(true)
    expect(wrapper.find('.shadow-lg').exists()).toBe(true)
    expect(wrapper.find('.rounded-lg').exists()).toBe(true)
  })
})
