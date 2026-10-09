const LEVELS = {
  LOW: { label: 'منخفض', color: 'text-success', bg: 'bg-success-soft', bar: 'bg-success', width: '25%' },
  MEDIUM: { label: 'متوسط', color: 'text-warning', bg: 'bg-warning-soft', bar: 'bg-warning', width: '50%' },
  HIGH: { label: 'مرتفع', color: 'text-danger', bg: 'bg-danger-soft', bar: 'bg-danger', width: '75%' },
  EMERGENCY: { label: 'طوارئ', color: 'text-danger', bg: 'bg-danger-soft', bar: 'bg-danger', width: '100%' },
};

export default function RiskMeter({ level }) {
  const config = LEVELS[level] || LEVELS.LOW;

  return (
    <div className={`rounded-lg p-3 ${config.bg}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">مستوى الخطورة</span>
        <span className={`text-sm font-bold ${config.color}`}>{config.label}</span>
      </div>
      <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${config.bar}`} style={{ width: config.width }} />
      </div>
    </div>
  );
}
