export default function Checkbox({ label, className = '', ...props }) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
        {...props}
      />
      <span className="text-sm text-text">{label}</span>
    </label>
  );
}
