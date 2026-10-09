import { AlertTriangle, HelpCircle } from 'lucide-react';
import Card from './Card';

export default function QuestionCard({ question }) {
  if (!question) return null;

  return (
    <Card className="border-primary/30">
      <div className="flex items-start gap-3">
        {question.isDanger ? (
          <AlertTriangle className="text-warning mt-0.5 shrink-0" size={20} />
        ) : (
          <HelpCircle className="text-primary mt-0.5 shrink-0" size={20} />
        )}
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
