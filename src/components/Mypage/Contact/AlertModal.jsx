import Modal from '../../ui/Modal';

export default function AlertModal({ open, title = '알림', onClose, children, footer }) {
  if (!open) return null;
  return (
    <Modal
      openModal={open}
      title={title}
      onClose={onClose}
      footer={
        footer ?? (
          <button type="button" className="btn" onClick={onClose}>
            확인
          </button>
        )
      }
    >
      {children}
    </Modal>
  );
}
