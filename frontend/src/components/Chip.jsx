export default function Chip({ label, selected, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
        selected
          ? 'bg-primary text-white border-primary'
          : 'bg-surface text-text border-border hover:border-primary hover:text-primary'
      } ${className}`}
    >
      {label}
    </button>
  );
}
