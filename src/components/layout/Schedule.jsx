import { useState } from "react";

export default function Schedule() {
  const [form, setForm] = useState({
    date: "",
    time: "",
    title: "",
    memo: "",
  });
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newSchedule = { id: Date.now(), ...form };
    setList([...list, newSchedule]);
    setForm({ date: "", time: "", title: "", memo: "" });
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 grid md:grid-cols-[1fr_300px] gap-6">
      {/* 일정 목록 */}
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
                  {item.memo && (
                    <div className="text-xs text-gray-500">{item.memo}</div>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs px-2 py-1 rounded bg-gray-800 text-white hover:bg-black"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 입력 폼 */}
      <form
        onSubmit={handleAdd}
        className="rounded-2xl bg-gray-200 p-4 space-y-3 text-black"
      >
        <div className="rounded-xl bg-gray-300 text-center py-2 font-semibold">
          일정 추가
        </div>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
        />
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
          required
        />
        <textarea
          name="memo"
          placeholder="메모"
          value={form.memo}
          onChange={handleChange}
          className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-gray-800 hover:bg-black py-2 font-semibold text-white"
        >
          등록
        </button>
      </form>
    </div>
  );
}
