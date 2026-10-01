import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  XCircle,
  Award,
  Volume2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Compass,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { ClcUnitLesson, ClcQuestion } from '../../types/clc';
import { processAndValidateClcQuestions, getSanitizedAudioText } from '../../data/clcQuestionValidator';

interface ClcLessonViewerProps {
  lesson: ClcUnitLesson;
  onStartLessonPractice: (questions: ClcQuestion[]) => void;
}

type LessonTab = 'focus' | 'rules' | 'examples' | 'practice' | 'challenge' | 'review';

export const ClcLessonViewer: React.FC<ClcLessonViewerProps> = ({
  lesson,
  onStartLessonPractice,
}) => {
  const [activeTab, setActiveTab] = useState<LessonTab>('focus');

  // Interactive inline answers state
  const [userInlineAnswers, setUserInlineAnswers] = useState<Record<string, string>>({});
  const [revealedInlineExplanations, setRevealedInlineExplanations] = useState<Record<string, boolean>>({});

  // Audio speech synthesis helper with sanitized text
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const sanitizedSpeech = getSanitizedAudioText(text);
      const utterance = new SpeechSynthesisUtterance(sanitizedSpeech);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectInlineOption = (questionId: string, optionId: string) => {
    setUserInlineAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setRevealedInlineExplanations((prev) => ({ ...prev, [questionId]: true }));
  };

  // Proofread, validate, and evenly randomize options across A/B/C/D
  const practiceQuestions = useMemo(
    () => processAndValidateClcQuestions(lesson.practiceQuestions),
    [lesson.practiceQuestions]
  );
  const challengeQuestions = useMemo(
    () => processAndValidateClcQuestions(lesson.challengeQuestions),
    [lesson.challengeQuestions]
  );
  const reviewQuestions = useMemo(
    () => processAndValidateClcQuestions(lesson.reviewQuestions),
    [lesson.reviewQuestions]
  );

  const allLessonQuestions = useMemo(
    () => [...practiceQuestions, ...challengeQuestions, ...reviewQuestions],
    [practiceQuestions, challengeQuestions, reviewQuestions]
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-100 shadow-xs mb-8 transition-all">
      {/* Unit Header Badge & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-rose-100">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-rose-600 text-white text-xs font-black rounded-lg uppercase tracking-wider shadow-xs">
              U{lesson.unitNumber} CLC LESSON
            </span>
            <span className="px-2.5 py-1 bg-rose-50 text-rose-800 text-xs font-bold rounded-lg border border-rose-200">
              {lesson.unitTitle}
            </span>
            <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-lg border border-amber-200 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              {lesson.targetLevel}
            </span>
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
            {lesson.grammarFocus.vietnameseTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            Topic: <span className="font-bold text-slate-800">{lesson.topic}</span>
          </p>
        </div>

        {/* Practice Quick Button */}
        <button
          onClick={() => onStartLessonPractice(allLessonQuestions)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white text-xs sm:text-sm font-black shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>LÀM BÀI TẬP BÀI NÀY ({allLessonQuestions.length} CÂU)</span>
        </button>
      </div>

      {/* 6 Structured Section Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 my-5 overflow-x-auto pb-1 border-b border-slate-100">
        {[
          { key: 'focus', label: '1. Grammar Focus', icon: Compass, count: null },
          { key: 'rules', label: '2. Quick Rule', icon: Lightbulb, count: null },
          { key: 'examples', label: '3. Examples', icon: Volume2, count: lesson.examples.length },
          { key: 'practice', label: '4. Practice', icon: BookOpen, count: lesson.practiceQuestions.length },
          { key: 'challenge', label: '5. Challenge (Gr 6-7)', icon: Zap, count: lesson.challengeQuestions.length },
          { key: 'review', label: '6. Review Check', icon: CheckCircle2, count: lesson.reviewQuestions.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as LessonTab)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: GRAMMAR FOCUS */}
      {activeTab === 'focus' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-rose-600 text-white text-[11px] font-extrabold uppercase tracking-wider">
                {lesson.grammarFocus.badge}
              </span>
              <span className="text-xs font-bold text-rose-700">
                {lesson.grammarFocus.levelTag}
              </span>
            </div>
            <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 mb-2">
              {lesson.grammarFocus.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {lesson.grammarFocus.overview}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Mục tiêu đề thi tuyển sinh CLC (Chuyên Ngoại Ngữ, Cầu Giấy, Amsterdam, Marie Curie):
              </div>
              <div className="text-xs text-slate-600 mt-0.5 font-medium">
                {lesson.grammarFocus.targetExams}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('rules')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Xem Quy Tắc Nhanh (Quick Rule)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: QUICK RULE */}
      {activeTab === 'rules' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
            <div className="text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Tóm tắt quy tắc cốt lõi</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              {lesson.quickRule.summary}
            </p>
          </div>

          {/* Formulas */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Công thức và Mẫu câu chuẩn:
            </h4>
            {lesson.quickRule.formulas.map((f, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-rose-200 transition-colors"
              >
                <div className="font-mono font-bold text-xs sm:text-sm text-rose-700 bg-rose-50/80 px-2.5 py-1 rounded-md inline-block mb-1">
                  {f.pattern}
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">{f.meaning}</div>
                <div className="text-xs text-slate-500 font-medium italic mt-0.5">{f.usageVi}</div>
              </div>
            ))}
          </div>

          {/* Golden Rules */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
            <div className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>3 Quy Tắc Vàng Ghi Nhớ Khi Làm Bài Thi Chuyên:</span>
            </div>
            <ul className="space-y-1.5">
              {lesson.quickRule.goldenRulesVi.map((rule, idx) => (
                <li key={idx} className="text-xs text-emerald-950 font-medium flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistake Alert */}
          <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4">
            <div className="text-xs font-extrabold text-red-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Cảnh Báo Lỗi Sai Học Sinh Rất Hay Mắc Phải:</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-start gap-2 text-red-800 line-through font-mono">
                <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>{lesson.quickRule.commonMistakeAlert.wrongExample}</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-800 font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{lesson.quickRule.commonMistakeAlert.correctExample}</span>
              </div>
              <div className="text-slate-600 italic font-medium pl-5">
                💡 <span className="font-semibold text-slate-800">Giải thích:</span> {lesson.quickRule.commonMistakeAlert.whyVi}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveTab('focus')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              ← Quay lại Focus
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Xem Ví Dụ Ngữ Cảnh ({lesson.examples.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: EXAMPLES */}
      {activeTab === 'examples' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          <div className="text-xs text-slate-500 font-medium mb-1">
            Ví dụ mẫu chuẩn xác sử dụng trực tiếp từ vựng bài học{' '}
            <span className="font-bold text-slate-800">"{lesson.unitTitle}"</span>, tích hợp phát âm tiếng Anh chuẩn:
          </div>

          {lesson.examples.map((ex, idx) => (
            <div
              key={ex.id || idx}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-rose-300 transition-all shadow-2xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display font-bold text-sm sm:text-base text-slate-900">
                    {ex.english}
                  </div>
                  <div className="text-xs text-slate-600 font-medium mt-1">
                    {ex.vietnamese}
                  </div>
                </div>

                <button
                  onClick={() => handleSpeak(ex.english)}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-slate-200/70 flex items-center gap-2 text-[11px] text-rose-800 font-medium">
                <span className="px-2 py-0.5 bg-rose-100/80 text-rose-900 rounded-md font-bold shrink-0">
                  Ghi chú ngữ pháp
                </span>
                <span>{ex.grammarNote}</span>
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveTab('rules')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              ← Quay lại Quick Rule
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Luyện Tập Trắc Nghiệm ({lesson.practiceQuestions.length} câu)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: PRACTICE (Interactive in-line) */}
      {activeTab === 'practice' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Phần 4: Bài tập tương tác rèn luyện mức độ Grade 5 Review
            </div>
            <button
              onClick={() => onStartLessonPractice(practiceQuestions)}
              className="text-xs font-black text-rose-600 hover:text-rose-700 underline cursor-pointer"
            >
              Làm ở giao diện Full Test →
            </button>
          </div>

          {practiceQuestions.map((q, idx) => {
            const userChoice = userInlineAnswers[q.id];
            const isRevealed = revealedInlineExplanations[q.id];
            const isCorrect = userChoice === q.correctAnswer;
            const correctOpt = q.options.find((o) => o.id === q.correctAnswer);
            const correctDisplayLabel = correctOpt?.label || q.correctAnswer.toUpperCase().replace('OPT_', '');

            return (
              <div
                key={q.id || idx}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-rose-600 uppercase tracking-wider">
                    CÂU {idx + 1} · {q.grammarRuleTitle}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Difficulty: {q.difficultyScore}/10
                  </span>
                </div>

                <div className="text-xs font-medium text-slate-500 italic">
                  {q.instruction}
                </div>

                <div className="font-display font-bold text-sm sm:text-base text-slate-900 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {q.promptText}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt) => {
                    const isSelected = userChoice === opt.id;
                    const isOptionCorrect = opt.id === q.correctAnswer;

                    let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';
                    if (isRevealed) {
                      if (isOptionCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'border-red-500 bg-red-50 text-red-900';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-rose-600 bg-rose-50 text-rose-900 font-bold';
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectInlineOption(q.id, opt.id)}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {opt.label || opt.id.toUpperCase()}
                        </span>
                        <span className="grow">{opt.text}</span>
                        {isRevealed && isOptionCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isRevealed && isSelected && !isOptionCorrect && (
                          <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback & Explanation */}
                {isRevealed && (
                  <div
                    className={`p-3.5 rounded-xl text-xs space-y-1 ${
                      isCorrect
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-950'
                        : 'bg-red-50 border border-red-200 text-red-950'
                    }`}
                  >
                    <div className="font-extrabold flex items-center gap-1.5">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Chính xác! (+10 Điểm CLC)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span>Chưa chính xác! Đáp án đúng là {correctDisplayLabel}</span>
                        </>
                      )}
                    </div>
                    <div className="text-slate-700 font-medium">{q.explanation}</div>
                    <div className="text-rose-700 font-bold pt-1">💡 Mẹo: {q.grammarTipVi}</div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveTab('examples')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              ← Quay lại Examples
            </button>
            <button
              onClick={() => setActiveTab('challenge')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Thử Sức Đề Thi Chuyên Lớp 6-7 ({lesson.challengeQuestions.length} câu)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: CHALLENGE (Grade 6-7 level) */}
      {activeTab === 'challenge' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-200 rounded-2xl flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600 fill-amber-600" />
                <span>PHẦN 5: BÀI TẬP NÂNG CAO ĐỀ THI VÀO LỚP 6 CLC</span>
              </div>
              <p className="text-xs text-slate-700 mt-0.5 font-medium">
                Dành cho học sinh ôn thi Chuyên Ngoại Ngữ, Amsterdam, Cầu Giấy, Archimedes với cấu trúc câu phức, đảo ngữ, chuyển đổi câu.
              </p>
            </div>
            <button
              onClick={() => onStartLessonPractice(challengeQuestions)}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-extrabold shadow-2xs hover:bg-amber-700 transition-all shrink-0 cursor-pointer"
            >
              Làm Full →
            </button>
          </div>

          {challengeQuestions.map((q, idx) => {
            const userChoice = userInlineAnswers[q.id];
            const isRevealed = revealedInlineExplanations[q.id];
            const isCorrect = userChoice === q.correctAnswer;
            const correctOpt = q.options.find((o) => o.id === q.correctAnswer);
            const correctDisplayLabel = correctOpt?.label || q.correctAnswer.toUpperCase().replace('OPT_', '');

            return (
              <div
                key={q.id || idx}
                className="p-4 sm:p-5 rounded-2xl border-2 border-amber-200/90 bg-white shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    THỬ THÁCH {idx + 1} · {q.gradeLevel}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black">
                    CLC SCORE: {q.difficultyScore}/10
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-600 italic">
                  {q.instruction}
                </div>

                <div className="font-display font-bold text-sm sm:text-base text-slate-900 bg-amber-50/50 p-3.5 rounded-xl border border-amber-100">
                  {q.promptText}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((opt) => {
                    const isSelected = userChoice === opt.id;
                    const isOptionCorrect = opt.id === q.correctAnswer;

                    let btnStyle = 'border-slate-200 hover:border-amber-300 bg-white text-slate-800';
                    if (isRevealed) {
                      if (isOptionCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'border-red-500 bg-red-50 text-red-950';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-amber-600 bg-amber-50 text-amber-950 font-bold';
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectInlineOption(q.id, opt.id)}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-900 font-black flex items-center justify-center text-xs shrink-0">
                          {opt.label || opt.id.toUpperCase()}
                        </span>
                        <span className="grow leading-relaxed">{opt.text}</span>
                        {isRevealed && isOptionCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isRevealed && isSelected && !isOptionCorrect && (
                          <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {isRevealed && (
                  <div
                    className={`p-3.5 rounded-xl text-xs space-y-1.5 ${
                      isCorrect
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-950'
                        : 'bg-red-50 border border-red-200 text-red-950'
                    }`}
                  >
                    <div className="font-extrabold flex items-center gap-1.5">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Xuất sắc! Đạt chuẩn học sinh thi Chuyên Grade 6-7</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span>Chưa chính xác! Đáp án đúng là {correctDisplayLabel}</span>
                        </>
                      )}
                    </div>
                    <div className="text-slate-700 font-medium leading-relaxed">{q.explanation}</div>
                    <div className="text-amber-800 font-bold">💡 Phân tích thi Chuyên: {q.grammarTipVi}</div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveTab('practice')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              ← Quay lại Practice
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Làm Bài Kiểm Tra Tổng Hợp (Review Check)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 6: REVIEW CHECK */}
      {activeTab === 'review' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                <span>PHẦN 6: KIỂM TRA NGỮ PHÁP TỔNG HỢP (MIXED GRAMMAR CHECK)</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                Đánh giá tổng quát mức độ ghi nhớ và phản xạ ngữ pháp cuối bài học.
              </p>
            </div>
            <button
              onClick={() => onStartLessonPractice(reviewQuestions)}
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-extrabold shadow-2xs hover:bg-rose-700 transition-all shrink-0 cursor-pointer"
            >
              Kiểm tra nhanh →
            </button>
          </div>

          {reviewQuestions.map((q, idx) => {
            const userChoice = userInlineAnswers[q.id];
            const isRevealed = revealedInlineExplanations[q.id];
            const isCorrect = userChoice === q.correctAnswer;
            const correctOpt = q.options.find((o) => o.id === q.correctAnswer);
            const correctDisplayLabel = correctOpt?.label || q.correctAnswer.toUpperCase().replace('OPT_', '');

            return (
              <div
                key={q.id || idx}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                    CHECK {idx + 1} · {q.grammarRuleTitle}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Difficulty: {q.difficultyScore}/10
                  </span>
                </div>

                <div className="font-display font-bold text-sm sm:text-base text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {q.promptText}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt) => {
                    const isSelected = userChoice === opt.id;
                    const isOptionCorrect = opt.id === q.correctAnswer;

                    let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';
                    if (isRevealed) {
                      if (isOptionCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'border-red-500 bg-red-50 text-red-900';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-slate-800 bg-slate-100 text-slate-950 font-bold';
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectInlineOption(q.id, opt.id)}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {opt.label || opt.id.toUpperCase()}
                        </span>
                        <span className="grow">{opt.text}</span>
                        {isRevealed && isOptionCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isRevealed && isSelected && !isOptionCorrect && (
                          <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {isRevealed && (
                  <div
                    className={`p-3.5 rounded-xl text-xs space-y-1 ${
                      isCorrect
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-950'
                        : 'bg-red-50 border border-red-200 text-red-950'
                    }`}
                  >
                    <div className="font-extrabold flex items-center gap-1.5">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Đã ghi nhớ chuẩn xác!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span>Cần lưu ý: Đáp án đúng là {correctDisplayLabel}</span>
                        </>
                      )}
                    </div>
                    <div className="text-slate-700 font-medium">{q.explanation}</div>
                    <div className="text-slate-800 font-bold pt-1">💡 Ghi nhớ: {q.grammarTipVi}</div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Full Practice Call to Action */}
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center space-y-3 mt-4">
            <h4 className="font-display font-extrabold text-base sm:text-lg text-rose-950">
              Sẵn sàng làm bài kiểm tra toàn diện cho {lesson.unitTitle}?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
              Bạn có thể bắt đầu phiên luyện tập đầy đủ gồm các câu hỏi từ cơ bản đến nâng cao với đồng hồ bấm giờ, chấm điểm tự động và bảng xếp hạng năng lực thi Chuyên.
            </p>
            <button
              onClick={() => onStartLessonPractice(allLessonQuestions)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-display font-extrabold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>BẮT ĐẦU LUYỆN TẬP TOÀN BỘ BÀI ({allLessonQuestions.length} CÂU HỎI)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
