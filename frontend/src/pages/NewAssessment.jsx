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
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">تقييم جديد</h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('text')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition ${
            mode === 'text' ? 'bg-primary text-white border-primary' : 'bg-surface text-muted border-border'
          }`}
        >
          <PenLine size={16} />
          اكتب الحالة
        </button>
        <button
          onClick={() => setMode('image')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition ${
            mode === 'image' ? 'bg-primary text-white border-primary' : 'bg-surface text-muted border-border'
          }`}
        >
          <Camera size={16} />
          ارفع صورة فقط
        </button>
      </div>

      <Card>
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
