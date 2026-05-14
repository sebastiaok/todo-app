import { useState } from 'react'
import { CATEGORIES } from '../constants/categories'
import { getDueDateStatus, getDdayLabel } from '../utils/dateUtils'

const priorityOptions = [
  { value: 'high', label: '높음', bg: 'bg-red-100', text: 'text-red-600', ring: 'ring-red-400' },
  { value: 'medium', label: '보통', bg: 'bg-yellow-100', text: 'text-yellow-600', ring: 'ring-yellow-400' },
  { value: 'low', label: '낮음', bg: 'bg-green-100', text: 'text-green-600', ring: 'ring-green-400' },
]

function TodoItem({ todo, onToggle, onDelete, onEdit, onMoveCategory, onAddSubtask, onToggleSubtask, onDeleteSubtask }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [editPriority, setEditPriority] = useState('')
  const [editDueDate, setEditDueDate] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [showSubtasks, setShowSubtasks] = useState(false)
  const [subtaskText, setSubtaskText] = useState('')

  const subtasks = todo.subtasks || []
  const hasSubtasks = subtasks.length > 0
  const completedCount = subtasks.filter((s) => s.completed).length

  const categoryColor = CATEGORIES.find((c) => c.name === todo.category)?.color ?? null
  const dueDateStatus = getDueDateStatus(todo.dueDate, todo.completed)
  const ddayLabel = todo.dueDate ? getDdayLabel(todo.dueDate) : null

  const startEdit = () => {
    setEditText(todo.text)
    setEditPriority(todo.priority)
    setEditDueDate(todo.dueDate ?? '')
    setEditCategory(todo.category ?? '')
    setIsEditing(true)
  }

  const cancelEdit = () => setIsEditing(false)

  const saveEdit = () => {
    const trimmed = editText.trim()
    if (!trimmed) return
    onEdit(todo.id, trimmed, editPriority, editDueDate || null, editCategory || null)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  const handleAddSubtask = () => {
    const trimmed = subtaskText.trim()
    if (!trimmed) return
    onAddSubtask(todo.id, trimmed)
    setSubtaskText('')
  }

  const handleSubtaskKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter') handleAddSubtask()
  }

  // ── 수정 모드 ──
  if (isEditing) {
    return (
      <li className="bg-white rounded-xl shadow-sm border-2 border-blue-200 p-3 sm:p-4 space-y-3">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 옵션 행 */}
        <div className="flex flex-wrap gap-2 items-center">
          {priorityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setEditPriority(opt.value)}
              className={`text-xs px-2.5 py-1 rounded-full transition-all ${opt.bg} ${opt.text} ${
                editPriority === opt.value ? `ring-2 ${opt.ring} font-semibold` : 'opacity-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-600"
          />
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-600"
          >
            <option value="">카테고리 없음</option>
            {CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* 저장/취소 */}
        <div className="flex justify-end gap-3">
          <button onClick={cancelEdit} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            취소
          </button>
          <button onClick={saveEdit} className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
            저장
          </button>
        </div>
      </li>
    )
  }

  // ── 보기 모드 ──
  return (
    <li className={`bg-white rounded-xl shadow-sm border transition-all ${
      dueDateStatus === 'overdue' ? 'border-red-300 border-2' : 'border-gray-100'
    }`}>
      {/* 1행: 체크박스 + 텍스트 + 액션 버튼 */}
      <div className="flex items-start gap-2.5 p-3 sm:p-4">
        {/* 카테고리 색상 바 */}
        {categoryColor && (
          <span
            className="w-1 min-h-[2rem] self-stretch rounded-full shrink-0 mt-0.5"
            style={{ backgroundColor: categoryColor }}
          />
        )}

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          disabled={hasSubtasks}
          className="w-5 h-5 shrink-0 accent-blue-600 disabled:opacity-40 mt-0.5"
        />

        {/* 텍스트 + 뱃지 */}
        <div className="flex-1 min-w-0">
          <span className={`text-sm sm:text-base leading-snug ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}>
            {todo.text}
          </span>

          {/* 메타 뱃지 행 */}
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              todo.priority === 'high' ? 'bg-red-50 text-red-500' :
              todo.priority === 'medium' ? 'bg-yellow-50 text-yellow-600' :
              'bg-green-50 text-green-500'
            }`}>
              {todo.priority === 'high' ? '높음' : todo.priority === 'medium' ? '보통' : '낮음'}
            </span>

            {todo.category && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                {todo.category}
              </span>
            )}

            {dueDateStatus !== 'none' && (
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                dueDateStatus === 'overdue' ? 'bg-red-50 text-red-500' :
                dueDateStatus === 'today' ? 'bg-orange-50 text-orange-500' :
                'bg-blue-50 text-blue-500'
              }`}>
                {ddayLabel}
              </span>
            )}

            {hasSubtasks && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-500">
                {completedCount}/{subtasks.length}
              </span>
            )}
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-1 shrink-0 items-center">
          <select
            value={todo.category ?? ''}
            onChange={(e) => onMoveCategory(todo.id, e.target.value || null)}
            className="hidden sm:block border border-gray-200 rounded-lg px-1.5 py-1 text-[11px] text-gray-400 focus:outline-none"
          >
            <option value="">없음</option>
            {CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={() => setShowSubtasks(!showSubtasks)}
            className="p-1.5 rounded-lg text-purple-400 hover:bg-purple-50 hover:text-purple-600 transition-colors text-xs sm:text-sm"
          >
            쪼개기
          </button>
          <button
            onClick={startEdit}
            className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-colors text-xs sm:text-sm"
          >
            수정
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors text-xs sm:text-sm"
          >
            삭제
          </button>
        </div>
      </div>

      {/* 모바일 카테고리 이동 (sm 이하에서만 표시) */}
      {!isEditing && (
        <div className="sm:hidden px-3 pb-2 -mt-1">
          <select
            value={todo.category ?? ''}
            onChange={(e) => onMoveCategory(todo.id, e.target.value || null)}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-400 focus:outline-none"
          >
            <option value="">카테고리 이동</option>
            {CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* 서브태스크 영역 */}
      {showSubtasks && (
        <div className="px-3 sm:px-4 pb-3 pt-2 ml-6 sm:ml-8 border-t border-gray-100">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={subtaskText}
              onChange={(e) => setSubtaskText(e.target.value)}
              onKeyDown={handleSubtaskKeyDown}
              placeholder="하위 할일 입력..."
              className="flex-1 min-w-0 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
            <button
              onClick={handleAddSubtask}
              className="text-sm px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shrink-0"
            >
              추가
            </button>
          </div>
          {hasSubtasks && (
            <ul className="space-y-1">
              {subtasks.map((sub) => (
                <li key={sub.id} className="flex items-center gap-2 py-1 text-sm">
                  <input
                    type="checkbox"
                    checked={sub.completed}
                    onChange={() => onToggleSubtask(todo.id, sub.id)}
                    className="w-4 h-4 accent-purple-500 shrink-0"
                  />
                  <span className={`flex-1 min-w-0 ${sub.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {sub.text}
                  </span>
                  <button
                    onClick={() => onDeleteSubtask(todo.id, sub.id)}
                    className="p-1 rounded text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors text-xs shrink-0"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  )
}

export default TodoItem
