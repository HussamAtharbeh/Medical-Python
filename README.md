# MedicZero — مساعد الإسعافات الأولية بالذكاء الاصطناعي

> تطبيق ويب يقدّم **تقييماً مبدئياً للإصابات والأعراض** وإرشادات إسعاف أولي باللغة العربية (واللهجة الأردنية)، مدعوم بنموذج Google Gemini.
>
> A bilingual (Arabic/English) first‑aid triage assistant. The user describes a symptom or uploads a photo of an injury; the app asks short follow‑up questions, then returns an urgency level, probable causes, specific first‑aid steps, warning signs, and web‑sourced medical information.

> ⚠️ **تنويه طبي / Medical disclaimer:** هذا عرض توضيحي (POC) لأغراض المسابقة فقط، وليس أداة فرز طبي معتمدة ولا بديلاً عن استشارة الطبيب. في حالات الطوارئ اتصل بـ **911**. This is a hackathon proof‑of‑concept, **not** a validated medical device.

---

## نظرة سريعة للحكام / Judges — 60‑second overview

| | |
|---|---|
| **الفكرة** | المستخدم بيوصف إصابته أو بيرفع صورة → الذكاء الاصطناعي بيسأل أسئلة متابعة → بيطلع تقييم بمستوى الخطورة + خطوات إسعاف محددة + متى يروح الطوارئ. |
| **الواجهة الأمامية** | React 19 + Vite + Tailwind CSS، تصميم عربي من اليمين لليسار (RTL). |
| **الخلفية** | FastAPI (Python) + Google Gemini SDK مع بحث Google مدمج لجلب مصادر طبية موثّقة. |
| **المميّز** | محادثة ذكية بذاكرة جلسة، تحليل صور الإصابات، مراعاة الملف الصحي (أمراض مزمنة/أدوية/حساسية)، مسار طوارئ فوري، وتوليد إرشاد إسعافي مخصّص لأي إصابة. |
| **اللغة** | عربي + إنجليزي (يُكتشف تلقائياً من رسالة المستخدم). |

---

## 🎬 التشغيل السريع / Quick start

المشروع من جزأين لازم يشتغلوا **مع بعض**: الخلفية (Backend) على المنفذ `8000`، والواجهة (Frontend) على `5173`.

### المتطلبات / Prerequisites
- **Python 3.11+**
- **Node.js 18+** و npm
- **مفتاح Gemini API** مجاني من <https://aistudio.google.com/apikey>

### 1) الخلفية / Backend

```powershell
cd backend
python -m pip install -r requirements.txt

# انسخ ملف المثال وحط مفتاحك / copy the example and add your key
Copy-Item .env.example .env
# افتح .env وحط المفتاح بعد GEMINI_API_KEY=

# شغّل السيرفر / run the server
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

تأكد إنه شغّال: افتح <http://127.0.0.1:8000/health> لازم يطلع `{"status":"ok"}`.
توثيق الـ API التفاعلي (Swagger): <http://127.0.0.1:8000/docs>.

> ملاحظة: خلّي نافذة التيرمنال مفتوحة. **لا تستخدم `--reload`** أثناء العرض — بيسبّب أحياناً تحميل كود قديم.

### 2) الواجهة الأمامية / Frontend

بتيرمنال **ثانٍ** منفصل:

```powershell
cd frontend
npm install

# انسخ ملف المثال / copy the example env
Copy-Item .env.example .env

npm run dev
```

افتح الرابط اللي بيظهر (عادةً <http://localhost:5173>).

---

## 🔑 الإعدادات / Environment variables

**`backend/.env`** (سرّي — لا يُرفع على GitHub):
```env
GEMINI_API_KEY=your_gemini_key_here
GEMINI_MODEL=gemini-3.8-flash
```

**`frontend/.env`**:
```env
VITE_AI_MODE=remote
VITE_AI_SERVICE_URL=http://localhost:8000
```

> المفتاح يبقى على الخادم فقط، ولا يُرسل أبداً إلى الواجهة الأمامية. ملفات `.env` مستثناة في `.gitignore`؛ استخدم `.env.example` كقالب.

---

## 🧠 كيف يعمل / How it works

```
المستخدم (React/Vite, RTL)
      │  POST /ai/chat  { session_id, message, medical_profile?, image? }
      ▼
remoteAi.js  ← طبقة ترجمة بين صيغة الواجهة وصيغة الخلفية
      │
      ▼
FastAPI (backend/main.py)
  ├─ ذاكرة محادثة لكل session_id
  ├─ Gemini: يسأل حتى 5 أسئلة متابعة، ثم يُنتج تقييماً
  ├─ تحليل صورة الإصابة (اختياري)
  ├─ بحث Google المدمج → معلومات طبية + مصادر موثّقة
  ├─ قواعد عرض محدودة (صداع/رشح/حكة) + مسار طوارئ
  └─ لأي إصابة خارج القواعد: توليد تشخيص مبدئي + خطوات إسعاف مخصّصة
      │  ← urgency, assessment, sources, medical_information
      ▼
واجهة النتيجة: مستوى الخطورة، توجيه الرعاية، خطوات الإسعاف،
علامات الخطر، المصادر.
```

### مستويات الاستعجال / Urgency levels
`emergency` → `urgent_medical_attention` → `routine_consultation` → `potentially_self_care` → `unable_to_determine`

### أمثلة سيناريوهات للتجربة / Demo scenarios
- `عندي صداع من الصبح` — يعرض مسار الأسئلة ثم تقييم.
- `وقعت وجرحت ايدي بسكين وفي دم بسيط` — يحدّد "جرح قطعي سطحي" ويعطي خطوات إسعاف محددة (غسل، تنظيف، ضمادة) + متى تروح الطوارئ.
- وصف أعراض خطيرة (ألم صدر/ضيق نفس) — يفعّل **مسار الطوارئ** الفوري.

---

## 🗂️ بنية المشروع / Project structure

```
Medical/
├─ README.md            ← هذا الملف (دليل موحّد)
├─ ARCHITECTURE.md      ← تفاصيل معمارية أعمق
├─ docs/AI_CONTRACT.md  ← عقد صيغة الطلب/الرد بين الواجهة والخلفية
├─ backend/
│  ├─ main.py           ← كل منطق الخادم (FastAPI + Gemini)
│  ├─ requirements.txt  ← متطلبات Python
│  └─ .env.example      ← قالب المفتاح
└─ frontend/
   ├─ src/
   │  ├─ pages/         ← الصفحات (Home, NewAssessment, Assessment, ...)
   │  ├─ components/    ← مكوّنات الواجهة (RiskMeter, FirstAidSteps, ...)
   │  ├─ controllers/   ← useAssessment, useProfile, AuthContext
   │  ├─ services/ai/   ← remoteAi.js طبقة الاتصال بالخلفية
   │  └─ models/        ← نماذج البيانات والتخزين المحلي
   └─ .env.example
```

---

## 🛠️ التقنيات / Tech stack

**Frontend:** React 19, Vite 8, React Router 7, Tailwind CSS 4, lucide-react, Oxlint.
**Backend:** Python, FastAPI, Uvicorn, Google `google-genai` SDK (Gemini), Pydantic, httpx.

---

## ❓ مشاكل شائعة / Troubleshooting

| المشكلة | الحل |
|---|---|
| خطأ CORS في المتصفح | تأكد إنه الخلفية شغّالة على `8000` وإنه `VITE_AI_SERVICE_URL` صحيح. |
| الطلب يظهر "pending / Provisional headers" | طبيعي — رد الذكاء الاصطناعي بياخد من ٣ إلى ١٦ ثانية (خصوصاً التقييم النهائي). انتظر اللودر. |
| `502 Bad Gateway` | فشل مؤقت من Gemini؛ أعد المحاولة. تأكد من صحّة المفتاح والحصة (quota). |
| `422 Unprocessable Entity` | بيانات ملف صحي غير صالحة؛ الواجهة تنظّفها تلقائياً. |
| الخادم ما بيلتقط التعديلات | أعد تشغيله يدوياً (بدون `--reload`). |

---

## 📄 ملاحظات / Notes
- عرض توضيحي لأغراض المسابقة؛ استخدم بيانات أعراض تجريبية فقط.
- قواعد العرض محدودة ولم تُراجَع سريرياً؛ النموذج يفسّر الإجابات وقد يخطئ.
- في حالة الطوارئ الحقيقية اتصل دائماً بالرقم المحلي للطوارئ (**911**).
