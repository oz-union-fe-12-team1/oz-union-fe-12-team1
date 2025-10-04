import { VscChromeClose } from 'react-icons/vsc';

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
  setOpenTodo,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(e);
  };

  return (
    <div className="bg-[#1c1c1c] rounded-xl p-4 w-full h-full flex flex-col border-[#333] border relative ">
      {/* X 버튼을 상단 우측에 위치 */}
      <button
        type="button"
        onClick={() => setOpenTodo(false)}
        className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-sm"
      >
        <VscChromeClose />
      </button>

      {/* Todo List 제목 */}
      <h2 className="text-lg font-semibold mb-4 text-center">Todo List</h2>

      {/* Todo 목록 - 스크롤 가능 영역 */}
      <div className="space-y-3 mb-4 flex-1 overflow-y-auto h-[500px] min-h-0">
        {list.length === 0 ? (
          <div className="text-sm">등록된 할일이 없습니다.</div>
        ) : (
          list.map((item) => (
            <div key={item.id} className="border-b border-[#555] pb-3">
              <div className="flex items-center gap-3 text-sm mb-2">
                <input
                  type="checkbox"
                  checked={item.completed || false}
                  onChange={() => onToggle(item.id)}
                  className="w-4 h-4"
                />
                <div className={`flex-1 ${item.completed && 'line-through text-[#555]'}`}>
                  {item.title}
                </div>
              </div>
              <div className="text-xs ml-7 text-[#888]">
                <button
                  onClick={() => onEdit(item)}
                  className="hover:text-[#1b4567] mr-3"
                  disabled={item.completed}
                >
                  수정
                </button>
                <span className="mr-3">/</span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="hover:text-[#750000]"
                  type="button"
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 하단 입력 폼 - 고정 */}
      <form onSubmit={handleSubmit} className="space-y-3 border-t border-[#555] pt-4 flex-shrink-0">
        <textarea
          name="title"
          placeholder="할일을 입력하세요"
          value={form.title}
          onChange={onChange}
          className="w-full px-4 py-4 rounded-lg text-sm border border-[#555] resize-none h-24 focus:outline-none focus:border-[#2d5b81]"
          required
        />

        <div className="flex gap-2 w-full">
          <button
            type="submit"
            disabled={!form.title.trim()}
            className="flex-1 px-4 py-3 bg-[#2d5b81] hover:bg-[#1b4567] disabled:bg-[#555] rounded-lg text-sm font-medium disabled:cursor-not-allowed"
          >
            {isEditing ? '수정' : '추가'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-3 bg-[#555] hover:bg-[#333] rounded-lg text-sm font-medium"
            >
              취소
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
