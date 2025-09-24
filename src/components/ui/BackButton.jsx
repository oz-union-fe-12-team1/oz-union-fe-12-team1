import { X } from 'lucide-react';

export default function BackButton({ onClose }) {
  return (
    <button
      onClick={onClose}
      aria-label="닫기"
      className="p-2 hover:bg-slate-200 rounded-md transition"
    >
      <X className="w-6 h-6 text-slate-700" />
    </button>
  );
}
