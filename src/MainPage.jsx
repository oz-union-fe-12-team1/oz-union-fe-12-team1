import { useState, useEffect, useRef } from 'react';

import News from './components/News';
import TodayWeather from './components/weather/TodayWeather';
import FiveDayWeather from './components/weather/FiveDayWeather';
import TodayFortune from './components/TodayFortune';
import Chatbot from './components/Chatbot';
import { Quiz } from './components/quizPage/quiz';
import { useOpenAdminDashboard } from './store/useOpenAdminDashboard';
import { AdminNew } from './components/adminPage/AdminNew';
import { adminData } from './components/adminPage/adminData';
import Admin from './components/adminPage/Admin';

import MyPage from './components/Mypage/Mypage';
import AdminMypage from './components/adminPage/AdminMypage';

import TodoList from './components/layout/TodoList';

import Scheduleform from './components/layout/Scheduleform';

import { dummyTodos as TODOS_SRC } from './api/dummyTodos';
import { dummySchedules as SCHEDULES_SRC } from './api/dummySchedules';

import { useOpenMyPage } from './store/useOpenMyPage';
import { useOpenAdminPage } from './store/useOpenAdminPage';

//공용 버튼
const DarkButton = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`w-full h-full rounded-xl border border-neutral-700 bg-neutral-800 text-neutral-100
                hover:bg-neutral-700/80 active:bg-neutral-700 px-4 py-4 text-2xl font-extrabold transition
                flex items-center justify-center text-center ${className}`}
  >
    {children}
  </button>
);

export default function MainPage() {
  // const [Panel, setPanel] = useState('mypage'); // 'mypage' | 'admin'
  const [mode, setMode] = useState('summary'); // 'summary' | 'five' | 'fortune' | 'quiz'

  const { openAdminDashboard } = useOpenAdminDashboard();
  const { openMyPage, setOpenMyPage } = useOpenMyPage();
  const { setOpenAdminPage } = useOpenAdminPage();

  const [todos, setTodos] = useState([]);
  const [todoForm, setTodoForm] = useState({ title: '', memo: '' });
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const [schedules, setSchedules] = useState([]);
  const [form, setForm] = useState({ date: '', time: '', title: '', memo: '' });
  // const [isEditingSchedule, setIsEditingSchedule] = useState(false); //일정수정 기능 미구현
  // const [editingScheduleId, setEditingScheduleId] = useState(null);

  const [openTodoOverlay, setOpenTodoOverlay] = useState(false);
  const [openScheduleOverlay, setOpenScheduleOverlay] = useState(false);

  const quizWrapRef = useRef(null);
  const [quizScale, setQuizScale] = useState(1);
  const QUIZ_BASE_WIDTH = 1000;

  useEffect(() => {
    const updateScale = () => {
      if (!quizWrapRef.current) return;
      const available = quizWrapRef.current.clientWidth || 0;
      const next = Math.min(1, available / QUIZ_BASE_WIDTH);
      setQuizScale(next);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  //더미데이터 불러오기
  useEffect(() => {
    setTodos(
      (TODOS_SRC ?? []).map((t) => ({
        id: t.id,
        title: t.title,
        memo: t.description ?? '',
        completed: !!t.is_completed,
      })),
    );
    setSchedules(
      (SCHEDULES_SRC ?? []).map((s) => ({
        id: s.id,
        date: s.date,
        time: s.time ?? '',
        title: s.title,
        memo: s.memo ?? '',
        all_day: !!s.all_day,
      })),
    );
  }, []);

  useEffect(() => {
    setMode((prev) =>
      openAdminDashboard ? 'adminUsers' : prev === 'adminUsers' ? 'summary' : prev,
    );
  }, [openAdminDashboard]);

  //Todo
  const handleTodoChange = (e) => {
    const { name, value } = e.target;
    setTodoForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTodoAdd = (e) => {
    e.preventDefault();
    if (!todoForm.title.trim()) return;

    if (isEditingTodo) {
      setTodos((prev) =>
        prev.map((item) =>
          item.id === editingTodoId
            ? { ...item, title: todoForm.title, memo: todoForm.memo ?? '' }
            : item,
        ),
      );
      setIsEditingTodo(false);
      setEditingTodoId(null);
    } else {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), title: todoForm.title, memo: todoForm.memo ?? '', completed: false },
      ]);
    }
    setTodoForm({ title: '', memo: '' });
  };

  const handleTodoDelete = (id) => {
    setTodos((prev) => prev.filter((it) => it.id !== id));
    if (editingTodoId === id) {
      setIsEditingTodo(false);
      setEditingTodoId(null);
      setTodoForm({ title: '', memo: '' });
    }
  };

  const handleTodoToggle = (id) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  };

  const handleTodoEdit = (item) => {
    setTodoForm({ title: item.title, memo: item.memo || '' });
    setIsEditingTodo(true);
    setEditingTodoId(item.id);
  };

  const handleTodoCancelEdit = () => {
    setIsEditingTodo(false);
    setEditingTodoId(null);
    setTodoForm({ title: '', memo: '' });
  };

  //일정
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newSchedule = {
      id: Date.now(),
      date: form.date,
      time: form.time,
      title: form.title,
      memo: form.memo ?? '',
      all_day: !form.time,
    };
    setSchedules((prev) => [...prev, newSchedule]);
    setForm({ date: '', time: '', title: '', memo: '' });
  };

  const handleScheduleDelete = (id) => {
    setSchedules((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-screen h-dvh bg-neutral-900 text-neutral-100 overflow-hidden">
      <header className="h-16 px-6 flex items-center justify-between border-b border-neutral-800 bg-black/40 backdrop-blur">
        <h1 className="text-lg font-semibold">Logo</h1>

        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 rounded-md border border-white/20 text-white hover:bg-white/10"
            onClick={() => {
              if (openMyPage) {
                setOpenMyPage(false);
                setOpenAdminPage(true);
              } else {
                setOpenAdminPage(false);
                setOpenMyPage(true);
              }
            }}
            title={openMyPage ? '어드민 마이페이지 열기' : '마이페이지 열기'}
          >
            {/* 라벨은 항상 “지금 열려있는 쪽의 반대편”을 표시 */}
            {openMyPage ? '어드민' : '마이페이지'}
          </button>
        </div>
      </header>

      <main className="h-[calc(100dvh-4rem)] grid grid-cols-[minmax(0,1fr)_360px] gap-6 p-6 min-h-0 overflow-hidden">
        {' '}
        {/* 메인 */}
        <div className="order-1 grid grid-rows-[minmax(0,2fr)_minmax(0,3fr)] gap-6 h-full min-h-0 overflow-hidden">
          {/* 상단: 날씨(좌) / 뉴스(우) */}
          <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,4fr)] gap-6 min-h-0">
            {/* (왼) 날씨 박스 */}
            <section className="h-full rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 overflow-hidden">
              <div className="h-full p-3 rounded-xl border border-neutral-800/60 bg-black/30">
                <TodayWeather />
              </div>
            </section>

            {/* (오른) 뉴스: 내부 박스 없이 바로 렌더 */}
            <section className="rounded-2xl overflow-hidden bg-[#0f0f10] border border-neutral-800 p-5 min-h-0">
              <News />
            </section>
          </div>

          {/* 하단: 버튼(좌) / 콘텐츠(우) */}
          <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,4fr)] gap-6 min-h-0 overflow-hidden">
            {/* 버튼 박스 */}
            <section className="relative rounded-2xl bg-neutral-950 border border-neutral-800 p-5 flex h-full min-h-0 min-w-0 overflow-hidden">
              <div className="grid grid-cols-2 gap-4 w-full items-stretch h-full">
                <DarkButton onClick={() => setOpenTodoOverlay(true)}>투두 리스트</DarkButton>
                <DarkButton onClick={() => setOpenScheduleOverlay(true)}>일정 리스트</DarkButton>
                <DarkButton onClick={() => setMode('five')}>5일 날씨</DarkButton>
                <DarkButton onClick={() => setMode('fortune')}>오늘의 운세</DarkButton>
                <DarkButton onClick={() => setMode('quiz')}>QUIZ</DarkButton>
                <DarkButton
                  onClick={() => {
                    /* TODO: 푸쉬 설정 연결 */
                  }}
                >
                  푸쉬 설정
                </DarkButton>
              </div>

              {/* 버튼박스 위 오버레이: 투두 */}
              {openTodoOverlay && (
                <div className="absolute inset-0 z-20 overflow-auto">
                  <div className="w-full h-full">
                    <TodoList
                      form={todoForm}
                      onChange={handleTodoChange}
                      onAdd={handleTodoAdd}
                      onCancelEdit={handleTodoCancelEdit}
                      isEditing={isEditingTodo}
                      list={todos}
                      handleDelete={handleTodoDelete}
                      onToggle={handleTodoToggle}
                      onEdit={handleTodoEdit}
                      setOpenTodo={setOpenTodoOverlay}
                    />
                  </div>
                </div>
              )}

              {/* 버튼박스 위 오버레이: 일정 */}
              {openScheduleOverlay && (
                <div className="absolute inset-0 z-20 overflow-auto">
                  <div className="w-full h-full">
                    <Scheduleform
                      form={form}
                      onChange={handleScheduleChange}
                      onAdd={handleScheduleAdd}
                      openAdminDashboard={false}
                      openSchedule={true}
                      setOpenSchedule={setOpenScheduleOverlay}
                      list={schedules}
                      handleDelete={handleScheduleDelete}
                      openAdminPage={false}
                    />
                  </div>
                </div>
              )}
            </section>

            {/* 우측 하단 콘텐츠 */}
            <section className="h-full rounded-2xl bg-[#101010] text-white border border-white/10 p-6 flex flex-col min-h-0 min-w-0">
              <div className="w-full h-full min-w-0 overflow-hidden">
                {mode === 'adminUsers' && <Admin data={adminData} />}
                {/* 유저목록 */}
                {mode === 'adminStatistics' && <AdminNew data={adminData} />} {/* 통계 */}
                {mode === 'summary' && <Chatbot />}
                {mode === 'five' && <FiveDayWeather />}
                {mode === 'fortune' && (
                  <div className="w-full h-full overflow-auto">
                    <TodayFortune />
                  </div>
                )}
                {mode === 'quiz' && (
                  <div
                    ref={quizWrapRef}
                    className="w-full h-full overflow-x-auto overflow-y-hidden flex items-center justify-center"
                  >
                    <div
                      style={{
                        width: `${QUIZ_BASE_WIDTH}px`,
                        transform: `scale(${quizScale})`,
                        transformOrigin: 'inline-block',
                      }}
                    >
                      <Quiz />
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
        <aside className="order-2 h-full rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden min-h-0 p-4">
          {/* 필요시 내용 채워 넣기 */}
        </aside>
      </main>
      <MyPage />
      <AdminMypage />
    </div>
  );
}
