import { mount } from '@vue/test-utils'
import { describe, expect,it } from 'vitest'

import TodoListWithProps from '@/components/todo/TodoListWithProps.vue'

describe('TodoListWithProps', () => {
  it('renders the title prop correctly', () => {
    const wrapper = mount(TodoListWithProps, {
      props: {
        title: 'My Todo List'
      }
    })
    expect(wrapper.find('h1').text()).toBe('My Todo List')
  })

  it('renders userFilter component when provided', () => {
    const mockUserFilter = {
      component: 'div',
      props: { class: 'user-filter' }
    }
    const wrapper = mount(TodoListWithProps, {
      props: {
        title: 'Test List',
        userFilter: mockUserFilter
      }
    })
    expect(wrapper.find('.user-filter').exists()).toBe(true)
  })

  it('renders statusFilter component when provided', () => {
    const mockStatusFilter = {
      component: 'div',
      props: { class: 'status-filter' }
    }
    const wrapper = mount(TodoListWithProps, {
      props: {
        title: 'Test List',
        statusFilter: mockStatusFilter
      }
    })
    expect(wrapper.find('.status-filter').exists()).toBe(true)
  })

  it('renders todoInput component when provided', () => {
    const mockTodoInput = {
      component: 'input',
      props: { class: 'todo-input' }
    }
    const wrapper = mount(TodoListWithProps, {
      props: {
        title: 'Test List',
        todoInput: mockTodoInput
      }
    })
    expect(wrapper.find('.todo-input').exists()).toBe(true)
  })

  it('renders the default slot content', () => {
    const wrapper = mount(TodoListWithProps, {
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
    const wrapper = mount(TodoListWithProps, {
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
