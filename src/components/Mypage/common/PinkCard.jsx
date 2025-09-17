// src/components/Mypage/common/PinkCard.jsx
export default function PinkCard({ open, onClose, children }) {
  return (
    <div
      // 백드롭: 클릭 시 닫기
      className={[
        'absolute inset-0 z-20 bg-pink-300/90 transition-all duration-300',
        open ? 'opacity-100 translate-x-0 pointer-events-auto'
             : 'opacity-0 translate-x-2 pointer-events-none',
      ].join(' ')}
      onClick={onClose}
    >
      <div
        // 실제 카드: 여기서 클릭 버블링 차단!
        className="h-full p-6 flex flex-col min-h-0 rounded-lg shadow-xl ring-1 ring-black/10 bg-pink-300"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

