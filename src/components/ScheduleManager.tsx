import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Search, 
  Plus, 
  Clock, 
  MapPin, 
  Users, 
  UserCheck, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  FileText, 
  GraduationCap, 
  Award, 
  Phone, 
  Home, 
  Printer, 
  Download,
  AlertCircle,
  HelpCircle,
  Eye
} from 'lucide-react';
import { ClassScheduleItem, ScheduleStatus, RegistrationItem, UserAccount } from '../types';
import { HAMLETS } from '../data/initialData';

interface ScheduleManagerProps {
  schedules: ClassScheduleItem[];
  isAdmin: boolean;
  currentUser: UserAccount | null;
  onRequireAuth: (promptReason: string) => void;
  onAddSchedule: (schedule: Omit<ClassScheduleItem, 'id' | 'currentEnrolled' | 'registrations'>) => void;
  onUpdateSchedule: (schedule: ClassScheduleItem) => void;
  onDeleteSchedule: (id: string) => void;
  onRegisterStudent: (scheduleId: string, student: Omit<RegistrationItem, 'id' | 'scheduleId' | 'registrationDate' | 'status'>) => void;
  onDeleteRegistration: (scheduleId: string, regId: string) => void;
  onToggleRegistrationStatus: (scheduleId: string, regId: string) => void;
  selectedSchedule: ClassScheduleItem | null;
  setSelectedSchedule: (sch: ClassScheduleItem | null) => void;
  registerTargetSchedule: ClassScheduleItem | null;
  setRegisterTargetSchedule: (sch: ClassScheduleItem | null) => void;
}

export const ScheduleManager: React.FC<ScheduleManagerProps> = ({
  schedules,
  isAdmin,
  currentUser,
  onRequireAuth,
  onAddSchedule,
  onUpdateSchedule,
  onDeleteSchedule,
  onRegisterStudent,
  onDeleteRegistration,
  onToggleRegistrationStatus,
  selectedSchedule,
  setSelectedSchedule,
  registerTargetSchedule,
  setRegisterTargetSchedule,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');

  // Form State for creating/editing schedule
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);

  // Manage registrations modal
  const [viewingRegistrationsSchedule, setViewingRegistrationsSchedule] = useState<ClassScheduleItem | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    courseCode: '',
    category: 'Khuyến nông - Làm vườn',
    instructor: '',
    instructorTitle: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    timeSlot: '08:00 - 11:30 (Thứ Bảy & Chủ Nhật)',
    totalSessions: 4,
    location: 'Hội trường Trung tâm HTCĐ Xã Long Hồ',
    targetAudience: 'Bà con nông dân và nhân dân trên địa bàn Xã Long Hồ',
    maxSeats: 40,
    status: 'sap-dien-ra' as ScheduleStatus,
    feeInfo: 'Miễn phí 100% (Ngân sách Nhà nước hỗ trợ)',
    description: '',
    curriculumText: '',
    prerequisites: '',
  });

  // Student registration form fields
  const [regForm, setRegForm] = useState({
    fullName: '',
    phone: '',
    hamlet: HAMLETS[0],
    birthYear: '1980',
    gender: 'nam' as 'nam' | 'nu' | 'khac',
    notes: '',
  });

  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Filtered schedules
  const filteredSchedules = useMemo(() => {
    return schedules.filter((sch) => {
      const matchStatus = statusFilter === 'all' || sch.status === statusFilter;
      const matchLocation = locationFilter === 'all' || sch.location.includes(locationFilter);
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        sch.title.toLowerCase().includes(q) ||
        sch.instructor.toLowerCase().includes(q) ||
        sch.location.toLowerCase().includes(q) ||
        sch.category.toLowerCase().includes(q);

      return matchStatus && matchLocation && matchQuery;
    }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [schedules, statusFilter, locationFilter, searchQuery]);

  // Open Add Schedule
  const handleOpenAdd = () => {
    setEditingScheduleId(null);
    setFormData({
      title: '',
      courseCode: `LOPHOC-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`,
      category: 'Khuyến nông - Làm vườn',
      instructor: '',
      instructorTitle: 'Cán bộ kỹ thuật',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      timeSlot: '08:00 - 11:30 (Thứ Bảy & Chủ Nhật)',
      totalSessions: 4,
      location: 'Hội trường Trung tâm HTCĐ Xã Long Hồ',
      targetAudience: 'Bà con nông dân các ấp',
      maxSeats: 40,
      status: 'sap-dien-ra',
      feeInfo: 'Miễn phí 100% (Ngân sách Khuyến nông xã hỗ trợ)',
      description: '',
      curriculumText: 'Chuyên đề 1: Tổng quan và chuẩn bị\nChuyên đề 2: Kỹ thuật chi tiết\nChuyên đề 3: Thực hành tại chỗ',
      prerequisites: 'Bà con mang theo sổ tay ghi chép',
    });
    setIsFormOpen(true);
  };

  // Open Edit Schedule
  const handleOpenEdit = (sch: ClassScheduleItem) => {
    setEditingScheduleId(sch.id);
    setFormData({
      title: sch.title,
      courseCode: sch.courseCode,
      category: sch.category,
      instructor: sch.instructor,
      instructorTitle: sch.instructorTitle,
      startDate: sch.startDate,
      endDate: sch.endDate || '',
      timeSlot: sch.timeSlot,
      totalSessions: sch.totalSessions,
      location: sch.location,
      targetAudience: sch.targetAudience,
      maxSeats: sch.maxSeats,
      status: sch.status,
      feeInfo: sch.feeInfo,
      description: sch.description,
      curriculumText: sch.curriculum.join('\n'),
      prerequisites: sch.prerequisites || '',
    });
    setIsFormOpen(true);
  };

  const handleSubmitSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const curriculumArray = formData.curriculumText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingScheduleId) {
      const orig = schedules.find((s) => s.id === editingScheduleId);
      if (orig) {
        onUpdateSchedule({
          ...orig,
          title: formData.title,
          courseCode: formData.courseCode,
          category: formData.category,
          instructor: formData.instructor,
          instructorTitle: formData.instructorTitle,
          startDate: formData.startDate,
          endDate: formData.endDate || undefined,
          timeSlot: formData.timeSlot,
          totalSessions: Number(formData.totalSessions),
          location: formData.location,
          targetAudience: formData.targetAudience,
          maxSeats: Number(formData.maxSeats),
          status: formData.status,
          feeInfo: formData.feeInfo,
          description: formData.description,
          curriculum: curriculumArray,
          prerequisites: formData.prerequisites,
        });
      }
    } else {
      onAddSchedule({
        title: formData.title,
        courseCode: formData.courseCode,
        category: formData.category,
        instructor: formData.instructor,
        instructorTitle: formData.instructorTitle,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        timeSlot: formData.timeSlot,
        totalSessions: Number(formData.totalSessions),
        location: formData.location,
        targetAudience: formData.targetAudience,
        maxSeats: Number(formData.maxSeats),
        status: formData.status,
        feeInfo: formData.feeInfo,
        description: formData.description,
        curriculum: curriculumArray,
        prerequisites: formData.prerequisites,
      });
    }

    setIsFormOpen(false);
  };

  // Handle start register with auth check
  const handleStartRegister = (sch: ClassScheduleItem) => {
    if (!currentUser) {
      onRequireAuth('Bà con vui lòng Đăng ký tài khoản hoặc Đăng nhập để gửi phiếu đăng ký tham gia lớp học.');
      return;
    }
    setRegForm({
      fullName: currentUser.fullName || '',
      phone: currentUser.phone || '',
      hamlet: currentUser.hamlet || HAMLETS[0],
      birthYear: '1980',
      gender: 'nam',
      notes: '',
    });
    setRegisterTargetSchedule(sch);
  };

  // Submit student registration
  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerTargetSchedule || !regForm.fullName.trim() || !regForm.phone.trim()) return;

    onRegisterStudent(registerTargetSchedule.id, {
      fullName: regForm.fullName.trim(),
      phone: regForm.phone.trim(),
      hamlet: regForm.hamlet,
      birthYear: regForm.birthYear,
      gender: regForm.gender,
      notes: regForm.notes,
    });

    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setRegisterTargetSchedule(null);
      setRegForm({
        fullName: '',
        phone: '',
        hamlet: HAMLETS[0],
        birthYear: '1980',
        gender: 'nam',
        notes: '',
      });
    }, 2000);
  };

  const getStatusBadge = (status: ScheduleStatus) => {
    switch (status) {
      case 'sap-dien-ra':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded">Sắp diễn ra</span>;
      case 'dang-dien-ra':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded animate-pulse">Đang giảng dạy</span>;
      case 'da-ket-thuc':
        return <span className="px-2 py-0.5 text-[10px] font-semibold bg-stone-100 text-stone-600 rounded">Đã hoàn thành</span>;
      case 'tam-hoan':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">Tạm hoãn</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-700" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Lịch Học & Các Lớp Đào Tạo Nghề Cộng Đồng
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Tra cứu lịch giảng dạy, địa điểm tổ chức các lớp học miễn phí tại Xã Long Hồ và đăng ký tham gia trực tuyến.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2"
            id="btn-add-schedule"
          >
            <Plus className="w-4 h-4 text-amber-200" />
            <span>Đưa Lịch Học Lên Web</span>
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên lớp, giảng viên, địa điểm..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span>Trạng thái:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-stone-200 rounded-lg text-xs bg-white text-stone-700 font-medium focus:outline-hidden"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="sap-dien-ra">Sắp diễn ra</option>
              <option value="dang-dien-ra">Đang diễn ra</option>
              <option value="da-ket-thuc">Đã hoàn thành</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span>Địa điểm:</span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-stone-200 rounded-lg text-xs bg-white text-stone-700 font-medium focus:outline-hidden"
            >
              <option value="all">Tất cả địa điểm</option>
              <option value="Hội trường Trung tâm">Hội trường TT HTCĐ</option>
              <option value="Hội trường UBND">Hội trường UBND Xã</option>
              <option value="Ấp">Nhà văn hóa các Ấp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedules Cards List */}
      {filteredSchedules.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-3">
          <Calendar className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">Không có lớp học phù hợp</h3>
          <p className="text-xs text-stone-500">
            Vui lòng thử điều chỉnh lại bộ lọc tìm kiếm hoặc liên hệ Trung tâm để đề xuất mở lớp mới.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredSchedules.map((sch) => {
            const enrolledPercentage = Math.round((sch.currentEnrolled / sch.maxSeats) * 100);
            const isFull = sch.currentEnrolled >= sch.maxSeats;

            return (
              <div
                key={sch.id}
                className="bg-white border border-stone-200 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
              >
                {/* Header info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getStatusBadge(sch.status)}
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-800 rounded">
                        {sch.category}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">
                        {sch.courseCode}
                      </span>
                    </div>

                    <span className="px-2.5 py-0.5 text-xs font-extrabold bg-emerald-100 text-emerald-800 rounded-full">
                      {sch.feeInfo.includes('Miễn phí') ? 'Miễn phí' : sch.feeInfo}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedSchedule(sch)}
                    className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-blue-700 transition-colors cursor-pointer leading-snug"
                  >
                    {sch.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {sch.description}
                  </p>

                  {/* Detail Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <div>
                        <span className="text-stone-400 text-[10px] block">Thời gian:</span>
                        <span className="font-semibold text-stone-800">{sch.timeSlot}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <div>
                        <span className="text-stone-400 text-[10px] block">Khai giảng:</span>
                        <span className="font-semibold text-stone-800">{sch.startDate} ({sch.totalSessions} buổi)</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:col-span-2 pt-1 border-t border-stone-200/60">
                      <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-stone-400 text-[10px] block">Địa điểm học:</span>
                        <span className="font-semibold text-stone-800">{sch.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:col-span-2 pt-1">
                      <GraduationCap className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <div>
                        <span className="text-stone-400 text-[10px] block">Báo cáo viên / Giảng viên:</span>
                        <span className="font-bold text-stone-900">{sch.instructor}</span>
                        <span className="text-stone-500 text-[11px] ml-1">({sch.instructorTitle})</span>
                      </div>
                    </div>
                  </div>

                  {/* Enrollment Progress */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs text-stone-600">
                      <span>
                        Sĩ số đăng ký: <strong>{sch.currentEnrolled}</strong> / {sch.maxSeats} chỗ
                      </span>
                      <span className="font-bold text-blue-700">{enrolledPercentage}% chỉ tiêu</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isFull ? 'bg-blue-500' : enrolledPercentage > 75 ? 'bg-amber-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.min(enrolledPercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedSchedule(sch)}
                    className="text-xs text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Xem nội dung bài học
                  </button>

                  <div className="flex items-center gap-2">
                    {/* View Enrolled List (Admin or general) */}
                    <button
                      onClick={() => setViewingRegistrationsSchedule(sch)}
                      className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                      title="Xem danh sách bà con đã đăng ký"
                    >
                      <Users className="w-3.5 h-3.5 text-stone-500" />
                      <span>Danh sách ({sch.registrations.length})</span>
                    </button>

                    {/* Citizen Register Button */}
                    <button
                      onClick={() => handleStartRegister(sch)}
                      disabled={isFull || sch.status === 'da-ket-thuc'}
                      className={`px-4 py-1.5 text-xs font-bold rounded-lg shadow-xs transition-all flex items-center gap-1.5 ${
                        isFull
                          ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          : sch.status === 'da-ket-thuc'
                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                          : 'bg-blue-700 hover:bg-blue-800 text-white'
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{isFull ? 'Đã đủ sĩ số' : 'Đăng Ký Học'}</span>
                    </button>

                    {/* Admin controls */}
                    {isAdmin && (
                      <div className="flex items-center gap-1 pl-1 border-l border-stone-200">
                        <button
                          onClick={() => handleOpenEdit(sch)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md"
                          title="Sửa lịch học"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc muốn xóa lớp học: "${sch.title}"?`)) {
                              onDeleteSchedule(sch.id);
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md"
                          title="Xóa lớp học"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: View Schedule Detail / Curriculum */}
      {selectedSchedule && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-200">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedSchedule.status)}
                  <span className="text-xs font-semibold text-stone-500 font-mono">
                    {selectedSchedule.courseCode}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                  {selectedSchedule.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSchedule(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div>
                <span className="text-stone-400 block">Thời gian:</span>
                <span className="font-bold text-stone-800">{selectedSchedule.timeSlot}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Ngày bắt đầu:</span>
                <span className="font-bold text-stone-800">{selectedSchedule.startDate}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Địa điểm học:</span>
                <span className="font-bold text-stone-800">{selectedSchedule.location}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Giảng viên / Báo cáo viên:</span>
                <span className="font-bold text-stone-800">{selectedSchedule.instructor}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Đối tượng tham gia:</span>
                <span className="font-medium text-stone-800">{selectedSchedule.targetAudience}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Học phí:</span>
                <span className="font-bold text-emerald-700">{selectedSchedule.feeInfo}</span>
              </div>
            </div>

            {/* Curriculum */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Chương trình & Các chuyên đề bài học:
              </h4>
              <div className="space-y-2">
                {selectedSchedule.curriculum.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 font-medium flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                      {idx + 1}
                    </span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedSchedule.prerequisites && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                <span className="font-bold block">Lưu ý đối với học viên:</span>
                <p>{selectedSchedule.prerequisites}</p>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedSchedule(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
              >
                Đóng lại
              </button>
              <button
                onClick={() => {
                  setSelectedSchedule(null);
                  handleStartRegister(selectedSchedule);
                }}
                disabled={selectedSchedule.currentEnrolled >= selectedSchedule.maxSeats}
                className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Đăng Ký Tham Gia Ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Citizen Register For Class */}
      {registerTargetSchedule && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl relative border border-stone-200">
            <div className="flex items-start justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                  Đăng ký tham gia lớp học
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug mt-0.5">
                  {registerTargetSchedule.title}
                </h3>
              </div>
              <button
                onClick={() => setRegisterTargetSchedule(null)}
                className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {registerSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-extrabold text-stone-900">Đăng Ký Thành Công!</h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  Trung tâm Học tập Cộng đồng Xã Long Hồ đã ghi nhận thông tin của bạn. Cán bộ phụ trách sẽ liên hệ qua điện thoại trước ngày khai giảng.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitRegistration} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Họ và tên học viên <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn Năm"
                    value={regForm.fullName}
                    onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                      Số điện thoại liên hệ <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0918.xxx.xxx"
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                      Ấp đang cư trú <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={regForm.hamlet}
                      onChange={(e) => setRegForm({ ...regForm, hamlet: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg bg-white"
                    >
                      {HAMLETS.map((hamlet) => (
                        <option key={hamlet} value={hamlet}>
                          {hamlet}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                      Năm sinh
                    </label>
                    <input
                      type="number"
                      min="1940"
                      max="2015"
                      value={regForm.birthYear}
                      onChange={(e) => setRegForm({ ...regForm, birthYear: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                      Giới tính
                    </label>
                    <select
                      value={regForm.gender}
                      onChange={(e: any) => setRegForm({ ...regForm, gender: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg bg-white"
                    >
                      <option value="nam">Nam</option>
                      <option value="nu">Nữ</option>
                      <option value="khac">Khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Ghi chú / Nguyện vọng (nếu có)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Nhà có 5 công sầu riêng, mong muốn học thêm cách tỉa cành..."
                    value={regForm.notes}
                    onChange={(e) => setRegForm({ ...regForm, notes: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>

                <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-900 border border-blue-100 flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-700 flex-shrink-0" />
                  <span>Khóa học được hỗ trợ 100% học phí và tài liệu học tập.</span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRegisterTargetSchedule(null)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Xác Nhận Đăng Ký</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal: View Enrolled Students List (Staff or Review) */}
      {viewingRegistrationsSchedule && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-200">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                  Danh sách học viên đăng ký tham gia lớp
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                  {viewingRegistrationsSchedule.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Đã có <strong>{viewingRegistrationsSchedule.registrations.length}</strong> học viên đăng ký trên hệ thống.
                </p>
              </div>
              <button
                onClick={() => setViewingRegistrationsSchedule(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {viewingRegistrationsSchedule.registrations.length === 0 ? (
              <div className="py-8 text-center text-stone-500 text-xs space-y-2">
                <Users className="w-8 h-8 text-stone-300 mx-auto" />
                <p>Chưa có học viên nào đăng ký trực tuyến cho lớp này.</p>
                <p className="text-stone-400">Bà con bấm nút &quot;Đăng Ký Học&quot; để bổ sung tên vào danh sách.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
                  <thead className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">STT</th>
                      <th className="p-3">Họ và Tên</th>
                      <th className="p-3">Điện Thoại</th>
                      <th className="p-3">Ấp / Thôn</th>
                      <th className="p-3">Năm Sinh</th>
                      <th className="p-3">Ghi Chú</th>
                      <th className="p-3">Trạng Thái</th>
                      {isAdmin && <th className="p-3 text-right">Thao tác</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {viewingRegistrationsSchedule.registrations.map((reg, idx) => (
                      <tr key={reg.id} className="hover:bg-stone-50">
                        <td className="p-3 text-stone-400 font-mono">{idx + 1}</td>
                        <td className="p-3 font-bold text-stone-900">{reg.fullName}</td>
                        <td className="p-3 font-mono text-stone-700">{reg.phone}</td>
                        <td className="p-3 font-medium text-stone-700">{reg.hamlet}</td>
                        <td className="p-3 text-stone-600">{reg.birthYear}</td>
                        <td className="p-3 text-stone-500 max-w-[150px] truncate" title={reg.notes}>
                          {reg.notes || '-'}
                        </td>
                        <td className="p-3">
                          <span
                            onClick={() => {
                              if (isAdmin) {
                                onToggleRegistrationStatus(viewingRegistrationsSchedule.id, reg.id);
                              }
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                              reg.status === 'da-xac-nhan'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                            title={isAdmin ? "Bấm để đổi trạng thái xác nhận" : ""}
                          >
                            {reg.status === 'da-xac-nhan' ? 'Đã xác nhận' : 'Chờ gọi điện'}
                          </span>
                        </td>
                        {isAdmin && (
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Xóa học viên ${reg.fullName} khỏi danh sách?`)) {
                                  onDeleteRegistration(viewingRegistrationsSchedule.id, reg.id);
                                }
                              }}
                              className="text-red-500 hover:text-blue-700 font-bold"
                              title="Xóa học viên"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In danh sách điểm danh</span>
              </button>

              <button
                onClick={() => setViewingRegistrationsSchedule(null)}
                className="px-4 py-2 bg-stone-900 text-white font-bold text-xs rounded-xl hover:bg-stone-800"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add or Edit Schedule (For Staff) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 space-y-5 max-h-[92vh] overflow-y-auto shadow-2xl relative border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-700" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  {editingScheduleId ? 'Cập Nhật Lịch Học' : 'Đưa Lịch Học Mới Lên Web'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitSchedule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Tên lớp học / Chuyên đề đào tạo <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Lớp Kỹ thuật nuôi ốc bươu đen thương phẩm..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Mã khóa học (Course Code)
                  </label>
                  <input
                    type="text"
                    value={formData.courseCode}
                    onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Lĩnh vực đào tạo
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="Khuyến nông - Làm vườn">Khuyến nông - Làm vườn</option>
                    <option value="Chuyển đổi số">Chuyển đổi số & Tin học</option>
                    <option value="Đào tạo nghề">Đào tạo nghề lao động nông thôn</option>
                    <option value="Sức khỏe cộng đồng">Sức khỏe cộng đồng</option>
                    <option value="Pháp luật & Khuyến học">Pháp luật & Khuyến học</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Giảng viên / Báo cáo viên <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Kỹ sư Nguyễn Văn A"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Chức danh / Cơ quan công tác
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Chuyên gia Trạm Khuyến nông huyện"
                    value={formData.instructorTitle}
                    onChange={(e) => setFormData({ ...formData, instructorTitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Ngày khai giảng <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Khung giờ học
                  </label>
                  <input
                    type="text"
                    placeholder="08:00 - 11:00 (Thứ 7 & CN)"
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Tổng số buổi
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.totalSessions}
                    onChange={(e) => setFormData({ ...formData, totalSessions: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Địa điểm tổ chức <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Hội trường UBND Xã Long Hồ..."
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Chỉ tiêu sĩ số tối đa
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={formData.maxSeats}
                    onChange={(e) => setFormData({ ...formData, maxSeats: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Mô tả mục tiêu khóa học
                </label>
                <textarea
                  rows={2}
                  placeholder="Mô tả kiến thức, kỹ năng học viên sẽ đạt được sau khóa học..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Các chuyên đề bài học (Mỗi dòng là một chuyên đề)
                </label>
                <textarea
                  rows={4}
                  placeholder="Chuyên đề 1: ...&#10;Chuyên đề 2: ...&#10;Chuyên đề 3: ..."
                  value={formData.curriculumText}
                  onChange={(e) => setFormData({ ...formData, curriculumText: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Chính sách học phí / Hỗ trợ
                  </label>
                  <input
                    type="text"
                    value={formData.feeInfo}
                    onChange={(e) => setFormData({ ...formData, feeInfo: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Trạng thái lớp học
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="sap-dien-ra">Sắp diễn ra</option>
                    <option value="dang-dien-ra">Đang diễn ra</option>
                    <option value="da-ket-thuc">Đã hoàn thành</option>
                    <option value="tam-hoan">Tạm hoãn</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-amber-200" />
                  <span>{editingScheduleId ? 'Lưu Thay Đổi' : 'Đưa Lịch Lên Web'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
