import { Link, useNavigate } from 'react-router-dom';
import { Phone, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../controllers/AuthContext';
import { useState } from 'react';

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-navy text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold tracking-tight">
          MedicZero
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="tel:911"
            className="flex items-center gap-1.5 bg-danger px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-danger/90 transition"
          >
            <Phone size={14} />
            911
          </a>

          <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className="hidden sm:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/assess/new" className="text-sm hover:text-primary-soft transition">تقييم جديد</Link>
                <Link to="/history" className="text-sm hover:text-primary-soft transition">السجل</Link>
                <Link to="/profile" className="text-sm hover:text-primary-soft transition flex items-center gap-1">
                  <User size={14} />
                  {user.fullName}
                </Link>
                <button onClick={() => { logout(); navigate('/'); }} className="text-sm hover:text-primary-soft transition">
                  <LogOut size={14} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm hover:text-primary-soft transition">دخول</Link>
                <Link to="/signup" className="text-sm bg-primary px-3 py-1.5 rounded-lg hover:bg-primary/80 transition">حساب جديد</Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {menuOpen && (
        <nav className="sm:hidden bg-navy border-t border-white/10 px-4 pb-3 flex flex-col gap-2">
          {user ? (
            <>
              <Link to="/assess/new" onClick={() => setMenuOpen(false)} className="text-sm py-2">تقييم جديد</Link>
              <Link to="/history" onClick={() => setMenuOpen(false)} className="text-sm py-2">السجل</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-sm py-2">الملف الصحي</Link>
              <button onClick={() => { logout(); navigate('/'); setMenuOpen(false); }} className="text-sm py-2 text-start">تسجيل خروج</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm py-2">دخول</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="text-sm py-2">حساب جديد</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
