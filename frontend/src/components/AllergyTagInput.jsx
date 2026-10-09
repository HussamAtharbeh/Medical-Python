import { useState } from 'react';
import { Plus } from 'lucide-react';
import Tag from './Tag';

export default function AllergyTagInput({ allergies, onChange }) {
  const [input, setInput] = useState('');

  function add() {
    const val = input.trim();
    if (!val || allergies.includes(val)) return;
    onChange([...allergies, val]);
    setInput('');
  }

  function remove(idx) {
    onChange(allergies.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="أضف حساسية..."
          className="flex-1 px-3 py-2 rounded-lg border border-border text-sm bg-surface placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button type="button" onClick={add} className="px-3 py-2 bg-primary text-white rounded-lg text-sm">
          <Plus size={16} />
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {allergies.map((a, i) => (
          <Tag key={i} label={a} onRemove={() => remove(i)} />
        ))}
      </div>
    </div>
  );
}
