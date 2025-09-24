export default function ScheduleAdd({ list, onDelete, onEdit }) {
  return (
    <div className="h-full">
      {list.length === 0 ? (
        <p className="text-gray-500 text-center py-4">등록된 일정이 없습니다.</p>
      ) : (
        <div className="overflow-y-auto space-y-2">
          {list.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {item.date && new Date(item.date).toLocaleDateString('ko-KR', { 
                    month: 'numeric', 
                    day: 'numeric' 
                  })} | {item.time} | {item.title} | {item.memo}
                </span>
              </div>
              <div className="flex gap-1 text-xs">
                <button
                  onClick={() => onEdit?.(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  수정
                </button>
                <span>|</span>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-gray-600 hover:text-black"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}