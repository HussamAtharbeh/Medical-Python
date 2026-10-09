import Card from './Card';

export default function FirstAidSteps({ steps }) {
  if (!steps?.length) return null;

  return (
    <Card>
      <h3 className="font-bold text-text mb-3">خطوات الإسعاف الأولي</h3>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-7 h-7 rounded-full gradient-primary text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 shadow-glow">
              {i + 1}
            </span>
            <div>
              <p className="text-sm text-text">{step.text}</p>
              {step.duration && <p className="text-xs text-muted mt-0.5">{step.duration}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
