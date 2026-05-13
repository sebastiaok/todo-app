import { useState } from 'react'

const priorityOptions = [
  { value: 'high', label: '높음', bg: 'bg-red-100', text: 'text-red-600', ring: 'ring-red-400' },
  { value: 'medium', label: '보통', bg: 'bg-yellow-100', text: 'text-yellow-600', ring: 'ring-yellow-400' },
  { value: 'low', label: '낮음', bg: 'bg-green-100', text: 'text-green-600', ring: 'ring-green-400' },
]

function TodoInput({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed, priority)
    setText('')
    setPriority('medium')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할일을 입력하세요"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          추가
        </button>
      </div>
      <div className="flex gap-2 mt-2">
        {priorityOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setPriority(opt.value)}
            className={`text-xs px-3 py-1 rounded-full transition-all ${opt.bg} ${opt.text} ${
              priority === opt.value ? `ring-2 ${opt.ring} font-semibold` : 'opacity-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TodoInput
