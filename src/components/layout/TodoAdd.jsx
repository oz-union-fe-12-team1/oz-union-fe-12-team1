import Button from "../ui/Button";

export default function TodoAdd({ list, onDelete, onEdit, onToggle }) {
  return (
    <div className="bg-white rounded-3xl p-4 text-black h-full flex flex-col border-2 border-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-center text-black">Todo List</h2>
      <div className="flex-1 space-y-3 mb-4">
        {list.length === 0 ? (
          <div className="text-gray-700 text-sm">등록된 할일이 없습니다.</div>
        ) : (
          list.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-200 pb-3"
            >
              <div className="flex items-center gap-3 text-sm mb-2">
                <input
                  type="checkbox"
                  checked={item.completed || false}
                  onChange={() => onToggle(item.id)}
                  className="w-4 h-4"
                />
                <div className={`flex-1 ${item.completed ? 'line-through text-gray-600' : 'text-black'}`}>
                {item.title}
                </div>
              </div>
              <div className="text-xs text-gray-700 ml-7">
                <button
                  onClick={() => onEdit(item)}
                  className="hover:text-blue-600 mr-3"
                  disabled={item.completed}
                >
                  수정
                </button>
                <span className="mr-3">/</span>
                <button
                  onClick={() => onDelete(item.id)}
                  className="hover:text-red-600"
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}