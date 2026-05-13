import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onDelete, onEdit, onMoveCategory, onAddSubtask, onToggleSubtask, onDeleteSubtask }) {
  if (todos.length === 0) {
    return (
      <p className="text-gray-400 text-center py-8">
        할일이 없습니다. 새로운 할일을 추가해보세요!
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2 mb-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onMoveCategory={onMoveCategory}
          onAddSubtask={onAddSubtask}
          onToggleSubtask={onToggleSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </ul>
  )
}

export default TodoList
