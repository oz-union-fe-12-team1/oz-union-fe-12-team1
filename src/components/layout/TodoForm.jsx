import Button from "../ui/Button";

export default function TodoForm({ form, onChange, onAdd, onCancelEdit, isEditing }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(e);
  };

  return (
    <div className="bg-white rounded-xl p-4 space-y-3 border-2 border-gray-300">
      <textarea
        name="title"
        placeholder="할일을 입력하세요"
        value={form.title}
        onChange={onChange}
        className="w-full px-4 py-4 rounded-lg text-sm border border-gray-300 resize-none h-24 focus:outline-none focus:border-blue-500"
        required
      />
      
      <div className="flex gap-3 w-full">
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
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium"
          >
            취소
          </button>
        )}
      </div>
    </div>
  );
}