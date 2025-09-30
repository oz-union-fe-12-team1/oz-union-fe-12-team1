import { useMemo } from 'react';

export default function useTabsConfig({ isAdmin, adminOnlyReply }) {
  return useMemo(() => {
    if (adminOnlyReply) return [{ key: 'reply', label: '답변함' }];
    const base = [
      { key: 'ask', label: '문의하기' },
      { key: 'inbox', label: '문의함' },
    ];
    return isAdmin ? [...base, { key: 'reply', label: '답변함' }] : base;
  }, [isAdmin, adminOnlyReply]);
}
