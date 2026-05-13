function Footer({ todos }) {
  const remaining = todos.filter((t) => !t.completed).length
  const total = todos.length

  return (
    <footer className="text-sm text-gray-400 pt-4 mt-2 border-t border-gray-200 text-center">
      전체 {total}개 중 <span className="text-gray-600 font-medium">{remaining}개</span> 남음
    </footer>
  )
}

export default Footer
