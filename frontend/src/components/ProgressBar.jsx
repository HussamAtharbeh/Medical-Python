export default function ProgressBar({ value, max = 1, label, className = '' }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className={className}>
      {label && <div className="flex justify-between text-xs text-muted mb-1">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>}
      <div className="w-full h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
