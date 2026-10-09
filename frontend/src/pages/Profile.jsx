import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../controllers/AuthContext';
import { useProfile } from '../controllers/useProfile';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Card from '../components/Card';
import ConditionChips from '../components/ConditionChips';
import AllergyTagInput from '../components/AllergyTagInput';
import MedicationList from '../components/MedicationList';
import Checkbox from '../components/Checkbox';

const BLOOD_TYPES = [
  { value: '', label: 'اختر...' },
  { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
];

const GENDER_OPTIONS = [
  { value: '', label: 'اختر...' },
  { value: 'MALE', label: 'ذكر' },
  { value: 'FEMALE', label: 'أنثى' },
];

const DIABETES_OPTIONS = [
  { value: '', label: 'اختر النوع...' },
  { value: 'TYPE1', label: 'النوع الأول' },
  { value: 'TYPE2', label: 'النوع الثاني' },
  { value: 'GESTATIONAL', label: 'سكري حمل' },
];

export default function ProfilePage() {
  const { user, deleteAccount } = useAuth();
  const { profile, save } = useProfile();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState(() => profile || {
    age: '', gender: '', weightKg: '', bloodType: '', pregnant: null,
    conditions: [], diabetesType: '', otherConditions: '',
    allergies: [], medications: [],
    emergencyContact: { name: '', phone: '' },
  });

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const cleaned = { ...form, age: form.age ? Number(form.age) : null, weightKg: form.weightKg ? Number(form.weightKg) : null };
    save(cleaned);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleDelete() {
    if (confirm('هل أنت متأكد؟ سيتم حذف جميع بياناتك.')) {
      deleteAccount();
      navigate('/');
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10 animate-fade-up">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">الملف الصحي</h1>
        <p className="text-sm text-muted">حدّث بياناتك ليكون كل تقييم أدق</p>
      </div>
      <Card className="shadow-lift">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="العمر" type="number" value={form.age || ''} onChange={(e) => update('age', e.target.value)} />
            <Select label="الجنس" options={GENDER_OPTIONS} value={form.gender || ''} onChange={(e) => update('gender', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="الوزن (كغ)" type="number" value={form.weightKg || ''} onChange={(e) => update('weightKg', e.target.value)} />
            <Select label="فصيلة الدم" options={BLOOD_TYPES} value={form.bloodType || ''} onChange={(e) => update('bloodType', e.target.value)} />
          </div>
          {form.gender === 'FEMALE' && (
            <Checkbox label="حامل" checked={form.pregnant === true} onChange={(e) => update('pregnant', e.target.checked)} />
          )}

          <div>
            <label className="block text-sm font-medium text-text mb-2">الأمراض المزمنة</label>
            <ConditionChips selected={form.conditions || []} onChange={(v) => update('conditions', v)} />
          </div>

          {form.conditions?.includes('DIABETES') && (
            <Select label="نوع السكري" options={DIABETES_OPTIONS} value={form.diabetesType || ''} onChange={(e) => update('diabetesType', e.target.value)} />
          )}

          <Input label="أمراض أخرى" value={form.otherConditions || ''} onChange={(e) => update('otherConditions', e.target.value)} />

          <div>
            <label className="block text-sm font-medium text-text mb-2">الحساسيات</label>
            <AllergyTagInput allergies={form.allergies || []} onChange={(v) => update('allergies', v)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">الأدوية</label>
            <MedicationList medications={form.medications || []} onChange={(v) => update('medications', v)} />
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-bold mb-3">جهة اتصال للطوارئ</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input label="الاسم" value={form.emergencyContact?.name || ''} onChange={(e) => update('emergencyContact', { ...form.emergencyContact, name: e.target.value })} />
              <Input label="الهاتف" type="tel" value={form.emergencyContact?.phone || ''} onChange={(e) => update('emergencyContact', { ...form.emergencyContact, phone: e.target.value })} />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {saved ? 'تم الحفظ ✓' : 'حفظ التعديلات'}
          </Button>
        </form>
      </Card>

      <div className="mt-6 text-center">
        <button onClick={handleDelete} className="text-danger text-sm hover:underline">
          حذف بياناتي
        </button>
      </div>
    </div>
  );
}
