const variants = {
  primary: 'gradient-primary text-white shadow-glow hover:brightness-110',
  danger: 'bg-danger text-white shadow-soft hover:brightness-110',
  outline: 'border border-border bg-surface text-text hover:border-primary hover:bg-primary-soft',
  ghost: 'text-muted hover:bg-primary-soft hover:text-primary',
  emergency: 'bg-danger text-white shadow-soft animate-pulse hover:brightness-110',
};

const sizes = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export default function Button({ children, variant = 'primary', size = 'md', className = '', disabled, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-200 active:scale-[0.97] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
