import { Link } from 'react-router-dom';
import { Phone, Shield, Clock, Heart, Stethoscope, Flame, Droplets, Bone, Bug, Zap } from 'lucide-react';
import { useAuth } from '../controllers/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';

const INJURY_TYPES = [
  { icon: Flame, label: 'حروق', color: 'text-danger' },
  { icon: Droplets, label: 'نزيف وجروح', color: 'text-danger' },
  { icon: Bone, label: 'كسور والتواءات', color: 'text-warning' },
  { icon: Bug, label: 'لدغات وحساسية', color: 'text-warning' },
  { icon: Zap, label: 'صدمات كهربائية', color: 'text-primary' },
  { icon: Stethoscope, label: 'حالات أخرى', color: 'text-primary' },
];

const HOW_IT_WORKS = [
  { step: 1, title: 'وصّف الإصابة', desc: 'اكتب أو ارفع صورة' },
  { step: 2, title: 'أجب على الأسئلة', desc: 'أسئلة بسيطة لتقييم دقيق' },
  { step: 3, title: 'احصل على التوجيه', desc: 'إسعافات أولية ونصائح' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">الإسعافات الأولية الذكية</h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            وصّف إصابتك بالكلام أو بالصورة، واحصل على تقييم مبدئي فوري مع خطوات الإسعاف المناسبة
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to={user ? '/assess/new' : '/signup'}>
              <Button size="lg">ابدأ التقييم</Button>
            </Link>
            <a href="tel:911">
              <Button variant="danger" size="lg" className="flex items-center gap-2">
                <Phone size={18} />
                طوارئ 911
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">كيف يعمل؟</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <Card key={item.step} className="text-center">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Injury types */}
      <section className="py-12 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">أنواع الإصابات</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {INJURY_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <Card key={type.label} className="text-center hover:border-primary transition cursor-pointer">
                  <Icon className={`mx-auto mb-2 ${type.color}`} size={28} />
                  <p className="text-sm font-medium">{type.label}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety notice */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-warning/30 bg-warning-soft/50">
            <div className="flex items-start gap-3">
              <Shield className="text-warning shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-warning mb-1">تنبيه مهم</h3>
                <p className="text-sm text-text/80">
                  هذا التطبيق يقدم تقييم مبدئي فقط وليس بديلاً عن الاستشارة الطبية المتخصصة.
                  في الحالات الطارئة اتصل بالإسعاف فوراً على 911.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="py-12 px-4 bg-primary-soft">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-3">سجّل الآن لتقييم أدق</h2>
            <p className="text-sm text-muted mb-5">الملف الصحي يساعدنا نأخذ أمراضك وأدويتك بعين الاعتبار</p>
            <Link to="/signup">
              <Button size="lg">أنشئ حساب مجاني</Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
