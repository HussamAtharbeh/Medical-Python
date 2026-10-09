import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Checkbox from './Checkbox';

export default function MedicationList({ medications, onChange }) {
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [frequency, setFrequency] = useState('');
  const [isAnticoagulant, setIsAnticoagulant] = useState(false);

  function add() {
    if (!name.trim()) return;
    onChange([...medications, {
      name: name.trim(),
      dose: dose.trim(),
      frequency: frequency.trim(),
      isAnticoagulant,
    }]);
    setName('');
    setDose('');
    setFrequency('');
    setIsAnticoagulant(false);
  }

  function remove(idx) {
    onChange(medications.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-3">
      {medications.length > 0 && (
        <div className="space-y-2">
          {medications.map((med, i) => (
            <div key={i} className="flex items-center gap-2 bg-surface border border-border rounded-lg p-2.5 text-sm">
              <div className="flex-1">
                <span className="font-medium">{med.name}</span>
                {med.dose && <span className="text-muted mr-1"> — {med.dose}</span>}
                {med.frequency && <span className="text-muted"> ({med.frequency})</span>}
                {med.isAnticoagulant && (
                  <span className="inline-block mr-2 text-xs bg-danger-soft text-danger px-1.5 py-0.5 rounded">مميّع دم</span>
                )}
              </div>
              <button type="button" onClick={() => remove(i)} className="text-danger hover:text-danger/70">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسم الدواء"
          className="px-3 py-2 rounded-lg border border-border text-sm bg-surface placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          placeholder="الجرعة"
          className="px-3 py-2 rounded-lg border border-border text-sm bg-surface placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          placeholder="عدد المرات"
          className="px-3 py-2 rounded-lg border border-border text-sm bg-surface placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="مميّع دم (مثل وارفارين، أسبرين)"
          checked={isAnticoagulant}
          onChange={(e) => setIsAnticoagulant(e.target.checked)}
        />
        <button type="button" onClick={add} disabled={!name.trim()} className="flex items-center gap-1 text-primary text-sm font-medium disabled:opacity-50">
          <Plus size={14} />
          أضف
        </button>
      </div>
    </div>
  );
}
