import { Check } from 'lucide-react';

export default function Stepper({ steps, current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition ${
            i < current ? 'bg-success text-white' :
            i === current ? 'bg-primary text-white' :
            'bg-border text-muted'
          }`}>
            {i < current ? <Check size={16} /> : i + 1}
          </div>
          <span className={`text-sm hidden sm:block ${i === current ? 'text-text font-medium' : 'text-muted'}`}>
            {step}
          </span>
          {i < steps.length - 1 && <div className="w-8 h-px bg-border" />}
        </div>
      ))}
    </div>
  );
}
