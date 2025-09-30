export default function ScheduleAdd({ list, onDelete, onEdit }) {
  return (
    <div className="h-full">
      {list.length === 0 ? (
        <p className="text-gray-500 text-center py-4">등록된 일정이 없습니다.</p>
      ) : (
        <div className="overflow-y-auto space-y-2">
          {/* {list.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {item.date && new Date(item.date).toLocaleDateString('ko-KR', { 
                    month: 'numeric', 
                    day: 'numeric'
                  })} | {item.timeStart} |{item.timeEnd} | {item.title} | {item.memo}
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
          ))} */}

   {list.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-200 pb-3"
            >
              <div className="flex flex-col jusify-start gap-2">
                <div className="flex gap-19 items-center flex-wrap" >
                  <span className="font-medium whitespace-nowrap">
                    {item.date && new Date(item.date).toLocaleDateString('ko-KR', { 
                      year: 'numeric',
                      month: 'numeric', 
                      day: 'numeric'
                    })} 
                  </span>
                  <span>{item.timeStart} ~ {item.timeEnd} </span>
                </div>
                <span className="flex justify-center">
                  {item.title}
                </span>
                <span>
                   {item.memo}
                </span>
                <div className={`flex-1 ${item.completed ? 'line-through text-gray-600' : 'text-black'}`}>
                </div>
              </div>
              <div className="text-xs text-gray-700 flex justify-center">
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
          ))}
        </div>
      )}
    </div>
  );
}