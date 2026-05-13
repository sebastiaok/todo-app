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

      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto px-3 sm:px-4 py-6">
        {/* 왼쪽: 입력 사이드바 — 데스크탑에서 sticky 고정 */}
        <aside className="w-full md:w-72 flex-shrink-0 md:sticky md:top-6 md:self-start">
          <TodoInput onAdd={onAdd} />
        </aside>

        {/* 오른쪽: 필터 + 목록 + 푸터 */}
        <main className="flex-1 flex flex-col gap-4 min-w-0">
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
    </div>
  )
}

export default App
