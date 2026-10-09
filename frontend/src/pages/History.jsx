import { Link } from 'react-router-dom';
import { useAuth } from '../controllers/AuthContext';
import * as assessmentModel from '../models/assessmentModel';
import { Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Card from '../components/Card';

const STATUS_CONFIG = {
  COMPLETED: { icon: CheckCircle, color: 'text-success', bg: 'bg-success-soft', label: 'مكتمل' },
  EMERGENCY: { icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger-soft', label: 'طوارئ' },
  QUESTIONING: { icon: Clock, color: 'text-primary', bg: 'bg-primary-soft', label: 'قيد التقييم' },
  FAILED: { icon: XCircle, color: 'text-muted', bg: 'bg-bg', label: 'فشل' },
};

export default function History() {
  const { user } = useAuth();
  const list = assessmentModel.listByUser(user?.id);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-up">
      <h1 className="text-2xl font-bold mb-6">سجل التقييمات</h1>

      {list.length === 0 ? (
        <Card className="text-center py-12 shadow-lift">
          <p className="text-muted mb-3">ما في تقييمات سابقة</p>
          <Link to="/assess/new" className="text-primary text-sm font-semibold">ابدأ تقييم جديد</Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {list.map((a) => {
            const config = STATUS_CONFIG[a.status] || STATUS_CONFIG.FAILED;
            const Icon = config.icon;
            return (
              <Link key={a.id} to={`/assess/${a.id}`}>
                <Card className="hover-lift hover:border-primary/40 cursor-pointer">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{a.caseLabel || a.text?.slice(0, 60) || 'تقييم بالصورة'}</p>
                      <p className="text-xs text-muted mt-1">
                        {new Date(a.createdAt).toLocaleDateString('ar-JO', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full shrink-0 ${config.bg} ${config.color}`}>
                      <Icon size={13} />
                      {config.label}
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
