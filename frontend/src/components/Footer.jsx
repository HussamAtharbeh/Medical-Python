import { Phone, Stethoscope } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-8 h-8 rounded-lg gradient-primary">
              <Stethoscope size={16} className="text-white" />
            </span>
            <div className="text-sm">
              <span className="font-bold text-white">MedicZero</span>
              <span className="text-white/50"> — تقييم مبدئي للإسعافات الأولية</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/50">ليس بديلاً عن الاستشارة الطبية</span>
            <a href="tel:911" className="flex items-center gap-1.5 text-white bg-danger px-3 py-1.5 rounded-lg font-semibold hover:brightness-110 transition">
              <Phone size={13} />
              طوارئ 911
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
