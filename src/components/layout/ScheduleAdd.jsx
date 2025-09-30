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
              className="border-b border-gray-200 pb-3"
            >
              <div className="flex flex-col justify-start gap-2">
                {/* 시작 날짜/시간 */}
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-gray-600 w-12"></span>
                  <span className="font-medium whitespace-nowrap">
                    {item.dateStart && new Date(item.dateStart).toLocaleDateString('ko-KR', {
                      year: '2-digit',
                      month: 'numeric',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="whitespace-nowrap">{item.timeStart}</span>
                </div>
                <div className="text-center text-black font-semibold">~</div>
                {/* 종료 날짜/시간 */}
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-gray-600 w-12"></span>
                  <span className="font-medium whitespace-nowrap">
                    {item.dateEnd && new Date(item.dateEnd).toLocaleDateString('ko-KR', {
                      year: '2-digit',
                      month: 'numeric',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="whitespace-nowrap">{item.timeEnd}</span>
                </div>

                {/* 제목 */}
                <span className="flex justify-center mt-1">
                  {item.title}
                </span>

                {/* 메모 */}
                {item.memo && (
                  <span className="text-gray-700 text-mt">
                    {item.memo}
                  </span>
                )}
              </div>

              {/* 수정/삭제 버튼 */}
              <div className="text-sm text-gray-700 flex justify-center mt-2 font-semibold ">
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