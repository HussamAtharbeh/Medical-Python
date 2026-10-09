import { Link } from 'react-router-dom';
import { Phone, Shield, Stethoscope, Flame, Droplets, Bone, Bug, Zap, Sparkles, MessageSquare, ClipboardCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../controllers/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';

const INJURY_TYPES = [
  { icon: Flame, label: 'حروق', color: 'text-danger', bg: 'bg-danger-soft' },
  { icon: Droplets, label: 'نزيف وجروح', color: 'text-danger', bg: 'bg-danger-soft' },
  { icon: Bone, label: 'كسور والتواءات', color: 'text-warning', bg: 'bg-warning-soft' },
  { icon: Bug, label: 'لدغات وحساسية', color: 'text-warning', bg: 'bg-warning-soft' },
  { icon: Zap, label: 'صدمات كهربائية', color: 'text-primary', bg: 'bg-primary-soft' },
  { icon: Stethoscope, label: 'حالات أخرى', color: 'text-accent', bg: 'bg-accent-soft' },
];

const HOW_IT_WORKS = [
  { icon: MessageSquare, step: 1, title: 'وصّف الإصابة', desc: 'اكتب حالتك أو ارفع صورة للإصابة' },
  { icon: Sparkles, step: 2, title: 'أجب على الأسئلة', desc: 'أسئلة ذكية قصيرة لتقييم أدق' },
  { icon: ClipboardCheck, step: 3, title: 'احصل على التوجيه', desc: 'خطوات إسعاف ومستوى الخطورة فوراً' },
];

const STATS = [
  { value: 'فوري', label: 'تقييم خلال ثوانٍ' },
  { value: 'عربي', label: 'بلغتك ولهجتك' },
  { value: '24/7', label: 'متاح طوال الوقت' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 grid-dots opacity-60" />
        <div className="absolute -top-24 -start-24 w-80 h-80 rounded-full bg-primary/40 blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -end-16 w-96 h-96 rounded-full bg-accent/30 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

        <div className="relative max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-sm text-white/90 mb-6 animate-fade-up">
            <Sparkles size={14} className="text-accent" />
            مدعوم بالذكاء الاصطناعي
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold leading-[1.15] mb-5 text-balance animate-fade-up" style={{ animationDelay: '0.05s' }}>
            الإسعافات الأولية
            <span className="block gradient-text">بين يديك في أي لحظة</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/75 mb-9 max-w-2xl mx-auto text-balance animate-fade-up" style={{ animationDelay: '0.1s' }}>
            وصّف إصابتك بالكلام أو بالصورة، واحصل على تقييم مبدئي فوري مع خطوات الإسعاف المناسبة لحالتك.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <Link to={user ? '/assess/new' : '/signup'}>
              <Button size="lg" className="group">
                ابدأ التقييم الآن
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:911">
              <Button variant="danger" size="lg">
                <Phone size={18} />
                طوارئ 911
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-xl mx-auto mt-14 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-3 py-4 border border-white/10">
                <div className="text-xl sm:text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <svg className="relative block w-full text-bg" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path fill="currentColor" d="M0,40 C360,90 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">كيف يعمل؟</h2>
            <p className="text-muted">ثلاث خطوات بسيطة تفصلك عن الإرشاد الصحيح</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} className="relative text-center hover-lift overflow-hidden">
                  <span className="absolute top-4 end-4 text-5xl font-bold text-primary/5 leading-none">{item.step}</span>
                  <div className="w-14 h-14 rounded-2xl gradient-primary shadow-glow grid place-items-center mx-auto mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">أنواع الإصابات التي نغطيها</h2>
            <p className="text-muted">من الجروح البسيطة إلى الحالات الطارئة</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {INJURY_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <Card key={type.label} className="group flex flex-col items-center text-center hover-lift cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl ${type.bg} grid place-items-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className={type.color} size={26} />
                  </div>
                  <p className="text-sm font-semibold">{type.label}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-warning/30 bg-warning-soft/60">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-warning/10 grid place-items-center shrink-0">
                <Shield className="text-warning" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-warning mb-1">تنبيه مهم</h3>
                <p className="text-sm text-text/80 leading-relaxed">
                  هذا التطبيق يقدم تقييماً مبدئياً فقط وليس بديلاً عن الاستشارة الطبية المتخصصة.
                  في الحالات الطارئة اتصل بالإسعاف فوراً على 911.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {!user && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl gradient-primary shadow-glow px-6 py-14 text-center text-white">
              <div className="absolute inset-0 grid-dots opacity-40" />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">سجّل الآن لتقييم أدق</h2>
                <p className="text-white/85 mb-7 max-w-lg mx-auto">
                  الملف الصحي يساعدنا نأخذ أمراضك وأدويتك وحساسيتك بعين الاعتبار لإرشاد مخصّص لك.
                </p>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-white">
                    أنشئ حساب مجاني
                    <ArrowLeft size={18} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
