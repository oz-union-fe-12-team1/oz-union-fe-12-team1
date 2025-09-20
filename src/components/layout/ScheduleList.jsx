import ScheduleAdd from "./ScheduleAdd";

export default function ScheduleList({ openAdminDashboard , openAdminPage , openSchedule , list , handleDelete }) {
    return (
        <div className="flex items-center justify-center rounded-lg bg-white p-6">
            {!openAdminDashboard || !openAdminPage ? (
                openSchedule ? (
                    <ScheduleAdd list={list} onDelete={handleDelete} />
                ) : (
                    <span className="text-xl font-medium text-slate-700">메인</span>
                )
            ) : (
                <Admin />
            )}
        </div>
    );
}