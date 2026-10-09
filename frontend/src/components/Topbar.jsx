import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, User, LogOut, Menu, X, Stethoscope } from 'lucide-react';
import { useAuth } from '../controllers/AuthContext';
import { useState, useEffect } from 'react';

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const linkClass = 'text-sm font-medium text-white/80 hover:text-white transition-colors';

  return (
    <header className="glass-dark sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center w-9 h-9 rounded-xl gradient-primary shadow-glow">
            <Stethoscope size={18} className="text-white" />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">MedicZero</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <a
            href="tel:911"
            className="flex items-center gap-1.5 bg-danger px-3.5 py-2 rounded-xl text-sm font-semibold text-white shadow-soft hover:brightness-110 transition"
          >
            <Phone size={14} />
            911
          </a>

          <button
            className="sm:hidden grid place-items-center w-10 h-10 rounded-xl text-white hover:bg-white/10 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className="hidden sm:flex items-center gap-5">
            {user ? (
              <>
                <Link to="/assess/new" className={linkClass}>تقييم جديد</Link>
                <Link to="/history" className={linkClass}>السجل</Link>
                <Link to="/profile" className={`${linkClass} flex items-center gap-1.5`}>
                  <User size={15} />
                  {user.fullName}
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="grid place-items-center w-9 h-9 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition"
                  aria-label="تسجيل خروج"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={linkClass}>دخول</Link>
                <Link to="/signup" className="text-sm font-semibold gradient-primary text-white px-4 py-2 rounded-xl shadow-glow hover:brightness-110 transition">
                  حساب جديد
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {menuOpen && (
        <nav className="sm:hidden glass-dark border-t border-white/10 px-4 py-3 flex flex-col animate-fade-up">
          {user ? (
            <>
              <Link to="/assess/new" className="text-sm text-white/90 py-3 border-b border-white/5">تقييم جديد</Link>
              <Link to="/history" className="text-sm text-white/90 py-3 border-b border-white/5">السجل</Link>
              <Link to="/profile" className="text-sm text-white/90 py-3 border-b border-white/5">الملف الصحي</Link>
              <button onClick={() => { logout(); navigate('/'); }} className="text-sm text-danger py-3 text-start font-medium">تسجيل خروج</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-white/90 py-3 border-b border-white/5">دخول</Link>
              <Link to="/signup" className="text-sm text-white font-semibold py-3">حساب جديد</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
