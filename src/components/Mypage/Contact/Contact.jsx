// src/components/Mypage/Contact/Contact.jsx
import { useEffect, useState } from 'react';
import ContactModal from '../Contact/ContactModal';
import AskForm from '../Contact/AskForm';
import Modal from '../../ui/Modal';
import TicketToolbar from '../Contact/TicketToolbar';

import useTabsConfig from './useTabsConfig';
import useTicketFilter from './useTicketFilter';
import useAutoTabEffects from './useAutoTabEffects';
import useTicketActions from './useTicketActions';
import TicketCard from './TicketCard';

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

  const renderTicketList = (isReplyTab) => (
    <div className="flex flex-col">
      {renderToolbar()}
      {filteredTickets.length === 0 ? (
        <div className="text-sm text-neutral-400">해당 조건의 문의가 없습니다.</div>
      ) : (
        <div className="space-y-2">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              isReplyTab={isReplyTab}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              editingId={isReplyTab ? null : editingId}
              editTitle={isReplyTab ? '' : editTitle}
              editBody={isReplyTab ? '' : editBody}
              startEdit={isReplyTab ? () => {} : startEdit}
              cancelEdit={isReplyTab ? () => {} : cancelEdit}
              setEditTitle={isReplyTab ? () => {} : setEditTitle}
              setEditBody={isReplyTab ? () => {} : setEditBody}
              saveEdit={isReplyTab ? () => {} : saveEdit}
              replyDrafts={replyDrafts}
              setReplyDrafts={setReplyDrafts}
              submitReply={submitReply}
            />
          ))}
        </div>
      )}
    </div>
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

      {tab === 'inbox' && renderTicketList(false)}

      {tab === 'reply' && isAdmin && renderTicketList(true)}

      <Modal
        openModal={alert.open}
        title={alert.title || '알림'}
        onClose={() => setAlert((a) => ({ ...a, open: false }))}
        footer={
          <button
            type="button"
            className="btn"
            onClick={() => setAlert((a) => ({ ...a, open: false }))}
          >
            확인
          </button>
        }
      >
        <p className="mt-2 text-sm text-white">{alert.message}</p>
      </Modal>
    </ContactModal>
  );
}
