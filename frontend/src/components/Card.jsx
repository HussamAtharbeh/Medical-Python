export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-surface rounded-2xl border border-border/80 p-5 sm:p-6 shadow-soft ${className}`} {...props}>
      {children}
    </div>
  );
}
