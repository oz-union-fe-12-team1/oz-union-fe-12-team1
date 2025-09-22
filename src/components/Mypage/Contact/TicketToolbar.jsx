// src/components/Mypage/Contact/TicketToolbar.jsx
export default function TicketToolbar({
  statusFilter,
  setStatusFilter,
  searchInput,
  setSearchInput,
  applySearch,
}) {
  return (
    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 -ml-px">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">전체</option>
          <option value="처리중">처리중</option>
          <option value="완료">완료</option>
        </select>
      </div>

      <div className="flex items-center gap-2 w-full md:w-[480px]">
        <input
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="제목+내용 검색어를 입력하세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && applySearch()}
        />
        <button
          type="button"
          onClick={applySearch}
          className="shrink-0 inline-flex items-center justify-center rounded bg-slate-900 text-white text-sm w-24 px-4 py-2 hover:bg-slate-800"
        >
          검색
        </button>
      </div>
    </div>
  );
}
