import Chip from './Chip';

const CONDITIONS = [
  { code: 'DIABETES', label: 'سكري' },
  { code: 'HYPERTENSION', label: 'ضغط دم مرتفع' },
  { code: 'HEART_DISEASE', label: 'أمراض قلب' },
  { code: 'ASTHMA', label: 'ربو' },
  { code: 'KIDNEY_DISEASE', label: 'أمراض كلى' },
  { code: 'LIVER_DISEASE', label: 'أمراض كبد' },
  { code: 'EPILEPSY', label: 'صرع' },
  { code: 'BLEEDING_DISORDER', label: 'اضطراب نزيف' },
  { code: 'THYROID', label: 'غدة درقية' },
  { code: 'IMMUNODEFICIENCY', label: 'نقص مناعة' },
];

export default function ConditionChips({ selected, onChange }) {
  function toggle(code) {
    if (selected.includes(code)) {
      onChange(selected.filter((c) => c !== code));
    } else {
      onChange([...selected, code]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {CONDITIONS.map((c) => (
        <Chip key={c.code} label={c.label} selected={selected.includes(c.code)} onClick={() => toggle(c.code)} />
      ))}
    </div>
  );
}
