import React, { useState, useEffect } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  User, 
  Lock, 
  Phone, 
  MapPin, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  KeyRound,
  RotateCcw,
  Check
} from 'lucide-react';
import { UserAccount, UserRole } from '../types';
import { HAMLETS, INITIAL_ACCOUNTS } from '../data/initialData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (account: UserAccount) => void;
  onRegister: (newAccount: Omit<UserAccount, 'id' | 'createdAt'>) => { success: boolean; message: string; account?: UserAccount };
  accounts?: UserAccount[];
  initialMode?: 'login' | 'register' | 'admin';
  promptReason?: string | null;
  onResetAdminPassword?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  accounts = INITIAL_ACCOUNTS,
  initialMode = 'login',
  promptReason,
  onResetAdminPassword,
}) => {
  const [mode, setMode] = useState<'admin' | 'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regHamlet, setRegHamlet] = useState(HAMLETS[0]);
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAgree, setRegAgree] = useState(true);

  // Sync mode when initialMode changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMsg(null);
      setSuccessMsg(null);
      if (initialMode === 'admin') {
        setUsername('admin');
        setPassword('');
      } else {
        setUsername('');
        setPassword('');
      }
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  // Quick fill admin credentials
  const handleQuickFillAdmin = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMsg(null);
    setSuccessMsg('Đã điền thông tin tài khoản Quản trị: admin / admin123');
  };

  // Quick fill citizen credentials
  const handleQuickFillCitizen = () => {
    setUsername('nguoidan');
    setPassword('123456');
    setErrorMsg(null);
    setSuccessMsg('Đã điền thông tin tài khoản Học viên mẫu: nguoidan / 123456');
  };

  // Quick reset admin password to default
  const handleResetAdmin = () => {
    if (onResetAdminPassword) {
      onResetAdminPassword();
    }
    setUsername('admin');
    setPassword('admin123');
    setErrorMsg(null);
    setSuccessMsg('Đã khôi phục tài khoản Admin về mật khẩu gốc: admin123. Bấm Đăng Nhập để vào hệ thống.');
  };

  // Handle Login Submit (for either Admin or Citizen)
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const u = username.trim().toLowerCase();
    const p = password.trim();

    if (!u || !p) {
      setErrorMsg('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    // Prepare list of accounts to check
    const accountPool = accounts && accounts.length > 0 ? accounts : INITIAL_ACCOUNTS;

    // Special hard guarantee: if logging in with default admin credentials
    if (u === 'admin' && p === 'admin123') {
      const existingAdmin = accountPool.find(acc => acc.username.toLowerCase() === 'admin');
      const adminAcc: UserAccount = existingAdmin || {
        id: 'acc-admin',
        username: 'admin',
        password: 'admin123',
        fullName: 'Cán bộ Quản trị Trung tâm',
        role: 'admin',
        department: 'Ban Giám đốc TT HTCĐ Xã Long Hồ',
        phone: '0270.3859901',
        email: 'longho@vinhlong.gov.vn',
        createdAt: '2026-01-01',
      };
      onLogin(adminAcc);
      onClose();
      return;
    }

    // Match user by username or phone
    const matched = accountPool.find(
      (acc) =>
        acc.username.toLowerCase() === u ||
        (acc.phone && acc.phone.replace(/\D/g, '') === u.replace(/\D/g, ''))
    );

    if (!matched) {
      if (mode === 'admin') {
        setErrorMsg('Không tìm thấy tài khoản Cán bộ Quản trị này. Tên đăng nhập mặc định là: admin');
      } else {
        setErrorMsg('Tài khoản không tồn tại. Vui lòng kiểm tra lại hoặc chuyển sang tab Đăng Ký Mới!');
      }
      return;
    }

    // Check password
    if (matched.password && matched.password !== p) {
      setErrorMsg(
        mode === 'admin' 
          ? 'Mật khẩu quản trị viên không chính xác! (Mặc định: admin123)' 
          : 'Mật khẩu không chính xác! Vui lòng thử lại.'
      );
      return;
    }

    // If logging in via Admin tab but account is not admin
    if (mode === 'admin' && matched.role !== 'admin') {
      setErrorMsg('Tài khoản này là tài khoản Người dân / Học viên. Để có quyền Quản trị, vui lòng đăng nhập tài khoản "admin".');
      return;
    }

    // Successful login
    onLogin(matched);
    onClose();
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!regFullName.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ Họ và tên.');
      return;
    }

    const usernameOrPhone = regUsername.trim() || regPhone.trim();
    if (!usernameOrPhone) {
      setErrorMsg('Vui lòng nhập Tên đăng nhập hoặc Số điện thoại.');
      return;
    }

    if (regPassword.length < 4) {
      setErrorMsg('Mật khẩu cần tối thiểu 4 ký tự.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (!regAgree) {
      setErrorMsg('Vui lòng đồng ý với cam kết sử dụng thông tin.');
      return;
    }

    const res = onRegister({
      username: usernameOrPhone.toLowerCase(),
      fullName: regFullName.trim(),
      role: 'user',
      phone: regPhone.trim() || usernameOrPhone,
      email: regEmail.trim(),
      hamlet: regHamlet,
      password: regPassword,
    });

    if (res.success && res.account) {
      onLogin(res.account);
      onClose();
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-7 space-y-4 shadow-2xl relative border border-stone-200 my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          title="Đóng cửa sổ"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-black text-xs shadow-xs">
              LH
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
                UBND XÃ LONG HỒ • TỈNH VĨNH LONG
              </span>
              <div className="text-xs font-semibold text-stone-600">
                Trung Tâm Học Tập Cộng Đồng
              </div>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 pt-1">
            {mode === 'admin' 
              ? 'Đăng Nhập Cán Bộ Quản Trị Hệ Thống' 
              : mode === 'login' 
              ? 'Đăng Nhập Học Viên & Bà Con' 
              : 'Đăng Ký Tài Khoản Học Viên Mới'}
          </h3>
          <p className="text-xs text-stone-500">
            {mode === 'admin'
              ? 'Dành cho Ban Giám đốc và Cán bộ chuyên trách quản lý cổng thông tin.'
              : mode === 'login'
              ? 'Dành cho bà con nhân dân và học viên đã có tài khoản trên hệ thống.'
              : 'Đăng ký tài khoản miễn phí để nhận quyền xem toàn văn tài liệu và tải về máy.'}
          </p>
        </div>

        {/* Reason banner if triggered by a protected action */}
        {promptReason && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Yêu cầu quyền truy cập:</span>
              <p className="text-amber-800 leading-relaxed">{promptReason}</p>
            </div>
          </div>
        )}

        {/* Navigation Tabs (Admin vs Citizen vs Register) */}
        <div className="grid grid-cols-3 rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs">
          <button
            type="button"
            onClick={() => {
              setMode('admin');
              setErrorMsg(null);
              setSuccessMsg(null);
              setUsername('admin');
              setPassword('');
            }}
            className={`py-2 px-1 text-center font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'admin'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="truncate">Cán Bộ Quản Trị</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
              setSuccessMsg(null);
              setUsername('');
              setPassword('');
            }}
            className={`py-2 px-1 text-center font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="truncate">Người Dân</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`py-2 px-1 text-center font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span className="truncate">Đăng Ký Mới</span>
          </button>
        </div>

        {/* Status Messages */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex-1">{errorMsg}</div>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 mt-0.5" />
            <div className="flex-1">{successMsg}</div>
          </div>
        )}

        {/* 1. ADMIN LOGIN FORM */}
        {mode === 'admin' && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            {/* Admin Information Card */}
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-blue-950">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Quyền Hạn Toàn Diện Cán Bộ Quản Trị:</span>
              </div>
              <ul className="text-[11px] text-blue-800 space-y-0.5 pl-4 list-disc">
                <li>Đăng tải, chỉnh sửa, xóa cẩm nang & tài liệu kỹ thuật</li>
                <li>Phát hành thông báo khẩn, tuyển sinh và văn bản chỉ đạo</li>
                <li>Mở lớp học, tổ chức phòng học trực tuyến (Meet / Zoom / Teams)</li>
                <li>Điểm danh học viên, tạo đề thi trắc nghiệm và cấp chứng nhận</li>
                <li>Phân quyền & quản trị tài khoản người dùng, sao lưu dữ liệu</li>
              </ul>
            </div>

            {/* Quick Fill Admin Account */}
            <div className="flex items-center justify-between bg-stone-50 border border-stone-200 p-2.5 rounded-xl">
              <div className="text-[11px] text-stone-600">
                Tài khoản mặc định: <code className="bg-stone-200 px-1 py-0.5 rounded font-mono text-stone-800 font-bold">admin</code> | Mật khẩu: <code className="bg-stone-200 px-1 py-0.5 rounded font-mono text-stone-800 font-bold">admin123</code>
              </div>
              <button
                type="button"
                onClick={handleQuickFillAdmin}
                className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1"
                title="Tự động điền tài khoản admin và mật khẩu admin123"
              >
                <KeyRound className="w-3 h-3 text-blue-700" />
                <span>Điền nhanh</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Tên đăng nhập Cán bộ <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  Mật khẩu Quản trị <span className="text-red-600">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleResetAdmin}
                  className="text-[11px] text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Khôi phục về "admin123"</span>
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Nhập mật khẩu quản trị (admin123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 pt-2.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Đăng Nhập Quyền Cán Bộ Quản Trị</span>
            </button>
          </form>
        )}

        {/* 2. CITIZEN / LEARNER LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            {/* Quick Fill Citizen Account */}
            <div className="flex items-center justify-between bg-stone-50 border border-stone-200 p-2.5 rounded-xl">
              <div className="text-[11px] text-stone-600">
                Tài khoản mẫu: <code className="bg-stone-200 px-1 py-0.5 rounded font-mono text-stone-800 font-bold">nguoidan</code> | Mật khẩu: <code className="bg-stone-200 px-1 py-0.5 rounded font-mono text-stone-800 font-bold">123456</code>
              </div>
              <button
                type="button"
                onClick={handleQuickFillCitizen}
                className="px-2.5 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1"
              >
                <KeyRound className="w-3 h-3 text-stone-600" />
                <span>Điền mẫu</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Tên đăng nhập hoặc Số điện thoại <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: nguoidan hoặc 0918.234.567"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Mật khẩu <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
              <span>Chưa có tài khoản?</span>
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-blue-700 font-bold hover:underline"
              >
                Đăng ký tài khoản mới miễn phí
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-amber-300" />
              <span>Đăng Nhập Hệ Thống</span>
            </button>
          </form>
        )}

        {/* 3. REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Sau khi đăng ký thành công, bà con có thể <strong>xem toàn văn</strong> mọi hướng dẫn và <strong>tải về miễn phí</strong>.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Họ và tên người dân / học viên <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="VD: Nguyễn Văn Năm"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Số điện thoại <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="0918.xxx.xxx"
                    value={regPhone}
                    onChange={(e) => {
                      setRegPhone(e.target.value);
                      if (!regUsername) setRegUsername(e.target.value);
                    }}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Ấp đang cư trú <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={regHamlet}
                    onChange={(e) => setRegHamlet(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  >
                    {HAMLETS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Tên đăng nhập (hoặc dùng chính Số điện thoại)
              </label>
              <input
                type="text"
                placeholder="VD: nguyenvannam hoặc giữ nguyên SĐT"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Tạo Mật khẩu <span className="text-red-600">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Ít nhất 4 ký tự"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Nhập lại Mật khẩu <span className="text-red-600">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Nhập lại mật khẩu"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-stone-600 select-none">
                <input
                  type="checkbox"
                  checked={regAgree}
                  onChange={(e) => setRegAgree(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-600 w-4 h-4"
                />
                <span>
                  Tôi cam kết sử dụng tài liệu học tập đúng mục đích phục vụ phát triển kinh tế gia đình và chấp hành quy định của Trung tâm.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <UserPlus className="w-4 h-4 text-amber-200" />
              <span>Đăng Ký Tài Khoản & Nhận Quyền Xem / Tải</span>
            </button>
          </form>
        )}

        {/* Modal Footer Info */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <span>UBND Xã Long Hồ • Tỉnh Vĩnh Long</span>
          <span>Hotline hỗ trợ: <strong>0270.3859901</strong></span>
        </div>
      </div>
    </div>
  );
};
