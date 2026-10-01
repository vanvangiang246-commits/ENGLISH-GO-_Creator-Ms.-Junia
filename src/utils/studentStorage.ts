import * as XLSX from 'xlsx';
import { StudentInfo, StudentAttemptRecord, ALL_CLASSES } from '../types/student';

const STORAGE_KEYS = {
  CURRENT_STUDENT: 'eng_app_current_student',
  ATTEMPT_RECORDS: 'eng_app_student_attempts',
};

/**
 * Generate a unique Student ID (e.g., STU-20261001-XXXX)
 */
export function generateStudentId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `STU-${dateStr}-${rand}`;
}

/**
 * Generate a unique Attempt ID (e.g., ATT-20261001-XXXX)
 */
export function generateAttemptId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ATT-${dateStr}-${rand}`;
}

/**
 * Get the currently remembered student information from localStorage
 */
export function getCurrentStudent(): StudentInfo | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_STUDENT);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.fullName === 'string' && typeof parsed.className === 'string') {
      return {
        fullName: parsed.fullName.trim(),
        className: parsed.className.trim(),
        grade: Number(parsed.grade) || parseInt(parsed.className[0], 10) || 5,
      };
    }
  } catch (err) {
    console.error('Error reading current student from localStorage:', err);
  }
  return null;
}

/**
 * Save or update the active student in localStorage
 */
export function setCurrentStudent(info: StudentInfo): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT, JSON.stringify(info));
  } catch (err) {
    console.error('Error saving current student to localStorage:', err);
  }
}

/**
 * Clear current student in localStorage
 */
export function clearCurrentStudent(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_STUDENT);
  } catch (err) {
    console.error('Error clearing current student:', err);
  }
}

/**
 * Retrieve all saved attempt records from localStorage
 */
export function getAllAttemptRecords(): StudentAttemptRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPT_RECORDS);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (Array.isArray(list)) {
      return list;
    }
  } catch (err) {
    console.error('Error reading attempts from localStorage:', err);
  }
  return [];
}

/**
 * Save a newly completed test attempt record without overwriting previous attempts
 */
export function saveAttemptRecord(record: StudentAttemptRecord): void {
  try {
    const currentList = getAllAttemptRecords();
    // Prepend new record so newest is first
    const updated = [record, ...currentList];
    localStorage.setItem(STORAGE_KEYS.ATTEMPT_RECORDS, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving attempt record to localStorage:', err);
  }
}

/**
 * Delete a specific attempt by ID
 */
export function deleteAttemptRecord(id: string): void {
  try {
    const currentList = getAllAttemptRecords();
    const updated = currentList.filter((rec) => rec.id !== id);
    localStorage.setItem(STORAGE_KEYS.ATTEMPT_RECORDS, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting attempt record:', err);
  }
}

/**
 * Clear all stored attempt records
 */
export function clearAllAttemptRecords(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.ATTEMPT_RECORDS);
  } catch (err) {
    console.error('Error clearing all attempt records:', err);
  }
}

/**
 * Format elapsed seconds to human readable string (e.g., '12m 35s')
 */
export function formatTimeSpent(totalSecs: number): string {
  const m = Math.floor(totalSecs / 60);
  const s = totalSecs % 60;
  if (m === 0) {
    return `${s}s`;
  }
  return `${m}m ${s.toString().padStart(2, '0')}s`;
}

/**
 * Export test records to Excel (.xlsx) file
 */
export function exportRecordsToExcel(
  records: StudentAttemptRecord[],
  filename = 'Ket_Qua_Hoc_Tap_Tieng_Anh.xlsx'
): void {
  if (records.length === 0) {
    alert('Không có dữ liệu bài làm để xuất file Excel.');
    return;
  }

  // Format data for Excel worksheet with clear column names
  const worksheetData = records.map((rec, index) => ({
    STT: index + 1,
    'Mã Học Sinh': rec.studentId,
    'Mã Bài Làm': rec.id,
    'Họ và Tên': rec.fullName,
    Lớp: rec.className,
    Khối: `Khối ${rec.grade}`,
    'Loại Bài Thi': rec.testType,
    'Tên Bài / Đề Thi': rec.testName,
    'Bài Học / Unit': rec.unit,
    'Cấp Độ / Độ Khó': rec.level,
    'Thời Gian Bắt Đầu': new Date(rec.startTime).toLocaleString('vi-VN'),
    'Thời Gian Nộp Bài': new Date(rec.endTime).toLocaleString('vi-VN'),
    'Thời Gian Làm Bài': rec.timeSpent,
    'Tổng Số Câu': rec.totalQuestions,
    'Số Câu Đúng': rec.correctAnswers,
    'Số Câu Sai': rec.wrongAnswers,
    'Điểm Số': rec.score,
    'Tỷ Lệ Đúng (%)': `${rec.percentage}%`,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  // Column width auto-sizing
  const colWidths = [
    { wch: 6 },  // STT
    { wch: 20 }, // Mã Học Sinh
    { wch: 20 }, // Mã Bài Làm
    { wch: 24 }, // Họ và Tên
    { wch: 10 }, // Lớp
    { wch: 10 }, // Khối
    { wch: 18 }, // Loại Bài Thi
    { wch: 30 }, // Tên Bài / Đề Thi
    { wch: 16 }, // Unit
    { wch: 18 }, // Cấp Độ
    { wch: 22 }, // TG Bắt Đầu
    { wch: 22 }, // TG Nộp Bài
    { wch: 14 }, // TG Làm Bài
    { wch: 12 }, // Tổng Câu
    { wch: 12 }, // Câu Đúng
    { wch: 12 }, // Câu Sai
    { wch: 12 }, // Điểm Số
    { wch: 15 }, // Tỷ Lệ
  ];
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Kết Quả Bài Làm');

  // Trigger download
  XLSX.writeFile(workbook, filename);
}

/**
 * Export test records to CSV format
 */
export function exportRecordsToCsv(
  records: StudentAttemptRecord[],
  filename = 'Ket_Qua_Hoc_Tap_Tieng_Anh.csv'
): void {
  if (records.length === 0) {
    alert('Không có dữ liệu bài làm để xuất CSV.');
    return;
  }

  const headers = [
    'STT',
    'Mã Học Sinh',
    'Mã Bài Làm',
    'Họ và Tên',
    'Lớp',
    'Khối',
    'Loại Bài Thi',
    'Tên Bài / Đề Thi',
    'Bài Học / Unit',
    'Cấp Độ',
    'Thời Gian Bắt Đầu',
    'Thời Gian Nộp Bài',
    'Thời Gian Làm Bài',
    'Tổng Số Câu',
    'Số Câu Đúng',
    'Số Câu Sai',
    'Điểm Số',
    'Tỷ Lệ Đúng (%)',
  ];

  const rows = records.map((rec, index) => [
    index + 1,
    `"${rec.studentId}"`,
    `"${rec.id}"`,
    `"${rec.fullName.replace(/"/g, '""')}"`,
    `"${rec.className}"`,
    `"Khối ${rec.grade}"`,
    `"${rec.testType}"`,
    `"${rec.testName.replace(/"/g, '""')}"`,
    `"${rec.unit}"`,
    `"${rec.level}"`,
    `"${new Date(rec.startTime).toLocaleString('vi-VN')}"`,
    `"${new Date(rec.endTime).toLocaleString('vi-VN')}"`,
    `"${rec.timeSpent}"`,
    rec.totalQuestions,
    rec.correctAnswers,
    rec.wrongAnswers,
    `"${rec.score}"`,
    `"${rec.percentage}%"`,
  ]);

  const csvContent =
    '\uFEFF' + // UTF-8 BOM
    [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
