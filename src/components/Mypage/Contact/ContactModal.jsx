import ModalPortal from '../common/ModalPortal';

export default function ContactModal({
  open,
  title = '문의하기',
  onClose,
  tabs = [], // [{key, label}]
  activeTab,
  onChangeTab,
  children,
}) {
  if (!open) return null;
  return (
    <ModalPortal>
      <div className="fixed inset-0 z-40 bg-black/50">
        <div className="flex justify-center items-center w-full h-full">
          <div className="bg-neutral-900 rounded-lg shadow-lg w-[80%] h-[90%] p-5 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <button className="text-xl text-neutral-300" onClick={onClose}>
                ✕
              </button>
            </div>

            {/* Tabs */}
            {tabs.length > 0 && (
              <div className="mb-3 border-b border-white/20 flex gap-2">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    className={`px-3 py-2 text-sm transition-colors ${
                      activeTab === t.key
                        ? 'border-b-2 border-white text-white font-semibold'
                        : 'text-white/60'
                    }`}
                    onClick={() => onChangeTab?.(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            {/* Body */}
            <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
