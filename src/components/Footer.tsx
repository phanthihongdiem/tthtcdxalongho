import React from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Database, 
  ShieldCheck, 
  Heart, 
  FileText, 
  BookOpen, 
  Calendar, 
  Bell 
} from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenBackup: () => void;
  isAdmin: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBackup, isAdmin }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-16 border-t border-stone-800 text-xs">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Agency Brand */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-extrabold text-base shadow-sm">
              LH
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                UBND XÃ LONG HỒ
              </div>
              <div className="text-base font-extrabold text-white">
                TRUNG TÂM HỌC TẬP CỘNG ĐỒNG
              </div>
            </div>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed max-w-md">
            Hệ thống cung cấp tri thức, cẩm nang nông nghiệp, tài liệu kỹ năng số và thông báo các lớp đào tạo nghề cho toàn thể nhân dân các ấp thuộc Xã Long Hồ.
          </p>
          <div className="pt-2 text-stone-400 space-y-1.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Trụ sở: <strong>Trụ sở UBND Xã Long Hồ, Huyện Long Hồ, Tỉnh Vĩnh Long</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Đường dây nóng: <strong>0270.3859901</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span>Email: <strong>longho@vinhlong.gov.vn</strong></span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Chuyên Mục Chính
          </h4>
          <ul className="space-y-2 text-stone-400 font-medium">
            <li>
              <button 
                onClick={() => setActiveTab('tai-lieu')} 
                className="hover:text-amber-400 flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Kho Tài Liệu Kỹ Thuật</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('thong-bao')} 
                className="hover:text-amber-400 flex items-center gap-1.5 transition-colors"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Bản Tin & Tuyển Sinh</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('lich-hoc')} 
                className="hover:text-amber-400 flex items-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Lịch Học & Đăng Ký Lớp</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('gioi-thieu')} 
                className="hover:text-amber-400 flex items-center gap-1.5 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Giới Thiệu & Đề Xuất Lớp</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Administration & Backup */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Quản Trị Hệ Thống
          </h4>
          <p className="text-stone-400 text-xs">
            Dành cho cán bộ phụ trách quản lý tài liệu, đưa thông báo và lập lịch giảng dạy.
          </p>

          <button
            onClick={onOpenBackup}
            className="w-full py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg flex items-center justify-center gap-2 border border-stone-700 transition-colors text-xs font-semibold"
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Sao Lưu / Khôi Phục Dữ Liệu</span>
          </button>

          <div className="pt-2 text-[11px] text-stone-500">
            Hệ thống hỗ trợ lưu trữ cục bộ tự động, chống mất mát dữ liệu khi chuyển thiết bị.
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800 py-4 px-4 sm:px-6 text-center text-stone-500 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 Trung tâm Học tập Cộng đồng Xã Long Hồ. Bản quyền thuộc UBND Xã Long Hồ.
          </span>
          <span className="flex items-center gap-1 text-stone-400">
            Ứng dụng công nghệ số phục vụ học tập suốt đời của cộng đồng
          </span>
        </div>
      </div>
    </footer>
  );
};
