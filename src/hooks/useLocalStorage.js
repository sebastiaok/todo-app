import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) {
  const migrate = (item) => ({
    dueDate: null,
    category: null,
    ...item,
  })

  const [storedValue, setStoredValue] = useState(() => {
    const saved = localStorage.getItem(key)
    const parsed = saved ? JSON.parse(saved) : initialValue
    return Array.isArray(parsed) ? parsed.map(migrate) : parsed
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
