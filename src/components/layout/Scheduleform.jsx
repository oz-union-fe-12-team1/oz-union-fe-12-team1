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
    <div className="rounded-2xl bg-gray-200 p-4 space-y-3 text-black h-full flex flex-col">
      {/* 일정리스트 섹션 - 박스 안에 꽉 차게 */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="text-center py-2 font-semibold mb-2">
          {isEditing ? '일정 수정' : '일정 리스트'}
        </div>
        <div className="flex-1 overflow-y-auto">
          <ScheduleList
            openAdminDashboard={openAdminDashboard}
            openAdminPage={openAdminPage}
            openSchedule={openSchedule}
            list={list}
            handleDelete={handleDelete}
          />
        </div>
      </div>

      {/* 일정추가 폼 섹션 */}
      <form onSubmit={onAdd} className="space-y-3">
        {/* 일정추가 타이틀 */}
        <div className="text-center py-2 font-semibold text-gray-800">
          일정추가
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
    </div>
  );
}