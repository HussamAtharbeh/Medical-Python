import { Home, Clock, AlertTriangle, Phone } from 'lucide-react';

const DIRECTIONS = {
  SELF_CARE: { icon: Home, label: 'عناية منزلية', color: 'text-success', bg: 'bg-success-soft' },
  SEE_DOCTOR_24H: { icon: Clock, label: 'راجع طبيب خلال 24 ساعة', color: 'text-warning', bg: 'bg-warning-soft' },
  URGENT_CARE_NOW: { icon: AlertTriangle, label: 'راجع طوارئ الآن', color: 'text-danger', bg: 'bg-danger-soft' },
  EMERGENCY: { icon: Phone, label: 'اتصل بالإسعاف فوراً', color: 'text-danger', bg: 'bg-danger-soft' },
};

export default function CareDirection({ direction, reason }) {
  const config = DIRECTIONS[direction] || DIRECTIONS.SELF_CARE;
  const Icon = config.icon;

  return (
    <div className={`rounded-2xl p-4 shadow-soft ${config.bg}`}>
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="w-9 h-9 rounded-xl bg-white/60 grid place-items-center shrink-0">
          <Icon size={18} className={config.color} />
        </span>
        <span className={`font-bold ${config.color}`}>{config.label}</span>
      </div>
      {reason && <p className="text-sm text-text/80 leading-relaxed">{reason}</p>}
    </div>
  );
}
