import { Phone, AlertTriangle, Heart, Wind, Droplets, Flame, Skull } from 'lucide-react';
import Card from '../components/Card';

const GUIDES = [
  { icon: Heart, title: 'توقف القلب', steps: ['اتصل 911 فوراً', 'ابدأ الإنعاش القلبي (CPR)', '30 ضغطة صدرية ثم نفسين إنقاذ'] },
  { icon: Wind, title: 'صعوبة التنفس', steps: ['اتصل 911 فوراً', 'خلّي المصاب جالس', 'لا تعطيه أكل أو شرب'] },
  { icon: Droplets, title: 'نزيف شديد', steps: ['اضغط على الجرح بقوة', 'ارفع الطرف المصاب', 'لا تشيل الضماد'] },
  { icon: Flame, title: 'حروق شديدة', steps: ['برّد بالمي الفاترة 20 دقيقة', 'لا تحط ثلج أو معجون أسنان', 'غطّي بضماد نظيف'] },
  { icon: Skull, title: 'تسمم', steps: ['اتصل 911 فوراً', 'لا تحاول تقيّئه', 'احتفظ بالمادة للطبيب'] },
];

export default function EmergencyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-up">
      <div className="relative overflow-hidden bg-danger text-white rounded-3xl p-8 sm:p-10 text-center mb-8 shadow-lift">
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-white/15 grid place-items-center mx-auto mb-4">
            <AlertTriangle size={34} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">حالة طوارئ؟</h1>
          <p className="text-white/85 mb-6">إذا كانت الحالة خطيرة اتصل بالإسعاف فوراً</p>
          <a
            href="tel:911"
            className="inline-flex items-center gap-2 bg-white text-danger font-bold px-8 py-4 rounded-2xl text-xl shadow-soft hover:scale-[1.03] active:scale-[0.98] transition-transform"
          >
            <Phone size={24} />
            اتصل 911
          </a>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">دليل الطوارئ السريع</h2>
      <div className="space-y-4">
        {GUIDES.map((guide) => {
          const Icon = guide.icon;
          return (
            <Card key={guide.title} className="hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-danger-soft grid place-items-center shrink-0">
                  <Icon className="text-danger" size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-3">{guide.title}</h3>
                  <ol className="space-y-2">
                    {guide.steps.map((step, i) => (
                      <li key={i} className="text-sm flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-danger text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
