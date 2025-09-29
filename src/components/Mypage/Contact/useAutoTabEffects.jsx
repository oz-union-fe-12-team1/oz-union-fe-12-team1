import { useEffect } from 'react';

export default function useAutoTabEffects({
  open,
  adminOnlyReply,
  isAdmin,
  tab,
  setTab,
  filteredTickets,
  expandedId,
  setExpandedId,
}) {
  // adminOnlyReply 모드 강제 탭 고정
  useEffect(() => {
    if (open && adminOnlyReply && isAdmin) setTab('reply');
  }, [open, adminOnlyReply, isAdmin, setTab]);

  // 문의함/답변함 탭에서 자동 펼침
  useEffect(() => {
    if (!open) return;
    if (tab !== 'inbox' && tab !== 'reply') return;
    if (filteredTickets.length === 0) return;
    const exists = filteredTickets.some((t) => t.id === expandedId);
    if (!exists) setExpandedId(filteredTickets[0].id);
  }, [open, tab, filteredTickets, expandedId, setExpandedId]);
}
