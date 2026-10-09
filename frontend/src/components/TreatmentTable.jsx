import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Card from './Card';

const ICONS = {
  suitable: { icon: CheckCircle, color: 'text-success' },
  not_suitable: { icon: XCircle, color: 'text-danger' },
  consult_doctor: { icon: AlertCircle, color: 'text-warning' },
};

export default function TreatmentTable({ treatments }) {
  if (!treatments?.length) return null;

  return (
    <Card>
      <h3 className="font-bold text-text mb-3">العلاجات</h3>
      <div className="space-y-3">
        {treatments.map((t) => {
          const config = ICONS[t.suitability] || ICONS.suitable;
          const Icon = config.icon;
          return (
            <div key={t.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
              <Icon size={18} className={`${config.color} mt-0.5 shrink-0`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-xs text-muted">{t.purpose}</span>
                </div>
                <p className="text-xs text-muted mt-0.5">{t.usage}</p>
                {t.reason && <p className="text-xs text-danger mt-0.5">{t.reason}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
