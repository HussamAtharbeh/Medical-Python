import { Link } from 'react-router-dom';
import { useAuth } from '../controllers/AuthContext';
import * as assessmentModel from '../models/assessmentModel';
import { Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Card from '../components/Card';

const STATUS_CONFIG = {
  COMPLETED: { icon: CheckCircle, color: 'text-success', label: 'مكتمل' },
  EMERGENCY: { icon: AlertTriangle, color: 'text-danger', label: 'طوارئ' },
  QUESTIONING: { icon: Clock, color: 'text-primary', label: 'قيد التقييم' },
  FAILED: { icon: XCircle, color: 'text-muted', label: 'فشل' },
};

export default function History() {
  const { user } = useAuth();
  const list = assessmentModel.listByUser(user?.id);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">سجل التقييمات</h1>

      {list.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-muted mb-3">ما في تقييمات سابقة</p>
          <Link to="/assess/new" className="text-primary text-sm font-medium">ابدأ تقييم جديد</Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {list.map((a) => {
            const config = STATUS_CONFIG[a.status] || STATUS_CONFIG.FAILED;
            const Icon = config.icon;
            return (
              <Link key={a.id} to={`/assess/${a.id}`}>
                <Card className="hover:border-primary transition cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{a.caseLabel || a.text?.slice(0, 60) || 'تقييم بالصورة'}</p>
                      <p className="text-xs text-muted mt-1">
                        {new Date(a.createdAt).toLocaleDateString('ar-JO', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${config.color}`}>
                      <Icon size={14} />
                      {config.label}
                    </div>
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
