/**
 * 마감일 상태를 반환한다.
 * @param {string|null} dueDate - "YYYY-MM-DD" 형식 또는 null
 * @param {boolean} completed
 * @returns {"none"|"overdue"|"today"|"upcoming"}
 */
export function getDueDateStatus(dueDate, completed) {
  if (!dueDate || completed) return "none"

  const now = new Date()
  const localToday = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-")

  if (dueDate < localToday) return "overdue"
  if (dueDate === localToday) return "today"
  return "upcoming"
}

/**
 * D-day 문자열을 반환한다.
 * @param {string} dueDate - "YYYY-MM-DD"
 * @returns {string} 예: "D-3", "D-Day", "D+2"
 */
export function getDdayLabel(dueDate) {
  const now = new Date()
  const due = new Date(dueDate)
  now.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)
  const diff = Math.round((due - now) / (1000 * 60 * 60 * 24))
  if (diff === 0) return "D-Day"
  if (diff > 0) return `D-${diff}`
  return `D+${Math.abs(diff)}`
}
