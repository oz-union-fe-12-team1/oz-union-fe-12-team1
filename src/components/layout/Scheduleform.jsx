import ScheduleList from "./ScheduleList";
export default function ScheduleForm({ form, onChange, onAdd , openAdminDashboard, openAdminPage , openSchedule, list, handleDelete }) {
  return (
    <form
      onSubmit={onAdd}
      className="rounded-2xl bg-gray-200 p-4 space-y-3 text-black"
    >
      <div className="rounded-xl bg-gray-300 text-center py-2 font-semibold">
        일정 추가
        <ScheduleList openAdminDashboard={openAdminDashboard} openAdminPage={openAdminPage} openSchedule={openSchedule}list={list} handleDelete={handleDelete} />
      </div>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={onChange}
        className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
        required
      />
      <input
        type="time"
        name="time"
        value={form.time}
        onChange={onChange}
        className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
      />
      <input
        type="text"
        name="title"
        placeholder="제목"
        value={form.title}
        onChange={onChange}
        className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
        required
      />
      <textarea
        name="memo"
        placeholder="메모"
        value={form.memo}
        onChange={onChange}
        className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
      />
      <button
        type="submit"
        className="w-full rounded-xl bg-gray-800 hover:bg-black py-2 font-semibold text-white"
      >
        등록
      </button>
    </form>
  );
}