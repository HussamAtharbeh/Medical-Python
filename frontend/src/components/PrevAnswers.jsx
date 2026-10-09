import { CheckCircle, HelpCircle } from 'lucide-react';

export default function PrevAnswers({ turns }) {
  if (!turns?.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted font-medium">الأسئلة السابقة</p>
      {turns.map((turn, i) => (
        <div key={i} className="flex items-start gap-2 text-sm bg-surface rounded-lg border border-border p-3">
          {turn.unsure ? (
            <HelpCircle size={14} className="text-warning mt-0.5 shrink-0" />
          ) : (
            <CheckCircle size={14} className="text-success mt-0.5 shrink-0" />
          )}
          <div>
            <p className="text-muted text-xs">{turn.question}</p>
            <p className="text-text mt-0.5">{turn.unsure ? 'مش متأكد' : turn.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
