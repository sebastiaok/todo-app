function TodoFilter({ current, onChange }) {
  const filters = ['전체', '진행중', '완료']

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((label) => (
        <button
          key={label}
          onClick={() => onChange(label)}
          className={`px-4 py-1 rounded-full border text-sm transition-colors ${
            current === label
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default TodoFilter
