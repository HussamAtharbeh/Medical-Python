import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenLine, Camera } from 'lucide-react';
import { useAssessment } from '../controllers/useAssessment';
import Button from '../components/Button';
import Card from '../components/Card';
import Textarea from '../components/Textarea';
import ImageDropzone from '../components/ImageDropzone';

export default function NewAssessment() {
  const navigate = useNavigate();
  const { start, loading } = useAssessment();
  const [mode, setMode] = useState('text');
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (mode === 'text' && !text.trim() && images.length === 0) return;
    if (mode === 'image' && images.length === 0) return;

    const id = await start({
      text: mode === 'image' ? null : text.trim() || null,
      images,
    });
    navigate(`/assess/${id}`);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10 animate-fade-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-1">تقييم جديد</h1>
        <p className="text-sm text-muted">اوصف حالتك وسنرشدك خطوة بخطوة</p>
      </div>

      <div className="flex gap-1.5 mb-6 p-1.5 bg-surface border border-border rounded-2xl shadow-soft">
        <button
          onClick={() => setMode('text')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            mode === 'text' ? 'gradient-primary text-white shadow-glow' : 'text-muted hover:text-text'
          }`}
        >
          <PenLine size={16} />
          اكتب الحالة
        </button>
        <button
          onClick={() => setMode('image')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            mode === 'image' ? 'gradient-primary text-white shadow-glow' : 'text-muted hover:text-text'
          }`}
        >
          <Camera size={16} />
          ارفع صورة فقط
        </button>
      </div>

      <Card className="shadow-lift">
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'text' && (
            <>
              <Textarea
                label="وصّف الإصابة أو الحالة"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="مثال: انسكبت عليّ مي مغلية على ظهر إيدي اليمين قبل 5 دقايق..."
              />
              <ImageDropzone images={images} onChange={setImages} />
            </>
          )}

          {mode === 'image' && (
            <>
              <p className="text-sm text-muted">ارفع صورة للإصابة وسنسألك أسئلة عنها</p>
              <ImageDropzone images={images} onChange={setImages} />
            </>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || (mode === 'text' && !text.trim() && images.length === 0) || (mode === 'image' && images.length === 0)}
          >
            {loading ? 'جاري التحليل...' : 'ابدأ التقييم'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
