export const SAMPLE_PROFILE_DRAFT = {
  age: 45,
  gender: 'MALE',
  conditions: ['DIABETES', 'HYPERTENSION'],
  diabetesType: 'TYPE2',
  otherConditions: [],
  allergies: ['Penicillin'],
  medications: [
    { name: 'Warfarin', dose: '5 mg', frequency: 'once daily', isAnticoagulant: true },
    { name: 'Metformin', dose: '500 mg', frequency: 'twice daily', isAnticoagulant: false },
  ],
  fieldConfidence: { age: 'high', conditions: 'high', medications: 'medium' },
  warnings: ['الجرعات غير واضحة بالصورة'],
};

export const SCENARIOS = {
  burn: {
    triggers: ['حرق', 'انكوى', 'مي سخنة', 'زيت', 'burn', 'مغلية', 'نار'],
    baseQuestions: [
      { id: 'burn.onset', slot: 'onset', text: 'إيمتى صارت الإصابة؟', why: 'وقت الإصابة بيأثر على طريقة العلاج.', isDanger: false },
      { id: 'burn.location_size', slot: 'location_size', text: 'وين بالضبط مكان الحرق، وقديش حجمه مقارنةً بكف إيدك؟', why: 'مكان وحجم الحرق بيحددوا درجة الخطر.', isDanger: true },
      { id: 'burn.depth_signs', slot: 'depth_signs', text: 'شو شكل الجلد؟ في احمرار، فقاعات، أو تغير بلون الجلد؟', why: 'شكل الجلد بيحدد درجة الحرق.', isDanger: true },
      { id: 'burn.pain', slot: 'pain', text: 'حاسس بألم مكان الحرق ولا الإحساس خفيف؟', why: 'فقدان الإحساس ممكن يدل على حرق عميق.', isDanger: true },
      { id: 'burn.airway', slot: 'airway_signs', text: 'في صعوبة بالتنفس أو كحة أو بحة بالصوت؟', why: 'علامات إصابة مجاري الهواء بتحتاج طوارئ فورية.', isDanger: true },
    ],
    extraQuestions: [
      { id: 'burn.cooling', slot: 'cooling', text: 'عملت إشي للحرق لحد هلأ؟ مثلاً مي باردة؟', why: 'الإسعاف الأولي المبكر بيأثر على النتيجة.', isDanger: false },
      { id: 'burn.chemicals', slot: 'chemicals', text: 'حطيت إشي على الحرق؟ مثل كريم أو معجون أسنان؟', why: 'بعض المواد بتزيد الضرر.', isDanger: false },
    ],
    result: {
      assessmentLabel: 'حرق من الدرجة الثانية (سطحي)',
      summary: 'على ظهر اليد اليمنى، أصغر من نص كف اليد، مع فقاعات صغيرة وإحساس طبيعي بالألم.',
      riskLevel: 'MEDIUM',
      careDirection: 'SEE_DOCTOR_24H',
      careDirectionReason: 'الحرق سطحي بس بحاجة متابعة طبية.',
      firstAidSteps: [
        { text: 'برّد الحرق تحت مي جارية فاترة', duration: '20 دقيقة' },
        { text: 'شيل الخواتم والإسوارة قبل ما تنفخ الإيد', duration: 'فوراً' },
        { text: 'غطّي الحرق بضماد نظيف غير لاصق', duration: 'بعد التبريد' },
      ],
      treatments: [
        { id: 'paracetamol', name: 'باراسيتامول', purpose: 'مسكّن للألم', usage: 'حسب تعليمات العبوة عند الحاجة', suitability: 'suitable', reason: null },
        { id: 'ibuprofen', name: 'إيبوبروفين', purpose: 'مسكّن ومضاد التهاب', usage: 'لا يُستخدم', suitability: 'not_suitable', reason: 'بتاخد وارفارين، فبيزيد خطر النزيف' },
        { id: 'topical_antibiotic', name: 'كريم مضاد حيوي موضعي', purpose: 'منع الالتهاب', usage: 'فقط إذا وصفه الطبيب', suitability: 'consult_doctor', reason: 'عندك حساسية بنسلين وسكري' },
      ],
      avoid: ['لا تحط ثلج أو معجون أسنان أو زبدة', 'لا تفقع الفقاعات'],
      goToErIf: ['صعوبة بالتنفس أو دوخة', 'الجلد صار أبيض أو أسود أو بدون إحساس'],
      profileImpacts: [],
      sourceIds: ['burn_002'],
      disclaimer: 'هذا تقييم مبدئي وليس تشخيصاً طبياً نهائياً.',
    },
  },

  fall: {
    triggers: ['وقعت', 'انصدمت', 'التوى', 'طحت', 'تعثرت'],
    baseQuestions: [
      { id: 'fall.onset', slot: 'onset', text: 'إيمتى صارت الإصابة؟', why: 'وقت الإصابة مهم للعلاج.', isDanger: false },
      { id: 'fall.location', slot: 'location', text: 'وين مكان الألم بالضبط؟', why: 'مكان الإصابة بيحدد نوعها.', isDanger: false },
      { id: 'fall.mechanism', slot: 'mechanism', text: 'كيف وقعت؟ من وين؟', why: 'طريقة السقوط بتحدد خطورة الإصابة.', isDanger: false },
      { id: 'fall.movement', slot: 'movement', text: 'بتقدر تحرّك المنطقة المصابة؟', why: 'عدم القدرة على الحركة ممكن يدل على كسر.', isDanger: true },
      { id: 'fall.swelling', slot: 'swelling', text: 'في انتفاخ أو تغير بالشكل؟', why: 'الانتفاخ والتشوّه بيدلوا على شدة الإصابة.', isDanger: false },
    ],
    extraQuestions: [
      { id: 'fall.weight', slot: 'weight_bear', text: 'بتقدر تمشي وتحمل وزنك عليها؟', why: 'القدرة على المشي بتساعد نحدد إذا في كسر.', isDanger: false },
      { id: 'fall.previous', slot: 'previous', text: 'صار معك نفس الإصابة قبل؟', why: 'الإصابات المتكررة بتحتاج متابعة مختلفة.', isDanger: false },
    ],
    result: {
      assessmentLabel: 'التواء بالكاحل',
      summary: 'التواء بسيط بالكاحل مع انتفاخ خفيف، القدرة على الحركة موجودة.',
      riskLevel: 'LOW',
      careDirection: 'SELF_CARE',
      careDirectionReason: 'التواء بسيط ممكن يتحسن بالراحة والثلج.',
      firstAidSteps: [
        { text: 'حط ثلج ملفوف بقطعة قماش على المنطقة', duration: '15-20 دقيقة كل ساعتين' },
        { text: 'ارفع القدم فوق مستوى القلب', duration: 'أول 48 ساعة' },
        { text: 'لف المنطقة برباط ضاغط بشكل مريح', duration: 'حسب الحاجة' },
      ],
      treatments: [
        { id: 'paracetamol', name: 'باراسيتامول', purpose: 'مسكّن للألم', usage: 'حسب تعليمات العبوة عند الحاجة', suitability: 'suitable', reason: null },
        { id: 'ibuprofen', name: 'إيبوبروفين', purpose: 'مسكّن ومضاد التهاب', usage: 'حسب تعليمات العبوة', suitability: 'suitable', reason: null },
      ],
      avoid: ['لا تمشي كثير عليها أول يومين', 'لا تحط حرارة على الإصابة أول 48 ساعة'],
      goToErIf: ['ما بتقدر تحمل وزنك عليها أبداً', 'التشوّه واضح أو في صوت طقطقة لما صارت الإصابة'],
      profileImpacts: [],
      sourceIds: ['sprain_001'],
      disclaimer: 'هذا تقييم مبدئي وليس تشخيصاً طبياً نهائياً.',
    },
  },

  bleeding: {
    triggers: ['نزيف', 'دم كثير', 'ما بيوقف', 'جرح عميق', 'دم'],
    emergency: {
      title: 'نزيف مستمر مع تناول مميّع دم',
      reasons: ['النزيف مستمر أكثر من 10 دقائق رغم الضغط عليه', 'بتاخد وارفارين، وهو بيمنع تخثّر الدم'],
      untilHelp: ['اضغط على الجرح بقوة وبشكل مستمر بقطعة قماش نظيفة', 'ارفع الطرف المصاب فوق مستوى القلب إذا أمكن'],
      avoid: ['لا تشيل القماش عن الجرح لتتفقده', 'لا تاخد أسبرين أو إيبوبروفين'],
      sourceIds: ['bleed_003'],
    },
    baseQuestions: [
      { id: 'bleed.onset', slot: 'onset', text: 'إيمتى بدأ النزيف؟', why: 'مدة النزيف بتحدد خطورته.', isDanger: true },
      { id: 'bleed.location', slot: 'location', text: 'من وين النزيف بالضبط؟', why: 'مكان النزيف مهم لتحديد الخطورة.', isDanger: false },
      { id: 'bleed.stopped', slot: 'stopped', text: 'وقف النزيف ولا لسّاته مستمر؟', why: 'النزيف المستمر بيحتاج تدخل سريع.', isDanger: true },
      { id: 'bleed.cause', slot: 'cause', text: 'شو سبب النزيف؟ جرح، سقوط؟', why: 'سبب النزيف بيحدد العلاج المناسب.', isDanger: false },
      { id: 'bleed.depth', slot: 'depth', text: 'الجرح عميق ولا سطحي؟', why: 'الجروح العميقة بتحتاج خياطة.', isDanger: true },
    ],
    extraQuestions: [],
  },

  imageOnly: {
    intakeQuestions: [
      { id: 'img.what', slot: 'what_happened', text: 'شو صار بالضبط؟', why: 'لازم نعرف شو الإصابة عشان نقيّمها صح.', isDanger: false },
      { id: 'img.when', slot: 'when', text: 'إيمتى صارت الإصابة؟', why: 'وقت الإصابة بيأثر على العلاج.', isDanger: false },
      { id: 'img.where', slot: 'body_part', text: 'وين بالضبط مكان الإصابة على جسمك؟', why: 'مكان الإصابة بيحدد خطورتها.', isDanger: false },
    ],
  },

  other: {
    triggers: [],
    baseQuestions: [
      { id: 'gen.onset', slot: 'onset', text: 'إيمتى بدأت المشكلة؟', why: 'التوقيت مهم لتحديد العلاج.', isDanger: false },
      { id: 'gen.location', slot: 'location', text: 'وين مكان الألم أو الإصابة بالضبط؟', why: 'المكان بيحدد نوع المشكلة.', isDanger: false },
      { id: 'gen.severity', slot: 'severity', text: 'قديش الألم من 1 لـ 10؟', why: 'شدة الألم بتساعد نحدد الخطورة.', isDanger: false },
      { id: 'gen.changes', slot: 'changes', text: 'الحالة تحسّنت ولا زادت من وقتها؟', why: 'تطور الحالة مهم للتقييم.', isDanger: false },
      { id: 'gen.tried', slot: 'tried', text: 'عملت إشي لحد هلأ؟ أخدت دوا أو حطيت إشي؟', why: 'نحتاج نعرف إذا في علاج مبدئي تم.', isDanger: false },
    ],
    extraQuestions: [
      { id: 'gen.history', slot: 'history', text: 'صار معك هالشي قبل؟', why: 'التاريخ الطبي بيساعد بالتقييم.', isDanger: false },
      { id: 'gen.other', slot: 'other_symptoms', text: 'في أعراض ثانية مرافقة؟ مثل حرارة أو غثيان؟', why: 'الأعراض المرافقة بتساعد نوصل للتقييم الصحيح.', isDanger: false },
    ],
    result: {
      assessmentLabel: 'تقييم عام',
      summary: 'إصابة تحتاج متابعة طبية للتأكد من التشخيص.',
      riskLevel: 'LOW',
      careDirection: 'SEE_DOCTOR_24H',
      careDirectionReason: 'راجع طبيب للتأكد من التشخيص.',
      firstAidSteps: [
        { text: 'أرح المنطقة المصابة', duration: 'حسب الحاجة' },
        { text: 'راقب الأعراض وسجّلها', duration: 'لحد ما تراجع الطبيب' },
      ],
      treatments: [
        { id: 'paracetamol', name: 'باراسيتامول', purpose: 'مسكّن للألم', usage: 'حسب تعليمات العبوة عند الحاجة', suitability: 'suitable', reason: null },
      ],
      avoid: ['لا تتجاهل أي تغير مفاجئ بالحالة'],
      goToErIf: ['ألم شديد مفاجئ', 'صعوبة بالتنفس أو دوخة'],
      profileImpacts: [],
      sourceIds: ['general_001'],
      disclaimer: 'هذا تقييم مبدئي وليس تشخيصاً طبياً نهائياً.',
    },
  },
};
