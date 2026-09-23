import React from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Bell, 
  Calendar, 
  Info, 
  ShieldCheck, 
  User, 
  Sparkles, 
  PhoneCall, 
  Menu, 
  X, 
  LogIn, 
  LogOut, 
  UserPlus, 
  Users, 
  ChevronDown,
  Video,
  Award
} from 'lucide-react';
import { ActiveTab, UserAccount } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUser: UserAccount | null;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onLogout: () => void;
  onOpenUserManagement?: () => void;
  accountsCount?: number;
  onOpenSearch?: () => void;
  unreadCount?: number;
  largeFont?: boolean;
  setLargeFont?: React.Dispatch<React.SetStateAction<boolean>>;
  hasLiveClass?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenUserManagement,
  accountsCount = 0,
  unreadCount = 0,
  hasLiveClass = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  const navItems = [
    { id: 'tong-quan' as ActiveTab, label: 'Trang Chủ', icon: Sparkles },
    { id: 'tai-lieu' as ActiveTab, label: 'Kho Tài Liệu', icon: BookOpen },
    { 
      id: 'thong-bao' as ActiveTab, 
      label: 'Thông Báo & Bản Tin', 
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined 
    },
    { id: 'lich-hoc' as ActiveTab, label: 'Lịch Học & Đào Tạo', icon: Calendar },
    { 
      id: 'hoc-truc-tuyen' as ActiveTab, 
      label: 'Học Trực Tuyến & Bài Giảng', 
      icon: Video,
      badge: hasLiveClass ? 'LIVE' : undefined 
    },
    { 
      id: 'quan-ly-hoc-tap' as ActiveTab, 
      label: 'Quản Lý Học Tập & Điểm Danh', 
      icon: GraduationCap 
    },
    { 
      id: 'danh-gia-ket-qua' as ActiveTab, 
      label: 'Đánh Giá & Kết Quả', 
      icon: Award 
    },
    { id: 'gioi-thieu' as ActiveTab, label: 'Giới Thiệu & Ý Kiến', icon: Info },
  ];

  const isAdmin = currentUser?.role === 'admin';

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs">
      {/* Top Info Bar */}
      <div className="bg-stone-900 text-stone-300 py-1.5 px-4 sm:px-6 text-[11px] border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-300/90 font-medium">Học tập suốt đời - Nâng cao dân trí</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Đường dây nóng:</span>
            <strong className="text-stone-200">0270.3859901</strong>
          </div>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between gap-3">
        {/* Logo and Center Title */}
        <div 
          onClick={() => setActiveTab('tong-quan')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-700 to-blue-800 text-white flex items-center justify-center font-black text-lg shadow-sm border border-blue-900/30 group-hover:scale-105 transition-transform flex-shrink-0">
            LH
          </div>
          <div>
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-800">
              UBND XÃ LONG HỒ
            </div>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-stone-900 leading-tight tracking-tight flex items-center gap-2">
              TRUNG TÂM HỌC TẬP CỘNG ĐỒNG
            </h1>
            <p className="text-xs font-semibold text-blue-700">
              HỆ THỐNG QUẢN LÝ TÀI LIỆU, THÔNG BÁO & LỊCH HỌC
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* USER AUTHENTICATION & ROLE WIDGET */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  isAdmin
                    ? 'bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
                }`}
                id="btn-user-profile-menu"
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-white text-[11px] ${
                  isAdmin ? 'bg-blue-700' : 'bg-emerald-700'
                }`}>
                  {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>
                <div className="text-left hidden sm:block max-w-[140px] truncate">
                  <div className="font-bold truncate leading-tight">{currentUser.fullName}</div>
                  <div className="text-[10px] font-normal text-stone-500 leading-tight">
                    {isAdmin ? 'Cán bộ Quản trị' : (currentUser.hamlet || 'Người dân')}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 ml-0.5" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white border border-stone-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-stone-100">
                    <div className="font-bold text-xs text-stone-900">{currentUser.fullName}</div>
                    <div className="text-[11px] text-stone-500">
                      Tài khoản: <span className="font-mono text-stone-700">{currentUser.username}</span>
                    </div>
                    <div className="mt-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                        isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isAdmin ? <ShieldCheck className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {isAdmin ? 'Cán bộ Quản trị (Toàn quyền)' : 'Người dân (Xem & Tải tài liệu)'}
                      </span>
                    </div>
                  </div>

                  {isAdmin && onOpenUserManagement && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenUserManagement();
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2 transition-colors font-medium"
                    >
                      <Users className="w-3.5 h-3.5 text-blue-700" />
                      <span>Quản lý người dùng ({accountsCount})</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đăng xuất tài khoản</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-xs transition-colors"
                id="btn-header-login"
                title="Đăng nhập cán bộ hoặc người dân để xem và tải tài liệu"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-200" />
                <span>Đăng Nhập</span>
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg border border-stone-200 transition-colors"
                id="btn-header-register"
                title="Đăng ký tài khoản người dân mới"
              >
                <UserPlus className="w-3.5 h-3.5 text-blue-700" />
                <span>Đăng Ký</span>
              </button>
            </div>
          )}

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
            id="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="bg-stone-50 border-t border-stone-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-1 py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-200' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded-full ${
                      item.badge === 'LIVE' 
                        ? 'bg-rose-500 text-white animate-pulse' 
                        : 'bg-amber-400 text-stone-900'
                    }`}>
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Quick Notice ticker */}
          <div className="hidden lg:flex items-center gap-2 text-xs py-2 text-stone-500">
            <span className="font-bold text-blue-700 uppercase text-[11px] bg-blue-100 px-2 py-0.5 rounded">
              Lưu ý
            </span>
            <span className="text-stone-600 truncate max-w-sm">
              {currentUser 
                ? (isAdmin ? 'Đang kích hoạt đầy đủ quyền Cán bộ Quản trị.' : 'Đã đăng nhập: Bạn có toàn quyền xem toàn văn và tải tài liệu.') 
                : 'Bà con vui lòng đăng nhập hoặc đăng ký tài khoản để xem toàn văn và tải tài liệu.'}
            </span>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-stone-200 flex flex-col gap-1.5 animate-in fade-in duration-150">
            {currentUser && (
              <div className="p-3 bg-white rounded-xl border border-stone-200 mb-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-stone-900">{currentUser.fullName}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {isAdmin ? 'Cán bộ Quản trị' : 'Người dân'}
                  </span>
                </div>
                {isAdmin && onOpenUserManagement && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenUserManagement();
                    }}
                    className="w-full text-left py-1 text-xs text-blue-700 font-semibold"
                  >
                    Quản lý danh sách người dùng ({accountsCount})
                  </button>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left py-1 text-xs text-stone-500 hover:text-red-700"
                >
                  Đăng xuất
                </button>
              </div>
            )}

            {!currentUser && (
              <div className="flex gap-2 p-2 bg-stone-100 rounded-xl mb-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="flex-1 py-2 text-center text-xs font-bold bg-blue-700 text-white rounded-lg"
                >
                  Đăng Nhập
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="flex-1 py-2 text-center text-xs font-bold bg-white text-stone-800 border border-stone-300 rounded-lg"
                >
                  Đăng Ký
                </button>
              </div>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      item.badge === 'LIVE' 
                        ? 'bg-rose-500 text-white animate-pulse' 
                        : 'bg-amber-400 text-stone-900'
                    }`}>
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};
