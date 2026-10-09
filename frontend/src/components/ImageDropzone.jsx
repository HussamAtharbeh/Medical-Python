import { useState } from 'react';
import { Camera, X, Image as ImageIcon } from 'lucide-react';
import { compress } from '../services/imageUtils';

export default function ImageDropzone({ images, onChange, max = 3 }) {
  const [dragging, setDragging] = useState(false);

  async function handleFiles(files) {
    const remaining = max - images.length;
    const toProcess = Array.from(files).slice(0, remaining);
    const compressed = await Promise.all(toProcess.map(compress));
    onChange([...images, ...compressed]);
  }

  function removeImage(index) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer ${
          dragging ? 'border-primary bg-primary-soft' : 'border-border hover:border-primary'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => document.getElementById('img-input').click()}
      >
        <Camera className="mx-auto text-muted mb-2" size={32} />
        <p className="text-sm text-muted">اسحب صورة هنا أو اضغط لاختيار</p>
        <p className="text-xs text-placeholder mt-1">JPG, PNG, WebP — حد أقصى {max} صور</p>
        <input
          id="img-input"
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((img, i) => (
            <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
              <img src={`data:${img.mime};base64,${img.base64}`} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-0.5 left-0.5 bg-danger text-white rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
