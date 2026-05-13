import useLocalStorage from './useLocalStorage'

const defaultTodos = [
  { id: 1, text: '리액트 공부하기', completed: false, priority: 'high' },
  { id: 2, text: '장보기', completed: true, priority: 'medium' },
  { id: 3, text: '운동하기', completed: false, priority: 'low' },
]

function useTodos() {
  const [todos, setTodos] = useLocalStorage('todos', defaultTodos)

  const onAdd = (text, priority = 'medium') => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
    }
    setTodos((prev) => [...prev, newTodo])
  }

  const onToggle = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const onDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return { todos, onAdd, onToggle, onDelete }
}

export default useTodos
