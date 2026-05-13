import { useState } from 'react'
import { CATEGORIES } from '../constants/categories'

const priorityOptions = [
  { value: 'high', label: '높음', bg: 'bg-red-100', text: 'text-red-600', ring: 'ring-red-400' },
  { value: 'medium', label: '보통', bg: 'bg-yellow-100', text: 'text-yellow-600', ring: 'ring-yellow-400' },
  { value: 'low', label: '낮음', bg: 'bg-green-100', text: 'text-green-600', ring: 'ring-green-400' },
]

function TodoInput({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed, priority, dueDate || null, category || null)
    setText('')
    setPriority('medium')
    setDueDate('')
    setCategory('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 space-y-3">
      {/* 입력 + 추가 버튼 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할일을 입력하세요"
          className="flex-1 min-w-0 border border-gray-200 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium shrink-0"
        >
          추가
        </button>
      </div>

      {/* 옵션 행 */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* 우선순위 */}
        <div className="flex gap-1.5">
          {priorityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPriority(opt.value)}
              className={`text-xs px-2.5 py-1 rounded-full transition-all ${opt.bg} ${opt.text} ${
                priority === opt.value ? `ring-2 ${opt.ring} font-semibold` : 'opacity-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <span className="hidden sm:block w-px h-5 bg-gray-200" />

        {/* 마감일 */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-200 rounded-lg px-2 py-1 text-xs sm:text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />

        {/* 카테고리 */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-2 py-1 text-xs sm:text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="">카테고리 없음</option>
          {CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TodoInput
