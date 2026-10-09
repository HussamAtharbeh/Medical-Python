import { AlertTriangle, Info, AlertCircle, ShieldAlert } from 'lucide-react';
import Card from './Card';

const SEVERITY_CONFIG = {
  info: { icon: Info, color: 'text-primary' },
  affects: { icon: AlertCircle, color: 'text-warning' },
  important: { icon: AlertTriangle, color: 'text-danger' },
  allergy: { icon: ShieldAlert, color: 'text-danger' },
};

export default function ProfileFactorsCard({ factors }) {
  if (!factors?.length) return null;

  return (
    <Card>
      <h3 className="font-bold text-text mb-3">تأثير ملفك الصحي</h3>
      <div className="space-y-2">
        {factors.map((f, i) => {
          const config = SEVERITY_CONFIG[f.severity] || SEVERITY_CONFIG.info;
          const Icon = config.icon;
          return (
            <div key={i} className="flex items-start gap-2">
              <Icon size={16} className={`${config.color} mt-0.5 shrink-0`} />
              <div>
                <span className="text-sm font-medium">{f.label}</span>
                <p className="text-xs text-muted">{f.effect}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
