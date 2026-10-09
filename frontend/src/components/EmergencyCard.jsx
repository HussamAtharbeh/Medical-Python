import { Phone, AlertTriangle } from 'lucide-react';
import Card from './Card';

export default function EmergencyCard({ emergency }) {
  if (!emergency) return null;

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden bg-danger text-white rounded-3xl p-6 sm:p-8 text-center shadow-lift">
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-white/15 grid place-items-center mx-auto mb-3">
            <AlertTriangle size={34} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">{emergency.title}</h2>
          <a
            href="tel:911"
            className="inline-flex items-center gap-2 bg-white text-danger font-bold px-7 py-3.5 rounded-2xl text-lg shadow-soft hover:scale-[1.03] active:scale-[0.98] transition-transform"
          >
            <Phone size={20} />
            اتصل 911
          </a>
        </div>
      </div>

      {emergency.reasons?.length > 0 && (
        <Card className="border-danger/30">
          <h3 className="font-bold text-danger mb-2">الأسباب</h3>
          <ul className="space-y-1">
            {emergency.reasons.map((r, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="text-danger mt-1">•</span>
                {r}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {emergency.untilHelp?.length > 0 && (
        <Card>
          <h3 className="font-bold text-text mb-2">لحد ما يوصل الإسعاف</h3>
          <ol className="space-y-2">
            {emergency.untilHelp.map((step, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="w-5 h-5 rounded-full gradient-primary text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Card>
      )}

      {emergency.avoid?.length > 0 && (
        <Card className="border-danger/30">
          <h3 className="font-bold text-danger mb-2">تجنّب</h3>
          <ul className="space-y-1">
            {emergency.avoid.map((a, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="text-danger mt-1">✕</span>
                {a}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
