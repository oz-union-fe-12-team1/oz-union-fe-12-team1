export default function ScheduleAdd({ list, onDelete, onEdit }) {
  return (
    <div className="h-full flex flex-col">
      {list.length === 0 ? (
        <p className="text-gray-500 text-center py-4">등록된 일정이 없습니다.</p>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {list.map((item) => (
              <li
                key={item.id}
                className="text-sm"
              >
                <div className="mb-1">
                  <div className="text-black font-medium">{item.title}</div>
                  <div className="text-gray-600 text-xs">
                    {item.date} {item.time}
                  </div>
                  {item.memo && (
                    <div className="text-gray-500 text-xs mt-1">{item.memo}</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit?.(item)}
                    className="text-xs px-1 py-0.5 text-blue-600 hover:text-blue-800"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-xs px-1 py-0.5 text-gray-600 hover:text-black"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}