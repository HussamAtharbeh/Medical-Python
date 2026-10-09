import { Phone, AlertTriangle } from 'lucide-react';
import Card from './Card';

export default function EmergencyCard({ emergency }) {
  if (!emergency) return null;

  return (
    <div className="space-y-4">
      <div className="bg-danger text-white rounded-xl p-5 text-center">
        <AlertTriangle className="mx-auto mb-2" size={40} />
        <h2 className="text-xl font-bold mb-2">{emergency.title}</h2>
        <a
          href="tel:911"
          className="inline-flex items-center gap-2 bg-white text-danger font-bold px-6 py-3 rounded-lg text-lg"
        >
          <Phone size={20} />
          اتصل 911
        </a>
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
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">
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
