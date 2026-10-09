import { useState } from 'react';
import { Send, ChevronRight, HelpCircle } from 'lucide-react';
import Button from './Button';

export default function AnswerBox({ onAnswer, onBack, canGoBack, loading }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onAnswer({ answer: text.trim(), unsure: false });
    setText('');
  }

  function handleUnsure() {
    onAnswer({ answer: null, unsure: true });
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="اكتب إجابتك هنا..."
        rows={3}
        className="w-full px-3 py-2.5 rounded-lg border border-border text-sm bg-surface placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
        disabled={loading}
      />
      <div className="flex items-center gap-2 flex-wrap">
        <Button type="submit" disabled={!text.trim() || loading} className="flex items-center gap-1.5">
          <Send size={14} />
          إرسال
        </Button>
        <Button type="button" variant="outline" onClick={handleUnsure} disabled={loading} className="flex items-center gap-1.5">
          <HelpCircle size={14} />
          مش متأكد
        </Button>
        {canGoBack && (
          <Button type="button" variant="ghost" onClick={onBack} disabled={loading} className="flex items-center gap-1.5">
            <ChevronRight size={14} />
            السابق
          </Button>
        )}
      </div>
    </form>
  );
}
