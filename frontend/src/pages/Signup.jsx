import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../controllers/AuthContext';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import ConditionChips from '../components/ConditionChips';
import AllergyTagInput from '../components/AllergyTagInput';
import MedicationList from '../components/MedicationList';
import Checkbox from '../components/Checkbox';
import ai from '../services/ai';
import * as profileModel from '../models/profileModel';

const STEPS = ['الحساب', 'الملف الصحي', 'مراجعة'];

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

export default function Signup() {
  const { signup, user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const [account, setAccount] = useState({ fullName: '', phone: '', password: '' });
  const [profile, setProfile] = useState({
    age: '', gender: '', weightKg: '', bloodType: '', pregnant: null,
    conditions: [], diabetesType: '', otherConditions: '',
    allergies: [], medications: [],
    emergencyContact: { name: '', phone: '' },
  });

  function handleAccountSubmit(e) {
    e.preventDefault();
    setError('');
    if (!account.fullName || !account.phone || !account.password) {
      setError('جميع الحقول مطلوبة');
      return;
    }
    const result = signup(account);
    if (!result) {
      setError('رقم الهاتف مسجل مسبقاً');
      return;
    }
    setStep(1);
  }

  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const draft = await ai.extractProfile(file);
      setProfile((prev) => ({
        ...prev,
        age: draft.age || prev.age,
        gender: draft.gender || prev.gender,
        conditions: draft.conditions || prev.conditions,
        diabetesType: draft.diabetesType || prev.diabetesType,
        allergies: draft.allergies || prev.allergies,
        medications: draft.medications || prev.medications,
      }));
    } catch {
      setError('فشل في قراءة الملف');
    } finally {
      setUploading(false);
    }
  }

  function handleProfileSubmit(e) {
    e.preventDefault();
    setStep(2);
  }

  function handleFinish() {
    if (!user) return;
    const cleaned = {
      ...profile,
      age: profile.age ? Number(profile.age) : null,
      weightKg: profile.weightKg ? Number(profile.weightKg) : null,
    };
    profileModel.save(user.id, cleaned);
    navigate('/assess/new');
  }

  function updateProfile(key, value) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  const conditionLabels = {
    DIABETES: 'سكري', HYPERTENSION: 'ضغط دم', HEART_DISEASE: 'قلب', ASTHMA: 'ربو',
    KIDNEY_DISEASE: 'كلى', LIVER_DISEASE: 'كبد', EPILEPSY: 'صرع', BLEEDING_DISORDER: 'نزيف',
    THYROID: 'غدة درقية', IMMUNODEFICIENCY: 'نقص مناعة',
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <Stepper steps={STEPS} current={step} />

      {step === 0 && (
        <Card>
          <h2 className="text-lg font-bold mb-4">إنشاء حساب</h2>
          <form onSubmit={handleAccountSubmit} className="space-y-4">
            <Input label="الاسم الكامل" value={account.fullName} onChange={(e) => setAccount({ ...account, fullName: e.target.value })} placeholder="أدخل اسمك" />
            <Input label="رقم الهاتف" type="tel" value={account.phone} onChange={(e) => setAccount({ ...account, phone: e.target.value })} placeholder="07XXXXXXXX" />
            <Input label="كلمة المرور" type="password" value={account.password} onChange={(e) => setAccount({ ...account, password: e.target.value })} placeholder="6 أحرف على الأقل" />
            {error && <p className="text-danger text-sm">{error}</p>}
            <Button type="submit" className="w-full">التالي</Button>
          </form>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <h2 className="text-lg font-bold mb-4">الملف الصحي</h2>

          <div className="mb-4 p-3 bg-primary-soft rounded-lg">
            <label className="text-sm font-medium text-primary cursor-pointer">
              {uploading ? 'جاري القراءة...' : 'رفع ملف طبي لتعبئة تلقائية'}
              <input type="file" accept=".pdf,image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
            </label>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="العمر" type="number" value={profile.age} onChange={(e) => updateProfile('age', e.target.value)} placeholder="45" />
              <Select label="الجنس" options={GENDER_OPTIONS} value={profile.gender} onChange={(e) => updateProfile('gender', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="الوزن (كغ)" type="number" value={profile.weightKg} onChange={(e) => updateProfile('weightKg', e.target.value)} placeholder="82" />
              <Select label="فصيلة الدم" options={BLOOD_TYPES} value={profile.bloodType} onChange={(e) => updateProfile('bloodType', e.target.value)} />
            </div>

            {profile.gender === 'FEMALE' && (
              <Checkbox label="حامل" checked={profile.pregnant === true} onChange={(e) => updateProfile('pregnant', e.target.checked)} />
            )}

            <div>
              <label className="block text-sm font-medium text-text mb-2">الأمراض المزمنة</label>
              <ConditionChips selected={profile.conditions} onChange={(v) => updateProfile('conditions', v)} />
            </div>

            {profile.conditions.includes('DIABETES') && (
              <Select label="نوع السكري" options={DIABETES_OPTIONS} value={profile.diabetesType} onChange={(e) => updateProfile('diabetesType', e.target.value)} />
            )}

            <Input label="أمراض أخرى" value={profile.otherConditions} onChange={(e) => updateProfile('otherConditions', e.target.value)} placeholder="أي أمراض غير مذكورة أعلاه..." />

            <div>
              <label className="block text-sm font-medium text-text mb-2">الحساسيات</label>
              <AllergyTagInput allergies={profile.allergies} onChange={(v) => updateProfile('allergies', v)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">الأدوية</label>
              <MedicationList medications={profile.medications} onChange={(v) => updateProfile('medications', v)} />
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="text-sm font-bold mb-3">جهة اتصال للطوارئ</h3>
              <div className="grid grid-cols-2 gap-3">
                <Input label="الاسم" value={profile.emergencyContact.name} onChange={(e) => updateProfile('emergencyContact', { ...profile.emergencyContact, name: e.target.value })} placeholder="سارة" />
                <Input label="الهاتف" type="tel" value={profile.emergencyContact.phone} onChange={(e) => updateProfile('emergencyContact', { ...profile.emergencyContact, phone: e.target.value })} placeholder="07XXXXXXXX" />
              </div>
            </div>

            {error && <p className="text-danger text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setStep(0)}>السابق</Button>
              <Button type="submit" className="flex-1">التالي</Button>
            </div>
          </form>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <h2 className="text-lg font-bold mb-4">مراجعة البيانات</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted">الاسم</span>
              <span className="font-medium">{account.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted">الهاتف</span>
              <span className="font-medium">{account.phone}</span>
            </div>
            {profile.age && (
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted">العمر</span>
                <span className="font-medium">{profile.age}</span>
              </div>
            )}
            {profile.gender && (
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted">الجنس</span>
                <span className="font-medium">{profile.gender === 'MALE' ? 'ذكر' : 'أنثى'}</span>
              </div>
            )}
            {profile.conditions.length > 0 && (
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted">الأمراض</span>
                <span className="font-medium">{profile.conditions.map((c) => conditionLabels[c] || c).join('، ')}</span>
              </div>
            )}
            {profile.allergies.length > 0 && (
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted">الحساسيات</span>
                <span className="font-medium">{profile.allergies.join('، ')}</span>
              </div>
            )}
            {profile.medications.length > 0 && (
              <div className="border-b border-border pb-2">
                <span className="text-muted">الأدوية</span>
                <div className="mt-1">
                  {profile.medications.map((m, i) => (
                    <p key={i} className="font-medium">{m.name} {m.dose && `— ${m.dose}`} {m.isAnticoagulant && '(مميّع دم)'}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" onClick={() => setStep(1)}>تعديل</Button>
            <Button className="flex-1" onClick={handleFinish}>إنهاء التسجيل</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
