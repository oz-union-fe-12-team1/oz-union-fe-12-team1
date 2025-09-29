import ScheduleList from "./ScheduleList";
import { useSchedule } from "../../store/useSchedule";
import { useState } from "react";

export default function ScheduleForm({
  setOpenSchedule,
  openAdminDashboard,
  openAdminPage,
  openSchedule,
}) {
  const {
    form,
    list,
    isEditing,
    setForm,
    addSchedule,
    deleteSchedule,
    cancelEdit,
  } = useSchedule();

  const [errors, setErrors] = useState("");

  const localForm = {
    date: form.date || "",
    timeStart: form.timeStart || form.time || "", // 기존 time을 timeStart로 흡수
    timeEnd: form.timeEnd || "",
    title: form.title || "",
    memo: form.memo || "",
    all_day: form.all_day ?? false,
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const v = type === "checkbox" ? checked : value;
    setForm({ [name] : v });
    setErrors("");
  };

  const toISO = (d, t) => {
    // d: '2025-09-29', t: '13:30'
    const [Y, M, D] = d.split("-").map(Number);
    const [h = 0, m = 0] = (t || "00:00").split(":").map(Number);
    const dt = new Date(Y, M - 1, D, h, m, 0);
    return dt.toISOString();
  };

  const handleAdd = (e) => {
    e.preventDefault();
    console.log("sudmit form",form)
    const { date, timeStart, timeEnd, title, memo, all_day } = {
      ...localForm,
      ...form,
    };

    if (!date || !title) {
      setErrors("날짜와 제목은 필수입니다.");
      return;
    }

    let start_time, end_time;

    if (all_day) {
      // 종일: 00:00:00 ~ 23:59:59
      start_time = toISO(date, "00:00");
      end_time = toISO(date, "23:59");
    } else {
      if (!timeStart || !timeEnd) {
        setErrors("시작/종료 시간을 모두 입력해주세요.");
        return;
      }
      start_time = toISO(date, timeStart);
      end_time = toISO(date, timeEnd);

      if (new Date(start_time) >= new Date(end_time)) {
        setErrors("종료시간은 시작시간보다 뒤여야 합니다.");
        return;
      }
    }

    // 스토어로 보낼 내용
addSchedule({
    title,
    memo: memo || "",
    date,
    timeStart,
    timeEnd,
    all_day: Boolean(all_day),
    start_time,
    end_time,
  });
};

  const onBack = () => setOpenSchedule(false);

  return (
    <div className="rounded-xl bg-gray-200 p-4 space-y-3 text-black h-full flex flex-col relative">
      {/* 닫기 버튼 */}
      <button
        type="button"
        onClick={onBack}
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-gray-800 text-lg z-10 shadow-sm border border-gray-300"
      >
        X
      </button>

      {/* 일정 리스트 */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="text-center py-2 font-semibold mb-2">
          {isEditing ? "일정 수정" : "일정 리스트"}
        </div>
        <div className="flex-1 overflow-y-auto">
          <ScheduleList
            openAdminDashboard={openAdminDashboard}
            openAdminPage={openAdminPage}
            openSchedule={openSchedule}
            list={list}
            handleDelete={deleteSchedule}
          />
        </div>
      </div>

      {/* 일정 추가/수정 폼 */}
      <form onSubmit={handleAdd} className="space-y-3">
        <div className="text-center py-2 font-semibold text-gray-800">
          일정추가
        </div>

        {/* 날짜 */}
        <input
          type="date"
          name="date"
          value={form.date || ""}
          onChange={handleChange}
          className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
          required
        />

        {/* 종일 체크하는거 */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="all_day"
            checked={!!form.all_day}
            onChange={handleChange}
          />
          종일
        </label>

        {/* 시작/종료 시간 */}
        <div className="grid grid-cols-2 gap-2">
          <input
            type="time"
            name="timeStart"
            value={form.timeStart || ""}
            onChange={handleChange}
            className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
            disabled={!!form.all_day}
            placeholder="시작 시간"
          />
          <input
            type="time"
            name="timeEnd"
            value={form.timeEnd || ""}
            onChange={handleChange}
            className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
            disabled={!!form.all_day}
            placeholder="종료 시간"
          />
        </div>

        {/* 제목 */}
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={form.title || ""}
          onChange={handleChange}
          className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
          required
        />

        {/* 메모 */}
        <textarea
          name="memo"
          placeholder="메모"
          value={form.memo || ""}
          onChange={handleChange}
          className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
        />

        {/* 에러 메시지 */}
        {errors && (
          <p className="text-red-600 text-sm bg-white rounded-xl px-3 py-2 border border-red-200">
            {errors}
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!form.date || !form.title}
            className={`flex-1 rounded-xl py-2 font-semibold text-white 
              ${!form.date || !form.title 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gray-800 hover:bg-black"}`}
          >
            {isEditing ? "수정완료" : "등록"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 rounded-xl bg-gray-500 hover:bg-gray-600 py-2 font-semibold text-white"
            >
              취소
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
