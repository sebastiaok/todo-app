function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between gap-2 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 min-w-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 shrink-0 accent-blue-600"
        />
        <span className={`truncate ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.text}
        </span>
        <span className={`hidden sm:inline text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
          todo.completed ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {todo.completed ? '완료' : '미완료'}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
          todo.priority === 'high' ? 'bg-red-100 text-red-600' :
          todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
          'bg-green-100 text-green-600'
        }`}>
          {todo.priority}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="shrink-0 text-red-400 hover:text-red-600 transition-colors text-sm"
      >
        삭제
      </button>
    </li>
  )
}

export default TodoItem
