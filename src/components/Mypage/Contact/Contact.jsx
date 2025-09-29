// src/components/Mypage/Contact/Contact.jsx
import { useEffect, useState } from 'react';
import ContactModal from '../Contact/ContactModal';
import AskForm from '../Contact/AskForm';
import AlertModal from '../Contact/AlertModal';
import TicketList from '../Contact/TicketList';
import TicketToolbar from '../Contact/TicketToolbar';

import useTabsConfig from './useTabsConfig';
import useTicketFilter from './useTicketFilter';
import useAutoTabEffects from './useAutoTabEffects';
import useTicketActions from './useTicketActions';

export default function Contact({
  open,
  onClose,
  isAdmin = false,
  adminOnlyReply = false,
  initialTickets = [],
}) {
  const tabs = useTabsConfig({ isAdmin, adminOnlyReply });

  const {
    tickets,
    setTickets,
    submitAsk,
    startEdit,
    cancelEdit,
    saveEdit,
    submitReply,
    editingId,
    editTitle,
    setEditTitle,
    editBody,
    setEditBody,
    replyDrafts,
    setReplyDrafts,
    alert,
    setAlert,
  } = useTicketActions();

  useEffect(() => {
    if (initialTickets?.length) setTickets(initialTickets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [tab, setTab] = useState(adminOnlyReply && isAdmin ? 'reply' : 'ask');
  const [expandedId, setExpandedId] = useState(null);

  const {
    statusFilter,
    setStatusFilter,
    searchInput,
    setSearchInput,
    applySearch,
    filteredTickets,
  } = useTicketFilter(tickets);

  useAutoTabEffects({
    open,
    adminOnlyReply,
    isAdmin,
    tab,
    setTab,
    filteredTickets,
    expandedId,
    setExpandedId,
  });

  const handleChangeTab = (next) => {
    cancelEdit();
    setExpandedId(null);
    setSearchInput('');
    applySearch('');
    setTab(next);
  };

  const handleClose = () => {
    onClose?.();
    setTab(isAdmin ? 'reply' : 'ask');
    cancelEdit();
    setExpandedId(null);
    setSearchInput('');
    applySearch('');
  };

  // 문의 등록 후: inbox 전환 + 새 항목 자동 펼침
  const handleSubmitAsk = ({ title, body }) => {
    const newTicket = submitAsk({ title, body });
    setTab('inbox');
    if (newTicket && newTicket.id != null) {
      setExpandedId(newTicket.id);
    }
  };

  const renderToolbar = () => (
    <TicketToolbar
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      applySearch={applySearch}
    />
  );

  return (
    <ContactModal
      open={open}
      title="문의하기"
      onClose={handleClose}
      tabs={tabs}
      activeTab={tab}
      onChangeTab={handleChangeTab}
    >
      {tab === 'ask' && !adminOnlyReply && (
        <AskForm onCancel={handleClose} onSubmit={handleSubmitAsk} />
      )}

      {tab === 'inbox' && (
        <div className="flex flex-col">
          {renderToolbar()}
          <TicketList
            items={filteredTickets}
            isReplyTab={false}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            editingId={editingId}
            editTitle={editTitle}
            editBody={editBody}
            startEdit={startEdit}
            cancelEdit={cancelEdit}
            setEditTitle={setEditTitle}
            setEditBody={setEditBody}
            saveEdit={saveEdit}
          />
        </div>
      )}

      {tab === 'reply' && isAdmin && (
        <div className="flex flex-col">
          {renderToolbar()}
          <TicketList
            items={filteredTickets}
            isReplyTab
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            // 관리자는 문의 수정 비활성
            editingId={null}
            editTitle=""
            editBody=""
            startEdit={() => {}}
            cancelEdit={() => {}}
            setEditTitle={() => {}}
            setEditBody={() => {}}
            saveEdit={() => {}}
            // 답변 작성/등록
            replyDrafts={replyDrafts}
            setReplyDrafts={setReplyDrafts}
            submitReply={submitReply}
          />
        </div>
      )}

      <AlertModal
        open={alert.open}
        title={alert.title}
        onClose={() => setAlert((a) => ({ ...a, open: false }))}
      >
        <p className="mt-2 text-sm text-white">{alert.message}</p>
      </AlertModal>
    </ContactModal>
  );
}
