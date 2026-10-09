import { Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm">
            <span className="font-bold text-white">MedicZero</span> — تقييم مبدئي للإسعافات الأولية
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span>ليس بديلاً عن الاستشارة الطبية</span>
            <a href="tel:911" className="flex items-center gap-1 text-danger font-medium">
              <Phone size={12} />
              طوارئ 911
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
