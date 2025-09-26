import News from './components/News';
import Button from './components/ui/Button';
import { useOpenMyPage } from './store/useOpenMyPage';
import MyPage from './components/Mypage/Mypage';
import AdminMypage from './components/adminPage/AdminMypage';
import { useOpenAdminPage } from './store/useOpenAdminPage';
import { useOpenAdminDashboard } from './store/useOpenAdminDashboard';
import { useMainPage } from './store/useMainPage';
import Admin from './components/adminPage/Admin';
import TodayWeather from './components/weather/TodayWeather';
import FiveDayWeather from './components/weather/FiveDayWeather';
import TodayFortune from './components/TodayFortune';
import BriefingSection from './components/briefing/BriefingSection';
import { Quiz } from './components/quizPage/quiz';
import { adminData } from './components/adminPage/adminData';
import { AdminNew } from './components/adminPage/AdminNew';
import BackButton from './components/ui/BackButton';
import { AdminInquiries } from './components/adminPage/AdminInquiries';
import Todo from './components/layout/Todo';
import ScheduleForm from './components/layout/Scheduleform';

export default function MainPage() {
  const { setOpenMyPage } = useOpenMyPage();
  const { openAdminPage, setOpenAdminPage } = useOpenAdminPage();
  const { openAdminDashboard } = useOpenAdminDashboard();
  const { pageMode, setPageMode } = useMainPage();

  const handleBackToMain = () => setPageMode('main');

  const CONTENT_MAP = {
    admin: <Admin />,
    five: (
      <>
        <div className="absolute top-2 right-2">
          <BackButton onClose={handleBackToMain} />
        </div>
        <FiveDayWeather />
      </>
    ),
    fortune: (
      <>
        <div className="absolute top-2 right-2">
          <BackButton onClose={handleBackToMain} />
        </div>
        <TodayFortune />
      </>
    ),
    main: <BriefingSection />,
    todo: <BriefingSection />,
    schedule: <BriefingSection />,
    quiz: (
      <>
        <div className="absolute top-2 right-2">
          <BackButton onClose={handleBackToMain} />
        </div>
        <Quiz />
      </>
    ),
  };

  // const contentKey = (() => {
  //   if (openAdminPage && openAdminDashboard) {
  //     return 'admin';
  //   }
  //   if (view === 'five') {
  //     return 'five';
  //   }
  //   if (view === 'fortune') {
  //     return 'fortune';
  //   }
  //   return 'main';
  // })();

  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6">
        <h1 className="text-lg font-medium">Logo</h1>

        <button
          className="underline"
          onClick={() => {
            setOpenAdminPage(true);
            setOpenMyPage(false);
          }}
        >
          Admin
        </button>

        <button
          className="w-10 h-10 rounded-full bg-blue-500 text-white"
          onClick={() => {
            setOpenMyPage(true);
            setOpenAdminPage(false);
          }}
        >
          마이페이지
        </button>
      </header>

      <main className="flex-1 bg-slate-100 p-4">
        <div className="grid h-full grid-cols-[3fr_1fr] gap-4 overflow-y-auto">
          <div className="grid grid-rows-[1fr_2fr] gap-4">
            <div className="grid grid-cols-[2fr_1fr] gap-4">
              <div className="bg-white rounded-lg p-6 flex flex-col">
                {openAdminDashboard ? <AdminNew data={adminData} /> : <News />}
              </div>
              <div className="flex items-center justify-center rounded-lg bg-white p-6">
                {openAdminDashboard ? <AdminInquiries /> : <TodayWeather />}
              </div>
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white p-6 relative">
              {CONTENT_MAP[pageMode]}
            </div>
          </div>

          <div className="relative flex flex-col gap-5 bg-blue-600 rounded-lg p-6 items-center justify-start " >
            {pageMode === 'todo' && (
              <Todo setOpenTodo={handleBackToMain} />
            )}

            {pageMode === 'schedule' && (
              <ScheduleForm
                setOpenSchedule={handleBackToMain}
                openAdminDashboard={openAdminDashboard}
                openAdminPage={openAdminPage}
                openSchedule={true}
              />
            )}

            {pageMode !== 'todo' && pageMode !== 'schedule' && (
              <span className="text-lg font-medium text-white flex flex-col gap-4 w-full">
                <Button size="lg" variant="common" onClick={() => setPageMode('todo')}>
                  Todo List
                </Button>
                <Button size="lg" variant="common" onClick={() => setPageMode('schedule')}>
                  일정 리스트
                </Button>
                <Button size="lg" variant="common" onClick={() => setPageMode('five')}>
                  5일 날씨
                </Button>
                <Button size="lg" variant="common" onClick={() => setPageMode('fortune')}>
                  오늘의 운세
                </Button>
                <Button size="lg" variant="common" onClick={() => setPageMode('quiz')}>
                  QUIZ
                </Button>
                <Button size="lg" variant="common">푸쉬 설정</Button>
              </span>
            )}
            <MyPage />
            <AdminMypage />
          </div>
        </div>
      </main>
    </div>
  );
}
