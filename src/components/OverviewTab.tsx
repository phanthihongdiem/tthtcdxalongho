import React from 'react';
import { 
  BookOpen, 
  Bell, 
  Calendar, 
  FileText, 
  Users, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  Download, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  PlusCircle, 
  GraduationCap,
  Layers,
  ChevronRight,
  TrendingUp,
  FileUp,
  Search,
  Video,
  MonitorPlay,
  Radio,
  Award
} from 'lucide-react';
import { DocumentItem, AnnouncementItem, ClassScheduleItem, ActiveTab, UserAccount } from '../types';
import { Lock } from 'lucide-react';

interface OverviewTabProps {
  documents: DocumentItem[];
  announcements: AnnouncementItem[];
  schedules: ClassScheduleItem[];
  isAdmin: boolean;
  currentUser: UserAccount | null;
  onRequireAuth: (promptReason: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAddDoc: () => void;
  onOpenAddAnnouncement: () => void;
  onOpenAddSchedule: () => void;
  onSelectDoc: (doc: DocumentItem) => void;
  onSelectAnnouncement: (ann: AnnouncementItem) => void;
  onSelectSchedule: (sch: ClassScheduleItem) => void;
  onRegisterSchedule: (sch: ClassScheduleItem) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  documents,
  announcements,
  schedules,
  isAdmin,
  currentUser,
  onRequireAuth,
  setActiveTab,
  onOpenAddDoc,
  onOpenAddAnnouncement,
  onOpenAddSchedule,
  onSelectDoc,
  onSelectAnnouncement,
  onSelectSchedule,
  onRegisterSchedule,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const pinnedAnnouncements = announcements.filter(a => a.isPinned);
  const regularAnnouncements = announcements.filter(a => !a.isPinned).slice(0, 3);
  const upcomingSchedules = schedules
    .filter(s => s.status === 'sap-dien-ra' || s.status === 'dang-dien-ra')
    .slice(0, 3);
  const featuredDocs = documents.filter(d => d.isFeatured).slice(0, 4);

  const totalDownloads = documents.reduce((sum, d) => sum + d.downloadsCount, 0);
  const totalRegistrations = schedules.reduce((sum, s) => sum + s.registrations.length, 0);

  // Quick search matching
  const matchedDocs = searchQuery.trim()
    ? documents.filter(d => 
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const matchedSchedules = searchQuery.trim()
    ? schedules.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Welcome & Unified Search Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg p-6 sm:p-8">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-amber-200 text-xs font-semibold tracking-wide border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            Cổng Thông Tin Học Tập & Tri Thức Cộng Đồng Xã Long Hồ
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
            Nâng Cao Dân Trí, Chia Sẻ Kỹ Năng & Đồng Hành Cùng Nông Thôn Mới
          </h2>
          <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
            Hệ thống thông tin điện tử phục vụ người dân 10 ấp: tra cứu cẩm nang kỹ thuật canh tác, 
            cập nhật thông báo chỉ đạo điều hành và đăng ký tham gia các lớp tập huấn - đào tạo nghề miễn phí.
          </p>

          {/* Unified Quick Search Bar */}
          <div className="pt-2 max-w-2xl">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm nhanh: cẩm nang sầu riêng, kỹ thuật nuôi dê, lớp OneAI, VNeID..."
                className="w-full pl-10 pr-24 py-2.5 bg-white text-stone-900 rounded-xl text-xs sm:text-sm placeholder-stone-400 shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 border border-white/20"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 px-2.5 py-1 text-xs bg-stone-100 text-stone-600 hover:bg-stone-200 rounded-lg transition-colors font-medium"
                >
                  Xóa
                </button>
              ) : (
                <span className="absolute right-3 text-[11px] text-stone-400 hidden sm:inline font-medium">
                  Tra cứu tức thì
                </span>
              )}
            </div>

            {/* Quick Keyword Suggestions */}
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap text-xs">
              <span className="text-amber-200/80 text-[11px] font-medium mr-1">Chủ đề gợi ý:</span>
              {[
                { label: 'Sầu riêng Cadimi', query: 'Cadimi' },
                { label: 'Chăn nuôi dê', query: 'nuôi dê' },
                { label: 'Nuôi ếch bể bạt', query: 'nuôi ếch' },
                { label: 'Lớp OneAI', query: 'OneAI' },
                { label: 'VNeID & Dịch vụ công', query: 'VNeID' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSearchQuery(item.query)}
                  className="px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium backdrop-blur-sm transition-colors border border-white/10"
                >
                  #{item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Admin Shortcuts */}
          {isAdmin && (
            <div className="pt-2 flex items-center gap-2 border-t border-white/15">
              <span className="text-xs text-amber-200 font-semibold">Tác vụ Cán bộ:</span>
              <button
                onClick={onOpenAddDoc}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs rounded-lg backdrop-blur-sm transition-all flex items-center gap-1.5"
                title="Cán bộ đưa tài liệu mới lên web"
              >
                <FileUp className="w-3.5 h-3.5" />
                + Đưa tài liệu lên
              </button>
              <button
                onClick={onOpenAddAnnouncement}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs rounded-lg backdrop-blur-sm transition-all flex items-center gap-1.5"
                title="Cán bộ đăng thông báo mới"
              >
                <Bell className="w-3.5 h-3.5" />
                + Đăng thông báo
              </button>
              <button
                onClick={onOpenAddSchedule}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs rounded-lg backdrop-blur-sm transition-all flex items-center gap-1.5"
                title="Cán bộ mở lớp học mới"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                + Mở lớp học mới
              </button>
            </div>
          )}
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <GraduationCap className="w-80 h-80 text-white transform translate-x-12 -rotate-12" />
        </div>
      </div>

      {/* Instant Search Results Dropdown/Box when query is active */}
      {searchQuery.trim() && (
        <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-5 shadow-sm space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-800" />
              <h3 className="text-sm font-bold text-stone-900">
                Kết quả tìm kiếm cho từ khóa: <span className="text-blue-700 font-extrabold">"{searchQuery}"</span>
              </h3>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-semibold text-stone-500 hover:text-stone-800 underline"
            >
              Đóng kết quả
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Matching Documents */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                <span className="text-xs font-bold text-blue-800 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Cẩm Nang & Tài Liệu ({matchedDocs.length})
                </span>
                <button
                  onClick={() => setActiveTab('tai-lieu')}
                  className="text-[11px] text-blue-700 hover:underline font-semibold"
                >
                  Xem trong Kho tài liệu &rarr;
                </button>
              </div>
              {matchedDocs.length === 0 ? (
                <p className="text-xs text-stone-500 italic py-2">Không tìm thấy tài liệu phù hợp từ khóa.</p>
              ) : (
                matchedDocs.map(doc => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      if (!currentUser) {
                        onRequireAuth('Bà con vui lòng đăng nhập để đọc tài liệu.');
                        return;
                      }
                      onSelectDoc(doc);
                    }}
                    className="p-2 rounded-lg hover:bg-stone-50 cursor-pointer border border-transparent hover:border-stone-200 transition-all text-xs"
                  >
                    <p className="font-bold text-stone-900 line-clamp-1">{doc.title}</p>
                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{doc.description}</p>
                  </div>
                ))
              )}
            </div>

            {/* Matching Schedules */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                <span className="text-xs font-bold text-blue-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Lớp Học & Đào Tạo ({matchedSchedules.length})
                </span>
                <button
                  onClick={() => setActiveTab('lich-hoc')}
                  className="text-[11px] text-blue-700 hover:underline font-semibold"
                >
                  Xem trong Lịch học &rarr;
                </button>
              </div>
              {matchedSchedules.length === 0 ? (
                <p className="text-xs text-stone-500 italic py-2">Không có lớp học nào khớp với từ khóa.</p>
              ) : (
                matchedSchedules.map(sch => (
                  <div
                    key={sch.id}
                    onClick={() => onSelectSchedule(sch)}
                    className="p-2 rounded-lg hover:bg-stone-50 cursor-pointer border border-transparent hover:border-stone-200 transition-all text-xs"
                  >
                    <p className="font-bold text-stone-900 line-clamp-1">{sch.title}</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Thời gian: {sch.timeSlot} • Khai giảng: {sch.startDate}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spotlight: Học Trực Tuyến & Bài Giảng Số Hóa */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-800 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/50 border border-emerald-400/40 text-emerald-200 flex items-center justify-center shrink-0">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-stone-900">
                CHỨC NĂNG MỚI
              </span>
              <span className="text-xs text-emerald-200">
                Tổ chức học trực tiếp & trực tuyến
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Phòng Học Trực Tuyến (Meet / Zoom / Teams) & Kho Bài Giảng Tương Tác
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-0.5 max-w-2xl leading-relaxed">
              Bà con có thể vào lớp học trực tuyến từ xa qua Google Meet/Zoom/Teams bằng 1 cú nhấp chuột, xem lại các video tập huấn kỹ thuật và hoàn thành bài tập tương tác để nhận chứng nhận học tập suốt đời.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('hoc-truc-tuyen')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-900 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all"
          >
            <MonitorPlay className="w-4 h-4" />
            Vào Lớp & Bài Giảng
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('quan-ly-hoc-tap')}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-950/70 hover:bg-emerald-950 text-white rounded-xl font-semibold text-xs sm:text-sm border border-emerald-500/50 shadow-sm transition-all"
          >
            <GraduationCap className="w-4 h-4 text-amber-300" />
            Theo Dõi & Điểm Danh
          </button>
          <button
            onClick={() => setActiveTab('danh-gia-ket-qua')}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-sm transition-all"
          >
            <Award className="w-4 h-4 text-amber-200" />
            Đánh Giá & Kết Quả
          </button>
        </div>
      </div>

      {/* Main 4 Navigation & Statistics Cards - Distinct & Non-Overlapping */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Kho Cẩm Nang & Sổ Tay Kỹ Thuật */}
        <div 
          onClick={() => setActiveTab('tai-lieu')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                Thư Viện Số
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-700 group-hover:text-white transition-all">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <h3 className="mt-3 text-base font-bold text-stone-900 group-hover:text-blue-700 transition-colors">
              Kho Cẩm Nang Kỹ Thuật
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Sổ tay canh tác sầu riêng, quy trình nuôi dê, nuôi ếch, cẩm nang VNeID và pháp luật.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs font-extrabold text-stone-800">{documents.length} tài liệu</span>
            <span className="text-xs text-blue-700 font-bold group-hover:underline flex items-center gap-1">
              Mở kho &rarr;
            </span>
          </div>
        </div>

        {/* Card 2: Lịch Đào Tạo & Ghi Danh */}
        <div 
          onClick={() => setActiveTab('lich-hoc')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                Khóa Tập Huấn
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-700 group-hover:text-white transition-all">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <h3 className="mt-3 text-base font-bold text-stone-900 group-hover:text-blue-700 transition-colors">
              Lịch Đào Tạo & Ghi Danh
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Lịch học OneAI, lớp kiểm soát Cadimi sầu riêng, chăn nuôi và đăng ký học nghề trực tuyến.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs font-extrabold text-stone-800">{schedules.length} khóa học ({upcomingSchedules.length} đang mở)</span>
            <span className="text-xs text-blue-700 font-bold group-hover:underline flex items-center gap-1">
              Xem lịch &rarr;
            </span>
          </div>
        </div>

        {/* Card 3: Bản Tin & Thông Báo Khẩn */}
        <div 
          onClick={() => setActiveTab('thong-bao')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-amber-50 text-amber-700 rounded-full border border-amber-100">
                Tin Tức Địa Phương
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all">
                <Bell className="w-5 h-5" />
              </div>
            </div>
            <h3 className="mt-3 text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
              Bản Tin & Thông Báo Khẩn
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Thông báo chỉ đạo từ UBND xã, lịch tiêm phòng, lịch vận hành cống đập ngăn mặn triều cường.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs font-extrabold text-stone-800">{announcements.length} thông báo ({pinnedAnnouncements.length} tin ghim)</span>
            <span className="text-xs text-amber-700 font-bold group-hover:underline flex items-center gap-1">
              Đọc tin &rarr;
            </span>
          </div>
        </div>

        {/* Card 4: Góp Ý & Đề Xuất Mở Lớp */}
        <div 
          onClick={() => setActiveTab('gioi-thieu')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                Ý Kiến Người Dân
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <h3 className="mt-3 text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
              Đề Xuất Mở Lớp & Góp Ý
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Gửi kiến nghị hoặc nguyện vọng mở lớp đào tạo nghề trực tiếp đến Ban Giám đốc Trung tâm.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs font-extrabold text-stone-800">10/10 ấp tiếp cận</span>
            <span className="text-xs text-emerald-700 font-bold group-hover:underline flex items-center gap-1">
              Gửi ý kiến &rarr;
            </span>
          </div>
        </div>
      </div>

      {/* Primary Section: 2 Columns (Announcements & Upcoming Class Schedules) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Announcements (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-6 bg-blue-700 rounded-sm" />
              <h3 className="text-lg font-bold text-stone-900">Thông Báo Mới & Khẩn Cấp</h3>
            </div>
            <button
              onClick={() => setActiveTab('thong-bao')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              Xem tất cả ({announcements.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Announcements List */}
          <div className="space-y-3">
            {pinnedAnnouncements.map((ann) => (
              <div
                key={ann.id}
                onClick={() => onSelectAnnouncement(ann)}
                className="bg-amber-50/70 border border-amber-300/80 rounded-xl p-4.5 hover:shadow-md transition-all cursor-pointer relative overflow-hidden group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-700 text-white rounded uppercase tracking-wider">
                        {ann.priority === 'khan' ? 'KHẨN CẤP' : 'QUAN TRỌNG'}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-200/80 text-amber-900 rounded">
                        {ann.categoryLabel}
                      </span>
                      <span className="text-xs text-stone-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {ann.datePosted}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {ann.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {ann.summary}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-stone-700 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
                <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center justify-between text-xs text-stone-600">
                  <span className="font-medium text-stone-700 truncate max-w-xs">{ann.postedBy}</span>
                  <span className="text-blue-700 font-semibold group-hover:underline">Bấm xem chi tiết &rarr;</span>
                </div>
              </div>
            ))}

            {regularAnnouncements.map((ann) => (
              <div
                key={ann.id}
                onClick={() => onSelectAnnouncement(ann)}
                className="bg-white border border-stone-200 rounded-xl p-4 hover:border-stone-300 hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-stone-100 text-stone-700 rounded">
                        {ann.categoryLabel}
                      </span>
                      <span className="text-xs text-stone-400">{ann.datePosted}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 group-hover:text-blue-700 transition-colors">
                      {ann.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-1">
                      {ann.summary}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-600 flex-shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Class Schedules (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-6 bg-blue-700 rounded-sm" />
              <h3 className="text-lg font-bold text-stone-900">Lớp Tập Huấn & Đào Tạo Nghề</h3>
            </div>
            <button
              onClick={() => setActiveTab('lich-hoc')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              Xem lịch ({schedules.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {upcomingSchedules.map((sch) => {
              const enrolledPercentage = Math.round((sch.currentEnrolled / sch.maxSeats) * 100);
              return (
                <div
                  key={sch.id}
                  className="bg-white border border-stone-200 rounded-xl p-4.5 hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-800 rounded">
                        {sch.category}
                      </span>
                      <h4 
                        onClick={() => onSelectSchedule(sch)}
                        className="text-sm font-bold text-stone-900 hover:text-blue-700 cursor-pointer mt-1 line-clamp-2"
                      >
                        {sch.title}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full flex-shrink-0">
                      {sch.feeInfo.includes('Miễn phí') ? 'Miễn phí 100%' : sch.feeInfo}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <Clock className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <span>{sch.timeSlot} (Bắt đầu: {sch.startDate})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <span className="truncate">{sch.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-600">
                      <Users className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <span>Báo cáo viên: <strong>{sch.instructor}</strong></span>
                    </div>
                  </div>

                  {/* Enrollment Progress */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span>Đã có <strong>{sch.currentEnrolled}</strong> / {sch.maxSeats} học viên</span>
                      <span className="font-semibold text-blue-700">{enrolledPercentage}%</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          enrolledPercentage > 85 ? 'bg-amber-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.min(enrolledPercentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectSchedule(sch)}
                      className="text-xs text-stone-600 hover:text-stone-900 font-medium"
                    >
                      Xem nội dung học
                    </button>
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          onRequireAuth('Vui lòng Đăng ký tài khoản hoặc Đăng nhập để gửi đăng ký tham gia lớp học.');
                          return;
                        }
                        onRegisterSchedule(sch);
                      }}
                      className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                    >
                      Đăng Ký Tham Gia
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Documents Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-blue-700 rounded-sm" />
            <h3 className="text-lg font-bold text-stone-900">Cẩm Nang & Tài Liệu Kỹ Thuật Tiêu Biểu</h3>
          </div>
          <button
            onClick={() => setActiveTab('tai-lieu')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            Mở kho tài liệu ({documents.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => {
                if (!currentUser) {
                  onRequireAuth('Bà con vui lòng Đăng ký tài khoản hoặc Đăng nhập để xem toàn văn và tải tài liệu này.');
                  return;
                }
                onSelectDoc(doc);
              }}
              className="bg-white border border-stone-200 rounded-xl p-4.5 hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 rounded">
                    {doc.categoryLabel}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-stone-400">
                    {doc.fileType} • {doc.fileSize}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                  {doc.title}
                </h4>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <Download className="w-3 h-3 text-emerald-600" />
                  {doc.downloadsCount} tải
                </span>
                <span className={`font-semibold group-hover:underline flex items-center gap-1 ${
                  currentUser ? 'text-emerald-700' : 'text-amber-700'
                }`}>
                  {!currentUser && <Lock className="w-3 h-3" />}
                  {currentUser ? 'Đọc ngay →' : 'Đăng ký đọc →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Banner for Citizens */}
      <div className="bg-stone-100 border border-stone-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-900 flex items-center justify-center flex-shrink-0 font-bold">
            💡
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">
              Bà con có nhu cầu học chuyên đề nào nhưng chưa có lớp?
            </h4>
            <p className="text-xs text-stone-600">
              Hãy gửi nguyện vọng trực tiếp đến Ban Giám đốc Trung tâm để chúng tôi liên kết chuyên gia mở lớp phục vụ bà con.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('gioi-thieu')}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition-colors flex-shrink-0 shadow-xs"
        >
          Gửi Nguyện Vọng Mở Lớp
        </button>
      </div>
    </div>
  );
};
