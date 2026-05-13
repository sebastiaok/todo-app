import useLocalStorage from './useLocalStorage'

const defaultTodos = [
  { id: 1, text: '리액트 공부하기', completed: false, priority: 'high', subtasks: [] },
  { id: 2, text: '장보기', completed: true, priority: 'medium', subtasks: [] },
  { id: 3, text: '운동하기', completed: false, priority: 'low', subtasks: [] },
]

function useTodos() {
  const [todos, setTodos] = useLocalStorage('todos', defaultTodos)

  const onAdd = (text, priority = 'medium') => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      subtasks: [],
    }
    setTodos((prev) => [...prev, newTodo])
  }

  const onToggle = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const onDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const onEdit = (id, text, priority) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text, priority } : t)))
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

  return { todos, onAdd, onToggle, onDelete, onEdit, onAddSubtask, onToggleSubtask, onDeleteSubtask }
}

export default useTodos
