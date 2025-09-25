// src/components/Mypage/common/PinkCard.jsx
export default function PinkCard({ open, onClose, children }) {
  return (
    <div
      className={[
        // 🔥 fixed 대신 absolute (부모 relative 필요!)
        'absolute right-6 top-23 bottom-6 z-20 transition-all duration-300 ',
        open
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 translate-x-2 pointer-events-none',
      ].join(' ')}
      onClick={onClose}
    >
      <div
        className="
          h-full p-6 flex flex-col min-h-0
          rounded-lg shadow-xl ring-1 ring-black/10 bg-blue-100 border-2
          w-[360px] max-w-[92vw] ml-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
