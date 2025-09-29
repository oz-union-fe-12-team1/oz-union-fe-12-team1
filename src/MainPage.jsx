import News from './components/News';
import Button from './components/ui/Button';
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
// import { Quiz } from './components/quizPage/quiz';
import { adminData } from './components/adminPage/adminData';
import { AdminNew } from './components/adminPage/AdminNew';
import BackButton from './components/ui/BackButton';
import { AdminInquiries } from './components/adminPage/AdminInquiries';
import Header from './components/ui/header';
import Todo from './components/layout/Todo';
import ScheduleForm from './components/layout/Scheduleform';
import ClockComponent from './components/Clock';
import ScheduleSummary from './components/ScheduleSummary';
import { QuizComponent } from './components/quizPage/quiz';

export default function MainPage() {
  const { openAdminPage } = useOpenAdminPage();
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
        <QuizComponent />
      </>
    ),
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <main className="flex-1 bg-[#090909] p-4 min-h-0 overflow-hidden">
        {/* 본문 vs 마이페이지 */}
        <div className="grid h-full grid-cols-[4fr_1fr] gap-4 min-w-0">
          {/* 헤더 vs 본문*/}
          <div className="grid grid-rows-[auto_1fr] gap-4 min-h-0 min-w-0">
            <Header />

            {/* 본문 - 위아래 1:2 비율 */}
            <div className="grid grid-rows-[1fr_2fr] gap-4 min-h-0 min-w-0">
              {/* 본문 윗부분 왼오 */}
              <div className="grid grid-cols-[3fr_2fr] gap-4 min-h-0 min-w-0">
                {/* 본문 윗부분 왼 */}
                <div className="bg-[#22222295] shadow-3d rounded-lg p-6 flex flex-col overflow-y-auto min-w-0">
                  {openAdminDashboard ? <AdminNew data={adminData} /> : <News />}
                </div>

                {/* 본문 윗부분 오 */}
                <div className="flex items-center justify-center rounded-lg bg-[#22222295] shadow-3d p-6 overflow-y-auto min-w-0">
                  {openAdminDashboard ? <AdminInquiries /> : <TodayWeather />}
                </div>
              </div>

              {/* 본문 아랫부분 */}
              <div className="grid grid-cols-[1fr_3fr] gap-4 min-h-0 min-w-0">
                {/* 본문 아랫부분 왼 */}
                <div className="flex bg-[#22222295] items-center justify-center shadow-3d rounded-lg min-w-0">
                  <ClockComponent />
                </div>

                {/* 대시보드 = 본문 아랫부분 오 */}
                <div className="flex items-center justify-center rounded-lg bg-[#22222295] p-6 relative overflow-x-auto  custom-scroll w-full h-full shadow-3d min-w-0 ">
                  {CONTENT_MAP[pageMode]}
                </div>
              </div>
            </div>
          </div>

          {/* 마이페이지 */}
          <div className="relative flex flex-col bg-[#22222295] shadow-3d rounded-lg overflow-hidden min-w-0">
            <div className="flex-1  p-6 min-h-0">
              {pageMode === 'todo' && <Todo setOpenTodo={handleBackToMain} />}

              {pageMode === 'schedule' && (
                <ScheduleForm
                  setOpenSchedule={handleBackToMain}
                  openAdminDashboard={openAdminDashboard}
                  openAdminPage={openAdminPage}
                  openSchedule={true}
                />
              )}

              {pageMode !== 'todo' && pageMode !== 'schedule' && (
                <div className="flex flex-col justify-between h-full">
                  <span className="text-lg font-medium text-white flex flex-col gap-4 w-full whitespace-nowrap ">
                    <Button size="lgfree" variant="common" onClick={() => setPageMode('todo')}>
                      Todo List
                    </Button>
                    <Button size="lgfree" variant="common" onClick={() => setPageMode('schedule')}>
                      일정 리스트
                    </Button>
                    <Button size="lgfree" variant="common" onClick={() => setPageMode('five')}>
                      5일 날씨
                    </Button>
                    <Button size="lgfree" variant="common" onClick={() => setPageMode('fortune')}>
                      오늘의 운세
                    </Button>
                    <Button size="lgfree" variant="common" onClick={() => setPageMode('quiz')}>
                      QUIZ
                    </Button>
                    <Button size="lgfree" variant="common">
                      푸쉬 설정
                    </Button>
                  </span>
                  <ScheduleSummary />
                </div>
              )}
              <MyPage />
              <AdminMypage />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
