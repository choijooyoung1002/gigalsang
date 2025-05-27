import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { questions, calculateDetailedResult, type Answer, type DetailedResult } from '@/data/newSociologyTest';
import { Share2, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SociologyTest = () => {
  const [started, setStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [pageAnswers, setPageAnswers] = useState<{ [key: number]: number }>({});
  const [result, setResult] = useState<DetailedResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questionsPerPage = 7;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const bgColors = [
    "bg-blue-500",
    "bg-blue-400",
    "bg-gray-400",
    "bg-red-400",
    "bg-red-500"
  ];
  const borderColors = [
    "border-blue-600",
    "border-blue-500",
    "border-gray-500",
    "border-red-500",
    "border-red-600"
  ];

  // 질문을 랜덤하게 섞는 함수
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  const currentPageQuestions = shuffledQuestions.slice(
    currentPage * questionsPerPage, 
    (currentPage + 1) * questionsPerPage
  );

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (questionId: number, value: number) => {
    const newPageAnswers = { ...pageAnswers, [questionId]: value };
    setPageAnswers(newPageAnswers);
  };

  const nextPage = () => {
    // 현재 페이지의 모든 답변이 있는지 확인
    const currentPageIds = currentPageQuestions.map(q => q.id);
    const hasAllAnswers = currentPageIds.every(id => pageAnswers[id]);
    
    if (!hasAllAnswers) {
      toast({
        title: "모든 질문에 답해주세요!",
        description: "페이지의 모든 질문에 답변한 후 다음으로 진행할 수 있습니다.",
        variant: "destructive"
      });
      return;
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setCurrentQuestionIndex(0);
    } else {
      // 마지막 페이지 완료 - 결과 계산
      const allAnswers: Answer[] = Object.entries(pageAnswers).map(([questionId, value]) => ({
        questionId: parseInt(questionId),
        value
      }));
      
      const testResult = calculateDetailedResult(allAnswers);
      setResult(testResult);
      setAnswers(allAnswers);
      setShowResult(true);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setCurrentQuestionIndex(0);
    }
  };

  const resetTest = () => {
    setStarted(false);
    setCurrentPage(0);
    setAnswers([]);
    setPageAnswers({});
    setResult(null);
    setShowResult(false);
    setShuffledQuestions(shuffleArray(questions));
    setCurrentQuestionIndex(0);
  };

  const shareResult = () => {
    if (result) {
      const shareText = `나는 ${result.funnyTitle}! (${result.percentage}%)\n${result.description}\n\n사회학 성향 테스트 해보기: ${window.location.href}`;
      
      if (navigator.share) {
        navigator.share({
          title: '사회학 성향 테스트 결과',
          text: shareText,
        }).catch(() => {
          navigator.clipboard.writeText(shareText);
          toast({
            title: "결과가 복사되었습니다!",
            description: "클립보드에 복사된 내용을 SNS에 공유해보세요.",
          });
        });
      } else {
        navigator.clipboard.writeText(shareText);
        toast({
          title: "결과가 복사되었습니다!",
          description: "클립보드에 복사된 내용을 SNS에 공유해보세요.",
        });
      }
    }
  };

  // 시작 페이지
  if (!started) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-2 border-dashed border-black bg-white shadow-none">
          <CardHeader className="text-center pb-6">
            <div className="text-6xl mb-4">🧠</div>
            <CardTitle className="text-3xl font-bold text-black mb-4">
              사회학 성향 테스트
            </CardTitle>
            <p className="text-lg text-gray-700 leading-relaxed">
              25개의 질문으로 알아보는<br />
              나의 사회학적 관점! 🤔
            </p>
            <div className="text-sm text-gray-500 mt-4">
              기능론 · 갈등론 · 상징적 상호작용론
            </div>
            <div className="text-xs text-gray-400 mt-2">
              4페이지 × 7문항씩 (랜덤 순서)
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={handleStart}
              className="w-full py-6 text-lg font-semibold bg-black text-white hover:bg-gray-800 border-2 border-dashed border-transparent hover:border-black hover:bg-white hover:text-black transition-all"
            >
              시작하기 <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 결과 페이지
  if (showResult && result) {
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
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-black mb-4">👥 인간관계</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold">💕 잘 맞는 타입: </span>
                    <span className="text-sm">{result.relationships.bestMatch}</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold">⚡ 부딪힐 수 있는 타입: </span>
                    <span className="text-sm">{result.relationships.worstMatch}</span>
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
                  onClick={shareResult} 
                  className="flex-1 bg-black text-white hover:bg-gray-800 border-2 border-dashed border-transparent hover:border-black hover:bg-white hover:text-black"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  결과 공유하기
                </Button>
                <Button 
                  onClick={resetTest} 
                  variant="outline"
                  className="flex-1 border-2 border-dashed border-black text-black hover:bg-black hover:text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  다시 테스트
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 질문 페이지 - 7개 질문 동시 표시
  const totalQuestions = questions.length;
  const currentQuestionStart = currentPage * questionsPerPage + 1;
  const currentQuestionEnd = Math.min(currentQuestionStart + questionsPerPage - 1, totalQuestions);
  const progress = (currentQuestionEnd / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-dashed border-black bg-white shadow-none">
          <CardHeader className="text-center">
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                페이지 {currentPage + 1} / {totalPages} · 질문 {currentQuestionStart}-{currentQuestionEnd} / {totalQuestions}
              </div>
              <Progress value={progress} className="h-2 bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 한 번에 하나의 질문만 표시 */}
            <div className="space-y-8">
              {currentPageQuestions.slice(0, currentQuestionIndex + 1).map((question, index) => (
                <div
                  key={question.id + '-' + index}
                  className="border-2 border-dashed border-gray-300 p-6 rounded-lg"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-2xl font-bold">Q.</div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-2">
                        질문 {currentQuestionStart + index}
                      </div>
                      <h3 className="text-lg font-semibold text-black leading-relaxed">
                        {question.question}
                      </h3>
                    </div>
                  </div>
                  {/* 5점 척도 선택 */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>전혀 아니다</span>
                      <span>매우 그렇다</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          onClick={() => {
                            handleAnswer(question.id, value);
                            // 마지막 질문이 아니면 다음 질문 추가
                            if (
                              index === currentQuestionIndex &&
                              currentQuestionIndex < currentPageQuestions.length - 1
                            ) {
                              setCurrentQuestionIndex(currentQuestionIndex + 1);
                            }
                          }}
                          className={`w-12 h-12 rounded-full border-2 ${
                            pageAnswers[question.id] === value
                              ? `text-white ${bgColors[value-1]} ${borderColors[value-1]} border-solid`
                              : 'border-gray-400 hover:border-black border-dashed'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 네비게이션 버튼 */}
            <div className="flex justify-between items-center pt-6">
              <Button 
                onClick={prevPage}
                disabled={currentPage === 0}
                variant="outline"
                className="border-2 border-dashed border-gray-400 text-gray-600 hover:border-black hover:text-black disabled:opacity-30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                이전 페이지
              </Button>
              
              <div className="text-sm text-gray-500">
                {currentPageQuestions.filter(q => pageAnswers[q.id]).length} / {currentPageQuestions.length} 완료
              </div>
              
              <Button 
                onClick={nextPage} 
                disabled={!currentPageQuestions.every(q => pageAnswers[q.id])}
                className="px-8 py-3 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-dashed border-transparent hover:border-black hover:bg-white hover:text-black"
              >
                {currentPage === totalPages - 1 ? '결과 보기' : '다음 페이지'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SociologyTest;
