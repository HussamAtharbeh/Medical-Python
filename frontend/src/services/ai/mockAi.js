import { SAMPLE_PROFILE_DRAFT, SCENARIOS } from './mockData';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function extractProfile() {
  await delay(1200);
  return SAMPLE_PROFILE_DRAFT;
}

function detectScenario(text) {
  if (!text) return null;
  for (const [key, scenario] of Object.entries(SCENARIOS)) {
    if (key === 'imageOnly' || key === 'other') continue;
    if (scenario.triggers?.some((t) => text.includes(t))) return key;
  }
  return null;
}

function getScenarioFromTurns(turns) {
  for (const turn of turns) {
    if (!turn.answer) continue;
    const key = detectScenario(turn.answer);
    if (key) return key;
  }
  return null;
}

function hasAnticoagulant(profile) {
  return profile?.medications?.some((m) => m.isAnticoagulant) || false;
}

function hasDiabetes(profile) {
  return profile?.conditions?.includes('DIABETES') || false;
}

function buildProfileFactors(profile, scenarioKey) {
  if (!profile) return [];
  const factors = [];

  if (hasDiabetes(profile)) {
    factors.push({
      label: 'سكري – النوع 2',
      effect: 'يرفع خطر الالتهاب وبطء الشفاء',
      severity: scenarioKey === 'burn' ? 'important' : 'affects',
    });
  }

  if (hasAnticoagulant(profile)) {
    factors.push({
      label: 'وارفارين (مميّع دم)',
      effect: 'يؤثر على النزيف واختيار المسكّن',
      severity: scenarioKey === 'bleeding' ? 'important' : 'affects',
    });
  }

  if (profile.allergies?.length > 0) {
    factors.push({
      label: `حساسية: ${profile.allergies.join('، ')}`,
      effect: 'بيأثر على اختيار الأدوية',
      severity: 'allergy',
    });
  }

  return factors;
}

export async function assessStep(request) {
  await delay(1200);

  const { input, profile, turns, counters } = request;
  const baseAsked = counters?.baseAsked || 0;
  const extraRounds = counters?.extraRounds || 0;
  const isImageOnly = !input.text && input.images?.length > 0 && turns.length === 0;

  let scenarioKey = detectScenario(input.text) || getScenarioFromTurns(turns);

  if (isImageOnly && !scenarioKey) {
    const intake = SCENARIOS.imageOnly.intakeQuestions;
    const intakeAsked = turns.length;
    if (intakeAsked < intake.length) {
      const q = intake[intakeAsked];
      return {
        status: 'needs_answer',
        case: { type: 'unknown', label: 'جاري التقييم...', facts: {} },
        confidence: 0.1,
        missingSlots: [],
        imageFindings: intakeAsked === 0 ? ['تم استلام الصورة، محتاجين معلومات إضافية'] : [],
        profileFactors: buildProfileFactors(profile, null),
        nextQuestion: { id: q.id, slot: q.slot, text: q.text, why: q.why, isDanger: q.isDanger, isExtra: false, endsRound: false },
        result: null,
        emergency: null,
        audit: { triggeredRules: [], sourceIds: [] },
      };
    }
    scenarioKey = getScenarioFromTurns(turns);
  }

  if (!scenarioKey) scenarioKey = 'other';
  const scenario = SCENARIOS[scenarioKey];

  if (scenarioKey === 'bleeding' && scenario.emergency) {
    const bleedingStopped = turns.find((t) => t.slot === 'stopped');
    if (bleedingStopped && bleedingStopped.answer && (bleedingStopped.answer.includes('لا') || bleedingStopped.answer.includes('مستمر') || bleedingStopped.answer.includes('ما وقف'))) {
      if (hasAnticoagulant(profile)) {
        return {
          status: 'emergency',
          case: { type: 'bleeding', label: 'نزيف مع مميّع دم', facts: {} },
          confidence: 0.95,
          missingSlots: [],
          imageFindings: [],
          profileFactors: buildProfileFactors(profile, scenarioKey),
          nextQuestion: null,
          result: null,
          emergency: scenario.emergency,
          audit: { triggeredRules: ['anticoagulant_bleeding'], sourceIds: ['bleed_003'] },
        };
      }
    }
  }

  const confidence = Math.min(0.15 + baseAsked * 0.17 + extraRounds * 0.1, 0.98);
  const caseInfo = {
    type: scenarioKey,
    label: scenario.result?.assessmentLabel || scenario.emergency?.title || 'جاري التقييم...',
    facts: {},
  };

  if (baseAsked < 5 && scenario.baseQuestions) {
    const q = scenario.baseQuestions[baseAsked];
    if (q) {
      return {
        status: 'needs_answer',
        case: caseInfo,
        confidence,
        missingSlots: scenario.baseQuestions.slice(baseAsked + 1).map((qq) => qq.slot),
        imageFindings: baseAsked === 0 && input.images?.length > 0 ? ['تم تحليل الصورة'] : [],
        profileFactors: buildProfileFactors(profile, scenarioKey),
        nextQuestion: { id: q.id, slot: q.slot, text: q.text, why: q.why, isDanger: q.isDanger, isExtra: false, endsRound: false },
        result: null,
        emergency: null,
        audit: { triggeredRules: [], sourceIds: [] },
      };
    }
  }

  if (confidence < 0.85 && extraRounds < 3 && scenario.extraQuestions?.length > 0) {
    const extraIdx = extraRounds * 2;
    const availableExtras = scenario.extraQuestions.slice(extraIdx);
    if (availableExtras.length > 0) {
      const q = availableExtras[0];
      const isLast = availableExtras.length === 1 || (extraIdx + 1) % 2 === 1;
      return {
        status: 'needs_answer',
        case: caseInfo,
        confidence,
        missingSlots: [q.slot],
        imageFindings: [],
        profileFactors: buildProfileFactors(profile, scenarioKey),
        nextQuestion: { id: q.id, slot: q.slot, text: q.text, why: q.why, isDanger: q.isDanger, isExtra: true, endsRound: isLast },
        result: null,
        emergency: null,
        audit: { triggeredRules: [], sourceIds: [] },
      };
    }
  }

  const result = { ...scenario.result };

  if (hasDiabetes(profile) && scenarioKey === 'burn') {
    result.careDirection = 'SEE_DOCTOR_24H';
    result.careDirectionReason = 'بسبب السكري، المراجعة ضرورية حتى لو تحسّن الحرق.';
    result.profileImpacts = ['رفعنا مستوى المتابعة بسبب السكري'];
  }

  if (hasAnticoagulant(profile)) {
    const ibuprofenIdx = result.treatments?.findIndex((t) => t.id === 'ibuprofen');
    if (ibuprofenIdx >= 0) {
      result.treatments[ibuprofenIdx] = {
        ...result.treatments[ibuprofenIdx],
        suitability: 'not_suitable',
        usage: 'لا يُستخدم',
        reason: 'بتاخد وارفارين، فبيزيد خطر النزيف',
      };
      result.profileImpacts = [...(result.profileImpacts || []), 'استبعدنا الإيبوبروفين بسبب الوارفارين'];
    }
  }

  const uncertain = confidence < 0.85;
  if (uncertain) {
    result.riskLevel = result.riskLevel === 'LOW' ? 'MEDIUM' : result.riskLevel;
    if (result.careDirection === 'SELF_CARE') result.careDirection = 'SEE_DOCTOR_24H';
  }

  return {
    status: 'completed',
    case: caseInfo,
    confidence: uncertain ? confidence : Math.max(confidence, 0.94),
    missingSlots: [],
    imageFindings: [],
    profileFactors: buildProfileFactors(profile, scenarioKey),
    nextQuestion: null,
    result: {
      ...result,
      confidence: uncertain ? confidence : Math.max(confidence, 0.94),
      questionsAsked: baseAsked + (extraRounds * 2),
      uncertain,
    },
    emergency: null,
    audit: { triggeredRules: [], sourceIds: result.sourceIds || [] },
  };
}
