import { useState, useEffect } from 'react';
import News from './components/News';
import Button from './components/ui/Button';
import { useOpenMyPage } from './store/useOpenMyPage';
import MyPage from './components/Mypage/Mypage';
import AdminMypage from './components/adminPage/AdminMypage';
import { useOpenAdminPage } from './store/useOpenAdminPage';
import { useOpenAdminDashboard } from './store/useOpenAdminDashboard';
import Scheduleform from './components/layout/Scheduleform';
import Admin from './components/adminPage/Admin';
import TodayWeather from './components/weather/TodayWeather';
import FiveDayWeather from './components/weather/FiveDayWeather';
import TodayFortune from './components/TodayFortune';
import Todo from './components/layout/Todo';

export default function MainPage() {
  const { setOpenMyPage } = useOpenMyPage();
  const { openAdminPage, setOpenAdminPage } = useOpenAdminPage();
  const { openAdminDashboard } = useOpenAdminDashboard();
  const { pageMode, setPageMode } = useMainPage();

  const [openSchedule, setOpenSchedule] = useState(false);
  const [openTodo, setOpenTodo] = useState(false);
  const [form, setForm] = useState({
    date: '',
    time: '',
    title: '',
    memo: '',
  });
  const [list, setList] = useState([]);
  const [todoForm, setTodoForm] = useState({
    title: '',
    memo: '',
  });
  const [todoList, setTodoList] = useState([
    { id: 1, title: "React 공부하기", completed: false },
    { id: 2, title: "프로젝트 완성하기", completed: true },
    { id: 3, title: "운동하기", completed: false }
  ]);
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newSchedule = { id: Date.now(), ...form };
    setList((prev) => [...prev, newSchedule]);
    setForm({ date: '', time: '', title: '', memo: '' });
  };

  const handleDelete = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };
  const handleTodoChange = (e) => {
    const { name, value } = e.target;
    setTodoForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTodoAdd = (e) => {
    e.preventDefault();
    if (!todoForm.title.trim()) return;

    if (isEditingTodo) {
      setTodoList((prev) => 
        prev.map((item) => 
          item.id === editingTodoId 
            ? { ...item, ...todoForm }
            : item
        )
      );
      setIsEditingTodo(false);
      setEditingTodoId(null);
    } else {
      const newTodo = { 
        id: Date.now(), 
        ...todoForm, 
        completed: false 
      };
      setTodoList((prev) => [...prev, newTodo]);
    }
    
    setTodoForm({ title: '', memo: '' });
  };

  const handleTodoDelete = (id) => {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
    if (editingTodoId === id) {
      setIsEditingTodo(false);
      setEditingTodoId(null);
      setTodoForm({ title: '', memo: '' });
    }
  };

  const handleTodoToggle = (id) => {
    setTodoList((prev) => 
      prev.map((item) => 
        item.id === id 
          ? { ...item, completed: !item.completed }
          : item
      )
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

  // const [view, setView] = useState('main');

  useEffect(() => {
    console.log(openAdminDashboard);
  }, [openAdminDashboard]);

  let content;
  if (openAdminPage && openAdminDashboard) {
    content = <Admin />;
  } else if (view === 'five') {
    content = <FiveDayWeather />;
  } else if (view === 'fortune') {
    content = <TodayFortune />;
  } else {
    content = <span className="text-xl">메인</span>;
  }

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
        <div className="grid h-full grid-cols-[3fr_1fr] gap-4">
          <div className="grid grid-rows-[1fr_2fr] gap-4">
            <div className="grid grid-cols-[2fr_1fr] gap-4">
              <div className="bg-white rounded-lg p-6 flex flex-col">
                <News />
              </div>
              <div className="flex items-center justify-center rounded-lg bg-white p-6">
                <TodayWeather />
              </div>
            </div>

            <div className="flex items-center justify-center rounded-lg bg-white p-6">
              {content}
            </div>
          </div>

          <div className="relative flex flex-col gap-5 bg-blue-600 rounded-lg p-6 items-center justify-start">
            {!openSchedule && !openTodo ? (
              <span className="text-lg font-medium text-white flex flex-col gap-4 w-full">
                <Button 
                  size="lg" 
                  variant="common"
                  onClick={() => setOpenTodo(true)}
                >
                  Todo List
                </Button>
                <Button
                  size="lg"
                  variant="common"
                  onClick={() => setOpenSchedule(true)}
                >
                  일정 리스트
                </Button>
                <Button size="lg" variant="common">
                  5일 날씨
                </Button>
                <Button size="lg" variant="common" onClick={() => setPageMode('fortune')}>
                  오늘의 운세
                </Button>
                <Button size="lg" variant="common">
                  QUIZ
                </Button>
                <Button size="lg" variant="common">
                  푸쉬 설정
                </Button>
              </span>
            ) : openTodo ? (
              <div className="w-full mt-6">
                <Todo
                  form={todoForm}
                  onChange={handleTodoChange}
                  onAdd={handleTodoAdd}
                  onCancelEdit={handleTodoCancelEdit}
                  isEditing={isEditingTodo}
                  list={todoList}
                  handleDelete={handleTodoDelete}
                  onToggle={handleTodoToggle}
                  onEdit={handleTodoEdit}
                  setOpenTodo={setOpenTodo}
                />
              </div>
            ) : openSchedule ? (
              <div className="w-full mt-6">
                <Scheduleform
                  form={form}
                  onChange={handleChange}
                  onAdd={handleAdd}
                  openAdminDashboard={openAdminDashboard}
                  openSchedule={openSchedule}
                  setOpenSchedule={setOpenSchedule}
                  list={list}
                  handleDelete={handleDelete}
                  openAdminPage={openAdminPage}
                />
              </div>
            ) : null}

            <MyPage />
            <AdminMypage />
          </div>
        </div>
      </main>
    </div>
  );
}