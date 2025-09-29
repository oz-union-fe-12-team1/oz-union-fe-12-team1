import { useState, useEffect, useMemo, useCallback } from 'react';

/**
 * useTicketFilter
 * - 검색/필터 상태 관리 (statusFilter, searchInput, searchQuery)
 * - 필터 계산 (filteredTickets)
 */
export default function useTicketFilter(tickets = []) {
  // 상태: 필터/검색
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | '처리중' | '완료'
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 적용 (엔터/버튼)
  const applySearch = useCallback(
    (forceValue) => {
      const nextQuery = typeof forceValue === 'string' ? forceValue : searchInput;
      setSearchQuery((nextQuery || '').trim());
    },
    [searchInput],
  );

  // 입력이 비워지면 즉시 쿼리도 비움
  useEffect(() => {
    if (searchInput.trim() === '') setSearchQuery('');
  }, [searchInput]);

  // 필터 계산 (메모이제이션)
  const filteredTickets = useMemo(() => {
    const normalizedQuery = (searchQuery || '').toLowerCase();

    return tickets.filter((ticket) => {
      const statusMatches = statusFilter === 'all' || ticket.status === statusFilter;

      if (!statusMatches) return false;
      if (!normalizedQuery) return true;

      const searchableText =
        `${ticket.title}\n${ticket.body}\n${ticket.answer ?? ''}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [tickets, statusFilter, searchQuery]);

  return {
    // 상태 & 액션
    statusFilter,
    setStatusFilter,
    searchInput,
    setSearchInput,
    searchQuery,
    applySearch,
    // 결과
    filteredTickets,
  };
}
