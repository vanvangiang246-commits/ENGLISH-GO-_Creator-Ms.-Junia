import React, { useState } from 'react';
import {
  Award,
  Clock,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Building2,
  Layers,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { ClcExamConfig, ClcExamLength } from '../../types/clcExamBank';
import { getDifficultyQuota } from '../../data/clcExamBankEngine';

interface ClcExamSetupProps {
  onStartExam: (config: ClcExamConfig) => void;
  onBackToHome: () => void;
}

const SCHOOL_OPTIONS = [
  { id: 'all', name: 'Tất cả trường CLC', subtitle: 'Tổng hợp đề chuẩn hoá đa dạng' },
  { id: 'nam_tu_liem', name: 'THCS Nam Từ Liêm', subtitle: 'Cấu trúc đề chính thức các năm' },
  { id: 'luong_the_vinh', name: 'THCS & THPT Lương Thế Vinh', subtitle: 'Đề khảo sát & đề minh họa' },
  { id: 'nguyen_tat_thanh', name: 'THCS & THPT Nguyễn Tất Thành', subtitle: 'Đánh giá năng lực vào lớp 6' },
  { id: 'ngoi_sao', name: 'THCS Ngôi Sao Hà Nội', subtitle: 'Đề chọn học sinh giỏi & CLC' },
];

const LENGTH_OPTIONS: Array<{
  count: ClcExamLength;
  label: string;
  sub: string;
  timeMins: number;
  badge: string;
  desc: string;
}> = [
  {
    count: 10,
    label: '10 CÂU',
    sub: 'Khảo sát nhanh',
    timeMins: 15,
    badge: '15 phút',
    desc: 'Luyện tập tốc độ, kiểm tra nhanh kiến thức trọng tâm.',
  },
  {
    count: 20,
    label: '20 CÂU',
    sub: 'Tiêu chuẩn',
    timeMins: 30,
    badge: '30 phút',
    desc: 'Gói đề cơ bản với đầy đủ các dạng bài thi tuyển sinh.',
  },
  {
    count: 25,
    label: '25 CÂU',
    sub: 'Đề mở rộng',
    timeMins: 35,
    badge: '35 phút',
    desc: 'Định dạng đề thi thường gặp ở các đợt thi thử cấp trường.',
  },
  {
    count: 30,
    label: '30 CÂU',
    sub: 'Cấu trúc chuẩn',
    timeMins: 45,
    badge: '45 phút',
    desc: 'Tương đương thời lượng thi tuyển sinh chính thức.',
  },
  {
    count: 40,
    label: '40 CÂU',
    sub: 'Đề tổng hợp nâng cao',
    timeMins: 60,
    badge: '60 phút',
    desc: 'Thử thách chuyên sâu, rèn luyện bản lĩnh thi trường Chuyên & CLC.',
  },
];

export const ClcExamSetup: React.FC<ClcExamSetupProps> = ({ onStartExam, onBackToHome }) => {
  const [selectedLength, setSelectedLength] = useState<ClcExamLength>(30);
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [enableTimer, setEnableTimer] = useState<boolean>(true);

  const currentLengthConfig = LENGTH_OPTIONS.find((l) => l.count === selectedLength)!;
  const quotas = getDifficultyQuota(selectedLength);

  const handleStart = () => {
    onStartExam({
      length: selectedLength,
      schoolModelFilter: selectedSchool as any,
      timingMinutes: enableTimer ? currentLengthConfig.timeMins : undefined,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Top Breadcrumb & Return */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-rose-600 transition-colors"
        >
          <span>← Quay lại Trang chủ</span>
        </button>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
          Dành riêng cho Học sinh Lớp 5
        </span>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-400/30 backdrop-blur-sm">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>NGÂN HÀNG ĐỀ THI KHẢO SÁT NĂNG LỰC LỚP 6 CLC</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display mb-3">
            CLC EXAM BANK – GRADE 5
          </h1>
          <p className="text-rose-100 text-sm sm:text-base leading-relaxed mb-6 font-medium">
            Hệ thống đề thi tổng hợp mô phỏng kỳ thi đánh giá năng lực Tiếng Anh vào lớp 6 các trường Chất lượng cao
            (THCS Nam Từ Liêm, Lương Thế Vinh, Nguyễn Tất Thành, Ngôi Sao Hà Nội, Cầu Giấy, Amsterdam).
          </p>

          {/* Key Standards Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-xl px-3.5 py-2 border border-white/10 text-xs">
              <span className="text-lg">⚖️</span>
              <div>
                <div className="font-bold text-white">Tỷ lệ chuẩn CLC</div>
                <div className="text-rose-200">70% Lớp 5+ · 30% Mở rộng 6–7</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-xl px-3.5 py-2 border border-white/10 text-xs">
              <span className="text-lg">🎯</span>
              <div>
                <div className="font-bold text-white">Chính xác 100%</div>
                <div className="text-rose-200">Duy nhất 01 đáp án đúng / câu</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-xl px-3.5 py-2 border border-white/10 text-xs">
              <span className="text-lg">🔄</span>
              <div>
                <div className="font-bold text-white">Không lặp câu</div>
                <div className="text-rose-200">Tự động xáo trộn & cân bằng A/B/C/D</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Configuration Options */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Question Count Selection */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm">
                  1
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Chọn số lượng câu hỏi trong đề
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">10 / 20 / 25 / 30 / 40 câu</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {LENGTH_OPTIONS.map((opt) => {
                const isSelected = selectedLength === opt.count;
                return (
                  <button
                    key={opt.count}
                    onClick={() => setSelectedLength(opt.count)}
                    className={`relative p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between min-h-[110px] ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/70 text-rose-900 shadow-sm ring-2 ring-rose-400'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute -top-2 right-2 bg-rose-600 text-white rounded-full p-0.5 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {opt.badge}
                    </span>
                    <span className="font-extrabold text-lg sm:text-xl font-display my-1">
                      {opt.count}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600">
                      {opt.sub}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-start gap-2 border border-slate-200/80">
              <span className="text-rose-600 font-bold">ℹ️</span>
              <span>{currentLengthConfig.desc}</span>
            </div>
          </div>

          {/* 2. School Model Focus */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm">
                  2
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Mô hình trường tuyển sinh
                </h2>
              </div>
              <span className="text-xs font-medium text-slate-500">Mẫu đề thi mục tiêu</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SCHOOL_OPTIONS.map((school) => {
                const isSelected = selectedSchool === school.id;
                return (
                  <button
                    key={school.id}
                    onClick={() => setSelectedSchool(school.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/60 ring-1 ring-rose-400'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900">{school.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{school.subtitle}</div>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 mt-0.5 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Timer & Exam Rules Option */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">
                  Bật đồng hồ đếm ngược ({currentLengthConfig.timeMins} phút)
                </div>
                <div className="text-xs text-slate-500">
                  Mô phỏng áp lực thời gian phòng thi chính thức
                </div>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableTimer}
                onChange={(e) => setEnableTimer(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
          </div>
        </div>

        {/* Right Column: Exam Structure Summary & Launch Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs sticky top-24">
            <h3 className="font-bold text-base text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-rose-600" />
              <span>Cấu trúc đề thi sắp tạo</span>
            </h3>

            <div className="space-y-4 mb-6">
              {/* Question Count */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Tổng số câu hỏi:</span>
                <span className="font-bold text-slate-900">{selectedLength} câu</span>
              </div>

              {/* Time */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Thời gian làm bài:</span>
                <span className="font-bold text-slate-900">
                  {enableTimer ? `${currentLengthConfig.timeMins} phút` : 'Tự do (Không giới hạn)'}
                </span>
              </div>

              {/* Difficulty Split Visual */}
              <div className="pt-2">
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                  <span className="text-blue-700">70% Grade 5+ ({quotas.grade5Plus} câu)</span>
                  <span className="text-purple-700">30% Phân loại ({quotas.grade6_7} câu)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                  <div
                    style={{ width: `${Math.round((quotas.grade5Plus / selectedLength) * 100)}%` }}
                    className="bg-blue-500 h-full"
                    title={`Grade 5+: ${quotas.grade5Plus} câu`}
                  />
                  <div
                    style={{ width: `${Math.round((quotas.grade6_7 / selectedLength) * 100)}%` }}
                    className="bg-purple-600 h-full"
                    title={`Grade 6-7: ${quotas.grade6_7} câu`}
                  />
                </div>
              </div>

              {/* 14 Question Types Covered */}
              <div className="bg-slate-50 rounded-xl p-3.5 text-xs space-y-2 border border-slate-200/80">
                <div className="font-bold text-slate-800">Các dạng bài trong đề:</div>
                <ul className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
                  <li>• Phát âm & Trọng âm</li>
                  <li>• Tìm từ khác loại</li>
                  <li>• Ngữ pháp & Từ vựng</li>
                  <li>• Dạng đúng của từ</li>
                  <li>• Đồng nghĩa / Trái nghĩa</li>
                  <li>• Giao tiếp & Tục ngữ</li>
                  <li>• Tìm lỗi sai câu</li>
                  <li>• Điền từ đoạn văn</li>
                  <li>• Đọc hiểu văn bản</li>
                  <li>• Sắp xếp & Viết lại câu</li>
                </ul>
              </div>
            </div>

            {/* Launch CTA Button */}
            <button
              onClick={handleStart}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-extrabold text-base shadow-md shadow-rose-200 hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-98"
            >
              <span>BẮT ĐẦU LÀM BÀI THI</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-3 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Đề thi được kiểm duyệt chất lượng nghiêm ngặt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
