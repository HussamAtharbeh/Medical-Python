export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-semibold text-text mb-1.5">{label}</label>}
      <input
        className={`w-full px-4 py-3 rounded-xl border text-sm bg-surface placeholder:text-placeholder focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary transition-all duration-200 ${error ? 'border-danger' : 'border-border'}`}
        {...props}
      />
      {error && <p className="text-danger text-xs mt-1.5">{error}</p>}
    </div>
  );
}
