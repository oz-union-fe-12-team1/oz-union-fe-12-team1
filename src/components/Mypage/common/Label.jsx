// src/components/Mypage/common/Label.jsx
export default function Label({ children, className = '' }) {
  return (
    <div className={`text-sm font-semibold  mt-2 ${className}`}>{children}</div>
  );
}
