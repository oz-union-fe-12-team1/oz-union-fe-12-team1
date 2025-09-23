// src/store/useTicketsStore.js
import { create } from 'zustand';

const initialTickets = [
  {
    id: 1,
    status: '처리중',
    title: '로그인 문제가 있어요',
    time: '2025-09-10 14:22',
    body: '비밀번호 변경이 안됩니다.',
  },
  {
    id: 2,
    status: '완료',
    title: '생년월일 수정 요청',
    time: '2025-09-08 09:12',
    body: '형식 오류 경고가 나옵니다.',
    answer: '요청하신 생년월일 수정이 완료되었습니다. 다시 확인 부탁드립니다.',
  },
];

export const useTicketsStore = create((set) => ({
  tickets: initialTickets,
  setTickets: (updater) =>
    set((state) => ({
      tickets: typeof updater === 'function' ? updater(state.tickets) : updater,
    })),
}));
