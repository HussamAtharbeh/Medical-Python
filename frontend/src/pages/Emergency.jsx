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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-danger text-white rounded-xl p-8 text-center mb-8">
        <AlertTriangle className="mx-auto mb-3" size={48} />
        <h1 className="text-2xl font-bold mb-3">حالة طوارئ؟</h1>
        <p className="text-white/80 mb-4">إذا كانت الحالة خطيرة اتصل بالإسعاف فوراً</p>
        <a
          href="tel:911"
          className="inline-flex items-center gap-2 bg-white text-danger font-bold px-8 py-4 rounded-xl text-xl"
        >
          <Phone size={24} />
          اتصل 911
        </a>
      </div>

      <h2 className="text-lg font-bold mb-4">دليل الطوارئ السريع</h2>
      <div className="space-y-4">
        {GUIDES.map((guide) => {
          const Icon = guide.icon;
          return (
            <Card key={guide.title}>
              <div className="flex items-start gap-3">
                <Icon className="text-danger shrink-0" size={22} />
                <div>
                  <h3 className="font-bold mb-2">{guide.title}</h3>
                  <ol className="space-y-1">
                    {guide.steps.map((step, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-danger text-white text-xs flex items-center justify-center shrink-0">{i + 1}</span>
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
