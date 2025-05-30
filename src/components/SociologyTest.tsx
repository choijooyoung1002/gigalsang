import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { questions, calculateDetailedResult, type Answer, type DetailedResult } from '@/data/newSociologyTest';
import { Share2, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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

  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    if (questionRefs.current[currentQuestionIndex]) {
      questionRefs.current[currentQuestionIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentQuestionIndex]);

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
      // 결과를 base64로 인코딩하여 쿼리스트링으로 넘김 -> 점수만 넘기기
      const e = testResult.detailedScores.empathy;
      const c = testResult.detailedScores.conflict;
      const s = testResult.detailedScores.structure;
      const i = testResult.detailedScores.innovation;
      navigate(`/result?e=${e}&c=${c}&s=${s}&i=${i}`);
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
                  ref={el => questionRefs.current[index] = el}
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
                {currentPageQuestions.filter(q => pageAnswers[q.id]).length} / {currentPageQuestions.length}
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
