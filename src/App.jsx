import Header from './components/Header'
import TodoInput from './components/TodoInput'
import FilterBar from './components/FilterBar'
import TodoList from './components/TodoList'
import Footer from './components/Footer'
import useTodos from './hooks/useTodos'

function App() {
  const {
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
  } = useTodos()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-5">
        <TodoInput onAdd={onAdd} />
        <FilterBar
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onMoveCategory={onMoveCategory}
          onAddSubtask={onAddSubtask}
          onToggleSubtask={onToggleSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
        <Footer todos={todos} />
      </main>
    </div>
  )
}

export default App
