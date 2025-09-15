export default function Modal ({
  openModal,
  title, 
  children,
  onClose,
  footer
}) {
  if(!openModal) return null;

  return (
    <div //모달 뒤 배경화면 (모달과 배경화면으로 나눠서=> 배경화면 클릭 시 모달 종료되게 하고 / 모달 부분 클릭시 종료 안 되게 하기 위함.)
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div //모달
        className="bg-white rounded-[0.7rem] shadow-lg w-full p-5"
        onClick={(e)=> e.stopPropagation()} 
        //모달 부분은 이벤트를 막아서 모달 창을 누르더라도 종료 안 되게 함. 
      >
        {/* 모달 제목 */}
        {title && (
          <h2 className="text-xl font-semibold text-black">
            {title}
          </h2>
        )}

        {/* 모달 본문 */}
        <div className="text-gray-800">{children}</div>

        {/* 확인/취소 버튼 부분 */}
        {footer && (
          <div className="flex justify-end">{footer}</div>
        )}

      </div>
    </div>

  )
}