import { AlertTriangle, HelpCircle } from 'lucide-react';
import Card from './Card';

export default function QuestionCard({ question }) {
  if (!question) return null;

  return (
    <Card className="border-primary/30 shadow-lift">
      <div className="flex items-start gap-3">
        <span className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${question.isDanger ? 'bg-warning-soft' : 'bg-primary-soft'}`}>
          {question.isDanger ? (
            <AlertTriangle className="text-warning" size={20} />
          ) : (
            <HelpCircle className="text-primary" size={20} />
          )}
        </span>
        <div>
          <p className="text-base font-medium text-text">{question.text}</p>
          <p className="text-xs text-muted mt-1">{question.why}</p>
          {question.isExtra && (
            <span className="inline-block mt-2 text-xs bg-warning-soft text-warning px-2 py-0.5 rounded-full">
              سؤال إضافي للتأكد
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
