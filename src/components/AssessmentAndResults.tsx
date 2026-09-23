import React, { useState, useMemo, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  PlusCircle, 
  Eye, 
  RefreshCw, 
  FileText, 
  Sparkles, 
  ChevronRight, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  ShieldCheck,
  Check,
  RotateCcw,
  BarChart3,
  ListOrdered,
  X,
  Send,
  HelpCircle,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { 
  CourseExam, 
  ExamSubmission, 
  CourseCompletion, 
  ExamQuestion,
  UserAccount, 
  CompletionGrade,
  ActiveTab
} from '../types';
import { HAMLETS } from '../data/initialData';

interface AssessmentAndResultsProps {
  exams: CourseExam[];
  submissions: ExamSubmission[];
  completions: CourseCompletion[];
  currentUser: UserAccount | null;
  isAdmin: boolean;
  onAddSubmission: (submission: Omit<ExamSubmission, 'id' | 'submittedAt'>) => void;
  onAddCompletion?: (completion: Omit<CourseCompletion, 'id' | 'completedDate'>) => void;
  onAddExam?: (exam: Omit<CourseExam, 'id' | 'createdAt'>) => void;
  onRequireAuth: (reason: string) => void;
  onNavigateToTab?: (tab: ActiveTab) => void;
}

export const AssessmentAndResults: React.FC<AssessmentAndResultsProps> = ({
  exams,
  submissions,
  completions,
  currentUser,
  isAdmin,
  onAddSubmission,
  onAddCompletion,
  onAddExam,
  onRequireAuth,
  onNavigateToTab
}) => {
  // Navigation tabs within Assessment view: 'exams' | 'completions' | 'submissions' | 'manage'
  const [activeTab, setActiveTab] = useState<'exams' | 'completions' | 'submissions' | 'manage'>('completions');

  // Taking exam state
  const [selectedExam, setSelectedExam] = useState<CourseExam | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  const [examResult, setExamResult] = useState<ExamSubmission | null>(null);

  // Student info for exam taking
  const [studentName, setStudentName] = useState<string>(currentUser?.fullName || '');
  const [studentPhone, setStudentPhone] = useState<string>(currentUser?.phone || '');
  const [hamlet, setHamlet] = useState<string>(currentUser?.hamlet || HAMLETS[0]);

  // Certificate Modal View
  const [viewingCertificate, setViewingCertificate] = useState<CourseCompletion | null>(null);

  // Filter states for completions roster
  const [completionFilterCourse, setCompletionFilterCourse] = useState<string>('all');
  const [completionFilterHamlet, setCompletionFilterHamlet] = useState<string>('all');
  const [completionFilterGrade, setCompletionFilterGrade] = useState<string>('all');
  const [completionSearch, setCompletionSearch] = useState<string>('');

  // Filter states for submissions history
  const [submissionFilterExam, setSubmissionFilterExam] = useState<string>('all');
  const [submissionFilterPassed, setSubmissionFilterPassed] = useState<string>('all');
  const [submissionSearch, setSubmissionSearch] = useState<string>('');

  // New Exam Modal (Admin)
  const [isNewExamModalOpen, setIsNewExamModalOpen] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamCourseName, setNewExamCourseName] = useState('');
  const [newExamCategory, setNewExamCategory] = useState('Khuyến nông - Cây đặc sản');
  const [newExamDuration, setNewExamDuration] = useState(15);
  const [newExamPassingScore, setNewExamPassingScore] = useState(70);
  const [newExamDesc, setNewExamDesc] = useState('');
  const [newExamInstructor, setNewExamInstructor] = useState('');

  // Update student name/phone if currentUser changes
  useEffect(() => {
    if (currentUser) {
      if (!studentName) setStudentName(currentUser.fullName);
      if (!studentPhone && currentUser.phone) setStudentPhone(currentUser.phone);
      if (currentUser.hamlet) setHamlet(currentUser.hamlet);
    }
  }, [currentUser]);

  // Exam Countdown Timer
  useEffect(() => {
    if (!selectedExam || isExamSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExamAuto();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedExam, isExamSubmitted, timeLeft]);

  // Start taking an exam
  const handleStartExam = (exam: CourseExam) => {
    setSelectedExam(exam);
    setAnswers({});
    setTimeLeft(exam.durationMinutes * 60);
    setIsExamSubmitted(false);
    setExamResult(null);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Answer a question
  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (isExamSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  // Submit Exam
  const handleSubmitExam = () => {
    if (!selectedExam) return;

    const answeredCount = Object.keys(answers).length;
    if (answeredCount < selectedExam.questions.length) {
      const confirmSubmit = window.confirm(
        `Bà con mới trả lời ${answeredCount}/${selectedExam.questions.length} câu hỏi. Có chắc chắn muốn nộp bài ngay bây giờ không?`
      );
      if (!confirmSubmit) return;
    }

    calculateAndSaveExam(selectedExam);
  };

  const handleSubmitExamAuto = () => {
    if (!selectedExam || isExamSubmitted) return;
    calculateAndSaveExam(selectedExam);
  };

  const calculateAndSaveExam = (exam: CourseExam) => {
    let correctCount = 0;
    exam.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / exam.questions.length) * 100);
    const isPassed = score >= exam.passingScore;
    const timeSpentSeconds = exam.durationMinutes * 60 - timeLeft;

    // Generate Certificate code if passed
    const certCode = isPassed
      ? `GCN-AB-2026-${Math.floor(1000 + Math.random() * 9000)}`
      : undefined;

    const nameToUse = studentName.trim() || 'Học viên Xã Long Hồ';
    const phoneToUse = studentPhone.trim() || '09xx.xxx.xxx';
    const hamletToUse = hamlet || 'Ấp Bình Thuận 1';

    const submissionData: Omit<ExamSubmission, 'id' | 'submittedAt'> = {
      examId: exam.id,
      examTitle: exam.title,
      courseName: exam.courseName,
      studentName: nameToUse,
      studentPhone: phoneToUse,
      hamlet: hamletToUse,
      userId: currentUser?.id,
      selectedAnswers: answers,
      score,
      correctCount,
      totalCount: exam.questions.length,
      isPassed,
      timeSpentSeconds: Math.max(30, timeSpentSeconds),
      certificateCode: certCode
    };

    onAddSubmission(submissionData);

    // If passed, also automatically register completion
    if (isPassed && certCode) {
      let grade: CompletionGrade = 'Đạt';
      if (score === 100) grade = 'Xuất Sắc';
      else if (score >= 85) grade = 'Giỏi';
      else if (score >= 75) grade = 'Khá';

      if (onAddCompletion) {
        onAddCompletion({
          studentName: nameToUse,
          studentPhone: phoneToUse,
          hamlet: hamletToUse,
          userId: currentUser?.id,
          courseName: exam.courseName,
          courseId: exam.courseCode,
          examId: exam.id,
          examTitle: exam.title,
          finalScore: score,
          grade,
          certificateCode: certCode,
          status: 'da-cap-chung-nhan',
          issuedBy: 'Ban Giám Đốc Trung Tâm Học Tập Cộng Đồng Xã Long Hồ'
        });
      }
    }

    const createdSubmission: ExamSubmission = {
      ...submissionData,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setExamResult(createdSubmission);
    setIsExamSubmitted(true);
  };

  // Format time (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filtered Completions
  const filteredCompletions = useMemo(() => {
    return completions.filter((c) => {
      if (completionFilterCourse !== 'all' && c.courseName !== completionFilterCourse) return false;
      if (completionFilterHamlet !== 'all' && c.hamlet !== completionFilterHamlet) return false;
      if (completionFilterGrade !== 'all' && c.grade !== completionFilterGrade) return false;
      if (completionSearch) {
        const query = completionSearch.toLowerCase();
        const matchName = c.studentName.toLowerCase().includes(query);
        const matchPhone = c.studentPhone.toLowerCase().includes(query);
        const matchCert = c.certificateCode.toLowerCase().includes(query);
        if (!matchName && !matchPhone && !matchCert) return false;
      }
      return true;
    });
  }, [completions, completionFilterCourse, completionFilterHamlet, completionFilterGrade, completionSearch]);

  // Unique Courses in completions for filter
  const uniqueCourses = useMemo(() => {
    const set = new Set(completions.map((c) => c.courseName));
    return Array.from(set);
  }, [completions]);

  // Filtered Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      if (submissionFilterExam !== 'all' && s.examId !== submissionFilterExam) return false;
      if (submissionFilterPassed === 'passed' && !s.isPassed) return false;
      if (submissionFilterPassed === 'failed' && s.isPassed) return false;
      if (submissionSearch) {
        const q = submissionSearch.toLowerCase();
        const matchName = s.studentName.toLowerCase().includes(q);
        const matchPhone = s.studentPhone.toLowerCase().includes(q);
        const matchTitle = s.examTitle.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchTitle) return false;
      }
      return true;
    });
  }, [submissions, submissionFilterExam, submissionFilterPassed, submissionSearch]);

  // Export Completions to CSV
  const handleExportCompletionsCSV = () => {
    if (filteredCompletions.length === 0) {
      alert('Không có dữ liệu học viên hoàn thành để xuất.');
      return;
    }

    const headers = [
      'STT',
      'Mã Chứng Nhận',
      'Họ Và Tên Học Viên',
      'Số Điện Thoại',
      'Ấp / Thôn Cư Trú',
      'Khóa Học Hoàn Thành',
      'Điểm Đánh Giá Cuối Khóa',
      'Xếp Loại Tốt Nghiệp',
      'Ngày Cấp Chứng Nhận',
      'Đơn Vị Cấp'
    ];

    const rows = filteredCompletions.map((c, index) => [
      index + 1,
      `"${c.certificateCode}"`,
      `"${c.studentName}"`,
      `"${c.studentPhone}"`,
      `"${c.hamlet}"`,
      `"${c.courseName}"`,
      c.finalScore,
      `"${c.grade}"`,
      `"${c.completedDate}"`,
      `"${c.issuedBy}"`
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `Danh-sach-hoc-vien-hoan-thanh-khoa-hoc-An-Binh-${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Roster
  const handlePrintRoster = () => {
    window.print();
  };

  return (
    <div id="assessment-and-results-page" className="space-y-6 pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/50 border border-amber-400/40 text-amber-200 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              Đánh Giá & Công Nhận Kết Quả Học Tập Suốt Đời
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Đánh Giá & Lưu Trữ Kết Quả Khóa Học
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
              Hệ thống kiểm tra, đánh giá kiến thức cuối khóa qua các bài trắc nghiệm tương tác thực tế và tự động tổng hợp danh sách học viên hoàn thành khóa học tại Xã Long Hồ.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-900/60 p-4 rounded-xl border border-amber-500/30 backdrop-blur-xs">
            <div className="text-center p-2">
              <p className="text-2xl font-black text-amber-300">{exams.length}</p>
              <p className="text-[11px] text-amber-200/90 font-medium mt-0.5">Bài Trắc Nghiệm</p>
            </div>
            <div className="text-center p-2 border-l border-amber-600/40">
              <p className="text-2xl font-black text-emerald-300">{completions.length}</p>
              <p className="text-[11px] text-amber-200/90 font-medium mt-0.5">Học Viên Đạt</p>
            </div>
            <div className="text-center p-2 border-l border-amber-600/40">
              <p className="text-2xl font-black text-white">{submissions.length}</p>
              <p className="text-[11px] text-amber-200/90 font-medium mt-0.5">Lượt Nộp Bài</p>
            </div>
            <div className="text-center p-2 border-l border-amber-600/40">
              <p className="text-2xl font-black text-amber-400">100%</p>
              <p className="text-[11px] text-amber-200/90 font-medium mt-0.5">Chứng Nhận Số</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="bg-white rounded-xl p-1.5 border border-stone-200 shadow-xs flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => {
            setActiveTab('completions');
            setSelectedExam(null);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'completions'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Danh Sách Hoàn Thành Khóa Học ({completions.length})
        </button>

        <button
          onClick={() => {
            setActiveTab('exams');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'exams'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          Bài Trắc Nghiệm Cuối Khóa ({exams.length})
        </button>

        <button
          onClick={() => {
            setActiveTab('submissions');
            setSelectedExam(null);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'submissions'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Lịch Sử Đánh Giá & Điểm Số ({submissions.length})
        </button>

        {isAdmin && (
          <button
            onClick={() => {
              setActiveTab('manage');
              setSelectedExam(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ml-auto ${
              activeTab === 'manage'
                ? 'bg-stone-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            Quản Lý Đề Thi Trắc Nghiệm
          </button>
        )}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: DANH SÁCH HỌC VIÊN HOÀN THÀNH KHÓA HỌC (COMPLETIONS) */}
      {/* ============================================================== */}
      {activeTab === 'completions' && (
        <div className="space-y-4">
          {/* Action bar and filters */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    Bảng Tổng Hợp Học Viên Đã Hoàn Thành Khóa Học
                  </h3>
                  <p className="text-xs text-stone-500">
                    Hệ thống tự động ghi nhận khi học viên đạt từ 70 điểm trắc nghiệm cuối khóa trở lên
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleExportCompletionsCSV}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs transition-all"
                  title="Xuất danh sách ra tệp Excel CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  Xuất Excel / CSV
                </button>
                <button
                  onClick={handlePrintRoster}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold border border-stone-300 transition-all"
                  title="In báo cáo danh sách hoàn thành khóa học"
                >
                  <Printer className="w-3.5 h-3.5" />
                  In Báo Cáo
                </button>
              </div>
            </div>

            {/* Filter inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-stone-100">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm họ tên, SĐT, số GCN..."
                  value={completionSearch}
                  onChange={(e) => setCompletionSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <select
                  value={completionFilterCourse}
                  onChange={(e) => setCompletionFilterCourse(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">Tất cả khóa học</option>
                  {uniqueCourses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={completionFilterHamlet}
                  onChange={(e) => setCompletionFilterHamlet(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">Tất cả các Ấp tại Xã</option>
                  {HAMLETS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={completionFilterGrade}
                  onChange={(e) => setCompletionFilterGrade(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">Tất cả xếp loại tốt nghiệp</option>
                  <option value="Xuất Sắc">Xếp loại Xuất Sắc (100đ)</option>
                  <option value="Giỏi">Xếp loại Giỏi (80 - 95đ)</option>
                  <option value="Khá">Xếp loại Khá (70 - 75đ)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Completions Roster Table */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 text-[11px] font-bold text-stone-600 uppercase border-b border-stone-200 tracking-wider">
                  <tr>
                    <th className="py-3 px-3">STT</th>
                    <th className="py-3 px-3">Mã Chứng Nhận</th>
                    <th className="py-3 px-4">Học Viên</th>
                    <th className="py-3 px-3">Ấp Cư Trú</th>
                    <th className="py-3 px-4">Khóa Học Đã Hoàn Thành</th>
                    <th className="py-3 px-3 text-center">Điểm Cuối Khóa</th>
                    <th className="py-3 px-3 text-center">Xếp Loại</th>
                    <th className="py-3 px-3">Ngày Cấp</th>
                    <th className="py-3 px-3 text-right">Giấy Chứng Nhận</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filteredCompletions.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-stone-500 italic">
                        Không tìm thấy học viên nào phù hợp với bộ lọc tìm kiếm.
                      </td>
                    </tr>
                  ) : (
                    filteredCompletions.map((comp, idx) => (
                      <tr key={comp.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3.5 px-3 font-semibold text-stone-500">{idx + 1}</td>
                        <td className="py-3.5 px-3 font-mono font-bold text-amber-900 bg-amber-50/50 rounded-xs">
                          {comp.certificateCode}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-stone-900">
                          <div>{comp.studentName}</div>
                          <div className="text-[11px] font-normal text-stone-500 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-stone-400" />
                            {comp.studentPhone}
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[11px] bg-stone-100 text-stone-700 font-medium">
                            {comp.hamlet}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-stone-800 max-w-xs">
                          {comp.courseName}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="inline-flex items-center justify-center font-black text-sm px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                            {comp.finalScore}/100
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              comp.grade === 'Xuất Sắc'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : comp.grade === 'Giỏi'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {comp.grade}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-stone-600 font-medium whitespace-nowrap">
                          {comp.completedDate}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => setViewingCertificate(comp)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-md border border-amber-200 transition-all text-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Xem GCN
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
              <span>
                Hiển thị <strong>{filteredCompletions.length}</strong> học viên hoàn thành khóa học
              </span>
              <span className="text-[11px] italic">
                * Căn cứ kết quả kiểm tra đánh giá định kỳ của Ban Giám đốc Trung tâm HTCĐ Xã Long Hồ
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: DANH SÁCH BÀI TRẮC NGHIỆM CUỐI KHÓA (TAKE EXAM) */}
      {/* ============================================================== */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          {/* Active Exam Taking Interface */}
          {selectedExam && (
            <div className="bg-white rounded-2xl border-2 border-amber-500 shadow-md p-5 sm:p-7 space-y-6 animate-fadeIn">
              {/* Exam Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                      {selectedExam.category}
                    </span>
                    <span className="text-xs text-stone-500">
                      Khóa học: <strong>{selectedExam.courseName}</strong>
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-1">
                    {selectedExam.title}
                  </h2>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center gap-3 shrink-0 bg-stone-50 px-4 py-2 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-1.5 text-stone-700 font-mono text-base font-bold">
                    <Clock className={`w-5 h-5 ${timeLeft < 180 ? 'text-red-600 animate-pulse' : 'text-amber-600'}`} />
                    <span className={timeLeft < 180 ? 'text-red-600 font-black' : 'text-stone-900'}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Bà con có chắc muốn thoát bài làm kiểm tra này?')) {
                        setSelectedExam(null);
                      }
                    }}
                    className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-all"
                    title="Đóng bài làm"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Student identification form if not locked */}
              {!isExamSubmitted && (
                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/70 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-amber-950 uppercase mb-1">
                      Họ và tên người làm bài:
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Nhập họ và tên..."
                      className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-amber-300 font-semibold focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-amber-950 uppercase mb-1">
                      Số điện thoại liên hệ:
                    </label>
                    <input
                      type="text"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="Ví dụ: 0918.xxx.xxx"
                      className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-amber-300 font-semibold focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-amber-950 uppercase mb-1">
                      Ấp cư trú tại Xã Long Hồ:
                    </label>
                    <select
                      value={hamlet}
                      onChange={(e) => setHamlet(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-amber-300 font-semibold focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    >
                      {HAMLETS.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Result Banner if Submitted */}
              {isExamSubmitted && examResult && (
                <div
                  className={`p-6 rounded-2xl border text-center space-y-3 ${
                    examResult.isPassed
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex justify-center">
                    {examResult.isPassed ? (
                      <span className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md animate-bounce">
                        <Award className="w-8 h-8" />
                      </span>
                    ) : (
                      <span className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md">
                        <RotateCcw className="w-8 h-8" />
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black">
                    {examResult.isPassed
                      ? 'CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH XUẤT SẮC KHÓA HỌC!'
                      : 'BẠN CẦN ÔN LẠI VÀ THỬ LẠI ĐỂ HOÀN THÀNH KHÓA HỌC'}
                  </h3>

                  <p className="text-sm font-semibold max-w-xl mx-auto">
                    {examResult.isPassed
                      ? `Học viên ${examResult.studentName} đã đạt số điểm ${examResult.score}/100 (Đúng ${examResult.correctCount}/${examResult.totalCount} câu). Ban Giám đốc Trung tâm HTCĐ Xã Long Hồ đã chính thức cấp Chứng nhận hoàn thành!`
                      : `Học viên đạt ${examResult.score}/100 điểm. Để được cấp giấy chứng nhận cần đạt từ ${selectedExam.passingScore} điểm trở lên. Bà con hãy xem lại các câu sai bên dưới và làm lại nhé!`}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    {examResult.isPassed && examResult.certificateCode && (
                      <button
                        onClick={() => {
                          const comp = completions.find(
                            (c) => c.certificateCode === examResult.certificateCode
                          ) || {
                            id: `comp-${Date.now()}`,
                            studentName: examResult.studentName,
                            studentPhone: examResult.studentPhone,
                            hamlet: examResult.hamlet,
                            courseName: selectedExam.courseName,
                            examId: selectedExam.id,
                            examTitle: selectedExam.title,
                            finalScore: examResult.score,
                            grade: examResult.score === 100 ? 'Xuất Sắc' : 'Giỏi',
                            completedDate: new Date().toISOString().split('T')[0],
                            certificateCode: examResult.certificateCode || 'GCN-AB-2026-CHUNH-NHAN',
                            status: 'da-cap-chung-nhan',
                            issuedBy: 'Ban Giám Đốc Trung Tâm Học Tập Cộng Đồng Xã Long Hồ'
                          };
                          setViewingCertificate(comp);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-sm"
                      >
                        <GraduationCap className="w-4 h-4" />
                        Xem & In Giấy Chứng Nhận Điện Tử
                      </button>
                    )}

                    <button
                      onClick={() => handleStartExam(selectedExam)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-bold text-xs sm:text-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Làm Lại Bài Kiểm Tra
                    </button>

                    <button
                      onClick={() => setSelectedExam(null)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs sm:text-sm"
                    >
                      Quay Về Danh Sách Đề Thi
                    </button>
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-bold text-stone-500">
                  <span>
                    BỘ CÂU HỎI TRẮC NGHIỆM ({selectedExam.questions.length} CÂU)
                  </span>
                  <span>
                    Đã trả lời: {Object.keys(answers).length}/{selectedExam.questions.length} câu
                  </span>
                </div>

                {selectedExam.questions.map((q, qIndex) => {
                  const selectedOption = answers[qIndex];
                  const isCorrect = isExamSubmitted && selectedOption === q.correctAnswerIndex;
                  const isWrong = isExamSubmitted && selectedOption !== undefined && selectedOption !== q.correctAnswerIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 sm:p-5 rounded-xl border transition-all ${
                        isExamSubmitted
                          ? isCorrect
                            ? 'bg-emerald-50/50 border-emerald-300'
                            : isWrong
                            ? 'bg-red-50/50 border-red-300'
                            : 'bg-stone-50 border-stone-200'
                          : selectedOption !== undefined
                          ? 'bg-amber-50/30 border-amber-300'
                          : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {qIndex + 1}
                        </span>
                        <div className="space-y-3 w-full">
                          <p className="text-sm sm:text-base font-bold text-stone-900 leading-relaxed">
                            {q.question}
                          </p>

                          {/* Options */}
                          <div className="grid grid-cols-1 gap-2 pt-1">
                            {q.options.map((opt, optIndex) => {
                              const isThisSelected = selectedOption === optIndex;
                              const isThisCorrectAnswer = isExamSubmitted && optIndex === q.correctAnswerIndex;

                              let optionClass = 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800';
                              if (isExamSubmitted) {
                                if (isThisCorrectAnswer) {
                                  optionClass = 'bg-emerald-100/90 border-emerald-400 text-emerald-950 font-bold';
                                } else if (isThisSelected && !isCorrect) {
                                  optionClass = 'bg-red-100 border-red-300 text-red-950 line-through';
                                } else {
                                  optionClass = 'bg-stone-50 opacity-60 border-stone-200 text-stone-500';
                                }
                              } else if (isThisSelected) {
                                optionClass = 'bg-amber-100 border-amber-500 text-amber-950 font-bold shadow-xs';
                              }

                              return (
                                <button
                                  key={optIndex}
                                  type="button"
                                  disabled={isExamSubmitted}
                                  onClick={() => handleSelectOption(qIndex, optIndex)}
                                  className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 transition-all ${optionClass}`}
                                >
                                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                                    {String.fromCharCode(65 + optIndex)}
                                  </span>
                                  <span className="leading-snug">{opt}</span>
                                  {isThisCorrectAnswer && (
                                    <Check className="w-4 h-4 text-emerald-700 ml-auto shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation if submitted */}
                          {isExamSubmitted && (
                            <div className="p-3 bg-stone-100 rounded-lg text-xs text-stone-700 space-y-1 border border-stone-200">
                              <p className="font-bold text-amber-900 flex items-center gap-1.5">
                                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                                Giải thích kỹ thuật & Căn cứ:
                              </p>
                              <p className="leading-relaxed">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit button at bottom */}
              {!isExamSubmitted && (
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <div className="text-xs text-stone-500">
                    * Yêu cầu đạt từ <strong>{selectedExam.passingScore} điểm</strong> trở lên để được hệ thống tự động cấp giấy chứng nhận.
                  </div>
                  <button
                    onClick={handleSubmitExam}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Nộp Bài Đánh Giá Cuối Khóa
                  </button>
                </div>
              )}
            </div>
          )}

          {/* List of Available Exams */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Các Bài Trắc Nghiệm Đánh Giá Kiến Thức Đang Mở
                </h3>
                <p className="text-xs text-stone-500">
                  Bà con nhấp "Làm Bài Kiểm Tra" để làm bài thi trực tuyến và nhận giấy chứng nhận hoàn thành khóa học
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exams.map((exam) => {
                const submissionCount = submissions.filter((s) => s.examId === exam.id).length;
                const passedCount = submissions.filter((s) => s.examId === exam.id && s.isPassed).length;

                return (
                  <div
                    key={exam.id}
                    className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                          {exam.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          {exam.durationMinutes} phút
                        </div>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-stone-900 line-clamp-2">
                          {exam.title}
                        </h4>
                        <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                          {exam.description}
                        </p>
                      </div>

                      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-xs text-stone-600 space-y-1">
                        <p>
                          <strong>Khóa đào tạo:</strong> {exam.courseName}
                        </p>
                        {exam.instructor && (
                          <p>
                            <strong>Giảng viên đánh giá:</strong> {exam.instructor}
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-1 text-[11px] text-stone-500 font-medium border-t border-stone-200">
                          <span>Số lượng câu hỏi: <strong>{exam.questions.length} câu</strong></span>
                          <span>Điểm đạt chuẩn: <strong className="text-emerald-700">&ge; {exam.passingScore}đ</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">
                        Đã có <strong>{passedCount}</strong> học viên đỗ ({submissionCount} lượt nộp)
                      </span>
                      <button
                        onClick={() => handleStartExam(exam)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        Làm Bài Kiểm Tra
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: LỊCH SỬ ĐÁNH GIÁ & ĐIỂM SỐ (SUBMISSIONS) */}
      {/* ============================================================== */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Lịch Sử Đánh Giá & Điểm Trắc Nghiệm Của Học Viên
                </h3>
                <p className="text-xs text-stone-500">
                  Lưu trữ kết quả tất cả các bài thi trắc nghiệm theo thời gian thực tại xã
                </p>
              </div>
            </div>

            {/* Filter */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-stone-100">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm học viên, số điện thoại..."
                  value={submissionSearch}
                  onChange={(e) => setSubmissionSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <select
                  value={submissionFilterExam}
                  onChange={(e) => setSubmissionFilterExam(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">Tất cả đề kiểm tra</option>
                  {exams.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={submissionFilterPassed}
                  onChange={(e) => setSubmissionFilterPassed(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">Tất cả kết quả</option>
                  <option value="passed">Chỉ xem học viên Đạt (&ge; 70đ)</option>
                  <option value="failed">Chỉ xem học viên Chưa đạt (&lt; 70đ)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 text-[11px] font-bold text-stone-600 uppercase border-b border-stone-200 tracking-wider">
                  <tr>
                    <th className="py-3 px-3">STT</th>
                    <th className="py-3 px-4">Học Viên</th>
                    <th className="py-3 px-3">Ấp</th>
                    <th className="py-3 px-4">Bài Kiểm Tra Cuối Khóa</th>
                    <th className="py-3 px-3 text-center">Thời Gian Làm</th>
                    <th className="py-3 px-3 text-center">Số Câu Đúng</th>
                    <th className="py-3 px-3 text-center">Điểm Số</th>
                    <th className="py-3 px-3 text-center">Kết Quả</th>
                    <th className="py-3 px-4">Thời Gian Nộp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-stone-500 italic">
                        Không có dữ liệu lượt nộp bài nào phù hợp.
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map((sub, idx) => (
                      <tr key={sub.id} className="hover:bg-amber-50/30 transition-colors">
                        <td className="py-3 px-3 font-semibold text-stone-500">{idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-stone-900">
                          <div>{sub.studentName}</div>
                          <div className="text-[11px] font-normal text-stone-500">{sub.studentPhone}</div>
                        </td>
                        <td className="py-3 px-3 text-stone-600">{sub.hamlet}</td>
                        <td className="py-3 px-4 font-semibold text-stone-800 max-w-xs line-clamp-1">
                          {sub.examTitle}
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-stone-600">
                          {Math.floor(sub.timeSpentSeconds / 60)}p {sub.timeSpentSeconds % 60}s
                        </td>
                        <td className="py-3 px-3 text-center font-semibold text-stone-700">
                          {sub.correctCount}/{sub.totalCount}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="font-black text-sm px-2 py-0.5 rounded-md bg-stone-100 text-stone-900">
                            {sub.score}/100
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              sub.isPassed
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {sub.isPassed ? 'Đạt Chuẩn' : 'Chưa Đạt'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-500 whitespace-nowrap">
                          {sub.submittedAt}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: QUẢN LÝ ĐỀ THI TRẮC NGHIỆM (ADMIN ONLY) */}
      {/* ============================================================== */}
      {activeTab === 'manage' && isAdmin && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Tạo Mới Đề Thi & Bài Kiểm Tra Trắc Nghiệm
                </h3>
                <p className="text-xs text-stone-500">
                  Dành cho Cán bộ quản lý Trung tâm HTCĐ Xã Long Hồ biên soạn ngân hàng câu hỏi
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newExamTitle.trim() || !newExamCourseName.trim()) {
                  alert('Vui lòng nhập tên bài kiểm tra và khóa học liên quan.');
                  return;
                }

                // Sample standard 5 questions for fast creation
                const sampleQuestions: ExamQuestion[] = [
                  {
                    id: `q-${Date.now()}-1`,
                    question: `Câu hỏi 1 về nội dung chuyên môn của khóa học ${newExamCourseName}?`,
                    options: [
                      'Áp dụng quy trình kỹ thuật chuẩn của Trung tâm HTCĐ',
                      'Làm theo kinh nghiệm truyền miệng không có cơ sở',
                      'Sử dụng hóa chất cấm ngoài danh mục',
                      'Không quan tâm đến biện pháp an toàn'
                    ],
                    correctAnswerIndex: 0,
                    explanation: 'Tuân thủ quy trình chuẩn được chuyển giao khoa học giúp nâng cao năng suất và chất lượng bền vững.'
                  },
                  {
                    id: `q-${Date.now()}-2`,
                    question: `Biện pháp nào sau đây giúp đảm bảo an toàn và vệ sinh dịch bệnh tốt nhất?`,
                    options: [
                      'Khử trùng định kỳ và tiêm phòng đầy đủ theo khuyến cáo cán bộ khuyến nông',
                      'Để rác thải bừa bãi ra kênh rạch',
                      'Không rửa tay sát khuẩn trước khi chăm sóc',
                      'Xả nước thải sinh hoạt trực tiếp vào ao cá'
                    ],
                    correctAnswerIndex: 0,
                    explanation: 'Vệ sinh phòng dịch chủ động luôn là nguyên tắc vàng trong phát triển kinh tế nông hộ.'
                  }
                ];

                if (onAddExam) {
                  onAddExam({
                    title: newExamTitle.trim(),
                    courseName: newExamCourseName.trim(),
                    category: newExamCategory,
                    durationMinutes: Number(newExamDuration),
                    passingScore: Number(newExamPassingScore),
                    totalQuestions: sampleQuestions.length,
                    description: newExamDesc.trim() || `Bài kiểm tra đánh giá khóa học ${newExamCourseName}`,
                    questions: sampleQuestions,
                    isActive: true,
                    instructor: newExamInstructor.trim() || 'Ban Giám đốc Trung tâm HTCĐ Xã Long Hồ'
                  });
                }

                setNewExamTitle('');
                setNewExamCourseName('');
                setNewExamDesc('');
                setActiveTab('exams');
                alert('Đã tạo mới đề thi trắc nghiệm thành công!');
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Tiêu đề bài kiểm tra trắc nghiệm: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Đánh giá cuối khóa: Kỹ năng số bán hàng OCOP..."
                    value={newExamTitle}
                    onChange={(e) => setNewExamTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Tên khóa đào tạo liên kết: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Lớp tập huấn Livestream bán nông sản trên TikTok/Shopee..."
                    value={newExamCourseName}
                    onChange={(e) => setNewExamCourseName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Chuyên mục:
                  </label>
                  <select
                    value={newExamCategory}
                    onChange={(e) => setNewExamCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                  >
                    <option value="Khuyến nông - Cây đặc sản">Khuyến nông - Cây đặc sản</option>
                    <option value="Đào tạo nghề nông thôn">Đào tạo nghề nông thôn</option>
                    <option value="Chuyển đổi số cộng đồng">Chuyển đổi số cộng đồng</option>
                    <option value="Pháp luật & An ninh trật tự">Pháp luật & An ninh trật tự</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Thời gian làm bài:
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={newExamDuration}
                    onChange={(e) => setNewExamDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Điểm đạt chuẩn:
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={newExamPassingScore}
                    onChange={(e) => setNewExamPassingScore(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Giảng viên phụ trách:
                  </label>
                  <input
                    type="text"
                    placeholder="TS. / ThS. / Cán bộ..."
                    value={newExamInstructor}
                    onChange={(e) => setNewExamInstructor(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Mô tả bài kiểm tra:
                </label>
                <textarea
                  rows={2}
                  placeholder="Mô tả mục tiêu đánh giá..."
                  value={newExamDesc}
                  onChange={(e) => setNewExamDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  Lưu & Xuất Bản Đề Thi Mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: XEM & IN GIẤY CHỨNG NHẬN ĐIỆN TỬ */}
      {/* ============================================================== */}
      {viewingCertificate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-auto animate-scaleUp border-4 border-amber-500">
            {/* Action buttons on top */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 no-print">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Giấy Chứng Nhận Học Tập Suốt Đời - Xã Long Hồ
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  In Giấy Chứng Nhận
                </button>
                <button
                  onClick={() => setViewingCertificate(null)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Certificate Canvas / Document Format */}
            <div className="p-8 sm:p-10 my-4 bg-radial from-amber-50/40 via-white to-amber-50/30 border-8 border-double border-amber-600 rounded-xl relative text-center space-y-6">
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 text-amber-600 text-xl font-serif">❖</div>
              <div className="absolute top-2 right-2 text-amber-600 text-xl font-serif">❖</div>
              <div className="absolute bottom-2 left-2 text-amber-600 text-xl font-serif">❖</div>
              <div className="absolute bottom-2 right-2 text-amber-600 text-xl font-serif">❖</div>

              {/* Header */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-600">
                  ỦY BAN NHÂN DÂN HUYỆN LONG HỒ
                </h4>
                <h3 className="text-sm font-black uppercase text-amber-900 tracking-wider">
                  TRUNG TÂM HỌC TẬP CỘNG ĐỒNG XÃ LONG HỒ
                </h3>
                <div className="w-24 h-0.5 bg-amber-600 mx-auto mt-2"></div>
              </div>

              {/* Title */}
              <div className="space-y-1 py-2">
                <h2 className="text-2xl sm:text-3xl font-black text-amber-900 font-serif tracking-tight">
                  GIẤY CHỨNG NHẬN
                </h2>
                <p className="text-xs sm:text-sm font-semibold uppercase text-stone-600 tracking-wider">
                  HOÀN THÀNH CHƯƠNG TRÌNH ĐÀO TẠO & ĐÁNH GIÁ CUỐI KHÓA
                </p>
              </div>

              {/* Student details */}
              <div className="space-y-3 max-w-xl mx-auto text-stone-800">
                <p className="text-xs italic text-stone-500">Ban Giám Đốc Trung Tâm chứng nhận:</p>
                <p className="text-2xl sm:text-3xl font-black text-stone-900 uppercase font-serif tracking-wide border-b border-amber-300 pb-1">
                  {viewingCertificate.studentName}
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-stone-600 font-medium">
                  <span>Ấp cư trú: <strong>{viewingCertificate.hamlet}</strong>, Xã Long Hồ</span>
                  <span>•</span>
                  <span>SĐT: <strong>{viewingCertificate.studentPhone}</strong></span>
                </div>

                <div className="pt-2 text-xs sm:text-sm leading-relaxed">
                  Đã hoàn thành xuất sắc chương trình tập huấn và đạt chuẩn đánh giá qua bài trắc nghiệm cuối khóa:
                  <div className="text-sm sm:text-base font-black text-amber-950 mt-1">
                    "{viewingCertificate.courseName}"
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 pt-3 text-xs">
                  <div className="bg-amber-100/70 px-4 py-1.5 rounded-lg border border-amber-300 font-bold text-amber-900">
                    Điểm số cuối khóa: {viewingCertificate.finalScore}/100
                  </div>
                  <div className="bg-emerald-100/70 px-4 py-1.5 rounded-lg border border-emerald-300 font-bold text-emerald-900">
                    Xếp loại: {viewingCertificate.grade}
                  </div>
                </div>
              </div>

              {/* Signature section */}
              <div className="pt-6 grid grid-cols-2 text-xs">
                <div className="text-left space-y-1">
                  <p className="text-[11px] text-stone-500">Mã chứng nhận số:</p>
                  <p className="font-mono font-bold text-stone-900 text-sm">{viewingCertificate.certificateCode}</p>
                  <p className="text-[10px] text-stone-400 italic">Vào sổ cấp GCN Trung tâm HTCĐ</p>
                </div>

                <div className="text-right space-y-1">
                  <p className="text-stone-500 italic">Long Hồ, ngày {viewingCertificate.completedDate}</p>
                  <p className="font-bold text-stone-800 uppercase">GIÁM ĐỐC TRUNG TÂM</p>
                  <div className="py-2">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-300">
                      [ĐÃ KÝ ĐIỆN TỬ & ĐÓNG DẤU]
                    </span>
                  </div>
                  <p className="font-bold text-stone-900 text-xs">{viewingCertificate.issuedBy}</p>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setViewingCertificate(null)}
                className="px-6 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-all"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
