import ScheduleList from './ScheduleList';

export default function ScheduleForm({
  form,
  onChange,
  onAdd,
  onCancelEdit,
  isEditing,
  openAdminDashboard,
  openAdminPage,
  openSchedule,
  list,
  handleDelete,
  setOpenSchedule,
}) {
  const onBack = () => {
    console.log('asd');
    setOpenSchedule(false);
  };
  return (
    <form onSubmit={onAdd} className="rounded-2xl bg-gray-200 p-4 space-y-3 text-black">
      <div className="rounded-xl bg-gray-300 text-center py-2 font-semibold">
        {isEditing ? '일정 수정' : '일정 추가'}
        <ScheduleList
          openAdminDashboard={openAdminDashboard}
          openAdminPage={openAdminPage}
          openSchedule={openSchedule}
          list={list}
          handleDelete={handleDelete}
        />
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

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-gray-800 hover:bg-black py-2 font-semibold text-white"
        >
          {isEditing ? '수정완료' : '등록'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 rounded-xl bg-gray-500 hover:bg-gray-600 py-2 font-semibold text-white"
          >
            취소
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            console.log('aaa');
            onBack();
          }}
          className="px-4 rounded-xl bg-blue-600 hover:bg-blue-700 py-2 font-semibold text-white"
        >
          X
        </button>
      </div>
    </form>
  );
}
