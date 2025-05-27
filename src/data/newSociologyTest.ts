
export interface Question {
  id: number;
  question: string;
  emoji: string;
}

export interface Answer {
  questionId: number;
  value: number; // 1-5 척도
}

export interface DetailedResult {
  type: 'functionalism1' | 'functionalism2' | 'conflict1' | 'conflict2' | 'symbolic1' | 'symbolic2';
  title: string;
  funnyTitle: string;
  description: string;
  percentage: number;
  otherPercentages: {
    functionalism1: number;
    functionalism2: number;
    conflict1: number;
    conflict2: number;
    symbolic1: number;
    symbolic2: number;
  };
  characteristics: string[];
  emojis: string[];
  relationships: {
    bestMatch: string;
    worstMatch: string;
  };
  similarTypes: string[];
  detailedScores: {
    empathy: number;
    conflict: number;
    structure: number;
    innovation: number;
  };
}

export const questions: Question[] = [
  // 페이지 1 (1-5번)
  {
    id: 1,
    question: "사회가 잘 돌아가려면 각자 맡은 역할에 충실해야 한다고 생각한다 ⚙️",
    emoji: "⚙️"
  },
  {
    id: 2,
    question: "큰 변화보다는 지금의 안정적인 상태가 유지되는 것이 마음 편하다 🏛️",
    emoji: "🏛️"
  },
  {
    id: 3,
    question: "다소 불편하더라도 사회 전체의 질서를 위해 정해진 규칙은 지켜야 한다 📏",
    emoji: "📏"
  },
  {
    id: 4,
    question: "오래된 전통이나 관습에는 다 그럴 만한 이유와 지혜가 담겨있다고 믿는다 📚",
    emoji: "📚"
  },
  {
    id: 5,
    question: "\"이 또한 지나가리라...\" 지금의 문제도 결국 사회가 더 좋아지기 위한 과정일 수 있다 🌅",
    emoji: "🌅"
  },
  
  // 페이지 2 (6-10번)
  {
    id: 6,
    question: "모든 존재는 나름의 쓸모가 있다! 하다못해 먼지 한 톨까지도! ✨",
    emoji: "✨"
  },
  {
    id: 7,
    question: "팀플 과제할 때, 각자 역할 분담 확실히 하고 딱 자기 것만 잘하면 A+ 각이라고 본다 📝",
    emoji: "📝"
  },
  {
    id: 8,
    question: "유행은 돌고 돈다지만, 결국 근본 있는 '클래식'이 최고다. 괜히 오래가는 게 아니다 🎭",
    emoji: "🎭"
  },
  {
    id: 9,
    question: "세상은 결국 힘 있는 자와 없는 자, 가진 자와 못 가진 자의 다툼터라고 생각한다 ⚔️",
    emoji: "⚔️"
  },
  {
    id: 10,
    question: "겉으로는 평화로워 보여도, 그 속에는 보이지 않는 권력 다툼이 항상 존재한다고 본다 👁️",
    emoji: "👁️"
  },

  // 페이지 3 (11-15번)
  {
    id: 11,
    question: "법이나 제도가 때로는 특정 집단에게만 유리하게 작용하는 것 같아 씁쓸하다 ⚖️",
    emoji: "⚖️"
  },
  {
    id: 12,
    question: "사회가 발전하려면 때로는 기존 질서에 정면으로 맞서는 용기도 필요하다 ✊",
    emoji: "✊"
  },
  {
    id: 13,
    question: "\"왜 나만 힘들어!\" 하는 생각이 들 때, 그 원인이 불공평한 사회 구조 때문인 것 같다 😤",
    emoji: "😤"
  },
  {
    id: 14,
    question: "회식 자리에서 부장님 눈치 보며 메뉴를 고르는 것도 사실은 작은 권력 투쟁이다! 🍺",
    emoji: "🍺"
  },
  {
    id: 15,
    question: "뉴스에서 기업 비리나 정치 스캔들을 보면 \"그럴 줄 알았지, 세상이 다 그렇지 뭐\" 싶을 때가 있다 📺",
    emoji: "📺"
  },

  // 페이지 4 (16-20번)
  {
    id: 16,
    question: "\"손님이 왕\"이라는 말, 가끔은 알바생 입장에서 보면 갑질로 느껴질 때가 있다 👑",
    emoji: "👑"
  },
  {
    id: 17,
    question: "똑같은 일이라도 내가 어떻게 받아들이냐에 따라 의미는 천차만별이라고 생각한다 🎪",
    emoji: "🎪"
  },
  {
    id: 18,
    question: "다른 사람들이 나를 어떻게 생각할지 은근히 신경 쓰이고, 그에 맞춰 행동하는 편이다 👀",
    emoji: "👀"
  },
  {
    id: 19,
    question: "말 한마디, 눈빛 하나에도 숨겨진 뜻이 있을 것 같아 곰곰이 생각할 때가 있다 🤔",
    emoji: "🤔"
  },
  {
    id: 20,
    question: "우리는 매일 상황에 따라 다른 가면을 쓰고 살아가는 배우와 같다고 느낀다 🎭",
    emoji: "🎭"
  },

  // 페이지 5 (21-25번)
  {
    id: 21,
    question: "친구가 내 카톡에 'ㅇㅇ' 이라고만 답하면, '혹시 내가 뭐 잘못했나...?' 하고 오만가지 생각을 한다 💭",
    emoji: "💭"
  },
  {
    id: 22,
    question: "\"척하면 삼천리!\" 나는 사람들 사이의 미묘한 분위기나 눈빛을 기가 막히게 잘 읽는 편이다 🔍",
    emoji: "🔍"
  },
  {
    id: 23,
    question: "내 인스타 피드는 곧 나의 페르소나! '좋아요' 개수에 따라 기분이 롤러코스터를 탄다 📱",
    emoji: "📱"
  },
  {
    id: 24,
    question: "소개팅 첫인상은 3초 안에 결정된다는데, 그 짧은 순간에 우리는 서로에게 어떤 '의미'를 주고받는 걸까 궁금하다 💕",
    emoji: "💕"
  },
  {
    id: 25,
    question: "친구들끼리만 아는 '우리만의 신조어'나 '별명'을 쓰는 건 왠지 모르게 끈끈한 유대감을 준다 👥",
    emoji: "👥"
  }
];

export const calculateDetailedResult = (answers: Answer[]): DetailedResult => {
  const scores = { 
    functionalism1: 0, 
    functionalism2: 0, 
    conflict1: 0, 
    conflict2: 0, 
    symbolic1: 0, 
    symbolic2: 0 
  };
  
  answers.forEach((answer) => {
    const { questionId, value } = answer;
    
    // 긍정뇌 기능론 (1-4번 질문)
    if ([1, 2, 3, 4].includes(questionId)) {
      scores.functionalism1 += value;
    }
    
    // FM교관 기능론 (5-8번 질문)
    if ([5, 6, 7, 8].includes(questionId)) {
      scores.functionalism2 += value;
    }
    
    // 불만MAX 갈등론 (9-12번 질문)
    if ([9, 10, 11, 12].includes(questionId)) {
      scores.conflict1 += value;
    }
    
    // 음모론 갈등론 (13-16번 질문)
    if ([13, 14, 15, 16].includes(questionId)) {
      scores.conflict2 += value;
    }
    
    // 눈치왕 상상론 (17-21번 질문)
    if ([17, 18, 19, 20, 21].includes(questionId)) {
      scores.symbolic1 += value;
    }
    
    // 관계갈망 불안형 상상론 (22-25번 질문)
    if ([22, 23, 24, 25].includes(questionId)) {
      scores.symbolic2 += value;
    }
  });

  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const percentages = {
    functionalism1: Math.round((scores.functionalism1 / total) * 100),
    functionalism2: Math.round((scores.functionalism2 / total) * 100),
    conflict1: Math.round((scores.conflict1 / total) * 100),
    conflict2: Math.round((scores.conflict2 / total) * 100),
    symbolic1: Math.round((scores.symbolic1 / total) * 100),
    symbolic2: Math.round((scores.symbolic2 / total) * 100)
  };

  const maxScore = Math.max(...Object.values(scores));
  let dominantType: 'functionalism1' | 'functionalism2' | 'conflict1' | 'conflict2' | 'symbolic1' | 'symbolic2' = 'functionalism1';

  for (const [type, score] of Object.entries(scores)) {
    if (score === maxScore) {
      dominantType = type as typeof dominantType;
      break;
    }
  }

  // 세부 점수 계산
  const detailedScores = {
    empathy: Math.round(((answers.find(a => a.questionId === 18)?.value || 0) + 
                       (answers.find(a => a.questionId === 22)?.value || 0)) / 2 * 20),
    conflict: Math.round(((answers.find(a => a.questionId === 9)?.value || 0) + 
                         (answers.find(a => a.questionId === 12)?.value || 0)) / 2 * 20),
    structure: Math.round(((answers.find(a => a.questionId === 1)?.value || 0) + 
                          (answers.find(a => a.questionId === 3)?.value || 0)) / 2 * 20),
    innovation: Math.round((5 - (answers.find(a => a.questionId === 2)?.value || 0)) * 20)
  };

  const results = {
    functionalism1: {
      title: '긍정뇌 기능론자',
      funnyTitle: '긍정뇌 기능론자',
      description: '세상 모든 현상을 사회 전체의 안정과 유지를 위한 필요악으로 해석하는 당신! 늘 미소를 띠지만 어딘가 지쳐 보여요.',
      characteristics: [
        '🏛️ 모든 현상을 순기능으로 해석함',
        '⚖️ 개인의 희생을 사회 전체를 위한 것으로 합리화',
        '😊 늘 긍정적이지만 공허한 눈빛',
        '🤝 사회 전체의 안정을 최우선으로 생각함'
      ],
      emojis: ['😊', '🏛️', '⚙️', '🌅'],
      relationships: {
        bestMatch: 'FM교관 기능론자',
        worstMatch: '불만MAX 갈등론자'
      },
      similarTypes: ['낙관주의자', '순응형 인간', '체제 옹호자']
    },
    functionalism2: {
      title: 'FM교관 기능론자',
      funnyTitle: 'FM교관 기능론자',
      description: '정해진 규칙과 절차에서 벗어나는 것을 극도로 경계하는 당신! 완벽주의적인 태도 뒤에 숨겨진 불안감이 특징이에요.',
      characteristics: [
        '📏 정해진 규칙과 절차를 철저히 준수',
        '🔍 작은 무질서에도 예민하게 반응',
        '💯 완벽주의적 성향',
        '⚡ 융통성 없다는 평가를 받기 쉬움'
      ],
      emojis: ['📏', '💯', '⚡', '🔍'],
      relationships: {
        bestMatch: '긍정뇌 기능론자',
        worstMatch: '음모론 갈등론자'
      },
      similarTypes: ['완벽주의자', '규칙 준수자', '질서 애호가']
    },
    conflict1: {
      title: '불만MAX 갈등론자',
      funnyTitle: '불만MAX 갈등론자',
      description: '세상의 모든 문제를 권력 관계와 불평등의 시각으로 날카롭게 분석하는 당신! 냉소적이지만 공허한 눈빛을 가지고 있어요.',
      characteristics: [
        '✊ 모든 문제를 권력 관계로 분석',
        '🔥 냉소적인 말투와 분노 표출',
        '💔 불합리한 구조 속에서 무력감 경험',
        '👁️ 날카로운 사회 비판 의식'
      ],
      emojis: ['✊', '🔥', '💔', '👁️'],
      relationships: {
        bestMatch: '음모론 갈등론자',
        worstMatch: '긍정뇌 기능론자'
      },
      similarTypes: ['사회 비판가', '불만족형 인간', '현실 비관론자']
    },
    conflict2: {
      title: '음모론 갈등론자',
      funnyTitle: '음모론 갈등론자',
      description: '사회 현상의 이면에 숨겨진 의도나 보이지 않는 세력의 개입을 끊임없이 의심하는 당신! 날카로운 관찰력으로 숨은 의미를 파헤쳐요.',
      characteristics: [
        '🔍 숨겨진 의도와 세력을 끊임없이 의심',
        '🤐 타인의 말을 쉽게 믿지 않음',
        '👀 날카로운 관찰력으로 이면 파악',
        '🏝️ 경계심과 예민함으로 고립되기 쉬움'
      ],
      emojis: ['🔍', '🤐', '👀', '🏝️'],
      relationships: {
        bestMatch: '불만MAX 갈등론자',
        worstMatch: 'FM교관 기능론자'
      },
      similarTypes: ['음모론자', '의심형 인간', '고독한 관찰자']
    },
    symbolic1: {
      title: '눈치왕 상상론자',
      funnyTitle: '눈치왕 상상론자',
      description: '타인의 미묘한 표정 변화나 말투 하나에도 민감하게 반응하는 당신! 관계에 대한 갈망이 크지만 거절에 대한 두려움도 커요.',
      characteristics: [
        '👀 타인의 미묘한 표정 변화에 민감',
        '💭 끊임없는 의미 해석과 분석',
        '💕 관계에 대한 갈망과 거절에 대한 두려움',
        '😟 불안정한 눈빛과 예민한 반응'
      ],
      emojis: ['👀', '💭', '💕', '😟'],
      relationships: {
        bestMatch: '관계갈망 불안형 상상론자',
        worstMatch: 'FM교관 기능론자'
      },
      similarTypes: ['눈치쟁이', '감정 읽기 전문가', '관계 불안형']
    },
    symbolic2: {
      title: '관계갈망 불안형 상상론자',
      funnyTitle: '관계갈망 불안형 상상론자',
      description: '타인과의 관계에서 끊임없이 의미와 인정을 찾으려 하지만, 거절이나 오해에 대한 두려움으로 늘 불안해하는 당신! 소통을 갈망하는 애처로운 눈빛이 특징이에요.',
      characteristics: [
        '💝 타인과의 관계에서 의미와 인정 추구',
        '😰 거절과 오해에 대한 강한 두려움',
        '📱 상대방의 작은 반응에 민감하게 반응',
        '💔 부정적 해석 경향과 쉽게 상처받는 마음'
      ],
      emojis: ['💝', '😰', '📱', '💔'],
      relationships: {
        bestMatch: '눈치왕 상상론자',
        worstMatch: '음모론 갈등론자'
      },
      similarTypes: ['관계 의존형', '인정 욕구형', '소통 갈망형']
    }
  };

  const result = results[dominantType];

  return {
    type: dominantType,
    title: result.title,
    funnyTitle: result.funnyTitle,
    description: result.description,
    percentage: percentages[dominantType],
    otherPercentages: percentages,
    characteristics: result.characteristics,
    emojis: result.emojis,
    relationships: result.relationships,
    similarTypes: result.similarTypes,
    detailedScores
  };
};
