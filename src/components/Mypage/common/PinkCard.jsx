// src/components/Mypage/common/PinkCard.jsx
export default function PinkCard({ open, onClose, children }) {
  return (
    <div
      className={[
        //fixed 대신 absolute (부모 relative 필요!)
        'absolute inset-0 z-40 backdrop-blur-sm transition-all duration-300',
        open
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 translate-x-2 pointer-events-none',
      ].join(' ')}
      onClick={onClose}
    >
      <div
        className="
          h-full p-6 flex flex-col min-h-0
          rounded-lg  border-white/10
          bg-neutral-900 shadow-3d
        "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
