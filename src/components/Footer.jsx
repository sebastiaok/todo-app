function Footer({ todos }) {
  const remaining = todos.filter((t) => !t.completed).length

  return (
    <footer className="text-sm text-gray-500 pt-4 border-t border-gray-200">
      남은 할일: {remaining}개
    </footer>
  )
}

export default Footer
