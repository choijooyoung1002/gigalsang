import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, RotateCcw } from 'lucide-react';
import { calculateDetailedResult, questions } from '@/data/newSociologyTest';
import confetti from 'canvas-confetti';
import { useState, useEffect } from 'react';

const SociologyTestResult = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const e = Number(params.get('e'));
  const c = Number(params.get('c'));
  const s = Number(params.get('s'));
  const i = Number(params.get('i'));

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [e, c, s, i]);

  // 점수 4개가 모두 있으면 Answer[]로 변환
  let result = null;
  if (!isNaN(e) && !isNaN(c) && !isNaN(s) && !isNaN(i)) {
    // 질문 id에 맞게 점수 매핑 (18, 22: empathy / 9, 12: conflict / 1, 3: structure / 2: innovation)
    const answers = [
      { questionId: 18, value: Math.round(e / 20) },
      { questionId: 22, value: Math.round(e / 20) },
      { questionId: 9, value: Math.round(c / 20) },
      { questionId: 12, value: Math.round(c / 20) },
      { questionId: 1, value: Math.round(s / 20) },
      { questionId: 3, value: Math.round(s / 20) },
      { questionId: 2, value: 5 - Math.round(i / 20) },
    ];
    result = calculateDetailedResult(answers);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-4xl animate-bounce mb-4">자세한 내용은 4층 창체부로...</div>
        <div className="w-16 h-16 border-4 border-dashed border-gray-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!result) return <div>결과가 없습니다.</div>;

  const shareResult = () => {
    const shareText = `나는 ${result.funnyTitle}! (${result.percentage}%)\n${result.description}\n\n사회학 성향 테스트 해보기: ${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: '사회학 성향 테스트 결과',
        text: shareText,
      }).catch(() => {
        navigator.clipboard.writeText(shareText);
        alert('결과가 복사되었습니다!');
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('결과가 복사되었습니다!');
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-dashed border-black bg-white shadow-none">
          <CardHeader className="text-center pb-6">
            <div className="text-4xl mb-4">{result.emojis.join(' ')}</div>
            <CardTitle className="text-3xl font-bold text-black mb-2">
              {result.funnyTitle}
            </CardTitle>
            <p className="text-lg text-gray-700 mb-6">{result.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              주요 성향: {result.title} {result.percentage}%
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* 특징 */}
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-black mb-4">✨ 나의 특징</h3>
              <div className="grid grid-cols-1 gap-3">
                {result.characteristics.map((characteristic, index) => (
                  <div key={index} className="text-gray-700 text-sm">
                    {characteristic}
                  </div>
                ))}
              </div>
            </div>
            {/* 세부 점수 */}
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-black mb-4">📊 세부 분석</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl">😊</div>
                  <div className="text-sm font-semibold">공감력</div>
                  <div className="text-lg font-bold">{result.detailedScores.empathy}%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">⚔️</div>
                  <div className="text-sm font-semibold">갈등 성향</div>
                  <div className="text-lg font-bold">{result.detailedScores.conflict}%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">🏗️</div>
                  <div className="text-sm font-semibold">구조 선호</div>
                  <div className="text-lg font-bold">{result.detailedScores.structure}%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">💡</div>
                  <div className="text-sm font-semibold">혁신성</div>
                  <div className="text-lg font-bold">{result.detailedScores.innovation}%</div>
                </div>
              </div>
            </div>
            {/* 다른 유형 비율 */}
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-black mb-4">📈 전체 결과</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">긍정뇌 기능론 😊</span>
                  <span className="font-bold">{result.otherPercentages.functionalism1}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">FM교관 기능론 📏</span>
                  <span className="font-bold">{result.otherPercentages.functionalism2}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">불만MAX 갈등론 ✊</span>
                  <span className="font-bold">{result.otherPercentages.conflict1}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">음모론 갈등론 🔍</span>
                  <span className="font-bold">{result.otherPercentages.conflict2}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">눈치왕 상상론 👀</span>
                  <span className="font-bold">{result.otherPercentages.symbolic1}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">관계갈망 불안형 상상론 💝</span>
                  <span className="font-bold">{result.otherPercentages.symbolic2}%</span>
                </div>
              </div>
            </div>
            {/* 관계 */}
            <div className="flex flex-col gap-4">
              <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg flex items-center">
                <span className="text-2xl mr-3">🤝</span>
                <div>
                  <div className="font-bold text-green-700">잘 맞는 타입</div>
                  <div className="text-green-800">찰떡궁합! 이런 타입과 함께라면 시너지 폭발!</div>
                  <div className="text-green-600 font-semibold mt-1">{result.relationships.bestMatch}</div>
                </div>
              </div>
              <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg flex items-center">
                <span className="text-2xl mr-3">⚡️</span>
                <div>
                  <div className="font-bold text-red-700">부딪힐 수 있는 타입</div>
                  <div className="text-red-800">티키타카가 필요! 이런 타입과는 가끔 충돌할 수도?</div>
                  <div className="text-red-600 font-semibold mt-1">{result.relationships.worstMatch}</div>
                </div>
              </div>
            </div>
            {/* 유사 유형 */}
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-black mb-4">🎭 비슷한 유형</h3>
              <div className="flex flex-wrap gap-2">
                {result.similarTypes.map((type, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 border border-dashed border-gray-400 rounded text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
            
              <Button 
                onClick={() => window.location.href = '/'}
                className="flex-1 border-2 border-dashed border-black bg-white text-black hover:bg-black hover:text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                다시 테스트
              </Button>
              <Button 
                onClick={shareResult}
                className="flex-1 bg-black text-white border-2 border-dashed border-black text-lg font-bold hover:bg-white hover:text-black transition-all"
              >
                <Share2 className="w-4 h-4 mr-2" />
                결과 공유하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SociologyTestResult; 