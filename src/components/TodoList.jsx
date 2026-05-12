import TodoItem from './TodoItem'

const emptyMessages = {
  '전체': '할일이 없습니다. 새로운 할일을 추가해보세요!',
  '진행중': '진행중인 할일이 없습니다.',
  '완료': '완료된 할일이 없습니다.',
}

function TodoList({ todos, filter, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <p className="text-gray-400 text-center py-8">
        {emptyMessages[filter] || emptyMessages['전체']}
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2 mb-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default TodoList
