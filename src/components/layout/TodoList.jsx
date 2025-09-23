import Button from "../ui/Button";

export default function TodoList({ 
  list, 
  handleDelete, 
  onToggle, 
  onEdit, 
  form, 
  onChange, 
  onAdd, 
  onCancelEdit, 
  isEditing,
  setOpenTodo
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(e);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 통합된 Todo 카드 */}
      <div className="bg-white rounded-3xl p-4 text-black flex-1 flex flex-col border-2 border-gray-300">
        {/* Todo List 제목 */}
        <h2 className="text-lg font-semibold mb-4 text-center text-black">Todo List</h2>
        
        {/* Todo 목록 */}
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
                    ㅁㅁㅁㅁ | {item.title}
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
        
        {/* 하단 입력 폼 */}
        <div className="space-y-3 border-t border-gray-200 pt-4">
          <textarea
            name="title"
            placeholder="할일을 입력하세요"
            value={form.title}
            onChange={onChange}
            className="w-full px-4 py-4 rounded-lg text-sm border border-gray-300 resize-none h-24 focus:outline-none focus:border-blue-500"
            required
          />
          
          <div className="flex gap-2 w-full">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!form.title.trim()}
              className="flex-1 px-4 py-3 bg-blue-800 hover:bg-blue-900 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium disabled:cursor-not-allowed"
            >
              {isEditing ? "수정" : "추가"}
            </button>
            
            {isEditing && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium"
              >
                취소
              </button>
            )}
            
            {/* 닫기 버튼을 추가/취소 버튼 옆으로 이동 */}
            <button
              type="button"
              onClick={() => setOpenTodo(false)}
              className="px-3 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs font-medium"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}