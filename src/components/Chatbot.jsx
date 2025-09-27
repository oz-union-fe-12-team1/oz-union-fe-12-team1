import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import { dummySchedules } from '../api/dummyData/dummySchedules';
import { dummyTodos } from '../api/dummyData/dummyTodos';

export default function Chatbot() {
  const [schedules, setSchedules] = useState(null);
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    setSchedules(dummySchedules);
    setTodos(dummyTodos);
  }, []);

  if (schedules === null || todos === null) {
    return null;
  }

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
        <div className=" px-6 py-4 rounded-2xl shadow relative max-w-sm mr-40">
          <p className="text-2xl font-semibold ">일정/투두리스트가 없으신가요?</p>
          <p className="text-xl text-gray-600">새로 등록해주세요!</p>
          <div className="absolute right-[-12px] bottom-6 w-6 h-6  rotate-45"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 gap-12  overflow-x-auto custom-scroll">
      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-2xl mb-6 text-center border-b-2 pb-2 w-[70%]">
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
                  className={`text-lg ${item.is_completed && 'line-through'}`}
                >
                  {item.title}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">오늘 할 일이 없습니다.</p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-2xl mb-6 text-center border-b-2 border-gray-300 pb-2 w-[70%]">
          오늘의 일정
        </h2>
        {todaySchedules.length > 0 ? (
          <ul className="text-lg space-y-4 w-[70%] pl-6">
            {todaySchedules.map((item) => (
              <li key={item.id} className="flex flex-col">
                <span className="font-medium">
                  {dayjs(item.date).format('YYYY-MM-DD HH:mm')} {item.all_day ? '[종일]' : ''}
                </span>
                <span className="font-semibold">{item.title}</span>
                {item.memo && <span className="text-sm">{item.memo}</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p className=" text-center w-full">오늘 일정이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
