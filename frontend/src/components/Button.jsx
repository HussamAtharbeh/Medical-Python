const variants = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  danger: 'bg-danger text-white hover:bg-danger/90',
  outline: 'border border-border text-text hover:bg-primary-soft',
  ghost: 'text-muted hover:bg-primary-soft',
  emergency: 'bg-danger text-white hover:bg-danger/90 animate-pulse',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({ children, variant = 'primary', size = 'md', className = '', disabled, ...props }) {
  return (
    <button
      className={`rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
