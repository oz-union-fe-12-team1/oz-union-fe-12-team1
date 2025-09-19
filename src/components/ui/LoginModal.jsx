export default function LoginModal({
  openModal,
  title,
  children,
  onClose,
  footer,
}) {
  if (!openModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div //모달
        className="bg-white rounded-[0.7rem] shadow-lg w-[420px] p-11"
        onClick={(e) => e.stopPropagation()}
        //모달 부분은 이벤트를 막아서 모달 창을 누르더라도 종료 안 되게 함.
      >
        {/* 모달 제목 */}
        {title && (
          <h2 className="text-xl font-semibold text-black mb-6">{title}</h2>
        )}

        {/* 모달 본문 */}
        <div className="text-gray-800">{children}</div>

        {/* 확인/취소 버튼 부분 */}
        {footer && <div>{footer}</div>}
      </div>
    </div>
  );
}
