import { CATEGORIES } from '../constants/categories'

export default function FilterBar({
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="space-y-2">
      {/* 카테고리 탭 */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {[{ name: '전체', color: '#6b7280' }, ...CATEGORIES].map((c) => {
          const value = c.name === '전체' ? 'all' : c.name
          const isActive = value === categoryFilter
          return (
            <button
              key={c.name}
              onClick={() => setCategoryFilter(value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm border transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-gray-800 text-white border-gray-800 shadow-sm'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
              }`}
            >
              {c.name !== '전체' && (
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: c.color }}
                />
              )}
              {c.name}
            </button>
          )
        })}
      </div>

      {/* 완료 상태 토글 */}
      <div className="flex gap-1.5">
        {[
          { key: 'all', label: '전체' },
          { key: 'active', label: '진행중' },
          { key: 'completed', label: '완료' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setStatusFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm border transition-all ${
              statusFilter === f.key
                ? 'bg-gray-800 text-white border-gray-800 shadow-sm'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
