import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { UserAccount, UserRole } from '../types';
import { HAMLETS } from '../data/initialData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (account: UserAccount) => void;
  onRegister: (newAccount: Omit<UserAccount, 'id' | 'createdAt'>) => { success: boolean; message: string; account?: UserAccount };
  initialMode?: 'login' | 'register';
  promptReason?: string | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  initialMode = 'login',
  promptReason,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regHamlet, setRegHamlet] = useState(HAMLETS[0]);
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAgree, setRegAgree] = useState(true);
  const [registerError, setRegisterError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Submit Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const u = loginUsername.trim().toLowerCase();
    const p = loginPassword.trim();

    if (!u || !p) {
      setLoginError('Vui lòng nhập tên đăng nhập/SĐT và mật khẩu.');
      return;
    }

    // Retrieve accounts from localStorage or initial
    try {
      const savedAccountsStr = localStorage.getItem('tt_htcd_an_binh_accounts_v1');
      let accounts: UserAccount[] = [];
      if (savedAccountsStr) {
        accounts = JSON.parse(savedAccountsStr);
      }

      // Find user
      const matched = accounts.find(
        (acc) =>
          acc.username.toLowerCase() === u ||
          (acc.phone && acc.phone.replace(/\D/g, '') === u.replace(/\D/g, ''))
      );

      if (!matched) {
        setLoginError('Tài khoản không tồn tại. Vui lòng kiểm tra lại hoặc chuyển sang Đăng ký mới!');
        return;
      }

      if (matched.password && matched.password !== p) {
        setLoginError('Mật khẩu không chính xác!');
        return;
      }

      // Successful login
      onLogin(matched);
      onClose();
    } catch {
      setLoginError('Lỗi xử lý đăng nhập hệ thống.');
    }
  };

  // Submit Register
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);

    if (!regFullName.trim()) {
      setRegisterError('Vui lòng nhập đầy đủ Họ và tên.');
      return;
    }

    const usernameOrPhone = regUsername.trim() || regPhone.trim();
    if (!usernameOrPhone) {
      setRegisterError('Vui lòng nhập Tên đăng nhập hoặc Số điện thoại.');
      return;
    }

    if (regPassword.length < 4) {
      setRegisterError('Mật khẩu cần tối thiểu 4 ký tự.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegisterError('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (!regAgree) {
      setRegisterError('Vui lòng đồng ý với cam kết sử dụng thông tin.');
      return;
    }

    const res = onRegister({
      username: usernameOrPhone.toLowerCase(),
      fullName: regFullName.trim(),
      role: 'user', // Regular user
      phone: regPhone.trim() || usernameOrPhone,
      email: regEmail.trim(),
      hamlet: regHamlet,
      password: regPassword,
    });

    if (res.success && res.account) {
      onLogin(res.account);
      onClose();
    } else {
      setRegisterError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl relative border border-stone-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
              AB
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Trung Tâm HTCĐ Xã Long Hồ
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-stone-900 pt-1">
            {mode === 'login' ? 'Đăng Nhập Hệ Thống' : 'Đăng Ký Tài Khoản Mới'}
          </h3>
          <p className="text-xs text-stone-500">
            {mode === 'login'
              ? 'Dành cho Cán bộ Quản trị và Bà con nhân dân đã có tài khoản.'
              : 'Đăng ký tài khoản miễn phí để được quyền xem toàn văn tài liệu và tải về máy.'}
          </p>
        </div>

        {/* Notice Banner if prompted by restriction */}
        {promptReason && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Yêu cầu quyền truy cập:</span>
              <p className="text-amber-800 leading-relaxed">{promptReason}</p>
            </div>
          </div>
        )}

        {/* Mode Switch Tabs */}
        <div className="flex rounded-xl bg-stone-100 p-1 border border-stone-200">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setLoginError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Đăng Nhập</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setRegisterError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Đăng Ký (Bà con mới)</span>
          </button>
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                Tên đăng nhập hoặc Số điện thoại <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: admin hoặc 0918.234.567"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
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
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-amber-200" />
              <span>Đăng Nhập Vào Hệ Thống</span>
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {registerError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{registerError}</span>
              </div>
            )}

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
              className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <UserPlus className="w-4 h-4 text-amber-200" />
              <span>Đăng Ký Tài Khoản & Nhận Quyền Xem / Tải</span>
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <span>UBND Xã Long Hồ • Tỉnh Vĩnh Long</span>
          <span>Hotline: 0270.3859901</span>
        </div>
      </div>
    </div>
  );
};
