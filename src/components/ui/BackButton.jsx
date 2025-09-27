import { X } from 'lucide-react';

export default function BackButton({ onClose }) {
  return (
    <button
      onClick={onClose}
      aria-label="닫기"
      className="p-2 rounded-md transition"
    >
      <X className="w-6 h-6 text-[#555] hover:text-[#888] " />
    </button>
  );
}
