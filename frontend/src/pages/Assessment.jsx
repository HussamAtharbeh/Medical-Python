import { useParams, Link } from 'react-router-dom';
import { useAssessment } from '../controllers/useAssessment';
import { Loader2, AlertTriangle, XCircle, Phone } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';
import AnswerBox from '../components/AnswerBox';
import PrevAnswers from '../components/PrevAnswers';
import ProgressBar from '../components/ProgressBar';
import ProfileFactorsCard from '../components/ProfileFactorsCard';
import EmergencyCard from '../components/EmergencyCard';
import RiskMeter from '../components/RiskMeter';
import CareDirection from '../components/CareDirection';
import FirstAidSteps from '../components/FirstAidSteps';
import TreatmentTable from '../components/TreatmentTable';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Assessment() {
  const { id } = useParams();
  const { assessment, loading, answer, goBack } = useAssessment(id);

  if (!assessment) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-muted">التقييم غير موجود</p>
        <Link to="/assess/new" className="text-primary text-sm mt-2 inline-block">تقييم جديد</Link>
      </div>
    );
  }

  if (assessment.status === 'EMERGENCY') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <EmergencyCard emergency={assessment.emergency} />
        <div className="mt-6 text-center">
          <Link to="/assess/new">
            <Button variant="outline">تقييم جديد</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (assessment.status === 'FAILED') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <XCircle className="mx-auto text-danger mb-3" size={40} />
        <h2 className="text-lg font-bold mb-2">حصل خطأ</h2>
        <p className="text-sm text-muted mb-4">ما قدرنا نكمل التقييم. في حالة الطوارئ اتصل 911.</p>
        <div className="flex items-center justify-center gap-3">
          <a href="tel:911">
            <Button variant="danger" className="flex items-center gap-1.5">
              <Phone size={14} />
              911
            </Button>
          </a>
          <Link to="/assess/new">
            <Button variant="outline">حاول مرة ثانية</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (assessment.status === 'COMPLETED' && assessment.result) {
    const r = assessment.result;
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-lift">
              <h2 className="text-xl font-bold mb-1.5">{r.assessmentLabel}</h2>
              <p className="text-sm text-muted leading-relaxed">{r.summary}</p>
              {r.uncertain && (
                <div className="mt-3 flex items-center gap-2 text-warning text-sm bg-warning-soft rounded-xl px-3 py-2.5">
                  <AlertTriangle size={16} className="shrink-0" />
                  التقييم غير مؤكد — ننصح بمراجعة طبيب
                </div>
              )}
            </Card>

            <RiskMeter level={r.riskLevel} />
            <CareDirection direction={r.careDirection} reason={r.careDirectionReason} />
            <FirstAidSteps steps={r.firstAidSteps} />
            <TreatmentTable treatments={r.treatments} />

            {r.avoid?.length > 0 && (
              <Card className="border-danger/30">
                <h3 className="font-bold text-danger mb-2">تجنّب</h3>
                <ul className="space-y-1">
                  {r.avoid.map((a, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-danger mt-1">✕</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {r.goToErIf?.length > 0 && (
              <Card className="border-danger/30 bg-danger-soft/30">
                <h3 className="font-bold text-danger mb-2">روح الطوارئ إذا</h3>
                <ul className="space-y-1">
                  {r.goToErIf.map((g, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <AlertTriangle size={14} className="text-danger mt-0.5 shrink-0" />
                      {g}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {r.medicalInformation?.length > 0 && (
              <Card>
                <h3 className="font-bold text-text mb-2">معلومات طبية</h3>
                <ul className="space-y-2">
                  {r.medicalInformation.map((info, i) => (
                    <li key={i} className="text-sm text-muted">• {info.text}</li>
                  ))}
                </ul>
              </Card>
            )}

            {r.sources?.length > 0 && (
              <Card>
                <h3 className="font-bold text-text mb-2">المصادر</h3>
                <ul className="space-y-1">
                  {r.sources.map((s, i) => (
                    <li key={i} className="text-xs">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            <p className="text-xs text-placeholder text-center">{r.disclaimer}</p>
          </div>

          <div className="space-y-4">
            <ProfileFactorsCard factors={assessment.profileFactors} />

            {r.profileImpacts?.length > 0 && (
              <Card>
                <h3 className="font-bold text-text mb-2 text-sm">تأثيرات الملف الصحي</h3>
                <ul className="space-y-1">
                  {r.profileImpacts.map((p, i) => (
                    <li key={i} className="text-xs text-muted">• {p}</li>
                  ))}
                </ul>
              </Card>
            )}

            <PrevAnswers turns={assessment.turns} />
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/assess/new">
            <Button variant="outline">تقييم جديد</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {assessment.caseLabel && (
            <div className="text-sm text-muted">
              <span className="font-medium text-text">{assessment.caseLabel}</span>
            </div>
          )}

          <ProgressBar
            value={assessment.confidence || 0}
            label="مستوى الثقة بالتقييم"
          />

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-muted">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-sm">جاري التحليل...</span>
            </div>
          ) : (
            <>
              <QuestionCard question={assessment.currentQuestion} />
              <AnswerBox
                onAnswer={answer}
                onBack={goBack}
                canGoBack={assessment.turns?.length > 0}
                loading={loading}
              />
            </>
          )}

          <PrevAnswers turns={assessment.turns} />
        </div>

        <div className="space-y-4">
          <ProfileFactorsCard factors={assessment.profileFactors} />

          {assessment.imageFindings?.length > 0 && (
            <Card>
              <h3 className="font-bold text-text mb-2 text-sm">نتائج تحليل الصورة</h3>
              <ul className="space-y-1">
                {assessment.imageFindings.map((f, i) => (
                  <li key={i} className="text-xs text-muted">• {f}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
