import { useState } from 'react'
import useLocalStorage from './useLocalStorage'

const defaultTodos = [
  { id: 1, text: '리액트 공부하기', completed: false, priority: 'high', subtasks: [], dueDate: null, category: null },
  { id: 2, text: '장보기', completed: true, priority: 'medium', subtasks: [], dueDate: null, category: null },
  { id: 3, text: '운동하기', completed: false, priority: 'low', subtasks: [], dueDate: null, category: null },
]

function useTodos() {
  const [todos, setTodos] = useLocalStorage('todos', defaultTodos)
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

  const filteredTodos = todos
    .filter((t) => categoryFilter === 'all' ? true : t.category === categoryFilter)
    .filter((t) => {
      if (statusFilter === 'active') return !t.completed
      if (statusFilter === 'completed') return t.completed
      return true
    })
    .sort((a, b) => {
      // 1순위: 미완료 우선
      if (a.completed !== b.completed) return a.completed ? 1 : -1

      // 2순위: 우선순위 높은순 (high → medium → low)
      const pd = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      if (pd !== 0) return pd

      // 3순위: D-day 가까운순 (null은 항상 맨 뒤)
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate.localeCompare(b.dueDate)
    })

  const onAdd = (text, priority = 'medium', dueDate, category) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      subtasks: [],
      dueDate: dueDate ?? null,
      category: category ?? null,
    }
    setTodos((prev) => [...prev, newTodo])
  }

  const onToggle = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const onDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const onEdit = (id, text, priority, dueDate, category) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, text, priority, dueDate: dueDate ?? t.dueDate, category: category ?? t.category }
          : t
      )
    )
  }

  const onMoveCategory = (id, newCategory) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, category: newCategory } : t))
    )
  }

  const onAddSubtask = (parentId, text) => {
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id !== parentId) return t
        const newSubtask = { id: Date.now(), text, completed: false }
        const updatedSubtasks = [...(t.subtasks || []), newSubtask]
        return { ...t, subtasks: updatedSubtasks, completed: false }
      })
    )
  }

  const onToggleSubtask = (parentId, subtaskId) => {
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id !== parentId) return t
        const updatedSubtasks = (t.subtasks || []).map((s) =>
          s.id === subtaskId ? { ...s, completed: !s.completed } : s
        )
        const allCompleted = updatedSubtasks.length > 0 && updatedSubtasks.every((s) => s.completed)
        return { ...t, subtasks: updatedSubtasks, completed: allCompleted }
      })
    )
  }

  const onDeleteSubtask = (parentId, subtaskId) => {
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id !== parentId) return t
        const updatedSubtasks = (t.subtasks || []).filter((s) => s.id !== subtaskId)
        return { ...t, subtasks: updatedSubtasks }
      })
    )
  }

  return {
    todos,
    filteredTodos,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    onAdd,
    onToggle,
    onDelete,
    onEdit,
    onMoveCategory,
    onAddSubtask,
    onToggleSubtask,
    onDeleteSubtask,
  }
}

export default useTodos
