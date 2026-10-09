export default function Select({ label, options, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-text mb-1">{label}</label>}
      <select
        className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition ${error ? 'border-danger' : 'border-border'}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  );
}
