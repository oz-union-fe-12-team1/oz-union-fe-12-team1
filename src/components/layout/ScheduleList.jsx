import ScheduleAdd from "./ScheduleAdd";

export default function ScheduleList({ 
  openAdminDashboard, 
  openAdminPage, 
  openSchedule, 
  list, 
  handleDelete,
  handleEdit 
}) {
  return (
    <div className="rounded-lg bg-white p-4 h-117 w-full overflow-y-auto">
      {!openAdminDashboard || !openAdminPage ? (
        openSchedule ? (
          <ScheduleAdd 
            list={list} 
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ) : (
          <span className="text-xl font-medium text-slate-700">메인</span>
        )
      ) : (
        <Admin />
      )}
    </div>
  );
}