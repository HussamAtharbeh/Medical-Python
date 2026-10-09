const BASE = import.meta.env.VITE_AI_SERVICE_URL || 'http://localhost:8000';
const TIMEOUT = 30000;

async function fetchOnce(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const err = new Error(body.detail || body.error?.message || `HTTP ${res.status}`);
      err.status = res.status;
      throw err;
    }
    return res.json();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

async function fetchWithTimeout(url, options, retries = 3) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fetchOnce(url, options);
    } catch (err) {
      const isRetryable = err.status >= 500 || err.name === 'AbortError';
      if (!isRetryable || attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
}

let sessionCounter = 0;
const assessmentSessions = {};

function getSessionId(assessmentId) {
  if (!assessmentSessions[assessmentId]) {
    sessionCounter++;
    assessmentSessions[assessmentId] = `session-${Date.now()}-${sessionCounter}`;
  }
  return assessmentSessions[assessmentId];
}

function cleanStringList(list, mapFn = (x) => x) {
  return (list || [])
    .map(mapFn)
    .filter((s) => typeof s === 'string' && s.trim().length > 0)
    .map((s) => s.trim());
}

function buildMedicalProfile(profile) {
  if (!profile) return null;
  const ageNum = Number(profile.age);
  const age = Number.isInteger(ageNum) && ageNum >= 0 && ageNum <= 130 ? ageNum : null;
  return {
    age,
    chronic_conditions: cleanStringList(profile.conditions, (c) => String(c).toLowerCase().replace(/_/g, ' ')),
    medications: cleanStringList(profile.medications, (m) => (typeof m === 'string' ? m : m?.name)),
    allergies: cleanStringList(profile.allergies),
    medical_history: [],
  };
}

function buildImage(images) {
  if (!images || images.length === 0) return null;
  const img = images[0];
  const mimeMap = { 'image/jpeg': 'image/jpeg', 'image/png': 'image/png', 'image/webp': 'image/jpeg' };
  return {
    mime_type: mimeMap[img.mime] || 'image/jpeg',
    base64_data: img.base64,
  };
}

function mapUrgencyToRisk(urgency) {
  const map = {
    emergency: 'EMERGENCY',
    urgent_medical_attention: 'HIGH',
    routine_consultation: 'MEDIUM',
    potentially_self_care: 'LOW',
    unable_to_determine: 'MEDIUM',
  };
  return map[urgency] || 'MEDIUM';
}

function mapUrgencyToCareDirection(urgency) {
  const map = {
    emergency: 'EMERGENCY',
    urgent_medical_attention: 'URGENT_CARE_NOW',
    routine_consultation: 'SEE_DOCTOR_24H',
    potentially_self_care: 'SELF_CARE',
    unable_to_determine: 'SEE_DOCTOR_24H',
  };
  return map[urgency] || 'SEE_DOCTOR_24H';
}

function convertAssessmentToResult(data) {
  const a = data.assessment;
  return {
    assessmentLabel: a.symptom_summary?.split('.')[0] || 'تقييم',
    summary: a.symptom_summary || '',
    riskLevel: mapUrgencyToRisk(data.urgency),
    careDirection: mapUrgencyToCareDirection(data.urgency),
    careDirectionReason: a.recommended_action || '',
    firstAidSteps: (a.actions_now || []).map((action) => ({
      text: action.instruction,
      duration: '',
    })),
    treatments: [],
    avoid: [],
    goToErIf: (a.seek_help_if || []).map((w) => w.warning_sign),
    profileImpacts: [],
    confidence: 0.9,
    questionsAsked: data.followup_count || 0,
    uncertain: data.urgency === 'unable_to_determine',
    sourceIds: (a.actions_now || []).flatMap((act) => act.source_ids || []),
    disclaimer: a.limitations?.[0] || 'هذا تقييم مبدئي وليس تشخيصاً طبياً نهائياً.',
    possibleCauses: a.possible_causes || [],
    medicalInformation: a.medical_information || [],
    classificationReason: a.classification_reason || '',
    sources: data.sources || [],
  };
}

function convertToEmergency(data) {
  const a = data.assessment;
  return {
    title: a?.symptom_summary?.split('.')[0] || 'حالة طوارئ',
    reasons: a?.warning_signs || [],
    untilHelp: (a?.actions_now || []).map((act) => act.instruction),
    avoid: [],
    sourceIds: [],
  };
}

export async function extractProfile() {
  return null;
}

export async function assessStep(request) {
  const { input, profile, turns, counters } = request;
  const assessmentId = request._assessmentId || 'default';
  const sessionId = getSessionId(assessmentId);

  let messageText = '';
  if (turns.length === 0) {
    messageText = input.text || 'أرسلت صورة للإصابة';
  } else {
    const lastTurn = turns[turns.length - 1];
    if (lastTurn.unsure) {
      messageText = 'مش متأكد';
    } else {
      messageText = lastTurn.answer || 'مش متأكد';
    }
  }

  const body = {
    session_id: sessionId,
    message: messageText,
    medical_profile: turns.length === 0 ? buildMedicalProfile(profile) : null,
    image: turns.length === 0 ? buildImage(input.images) : null,
  };

  const data = await fetchWithTimeout(`${BASE}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const imageFindings = [];
  if (data.image_observations?.status === 'observed') {
    imageFindings.push(...(data.image_observations.observations || []));
  }

  const profileFactors = [];
  if (profile?.conditions?.length > 0) {
    for (const c of profile.conditions) {
      profileFactors.push({
        label: c,
        effect: 'تم أخذها بعين الاعتبار',
        severity: 'affects',
      });
    }
  }
  if (profile?.medications?.some((m) => m.isAnticoagulant)) {
    profileFactors.push({
      label: 'مميّع دم',
      effect: 'يؤثر على النزيف واختيار المسكّن',
      severity: 'important',
    });
  }

  if (data.urgency === 'emergency') {
    return {
      status: 'emergency',
      case: { type: 'emergency', label: data.message || 'حالة طوارئ', facts: {} },
      confidence: 0.95,
      missingSlots: [],
      imageFindings,
      profileFactors,
      nextQuestion: null,
      result: null,
      emergency: data.assessment ? convertToEmergency(data) : {
        title: 'حالة طوارئ',
        reasons: [data.message],
        untilHelp: ['اتصل بالطوارئ فوراً على 911'],
        avoid: [],
        sourceIds: [],
      },
      audit: { triggeredRules: ['emergency'], sourceIds: [] },
    };
  }

  if (data.status === 'assessment') {
    return {
      status: 'completed',
      case: { type: 'assessment', label: data.assessment?.symptom_summary?.split('.')[0] || 'تقييم', facts: {} },
      confidence: 0.9,
      missingSlots: [],
      imageFindings,
      profileFactors,
      nextQuestion: null,
      result: convertAssessmentToResult(data),
      emergency: null,
      audit: { triggeredRules: [], sourceIds: [] },
    };
  }

  const questionIndex = (counters?.baseAsked || 0) + 1;
  return {
    status: 'needs_answer',
    case: { type: 'questioning', label: 'جاري التقييم...', facts: {} },
    confidence: Math.min(0.15 + (data.followup_count || 0) * 0.17, 0.85),
    missingSlots: [],
    imageFindings,
    profileFactors,
    nextQuestion: {
      id: `q.${questionIndex}`,
      slot: `slot_${questionIndex}`,
      text: data.message,
      why: 'سؤال لتقييم حالتك بشكل أدق.',
      isDanger: false,
      isExtra: (counters?.baseAsked || 0) >= 5,
      endsRound: false,
    },
    result: null,
    emergency: null,
    audit: { triggeredRules: [], sourceIds: [] },
  };
}
