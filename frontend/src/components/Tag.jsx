import { X } from 'lucide-react';

export default function Tag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-soft text-primary">
      {label}
      {onRemove && (
        <button type="button" onClick={onRemove} className="hover:text-danger transition">
          <X size={12} />
        </button>
      )}
    </span>
  );
}
