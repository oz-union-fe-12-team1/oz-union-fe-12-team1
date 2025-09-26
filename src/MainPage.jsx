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
import { Quiz } from './components/quizPage/quiz';
import { adminData } from './components/adminPage/adminData';
import { AdminNew } from './components/adminPage/AdminNew';
import BackButton from './components/ui/BackButton';
import { AdminInquiries } from './components/adminPage/AdminInquiries';
import Header from './components/ui/header';
import Todo from './components/layout/Todo';
import ScheduleForm from './components/layout/Scheduleform';

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
        <Quiz />
      </>
    ),
  };

  return (
    <div className="flex h-screen w-screen flex-col ">
      

      <main className="flex-1 bg-[#090909] p-4">

          {/* 본문 vs 마이페이지 */}
        <div className="grid h-full grid-cols-[4fr_1fr] gap-4">

          {/* 헤더 vs 본문*/}
          <div className="grid grid-rows-[auto_2fr] gap-4 h-screen">
            <Header/>

            {/* 본문 윗부분 왼오 */}
            <div className="grid grid-cols-[3fr_2fr] gap-4">
                
              {/* 본문 윗부분 왼 */}
              <div className="bg-[#22222295] shadow-3d rounded-lg p-6 flex flex-col overflow-y-auto">
                {openAdminDashboard ? <AdminNew data={adminData} /> : <News />}
              </div>
              <div className="flex items-center justify-center rounded-lg bg-[#22222295] shadow-3d p-6 overflow-y-auto">
                {openAdminDashboard ? <AdminInquiries/> : <TodayWeather />}
              </div>
            </div>
            
            <div className='grid grid-cols-[1fr_2fr] gap-4'>
              {/* 본문 아랫부분 */}
              <div className='flex bg-[#22222295]  items-center justify-center shadow-3d rounded-lg'>
                시계
              </div>

              {/* 대시보드 */}
              <div className="flex items-center justify-center rounded-lg bg-[#22222295] p-6 relative overflow-y-auto shadow-3d">
                {CONTENT_MAP[pageMode]}
              </div>

            </div>
          </div>

          <div className="relative flex flex-col gap-5  bg-[#22222295] shadow-3d  rounded-lg p-6 items-center justify-start">
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
