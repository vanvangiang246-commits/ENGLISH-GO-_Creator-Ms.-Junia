import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Download,
  Trash2,
  Search,
  Filter,
  Users,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  School,
  AlertTriangle,
} from 'lucide-react';
import { StudentAttemptRecord, ALL_GRADES, ALL_CLASSES } from '../../types/student';
import {
  getAllAttemptRecords,
  deleteAttemptRecord,
  clearAllAttemptRecords,
  exportRecordsToExcel,
  exportRecordsToCsv,
} from '../../utils/studentStorage';

interface TeacherRecordsDashboardProps {
  onClose: () => void;
}

export const TeacherRecordsDashboard: React.FC<TeacherRecordsDashboardProps> = ({ onClose }) => {
  const [records, setRecords] = useState<StudentAttemptRecord[]>(() => getAllAttemptRecords());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  const reloadRecords = () => {
    setRecords(getAllAttemptRecords());
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
      deleteAttemptRecord(id);
      reloadRecords();
    }
  };

  const handleClearAll = () => {
    clearAllAttemptRecords();
    reloadRecords();
    setShowClearConfirm(false);
  };

  // Filtered Records
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      // Grade filter
      if (gradeFilter !== 'all' && rec.grade !== Number(gradeFilter)) {
        return false;
      }
      // Class filter
      if (classFilter !== 'all' && rec.className !== classFilter) {
        return false;
      }
      // Type filter
      if (typeFilter !== 'all' && rec.testType !== typeFilter) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = rec.fullName.toLowerCase().includes(query);
        const matchesClass = rec.className.toLowerCase().includes(query);
        const matchesTest = rec.testName.toLowerCase().includes(query);
        const matchesStudentId = rec.studentId.toLowerCase().includes(query);
        if (!matchesName && !matchesClass && !matchesTest && !matchesStudentId) {
          return false;
        }
      }
      return true;
    });
  }, [records, gradeFilter, classFilter, typeFilter, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const total = filteredRecords.length;
    if (total === 0) {
      return { total: 0, uniqueStudents: 0, avgPercentage: 0, highestPercentage: 0 };
    }
    const studentNames = new Set(filteredRecords.map((r) => r.fullName.toLowerCase()));
    const totalPercentage = filteredRecords.reduce((acc, r) => acc + (r.percentage || 0), 0);
    const avgPercentage = Math.round(totalPercentage / total);
    const highestPercentage = Math.max(...filteredRecords.map((r) => r.percentage || 0));

    return {
      total,
      uniqueStudents: studentNames.size,
      avgPercentage,
      highestPercentage,
    };
  }, [filteredRecords]);

  // Available classes for selected grade
  const availableClasses = useMemo(() => {
    if (gradeFilter === 'all') return ALL_CLASSES;
    return ALL_CLASSES.filter((c) => c.startsWith(gradeFilter));
  }, [gradeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Navigation & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
            title="Quay lại ứng dụng"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black tracking-wider uppercase">
                ADMIN / TEACHER
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Hệ thống Quản lý Bài Làm & Xuất Excel
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight flex items-center gap-2 mt-0.5">
              <span>BẢNG KẾT QUẢ & XUẤT EXCEL</span>
              <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
            </h1>
          </div>
        </div>

        {/* Export Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => exportRecordsToExcel(filteredRecords)}
            disabled={filteredRecords.length === 0}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Excel (.xlsx)</span>
          </button>

          <button
            onClick={() => exportRecordsToCsv(filteredRecords)}
            disabled={filteredRecords.length === 0}
            className="px-3.5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Xuất CSV</span>
          </button>

          <button
            onClick={() => setShowClearConfirm(true)}
            disabled={records.length === 0}
            className="px-3 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
            title="Xóa toàn bộ bản ghi"
          >
            <Trash2 className="w-4 h-4" />
            <span>Xóa tất cả</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Clearing All */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-display font-black text-lg text-slate-900">
                Xác nhận xóa toàn bộ dữ liệu?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Thao tác này sẽ xóa tất cả {records.length} bài làm của học sinh trong máy. Bạn nên bấm "Xuất Excel" trước khi xóa.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-xs transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleClearAll}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-white text-xs shadow-sm transition-colors"
              >
                Đồng ý xóa sạch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng Lượt Bài</span>
            <FileSpreadsheet className="w-4 h-4 text-blue-500" />
          </div>
          <div className="font-display font-black text-2xl sm:text-3xl text-slate-900">
            {stats.total}
          </div>
          <span className="text-[11px] text-slate-500">Đã nộp bài</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Số Học Sinh</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-display font-black text-2xl sm:text-3xl text-emerald-700">
            {stats.uniqueStudents}
          </div>
          <span className="text-[11px] text-emerald-600">Học sinh khác nhau</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Điểm Trung Bình</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-display font-black text-2xl sm:text-3xl text-amber-600">
            {stats.avgPercentage}%
          </div>
          <span className="text-[11px] text-slate-500">Tỷ lệ chính xác chung</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Điểm Cao Nhất</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="font-display font-black text-2xl sm:text-3xl text-purple-700">
            {stats.highestPercentage}%
          </div>
          <span className="text-[11px] text-purple-600">Kỷ lục đạt được</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tên học sinh, lớp, tên bài thi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Grade Filter */}
            <select
              value={gradeFilter}
              onChange={(e) => {
                setGradeFilter(e.target.value);
                setClassFilter('all');
              }}
              className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none"
            >
              <option value="all">Tất cả Khối (1-5)</option>
              {ALL_GRADES.map((g) => (
                <option key={g} value={g}>
                  Khối {g}
                </option>
              ))}
            </select>

            {/* Class Filter */}
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none"
            >
              <option value="all">Tất cả Lớp ({availableClasses.length})</option>
              {availableClasses.map((cls) => (
                <option key={cls} value={cls}>
                  Lớp {cls}
                </option>
              ))}
            </select>

            {/* Test Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none"
            >
              <option value="all">Tất cả loại bài</option>
              <option value="Unit Practice">Luyện tập Unit</option>
              <option value="CLC Practice">Luyện thi CLC theo Chuyên đề</option>
              <option value="CLC Exam Bank">Đề thi CLC Tổng hợp</option>
            </select>

            <button
              onClick={reloadRecords}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              title="Tải lại danh sách"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter count indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Hiển thị <strong>{filteredRecords.length}</strong> / {records.length} bài làm
          </span>
          {(gradeFilter !== 'all' || classFilter !== 'all' || typeFilter !== 'all' || searchTerm) && (
            <button
              onClick={() => {
                setGradeFilter('all');
                setClassFilter('all');
                setTypeFilter('all');
                setSearchTerm('');
              }}
              className="text-blue-600 hover:underline font-bold"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredRecords.length === 0 ? (
          <div className="py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-slate-800 text-base">
              Chưa có dữ liệu bài làm nào phù hợp
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Học sinh cần nhập họ tên, chọn lớp và hoàn thành ít nhất 1 bài luyện tập hoặc đề thi CLC để hệ thống lưu vào danh sách.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[11px] sm:text-xs uppercase tracking-wider">
                  <th className="py-3 px-3 sm:px-4">STT</th>
                  <th className="py-3 px-3 sm:px-4">Họ và Tên</th>
                  <th className="py-3 px-3 sm:px-4">Lớp</th>
                  <th className="py-3 px-3 sm:px-4">Loại Bài</th>
                  <th className="py-3 px-3 sm:px-4">Tên Bài / Đề Thi</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Đúng / Tổng</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Tỷ Lệ</th>
                  <th className="py-3 px-3 sm:px-4">Thời Gian</th>
                  <th className="py-3 px-3 sm:px-4">Ngày Hoàn Thành</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((rec, index) => {
                  const isHigh = rec.percentage >= 85;
                  const isMedium = rec.percentage >= 60;
                  return (
                    <tr
                      key={rec.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-3 px-3 sm:px-4 text-slate-400 font-mono text-xs">
                        {index + 1}
                      </td>
                      <td className="py-3 px-3 sm:px-4">
                        <div className="font-bold text-slate-900">{rec.fullName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {rec.studentId}
                        </div>
                      </td>
                      <td className="py-3 px-3 sm:px-4">
                        <span className="inline-block px-2 py-0.5 rounded-lg bg-blue-50 text-blue-800 font-extrabold text-xs border border-blue-200">
                          {rec.className}
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                          {rec.testType}
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:px-4 max-w-xs">
                        <div className="font-semibold text-slate-800 truncate" title={rec.testName}>
                          {rec.testName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {rec.unit} · {rec.level}
                        </div>
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-center font-bold text-slate-700">
                        <span className="text-emerald-600">{rec.correctAnswers}</span> / {rec.totalQuestions}
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full font-black text-xs ${
                            isHigh
                              ? 'bg-emerald-100 text-emerald-800'
                              : isMedium
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {rec.percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-slate-600 font-medium">
                        {rec.timeSpent}
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-slate-500 text-xs">
                        {new Date(rec.endTime).toLocaleString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-right">
                        <button
                          onClick={() => handleDelete(rec.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                          title="Xóa bản ghi này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
