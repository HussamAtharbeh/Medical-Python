import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../controllers/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!phone || !password) {
      setError('أدخل رقم الهاتف وكلمة المرور');
      return;
    }
    const ok = login(phone, password);
    if (ok) {
      navigate('/assess/new');
    } else {
      setError('رقم الهاتف أو كلمة المرور غير صحيحة');
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm shadow-lift animate-fade-up">
        <div className="w-14 h-14 rounded-2xl gradient-primary shadow-glow grid place-items-center mx-auto mb-4">
          <LogIn size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-1">مرحباً بعودتك</h1>
        <p className="text-sm text-muted text-center mb-6">سجّل دخولك لمتابعة تقييماتك</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="رقم الهاتف"
            type="tel"
            placeholder="07XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="كلمة المرور"
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-danger text-sm bg-danger-soft rounded-xl px-3 py-2.5 text-center">{error}</p>}
          <Button type="submit" className="w-full">دخول</Button>
        </form>
        <p className="text-sm text-muted text-center mt-4">
          ما عندك حساب؟{' '}
          <Link to="/signup" className="text-primary font-medium">سجّل الآن</Link>
        </p>
        <p className="text-xs text-placeholder text-center mt-3 bg-bg rounded-lg py-2">
          حساب تجريبي: 0790000000 / 123456
        </p>
      </Card>
    </div>
  );
}
