import { useState } from 'react'

const priorityOptions = [
  { value: 'high', label: '높음', bg: 'bg-red-100', text: 'text-red-600', ring: 'ring-red-400' },
  { value: 'medium', label: '보통', bg: 'bg-yellow-100', text: 'text-yellow-600', ring: 'ring-yellow-400' },
  { value: 'low', label: '낮음', bg: 'bg-green-100', text: 'text-green-600', ring: 'ring-green-400' },
]

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [editPriority, setEditPriority] = useState('')

  const startEdit = () => {
    setEditText(todo.text)
    setEditPriority(todo.priority)
    setIsEditing(true)
  }

  const cancelEdit = () => {
    setIsEditing(false)
  }

  const saveEdit = () => {
    const trimmed = editText.trim()
    if (!trimmed) return
    onEdit(todo.id, trimmed, editPriority)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  if (isEditing) {
    return (
      <li className="flex flex-col gap-2 p-3 bg-white rounded-lg shadow-sm border border-blue-200">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1.5">
            {priorityOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setEditPriority(opt.value)}
                className={`text-xs px-3 py-1 rounded-full transition-all ${opt.bg} ${opt.text} ${
                  editPriority === opt.value ? `ring-2 ${opt.ring} font-semibold` : 'opacity-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              저장
            </button>
            <button
              onClick={cancelEdit}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      </li>
    )
  }

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
      <div className="flex gap-2 shrink-0">
        <button
          onClick={startEdit}
          className="text-blue-400 hover:text-blue-600 transition-colors text-sm"
        >
          수정
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-400 hover:text-red-600 transition-colors text-sm"
        >
          삭제
        </button>
      </div>
    </li>
  )
}

export default TodoItem
