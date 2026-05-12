import { useState } from 'react'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoFilter from './components/TodoFilter'
import TodoList from './components/TodoList'
import Footer from './components/Footer'
import useTodos from './hooks/useTodos'

function App() {
  const { todos, onAdd, onToggle, onDelete } = useTodos()
  const [filter, setFilter] = useState('전체')

  const filteredTodos = todos.filter((todo) => {
    if (filter === '진행중') return !todo.completed
    if (filter === '완료') return todo.completed
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-xl mx-auto px-4 py-8">
        <TodoInput onAdd={onAdd} />
        <TodoFilter current={filter} onChange={setFilter} />
        <TodoList todos={filteredTodos} filter={filter} onToggle={onToggle} onDelete={onDelete} />
        <Footer todos={todos} />
      </main>
    </div>
  )
}

export default App
