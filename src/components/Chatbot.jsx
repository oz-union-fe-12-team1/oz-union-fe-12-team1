import nyangBot from '/images/nyangbiseo-list-x.png';
import { useState, useEffect } from 'react';
import { dummySchedules } from '../api/dummySchedules';
import { dummyTodos } from '../api/dummyTodos';

export default function Chatbot() {
  const [schedules, setSchedules] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setSchedules(dummySchedules);
    setTodos(dummyTodos);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todaySchedules = schedules.filter((item) => item.date === today);

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo)),
    );
  };
  const sortedTodos = [
    ...todos.filter((t) => !t.is_completed),
    ...todos.filter((t) => t.is_completed),
  ];

  const hasData = todaySchedules.length > 0 || todos.length > 0;

  if (!hasData) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="bg-slate-200 px-6 py-4 rounded-2xl shadow relative max-w-sm mr-40">
          <p className="text-2xl font-semibold text-gray-800">일정/투두리스트가 없으신가요?</p>
          <p className="text-xl text-gray-600">새로 등록해주세요!</p>
          <div className="absolute right-[-12px] bottom-6 w-6 h-6 bg-slate-200 rotate-45"></div>
        </div>
        <img src={nyangBot} alt="냥비서" className="absolute bottom-0 right-0 w-72 h-72" />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 gap-12">
      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-2xl mb-6 text-center border-b-2 border-gray-300 pb-2 w-[70%]">
          오늘의 일정
        </h2>
        {todaySchedules.length > 0 ? (
          <ul className="text-lg text-gray-700 space-y-4 w-[70%] pl-6">
            {todaySchedules.map((item) => (
              <li key={item.id} className="flex flex-col">
                <span className="font-medium text-gray-800">
                  {item.date} {item.all_day ? '[종일]' : item.time}
                </span>
                <span className="text-gray-900">{item.title}</span>
                {item.memo && <span className="text-sm text-gray-500">{item.memo}</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center w-full">오늘 일정이 없습니다.</p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-2xl mb-6 text-center border-b-2 border-gray-300 pb-2 w-[70%]">
          오늘의 Todo
        </h2>
        {sortedTodos.length > 0 ? (
          <ul className="space-y-3 w-[70%]">
            {sortedTodos.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <input
                  id={`todo-${item.id}`}
                  type="checkbox"
                  checked={item.is_completed}
                  onChange={() => toggleTodo(item.id)}
                  className="w-5 h-5"
                />
                <label
                  htmlFor={`todo-${item.id}`}
                  className={`text-lg ${
                    item.is_completed ? 'line-through text-gray-400' : 'text-gray-700'
                  }`}
                >
                  {item.title}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">오늘 할 일이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
