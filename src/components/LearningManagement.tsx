import React, { useState, useMemo } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Award, 
  FileText, 
  Download, 
  Printer, 
  QrCode, 
  Plus, 
  Smartphone, 
  Monitor, 
  Video, 
  MapPin, 
  Check, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  AlertCircle, 
  X, 
  TrendingUp, 
  BarChart3, 
  UserCheck, 
  GraduationCap, 
  ShieldCheck, 
  Radio, 
  ExternalLink,
  RefreshCw,
  Phone,
  HelpCircle
} from 'lucide-react';
import { 
  AttendanceRecord, 
  StudentProgressItem, 
  EarnedCertificate, 
  UserAccount, 
  OnlineClassroom, 
  VideoLecture, 
  ClassScheduleItem,
  ActiveTab 
} from '../types';
import { HAMLETS } from '../data/initialData';

interface LearningManagementProps {
  attendanceRecords: AttendanceRecord[];
  studentProgressList: StudentProgressItem[];
  classrooms: OnlineClassroom[];
  videoLectures: VideoLecture[];
  schedules: ClassScheduleItem[];
  currentUser: UserAccount | null;
  isAdmin: boolean;
  onRecordAttendance: (record: Omit<AttendanceRecord, 'id' | 'accessTime' | 'status'> & { status?: AttendanceRecord['status'] }) => void;
  onUpdateStudentProgress?: (student: StudentProgressItem) => void;
  onRequireAuth: (reason: string) => void;
  onNavigateToTab?: (tab: ActiveTab) => void;
}

export const LearningManagement: React.FC<LearningManagementProps> = ({
  attendanceRecords,
  studentProgressList,
  classrooms,
  videoLectures,
  schedules,
  currentUser,
  isAdmin,
  onRecordAttendance,
  onUpdateStudentProgress,
  onRequireAuth,
  onNavigateToTab
}) => {
  // Main Sub-tabs: 'progress' | 'attendance' | 'my-portfolio' | 'statistics'
  const [activeSubTab, setActiveSubTab] = useState<'progress' | 'attendance' | 'my-portfolio' | 'statistics'>('progress');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHamlet, setSelectedHamlet] = useState<string>('all');
  const [selectedItemType, setSelectedItemType] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');

  // Selected Student for Detail Modal
  const [selectedStudent, setSelectedStudent] = useState<StudentProgressItem | null>(null);

  // Selected Certificate for View/Print Modal
  const [selectedCert, setSelectedCert] = useState<{ cert: EarnedCertificate; studentName: string; hamlet: string } | null>(null);

  // Manual Check-in Modal
  const [isManualCheckinOpen, setIsManualCheckinOpen] = useState(false);
  const [manualForm, setManualForm] = useState({
    studentName: currentUser?.fullName || '',
    studentPhone: currentUser?.phone || '',
    hamlet: currentUser?.hamlet || 'Ấp Bình Thuận 1',
    itemType: 'online-classroom' as AttendanceRecord['itemType'],
    itemId: classrooms[0]?.id || '',
    notes: 'Điểm danh trực tiếp tại cơ sở',
  });

  // Citizen Self-Lookup (when not logged in or looking up another phone)
  const [lookupPhone, setLookupPhone] = useState(currentUser?.phone || '');
  const [searchedProfile, setSearchedProfile] = useState<StudentProgressItem | null>(() => {
    if (currentUser?.phone) {
      return studentProgressList.find(s => s.studentPhone === currentUser.phone || s.userId === currentUser.id) || null;
    }
    return null;
  });

  // QR Code Quick Attendance Modal
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrSuccessMessage, setQrSuccessMessage] = useState<string | null>(null);

  // Quick 1-touch attendance state
  const [quickCheckinName, setQuickCheckinName] = useState(currentUser?.fullName || '');
  const [quickCheckinPhone, setQuickCheckinPhone] = useState(currentUser?.phone || '');
  const [quickCheckinHamlet, setQuickCheckinHamlet] = useState(currentUser?.hamlet || 'Ấp Bình Thuận 1');
  const [quickCheckinTarget, setQuickCheckinTarget] = useState<string>(classrooms[0]?.id || '');
  const [quickCheckinDone, setQuickCheckinDone] = useState(false);

  // Summary Metrics
  const totalAttendances = attendanceRecords.length;
  const totalStudents = studentProgressList.length;
  const totalCerts = studentProgressList.reduce((acc, curr) => acc + (curr.certificatesEarned?.length || 0), 0);
  const avgCompletionRate = studentProgressList.length > 0 
    ? Math.round(studentProgressList.reduce((acc, s) => acc + s.averageScore, 0) / studentProgressList.length)
    : 0;

  // Filtered Student Progress List
  const filteredStudents = useMemo(() => {
    return studentProgressList.filter(student => {
      const matchQuery = 
        student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentPhone.includes(searchQuery);
      const matchHamlet = selectedHamlet === 'all' || student.hamlet === selectedHamlet;
      return matchQuery && matchHamlet;
    });
  }, [studentProgressList, searchQuery, selectedHamlet]);

  // Filtered Attendance Records
  const filteredAttendances = useMemo(() => {
    return attendanceRecords.filter(rec => {
      const matchQuery = 
        rec.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.studentPhone.includes(searchQuery) ||
        rec.itemTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchHamlet = selectedHamlet === 'all' || rec.hamlet === selectedHamlet;
      const matchType = selectedItemType === 'all' || rec.itemType === selectedItemType;
      const matchDate = !dateFilter || rec.accessTime.startsWith(dateFilter);
      return matchQuery && matchHamlet && matchType && matchDate;
    });
  }, [attendanceRecords, searchQuery, selectedHamlet, selectedItemType, dateFilter]);

  // Hamlet Statistics
  const hamletStats = useMemo(() => {
    return HAMLETS.map(hamlet => {
      const studentsInHamlet = studentProgressList.filter(s => s.hamlet === hamlet);
      const attendancesInHamlet = attendanceRecords.filter(a => a.hamlet === hamlet);
      const certsInHamlet = studentsInHamlet.reduce((acc, s) => acc + (s.certificatesEarned?.length || 0), 0);
      return {
        hamlet,
        studentCount: studentsInHamlet.length,
        attendanceCount: attendancesInHamlet.length,
        certCount: certsInHamlet,
      };
    }).sort((a, b) => b.attendanceCount - a.attendanceCount);
  }, [studentProgressList, attendanceRecords]);

  // Handle Quick Check-in
  const handleQuickCheckinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCheckinName.trim() || !quickCheckinPhone.trim()) {
      alert('Vui lòng nhập đầy đủ Họ tên và Số điện thoại!');
      return;
    }

    const selectedRoom = classrooms.find(c => c.id === quickCheckinTarget);
    const selectedLecture = videoLectures.find(v => v.id === quickCheckinTarget);
    const selectedOffline = schedules.find(s => s.id === quickCheckinTarget);

    let itemType: AttendanceRecord['itemType'] = 'online-classroom';
    let itemTitle = 'Lớp học trực tuyến Xã Long Hồ';
    let platform: AttendanceRecord['platform'] = 'google-meet';
    let instructor = 'Trung tâm HTCĐ';

    if (selectedRoom) {
      itemType = 'online-classroom';
      itemTitle = selectedRoom.title;
      platform = selectedRoom.platform;
      instructor = selectedRoom.instructor;
    } else if (selectedLecture) {
      itemType = 'video-lecture';
      itemTitle = selectedLecture.title;
      platform = 'video';
      instructor = selectedLecture.instructor;
    } else if (selectedOffline) {
      itemType = 'offline-class';
      itemTitle = selectedOffline.title;
      platform = 'truc-tiep';
      instructor = selectedOffline.instructor;
    }

    onRecordAttendance({
      studentName: quickCheckinName.trim(),
      studentPhone: quickCheckinPhone.trim(),
      hamlet: quickCheckinHamlet,
      userId: currentUser?.id,
      itemType,
      itemId: quickCheckinTarget,
      itemTitle,
      platform,
      instructor,
      durationMinutes: 60,
      status: 'tu-dong-ghi-nhan',
      device: 'Điểm danh nhanh 1 chạm',
      ipOrLocation: `${quickCheckinHamlet}, Xã Long Hồ`,
      notes: 'Học viên tự thao tác điểm danh nhanh lượt truy cập'
    });

    setQuickCheckinDone(true);
    setTimeout(() => {
      setQuickCheckinDone(false);
      setIsQrModalOpen(false);
    }, 2000);
  };

  // Handle Manual Attendance Submit
  const handleManualCheckinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.studentName.trim() || !manualForm.studentPhone.trim()) {
      alert('Vui lòng điền đủ tên và số điện thoại học viên');
      return;
    }

    let title = 'Lớp học cộng đồng';
    let instructor = 'Cán bộ phụ trách';
    let platform: AttendanceRecord['platform'] = 'truc-tiep';

    if (manualForm.itemType === 'online-classroom') {
      const r = classrooms.find(c => c.id === manualForm.itemId);
      if (r) {
        title = r.title;
        instructor = r.instructor;
        platform = r.platform;
      }
    } else if (manualForm.itemType === 'video-lecture') {
      const v = videoLectures.find(l => l.id === manualForm.itemId);
      if (v) {
        title = v.title;
        instructor = v.instructor;
        platform = 'video';
      }
    } else {
      const s = schedules.find(c => c.id === manualForm.itemId);
      if (s) {
        title = s.title;
        instructor = s.instructor;
        platform = 'truc-tiep';
      }
    }

    onRecordAttendance({
      studentName: manualForm.studentName.trim(),
      studentPhone: manualForm.studentPhone.trim(),
      hamlet: manualForm.hamlet,
      itemType: manualForm.itemType,
      itemId: manualForm.itemId,
      itemTitle: title,
      platform,
      instructor,
      durationMinutes: 90,
      status: 'da-xac-nhan',
      device: 'Cán bộ điểm danh tại cơ sở',
      ipOrLocation: 'Trung tâm HTCĐ Xã Long Hồ',
      notes: manualForm.notes
    });

    setIsManualCheckinOpen(false);
  };

  // Export Attendance to CSV
  const handleExportCSV = () => {
    const headers = ['Mã ghi nhận', 'Họ và tên', 'Số điện thoại', 'Ấp', 'Nội dung học tập', 'Hình thức', 'Giảng viên', 'Thời gian truy cập', 'Trạng thái', 'Thiết bị'];
    const rows = filteredAttendances.map(r => [
      `"${r.id}"`,
      `"${r.studentName}"`,
      `"${r.studentPhone}"`,
      `"${r.hamlet}"`,
      `"${r.itemTitle}"`,
      `"${r.platform || r.itemType}"`,
      `"${r.instructor || ''}"`,
      `"${r.accessTime}"`,
      `"${r.status === 'tu-dong-ghi-nhan' ? 'Tự động ghi nhận' : r.status === 'da-xac-nhan' ? 'Đã xác nhận' : 'Hoàn thành'}"`,
      `"${r.device || ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Diem_danh_hoc_tap_Xa_An_Binh_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Search Profile
  const handleLookupProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupPhone.trim()) return;
    const found = studentProgressList.find(
      s => s.studentPhone.replace(/\D/g, '') === lookupPhone.replace(/\D/g, '') ||
           s.studentName.toLowerCase().includes(lookupPhone.toLowerCase())
    );
    setSearchedProfile(found || null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-7 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 text-xs font-bold bg-amber-100 text-amber-900 rounded-full flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                Hệ Thống Quản Lý Học Tập Cơ Sở
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                Điểm danh tự động thời gian thực
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 tracking-tight">
              Theo Dõi &amp; Quản Lý Học Tập
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Ghi nhận tiến độ học tập chi tiết của từng học viên, tự động điểm danh lượt truy cập lớp học trực tuyến (Google Meet/Zoom) và lưu trữ sổ theo dõi lịch sử đào tạo toàn Xã Long Hồ.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="btn-quick-checkin"
              onClick={() => setIsQrModalOpen(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Điểm Danh Nhanh 1 Chạm</span>
            </button>

            {isAdmin && (
              <button
                id="btn-manual-checkin"
                onClick={() => setIsManualCheckinOpen(true)}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-stone-300" />
                <span>Ghi Nhận Điểm Danh</span>
              </button>
            )}

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs sm:text-sm rounded-xl border border-stone-300 transition-colors flex items-center gap-1.5"
              title="Xuất bảng điểm danh định dạng Excel/CSV"
            >
              <Download className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline">Xuất Báo Cáo</span>
            </button>
          </div>
        </div>

        {/* 4 Key Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-stone-100">
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-800">Lượt Truy Cập / Điểm Danh</span>
              <UserCheck className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-950">{totalAttendances}</span>
              <span className="text-[11px] text-amber-700 font-medium">lượt ghi nhận</span>
            </div>
            <span className="text-[11px] text-amber-800/80 block mt-1">Tự động qua Meet, Zoom, Video</span>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-800">Học Viên Đang Quản Lý</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-950">{totalStudents}</span>
              <span className="text-[11px] text-emerald-700 font-medium">học viên 10 ấp</span>
            </div>
            <span className="text-[11px] text-emerald-800/80 block mt-1">Cập nhật hồ sơ thường xuyên</span>
          </div>

          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-800">Điểm Đánh Giá TB</span>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-blue-950">{avgCompletionRate}%</span>
              <span className="text-[11px] text-blue-700 font-medium">đạt yêu cầu</span>
            </div>
            <span className="text-[11px] text-blue-800/80 block mt-1">Qua câu hỏi tương tác</span>
          </div>

          <div className="bg-purple-50/70 border border-purple-200/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-800">Giấy Chứng Nhận Đã Cấp</span>
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-purple-950">{totalCerts}</span>
              <span className="text-[11px] text-purple-700 font-medium">chứng nhận</span>
            </div>
            <span className="text-[11px] text-purple-800/80 block mt-1">Hoàn thành chương trình</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white rounded-xl border border-stone-200 p-1.5 flex flex-wrap gap-1.5 shadow-xs">
        <button
          id="tab-progress"
          onClick={() => setActiveSubTab('progress')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeSubTab === 'progress'
              ? 'bg-amber-500 text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Tiến Độ Học Viên ({filteredStudents.length})</span>
        </button>

        <button
          id="tab-attendance"
          onClick={() => setActiveSubTab('attendance')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeSubTab === 'attendance'
              ? 'bg-amber-500 text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Điểm Danh Tự Động &amp; Lịch Sử ({attendanceRecords.length})</span>
        </button>

        <button
          id="tab-portfolio"
          onClick={() => setActiveSubTab('my-portfolio')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeSubTab === 'my-portfolio'
              ? 'bg-amber-500 text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Hồ Sơ Của Tôi &amp; Tra Cứu</span>
        </button>

        <button
          id="tab-statistics"
          onClick={() => setActiveSubTab('statistics')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeSubTab === 'statistics'
              ? 'bg-amber-500 text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Thống Kê 10 Ấp &amp; Thi Đua</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên học viên, số điện thoại, nội dung lớp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
            />
          </div>

          <div className="lg:col-span-3">
            <select
              value={selectedHamlet}
              onChange={(e) => setSelectedHamlet(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            >
              <option value="all">Tất cả các Ấp (10 ấp Xã Long Hồ)</option>
              {HAMLETS.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>

          {activeSubTab === 'attendance' ? (
            <>
              <div className="lg:col-span-2">
                <select
                  value={selectedItemType}
                  onChange={(e) => setSelectedItemType(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="all">Mọi hình thức</option>
                  <option value="online-classroom">Lớp trực tuyến (Meet/Zoom)</option>
                  <option value="video-lecture">Bài giảng video</option>
                  <option value="offline-class">Lớp tập huấn hội trường</option>
                </select>
              </div>

              <div className="lg:col-span-2">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  title="Lọc theo ngày điểm danh"
                />
              </div>
            </>
          ) : (
            <div className="lg:col-span-4 flex items-center justify-end gap-2 text-xs text-stone-500">
              <span className="font-medium text-stone-700">Đang hiển thị: {filteredStudents.length} học viên</span>
              {selectedHamlet !== 'all' && (
                <button 
                  onClick={() => setSelectedHamlet('all')}
                  className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-600 font-semibold"
                >
                  Xóa lọc ấp ✕
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* TAB 1: TIẾN ĐỘ HỌC VIÊN */}
      {activeSubTab === 'progress' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => {
              const certsCount = student.certificatesEarned?.length || 0;
              return (
                <div
                  key={student.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-stone-900 text-base">{student.studentName}</h3>
                        <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3.5 h-3.5 text-stone-400" />
                          <span>{student.studentPhone}</span>
                        </p>
                      </div>
                      <span className="px-2.5 py-1 text-[11px] font-semibold bg-stone-100 text-stone-700 rounded-full border border-stone-200">
                        {student.hamlet}
                      </span>
                    </div>

                    {/* Progress Stats Bars */}
                    <div className="space-y-2 bg-stone-50 rounded-xl p-3 border border-stone-100">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1 font-medium">
                          <span className="text-stone-600">Tiến độ bài giảng số</span>
                          <span className="text-stone-900 font-bold">{student.totalLecturesCompleted} / {videoLectures.length} bài</span>
                        </div>
                        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, Math.round((student.totalLecturesCompleted / Math.max(1, videoLectures.length)) * 100))}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                        <div className="bg-white rounded-lg p-1.5 border border-stone-200">
                          <span className="text-[10px] text-stone-500 block">Lớp tham gia</span>
                          <span className="text-xs font-bold text-stone-900">{student.totalClassesAttended}</span>
                        </div>
                        <div className="bg-white rounded-lg p-1.5 border border-stone-200">
                          <span className="text-[10px] text-stone-500 block">Trắc nghiệm</span>
                          <span className="text-xs font-bold text-amber-700">{student.totalQuizzesPassed} đạt</span>
                        </div>
                        <div className="bg-white rounded-lg p-1.5 border border-stone-200">
                          <span className="text-[10px] text-stone-500 block">Điểm TB</span>
                          <span className="text-xs font-bold text-blue-700">{student.averageScore}đ</span>
                        </div>
                      </div>
                    </div>

                    {/* Certificates Earned Badges */}
                    {certsCount > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-purple-900 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-purple-600" />
                          Chứng nhận đạt được ({certsCount}):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {student.certificatesEarned.map(c => (
                            <button
                              key={c.id}
                              onClick={() => setSelectedCert({ cert: c, studentName: student.studentName, hamlet: student.hamlet })}
                              className="px-2 py-0.5 text-[10px] font-medium bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-md border border-purple-200 transition-colors flex items-center gap-1"
                              title="Nhấn để xem và in chứng nhận"
                            >
                              <Award className="w-3 h-3 text-purple-600" />
                              <span className="truncate max-w-[170px]">{c.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {student.notes && (
                      <p className="text-[11px] text-stone-500 italic bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                        "{student.notes}"
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>Học gần nhất: {student.lastActive}</span>
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>Chi tiết hồ sơ</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredStudents.length === 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 space-y-3">
              <Users className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-medium">Không tìm thấy học viên nào khớp với điều kiện tìm kiếm.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedHamlet('all'); }}
                className="text-xs font-semibold text-amber-600 hover:underline"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ĐIỂM DANH TỰ ĐỘNG & LỊCH SỬ TRUY CẬP */}
      {activeSubTab === 'attendance' && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/70">
            <div>
              <h2 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                Nhật Ký Điểm Danh Tự Động &amp; Lượt Truy Cập Lớp Học
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Ghi nhận tự động từ thao tác học viên nhấn "Vào Lớp Học Ngay" trên Meet/Zoom hoặc xem bài giảng số.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-900 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {filteredAttendances.length} bản ghi
              </span>
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 font-semibold text-xs rounded-lg border border-stone-300 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Excel</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100/70 text-stone-700 font-bold border-b border-stone-200 text-xs">
                <tr>
                  <th className="py-3 px-4">Thời gian</th>
                  <th className="py-3 px-4">Học viên / Số ĐT</th>
                  <th className="py-3 px-4">Ấp</th>
                  <th className="py-3 px-4">Lớp / Bài giảng đã vào</th>
                  <th className="py-3 px-4">Nền tảng &amp; Thiết bị</th>
                  <th className="py-3 px-4">Thời lượng</th>
                  <th className="py-3 px-4">Trạng thái điểm danh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredAttendances.map((rec) => {
                  return (
                    <tr key={rec.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs text-stone-600 whitespace-nowrap">
                        {rec.accessTime}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900">{rec.studentName}</div>
                        <div className="text-xs text-stone-500 font-mono">{rec.studentPhone}</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 text-xs font-medium bg-stone-100 text-stone-800 rounded-md border border-stone-200">
                          {rec.hamlet}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-semibold text-stone-800 line-clamp-1" title={rec.itemTitle}>
                          {rec.itemTitle}
                        </div>
                        {rec.instructor && (
                          <div className="text-[11px] text-stone-500">GV: {rec.instructor}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {rec.platform === 'google-meet' && (
                            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-blue-100 text-blue-800 rounded">
                              Google Meet
                            </span>
                          )}
                          {rec.platform === 'zoom' && (
                            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-sky-100 text-sky-800 rounded">
                              Zoom
                            </span>
                          )}
                          {rec.platform === 'ms-teams' && (
                            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-indigo-100 text-indigo-800 rounded">
                              MS Teams
                            </span>
                          )}
                          {rec.platform === 'video' && (
                            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded">
                              Video Số
                            </span>
                          )}
                          {rec.platform === 'truc-tiep' && (
                            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-100 text-amber-900 rounded">
                              Hội trường
                            </span>
                          )}
                        </div>
                        {rec.device && (
                          <div className="text-[11px] text-stone-500 mt-0.5 truncate max-w-[140px]" title={rec.device}>
                            {rec.device}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-xs text-stone-700 font-medium">
                        {rec.durationMinutes ? `${rec.durationMinutes} phút` : '30 phút'}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {rec.status === 'tu-dong-ghi-nhan' && (
                          <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Tự động ghi nhận
                          </span>
                        )}
                        {rec.status === 'da-xac-nhan' && (
                          <span className="px-2.5 py-1 text-[11px] font-bold bg-blue-100 text-blue-800 rounded-full flex items-center gap-1 w-fit">
                            <ShieldCheck className="w-3 h-3 text-blue-600" />
                            Đã xác nhận
                          </span>
                        )}
                        {rec.status === 'hoan-thanh' && (
                          <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-100 text-amber-900 rounded-full flex items-center gap-1 w-fit">
                            <Award className="w-3 h-3 text-amber-700" />
                            Hoàn thành
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAttendances.length === 0 && (
            <div className="p-12 text-center text-stone-500">
              Chưa có bản ghi điểm danh nào phù hợp với bộ lọc hiện tại.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: HỒ SƠ HỌC TẬP CỦA TÔI & TRA CỨU NGƯỜI DÂN */}
      {activeSubTab === 'my-portfolio' && (
        <div className="space-y-6">
          {/* Lookup Bar */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="px-3 py-1 text-xs font-bold bg-amber-200/80 text-amber-900 rounded-full inline-block">
                Tra Cứu Tiến Độ Cá Nhân
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                Sổ Theo Dõi Học Tập Suốt Đời Công Dân Xã Long Hồ
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Nhập số điện thoại hoặc họ tên để tra cứu ngay danh sách các lớp đã tham gia, lịch sử điểm danh và tải Giấy chứng nhận hoàn thành chương trình.
              </p>

              <form onSubmit={handleLookupProfile} className="flex gap-2 max-w-md mx-auto pt-2">
                <input
                  type="text"
                  placeholder="Nhập số điện thoại (vd: 0918.234.567)..."
                  value={lookupPhone}
                  onChange={(e) => setLookupPhone(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Tra Cứu</span>
                </button>
              </form>

              {currentUser && (
                <div className="text-xs text-stone-600">
                  Đang đăng nhập: <strong className="text-stone-900">{currentUser.fullName}</strong> ({currentUser.phone || 'Chưa cập nhật SĐT'})
                </div>
              )}
            </div>
          </div>

          {/* Searched / Current User Profile View */}
          {searchedProfile ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-stone-900">{searchedProfile.studentName}</h2>
                    <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full">
                      Học viên chính thức
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 mt-1">
                    Cư trú: <strong>{searchedProfile.hamlet}</strong> • Số điện thoại: <strong>{searchedProfile.studentPhone}</strong> • Ngày đăng ký: <strong>{searchedProfile.registeredDate}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-stone-500 block">Điểm trung bình</span>
                    <span className="text-2xl font-black text-amber-600">{searchedProfile.averageScore} / 100</span>
                  </div>
                </div>
              </div>

              {/* Badges / Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-center">
                  <span className="text-xs text-stone-500 block">Số lớp đã điểm danh</span>
                  <span className="text-xl font-bold text-stone-900 mt-1 block">{searchedProfile.totalClassesAttended} lớp</span>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-center">
                  <span className="text-xs text-stone-500 block">Bài giảng hoàn thành</span>
                  <span className="text-xl font-bold text-emerald-700 mt-1 block">{searchedProfile.totalLecturesCompleted} bài</span>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-center">
                  <span className="text-xs text-stone-500 block">Bài trắc nghiệm đạt</span>
                  <span className="text-xl font-bold text-blue-700 mt-1 block">{searchedProfile.totalQuizzesPassed} bài</span>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-center">
                  <span className="text-xs text-stone-500 block">Giấy chứng nhận</span>
                  <span className="text-xl font-bold text-purple-700 mt-1 block">{searchedProfile.certificatesEarned?.length || 0} chứng chỉ</span>
                </div>
              </div>

              {/* Certificates List */}
              <div className="space-y-3">
                <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Giấy Chứng Nhận Học Tập Suốt Đời Của Bạn
                </h3>

                {searchedProfile.certificatesEarned && searchedProfile.certificatesEarned.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchedProfile.certificatesEarned.map((cert) => (
                      <div
                        key={cert.id}
                        className="bg-purple-50/60 border border-purple-200 rounded-xl p-4 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                            {cert.certNumber}
                          </span>
                          <h4 className="font-bold text-stone-900 text-sm">{cert.title}</h4>
                          <p className="text-xs text-stone-500">
                            Cấp ngày: {cert.issueDate} • Điểm đạt: {cert.score || 95}đ
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedCert({ cert, studentName: searchedProfile.studentName, hamlet: searchedProfile.hamlet })}
                          className="px-3 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5 flex-shrink-0"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Xem &amp; In</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-stone-50 rounded-xl p-6 text-center text-stone-500 text-xs">
                    Bạn chưa hoàn thành đủ bài học để nhận giấy chứng nhận. Hãy tham gia lớp học trực tuyến và làm bài tập trắc nghiệm để nhận chứng nhận!
                  </div>
                )}
              </div>

              {/* Personal Attendance History */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  Lịch Sử Điểm Danh Tham Gia Các Buổi Học
                </h3>

                <div className="space-y-2">
                  {attendanceRecords
                    .filter(a => a.studentPhone === searchedProfile.studentPhone || a.studentName === searchedProfile.studentName)
                    .map((a) => (
                      <div key={a.id} className="bg-stone-50 rounded-xl p-3 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="font-bold text-stone-900 text-xs sm:text-sm">{a.itemTitle}</span>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            Hình thức: {a.platform || a.itemType} • Giảng viên: {a.instructor || 'TT HTCĐ'} • Thiết bị: {a.device || 'Trực tuyến'}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-stone-600">{a.accessTime}</span>
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                            {a.status === 'tu-dong-ghi-nhan' ? 'Đã điểm danh tự động' : 'Đã xác nhận'}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 space-y-2">
              <UserCheck className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-semibold text-stone-700">Chưa tìm thấy dữ liệu học tập cá nhân.</p>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Vui lòng nhập số điện thoại hoặc nhấn "Điểm Danh Nhanh 1 Chạm" khi tham gia lớp học để hệ thống tự động khởi tạo hồ sơ học tập cho bạn.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: THỐNG KÊ 10 ẤP & THI ĐUA HỌC TẬP */}
      {activeSubTab === 'statistics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h2 className="font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-600" />
                  Bảng Xếp Hạng Thi Đua Học Tập Suốt Đời Giữa 10 Ấp Xã Long Hồ
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Thống kê tổng số học viên thường xuyên, tổng lượt điểm danh tự động và số chứng nhận đạt chuẩn cấp ấp.
                </p>
              </div>

              <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full">
                Năm học 2026
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {hamletStats.map((item, index) => {
                const maxAttendance = Math.max(...hamletStats.map(h => h.attendanceCount), 1);
                const percent = Math.round((item.attendanceCount / maxAttendance) * 100);

                return (
                  <div
                    key={item.hamlet}
                    className="bg-stone-50/80 rounded-xl p-4 border border-stone-200 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                            index === 0 ? 'bg-amber-400 text-stone-900' :
                            index === 1 ? 'bg-stone-300 text-stone-800' :
                            index === 2 ? 'bg-amber-700 text-white' : 'bg-stone-200 text-stone-600'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="font-bold text-stone-900 text-sm">{item.hamlet}</span>
                        </div>

                        <span className="text-xs font-bold text-stone-900">
                          {item.attendanceCount} lượt điểm danh
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full" 
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-200 text-xs text-stone-600">
                      <span>👥 {item.studentCount} học viên đăng ký</span>
                      <span className="font-semibold text-purple-700">🏅 {item.certCount} chứng nhận</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: MODAL ĐIỂM DANH NHANH 1 CHẠM & MÃ QR */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-stone-200 relative">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-lg sm:text-xl">
                Điểm Danh Tự Động Lượt Truy Cập
              </h3>
              <p className="text-xs text-stone-500">
                Xác nhận thông tin nhanh để hệ thống tự động ghi nhận lượt học tập và tích lũy giờ chuyên cần.
              </p>
            </div>

            {quickCheckinDone ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-base">Điểm danh thành công!</h4>
                <p className="text-xs text-emerald-700">
                  Lượt truy cập của học viên <strong>{quickCheckinName}</strong> đã được lưu trữ vào sổ theo dõi học tập của Xã Long Hồ.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuickCheckinSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Họ và tên học viên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn Năm"
                    value={quickCheckinName}
                    onChange={(e) => setQuickCheckinName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0918.xxx.xxx"
                      value={quickCheckinPhone}
                      onChange={(e) => setQuickCheckinPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Ấp cư trú <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={quickCheckinHamlet}
                      onChange={(e) => setQuickCheckinHamlet(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      {HAMLETS.map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Lớp học / Chuyên đề tham gia
                  </label>
                  <select
                    value={quickCheckinTarget}
                    onChange={(e) => setQuickCheckinTarget(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
                  >
                    <optgroup label="Lớp học trực tuyến (Meet/Zoom/Teams)">
                      {classrooms.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.title} ({c.platform.toUpperCase()})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Bài giảng video số hóa">
                      {videoLectures.map(v => (
                        <option key={v.id} value={v.id}>
                          {v.title}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Lớp tập huấn trực tiếp hội trường">
                      {schedules.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Xác Nhận &amp; Điểm Danh Ngay</span>
                  </button>
                </div>
              </form>
            )}

            <div className="text-center pt-2">
              <span className="text-[11px] text-stone-400">
                Hệ thống tự động ghi nhớ thông tin học viên cho những lần truy cập sau.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: XEM HỒ SƠ CHI TIẾT HỌC VIÊN */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 pb-4 border-b border-stone-200">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg flex-shrink-0">
                {selectedStudent.studentName.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">{selectedStudent.studentName}</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Ấp: <strong>{selectedStudent.hamlet}</strong> • SĐT: <strong>{selectedStudent.studentPhone}</strong> • Ngày đăng ký: {selectedStudent.registeredDate}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="text-xs text-stone-500 block">Số lớp tham gia</span>
                <span className="text-lg font-bold text-stone-900">{selectedStudent.totalClassesAttended}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="text-xs text-stone-500 block">Bài giảng hoàn thành</span>
                <span className="text-lg font-bold text-emerald-700">{selectedStudent.totalLecturesCompleted}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="text-xs text-stone-500 block">Điểm trung bình</span>
                <span className="text-lg font-bold text-blue-700">{selectedStudent.averageScore}/100</span>
              </div>
            </div>

            {/* List of completed lectures */}
            <div className="space-y-2">
              <h4 className="font-bold text-stone-800 text-sm">Các bài giảng đã học &amp; hoàn thành:</h4>
              <div className="space-y-1.5">
                {videoLectures
                  .filter(v => selectedStudent.completedLectureIds?.includes(v.id))
                  .map(v => (
                    <div key={v.id} className="p-2.5 bg-stone-50 rounded-lg text-xs flex items-center justify-between border border-stone-200">
                      <span className="font-medium text-stone-800">{v.title}</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Đã hoàn thành
                      </span>
                    </div>
                  ))}
                {(!selectedStudent.completedLectureIds || selectedStudent.completedLectureIds.length === 0) && (
                  <p className="text-xs text-stone-500 italic">Chưa có bài giảng video nào hoàn tất.</p>
                )}
              </div>
            </div>

            {/* Certificates */}
            <div className="space-y-2">
              <h4 className="font-bold text-stone-800 text-sm">Chứng nhận đã cấp:</h4>
              {selectedStudent.certificatesEarned && selectedStudent.certificatesEarned.length > 0 ? (
                <div className="space-y-2">
                  {selectedStudent.certificatesEarned.map(c => (
                    <div key={c.id} className="p-3 bg-purple-50 rounded-xl border border-purple-200 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-purple-950">{c.title}</div>
                        <div className="text-purple-700 text-[11px] mt-0.5">Số: {c.certNumber} • Ngày cấp: {c.issueDate}</div>
                      </div>
                      <button
                        onClick={() => setSelectedCert({ cert: c, studentName: selectedStudent.studentName, hamlet: selectedStudent.hamlet })}
                        className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-semibold"
                      >
                        In Chứng Nhận
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-500 italic">Chưa có chứng nhận.</p>
              )}
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-xs rounded-xl"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: XEM & IN GIẤY CHỨNG NHẬN HOÀN THÀNH */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Certificate Frame */}
            <div className="border-4 border-double border-amber-600 p-6 sm:p-8 rounded-2xl bg-amber-50/20 text-center space-y-4 relative">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                  ỦY BAN NHÂN DÂN XÃ LONG HỒ - HUYỆN LONG HỒ
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-blue-700 uppercase">
                  TRUNG TÂM HỌC TẬP CỘNG ĐỒNG XÃ LONG HỒ
                </h3>
                <div className="w-24 h-0.5 bg-amber-600 mx-auto mt-2" />
              </div>

              <div className="pt-4 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-900 uppercase tracking-tight">
                  GIẤY CHỨNG NHẬN HOÀN THÀNH
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 italic">Chứng nhận học viên:</p>
                <div className="text-xl sm:text-2xl font-bold text-stone-900">{selectedCert.studentName}</div>
                <p className="text-xs text-stone-600">Cư trú tại: <strong>{selectedCert.hamlet}, Xã Long Hồ, Tỉnh Vĩnh Long</strong></p>
              </div>

              <div className="py-2 px-4 bg-white/80 rounded-xl border border-amber-200 inline-block max-w-xl">
                <p className="text-xs sm:text-sm font-semibold text-stone-800">
                  Đã hoàn thành xuất sắc chuyên đề đào tạo cộng đồng:
                </p>
                <p className="text-sm sm:text-base font-bold text-amber-900 mt-1">
                  "{selectedCert.cert.title}"
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  Đạt chuẩn kiến thức và thực hành kiểm tra đánh giá trực tuyến của Trung tâm.
                </p>
              </div>

              <div className="pt-6 grid grid-cols-2 text-xs text-stone-600">
                <div className="text-left space-y-1">
                  <p>Số hiệu: <strong>{selectedCert.cert.certNumber}</strong></p>
                  <p>Mã vào sổ: HTCD-AB-{selectedCert.cert.id}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="italic">Long Hồ, ngày {selectedCert.cert.issueDate}</p>
                  <p className="font-bold text-stone-900 uppercase pt-2">GIÁM ĐỐC TRUNG TÂM HTCĐ</p>
                  <p className="text-[10px] text-stone-400 pt-8">(Đã ký số điện tử &amp; đóng dấu xác thực)</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-stone-500">Giấy chứng nhận được lưu trữ điện tử vĩnh viễn trên Cổng thông tin xã.</span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>In Chứng Nhận</span>
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: CÁN BỘ GHI NHẬN ĐIỂM DANH THỦ CÔNG */}
      {isManualCheckinOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setIsManualCheckinOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-bold text-stone-900 text-lg">Ghi Nhận Điểm Danh Học Viên</h3>
              <p className="text-xs text-stone-500 mt-0.5">Dành cho Cán bộ Quản trị bổ sung hoặc xác nhận học viên đến lớp.</p>
            </div>

            <form onSubmit={handleManualCheckinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Tên học viên</label>
                <input
                  type="text"
                  required
                  value={manualForm.studentName}
                  onChange={(e) => setManualForm({ ...manualForm, studentName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    required
                    value={manualForm.studentPhone}
                    onChange={(e) => setManualForm({ ...manualForm, studentPhone: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Ấp cư trú</label>
                  <select
                    value={manualForm.hamlet}
                    onChange={(e) => setManualForm({ ...manualForm, hamlet: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {HAMLETS.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Hình thức &amp; Lớp học</label>
                <select
                  value={manualForm.itemId}
                  onChange={(e) => setManualForm({ ...manualForm, itemId: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                >
                  <optgroup label="Lớp học trực tuyến">
                    {classrooms.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Lớp tập huấn trực tiếp hội trường">
                    {schedules.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Bài giảng video số hóa">
                    {videoLectures.map(v => (
                      <option key={v.id} value={v.id}>{v.title}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Ghi chú xác nhận</label>
                <input
                  type="text"
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualCheckinOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-900 rounded-xl text-xs font-bold shadow-xs"
                >
                  Lưu Điểm Danh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
