export default function ScheduleAdd({ list, onDelete }) {
  return (
    <div className="rounded-2xl bg-gray-100 p-4 text-black">
      <h2 className="text-lg font-semibold mb-3">일정 목록</h2>
      {list.length === 0 ? (
        <p className="text-gray-500">등록된 일정이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {list.map((item) => (
            <li
              key={item.id}
              className="bg-gray-200 rounded-xl p-3 shadow flex justify-between items-start"
            >
              <div>
                <div className="font-medium text-black">{item.title}</div>
                <div className="text-sm text-gray-700">
                  {item.date} {item.time}
                </div>
                {item.memo && <div className="text-xs text-gray-500">{item.memo}</div>}
              </div>
              <button
                onClick={() => onDelete(item.id)}
                className="text-xs px-2 py-1 rounded bg-gray-800 text-white hover:bg-black"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
