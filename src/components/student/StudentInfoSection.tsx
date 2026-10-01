import React, { useState, useEffect } from 'react';
import { User, School, CheckCircle2, AlertCircle, Edit3, Sparkles } from 'lucide-react';
import { StudentInfo, ALL_GRADES, CLASS_SECTIONS } from '../../types/student';
import { getCurrentStudent, setCurrentStudent } from '../../utils/studentStorage';

interface StudentInfoSectionProps {
  student: StudentInfo | null;
  onStudentChange: (student: StudentInfo) => void;
  error?: string | null;
  defaultGrade?: number;
}

export const StudentInfoSection: React.FC<StudentInfoSectionProps> = ({
  student,
  onStudentChange,
  error,
  defaultGrade = 5,
}) => {
  const [fullName, setFullName] = useState<string>(student?.fullName || '');
  const [selectedGrade, setSelectedGrade] = useState<number>(
    student?.grade || (defaultGrade >= 1 && defaultGrade <= 5 ? defaultGrade : 5)
  );
  const [selectedSection, setSelectedSection] = useState<string>(
    student?.className ? student.className.replace(/^[0-9]/, '') : ''
  );
  const [isEditing, setIsEditing] = useState<boolean>(!student?.fullName || !student?.className);
  const [localError, setLocalError] = useState<string | null>(null);

  // Synchronize when external student prop changes
  useEffect(() => {
    if (student) {
      setFullName(student.fullName);
      setSelectedGrade(student.grade);
      setSelectedSection(student.className.replace(/^[0-9]/, ''));
    }
  }, [student]);

  const handleGradeChange = (grade: number) => {
    setSelectedGrade(grade);
    if (selectedSection) {
      const newClass = `${grade}${selectedSection}`;
      updateStudent(fullName, newClass, grade);
    }
  };

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
    const newClass = `${selectedGrade}${section}`;
    updateStudent(fullName, newClass, selectedGrade);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFullName(val);
    if (selectedSection) {
      const cls = `${selectedGrade}${selectedSection}`;
      updateStudent(val, cls, selectedGrade);
    }
  };

  const updateStudent = (name: string, cls: string, gr: number) => {
    setLocalError(null);
    const trimmed = name.trim();
    if (trimmed && cls) {
      const newInfo: StudentInfo = {
        fullName: trimmed,
        className: cls,
        grade: gr,
      };
      setCurrentStudent(newInfo);
      onStudentChange(newInfo);
    }
  };

  const handleSaveConfirmed = () => {
    const trimmed = fullName.trim();
    if (!trimmed) {
      setLocalError('Full name is required. / Vui lòng nhập họ và tên.');
      return;
    }
    if (!selectedSection) {
      setLocalError('Please select your class. / Vui lòng chọn lớp học.');
      return;
    }
    const cls = `${selectedGrade}${selectedSection}`;
    const newInfo: StudentInfo = {
      fullName: trimmed,
      className: cls,
      grade: selectedGrade,
    };
    setCurrentStudent(newInfo);
    onStudentChange(newInfo);
    setIsEditing(false);
  };

  const activeClassName = selectedSection ? `${selectedGrade}${selectedSection}` : '';
  const isSavedAndValid = !!(student?.fullName && student?.className && !isEditing);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs mb-6 transition-all">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg shadow-2xs">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
                THÔNG TIN HỌC SINH (STUDENT INFORMATION)
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                Bắt buộc
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Nhập họ tên và chọn lớp để lưu kết quả bài làm và xuất danh sách Excel
            </p>
          </div>
        </div>

        {isSavedAndValid && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Đổi thông tin</span>
          </button>
        )}
      </div>

      {/* Error Notice */}
      {(error || localError) && (
        <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-start gap-2.5 animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">
              {error || localError}
            </p>
            <p className="text-[11px] text-rose-600 font-normal mt-0.5">
              “Please enter your full name and select your class before starting.” / “Vui lòng nhập họ và tên và chọn lớp trước khi bắt đầu.”
            </p>
          </div>
        </div>
      )}

      {/* When Already Valid & Not in Edit Mode: Display Clean Card */}
      {isSavedAndValid ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-2xl p-4 sm:p-5 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-display font-black text-xl shadow-xs">
              {student.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Học sinh:
                </span>
                <span className="font-display font-black text-lg text-slate-900">
                  {student.fullName}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 mt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white border border-blue-200 text-blue-800 font-bold">
                  <School className="w-3 h-3 text-blue-600" />
                  Lớp: {student.className}
                </span>
                <span>Khối: Lớp {student.grade}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Sẵn sàng làm bài
            </span>
          </div>
        </div>
      ) : (
        /* Edit / Input Mode */
        <div className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              FULL NAME · Họ và tên <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={handleNameChange}
                placeholder="Enter your full name / Nhập họ và tên (Ví dụ: Nguyễn Minh Anh)"
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none text-slate-900 text-sm font-semibold placeholder:text-slate-400 shadow-2xs transition-colors"
                autoComplete="name"
              />
              {fullName.trim().length > 0 && (
                <div className="absolute right-3.5 top-3.5 text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Gõ đầy đủ họ và tên có dấu hoặc không dấu. Hệ thống giữ nguyên họ tên để lưu kết quả.
            </p>
          </div>

          {/* Class Selection: Grade Selector + Section Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              CLASS · Lớp học <span className="text-rose-500">*</span>
            </label>

            {/* Step 1: Grade Selection (Grade 1 to 5) */}
            <div className="mb-2.5">
              <span className="text-[11px] font-bold text-slate-500 block mb-1">
                1. Chọn Khối lớp (Select Grade):
              </span>
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {ALL_GRADES.map((grade) => {
                  const isSelected = selectedGrade === grade;
                  return (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => handleGradeChange(grade)}
                      className={`py-2 px-2 text-center rounded-xl font-bold text-xs transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs scale-102 ring-2 ring-blue-400'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      Khối {grade}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Class Section (A1 to A9) */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 block mb-1">
                2. Chọn Lớp (Select Class Section in Grade {selectedGrade}):
              </span>
              <div className="grid grid-cols-9 gap-1 sm:gap-1.5">
                {CLASS_SECTIONS.map((sec) => {
                  const fullCls = `${selectedGrade}${sec}`;
                  const isSelected = selectedSection === sec;
                  return (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => handleSectionSelect(sec)}
                      className={`py-2 px-1 text-center rounded-xl font-extrabold text-xs transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs scale-105 ring-2 ring-indigo-300'
                          : 'bg-slate-50 hover:bg-blue-50 border border-slate-200 text-slate-800'
                      }`}
                    >
                      {fullCls}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Class confirmation pill */}
            <div className="mt-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold">Lớp đã chọn:</span>
                {activeClassName ? (
                  <span className="px-3 py-1 rounded-xl bg-indigo-100 text-indigo-900 font-extrabold text-sm border border-indigo-200">
                    {activeClassName} (Khối {selectedGrade})
                  </span>
                ) : (
                  <span className="text-rose-600 font-bold italic">
                    Chưa chọn lớp (Vui lòng click chọn 1 lớp ở trên)
                  </span>
                )}
              </div>

              {student?.fullName && (
                <button
                  type="button"
                  onClick={handleSaveConfirmed}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
                >
                  Xác nhận
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
