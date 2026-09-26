import React, { useState } from 'react';
import { 
  X, 
  Users, 
  ShieldCheck, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Search, 
  Shield, 
  Trash2, 
  CheckCircle2,
  Lock,
  Plus,
  KeyRound,
  RotateCcw
} from 'lucide-react';
import { UserAccount, UserRole } from '../types';
import { HAMLETS } from '../data/initialData';

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: UserAccount[];
  currentUser: UserAccount | null;
  onDeleteAccount: (id: string) => void;
  onUpdateRole: (id: string, newRole: UserRole) => void;
  onAddAccount: (acc: Omit<UserAccount, 'id' | 'createdAt'>) => void;
  onUpdatePassword?: (id: string, newPassword: string) => void;
}

export const UserManagementModal: React.FC<UserManagementModalProps> = ({
  isOpen,
  onClose,
  accounts,
  currentUser,
  onDeleteAccount,
  onUpdateRole,
  onAddAccount,
  onUpdatePassword,
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [passwordModalAccount, setPasswordModalAccount] = useState<UserAccount | null>(null);
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // New user form state
  const [formName, setFormName] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formHamlet, setFormHamlet] = useState(HAMLETS[0]);
  const [formRole, setFormRole] = useState<UserRole>('user');
  const [formPassword, setFormPassword] = useState('123456');

  if (!isOpen) return null;

  const filtered = accounts.filter((acc) => {
    const q = search.toLowerCase();
    const matchSearch =
      acc.fullName.toLowerCase().includes(q) ||
      acc.username.toLowerCase().includes(q) ||
      (acc.phone && acc.phone.includes(q)) ||
      (acc.hamlet && acc.hamlet.toLowerCase().includes(q));
    const matchRole = roleFilter === 'all' || acc.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formUsername.trim()) return;

    onAddAccount({
      fullName: formName.trim(),
      username: formUsername.trim().toLowerCase(),
      phone: formPhone.trim(),
      hamlet: formHamlet,
      role: formRole,
      password: formPassword.trim() || '123456',
    });

    setIsAddingUser(false);
    setFormName('');
    setFormUsername('');
    setFormPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-blue-700" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Quản Trị Người Dùng & Phân Quyền Hệ Thống
              </h3>
              <p className="text-xs text-stone-500">
                Danh sách cán bộ và bà con nhân dân đã đăng ký tài khoản trên cổng thông tin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action and Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo họ tên, SĐT, ấp..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-stone-50 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <select
              value={roleFilter}
              onChange={(e: any) => setRoleFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
            >
              <option value="all">Tất cả vai trò ({accounts.length})</option>
              <option value="admin">Cán bộ Quản trị ({accounts.filter(a => a.role === 'admin').length})</option>
              <option value="user">Người dân / Học viên ({accounts.filter(a => a.role === 'user').length})</option>
            </select>

            <button
              onClick={() => setIsAddingUser(!isAddingUser)}
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Tài Khoản</span>
            </button>
          </div>
        </div>

        {/* Add User Form Drawer */}
        {isAddingUser && (
          <form onSubmit={handleCreateUser} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3 animate-in fade-in">
            <div className="text-xs font-bold text-stone-900 uppercase">Cấp tài khoản mới cho cán bộ hoặc người dân</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Họ và tên <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Lê Thị B"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Tên đăng nhập <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: lethib"
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  placeholder="0918.xxx.xxx"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Ấp cư trú
                </label>
                <select
                  value={formHamlet}
                  onChange={(e) => setFormHamlet(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                >
                  {HAMLETS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Phân quyền
                </label>
                <select
                  value={formRole}
                  onChange={(e: any) => setFormRole(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-white font-bold"
                >
                  <option value="user">Người dân (Chỉ xem & tải tài liệu)</option>
                  <option value="admin">Cán bộ Quản trị (Toàn quyền hệ thống)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Mật khẩu khởi tạo
                </label>
                <input
                  type="text"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingUser(false)}
                className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-lg"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold"
              >
                Lưu Tài Khoản
              </button>
            </div>
          </form>
        )}

        {/* Action Notice */}
        {actionNotice && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{actionNotice}</span>
            </div>
            <button
              onClick={() => setActionNotice(null)}
              className="text-stone-400 hover:text-stone-600 text-[11px]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Change Password Dialog */}
        {passwordModalAccount && (
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-2.5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-blue-700" />
                Đổi mật khẩu cho: {passwordModalAccount.fullName} ({passwordModalAccount.username})
              </span>
              <button
                onClick={() => {
                  setPasswordModalAccount(null);
                  setNewPasswordVal('');
                }}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Nhập mật khẩu mới (tối thiểu 4 ký tự)"
                value={newPasswordVal}
                onChange={(e) => setNewPasswordVal(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (newPasswordVal.trim().length < 4) {
                    alert('Mật khẩu cần tối thiểu 4 ký tự!');
                    return;
                  }
                  if (onUpdatePassword) {
                    onUpdatePassword(passwordModalAccount.id, newPasswordVal.trim());
                    setActionNotice(`Đã đổi mật khẩu cho ${passwordModalAccount.fullName} thành công.`);
                  }
                  setPasswordModalAccount(null);
                  setNewPasswordVal('');
                }}
                className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs"
              >
                Xác Nhận Đổi
              </button>
              <button
                type="button"
                onClick={() => {
                  const defaultPass = passwordModalAccount.role === 'admin' ? 'admin123' : '123456';
                  if (onUpdatePassword) {
                    onUpdatePassword(passwordModalAccount.id, defaultPass);
                    setActionNotice(`Đã đặt lại mật khẩu cho ${passwordModalAccount.fullName} về "${defaultPass}".`);
                  }
                  setPasswordModalAccount(null);
                  setNewPasswordVal('');
                }}
                className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-lg text-xs"
              >
                Đặt về mặc định ({passwordModalAccount.role === 'admin' ? 'admin123' : '123456'})
              </button>
            </div>
          </div>
        )}

        {/* User Accounts Table */}
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto max-h-80">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-200 text-stone-700 uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Họ và tên</th>
                  <th className="py-2.5 px-3">Tài khoản / SĐT</th>
                  <th className="py-2.5 px-3">Ấp cư trú / Đơn vị</th>
                  <th className="py-2.5 px-3">Phân quyền</th>
                  <th className="py-2.5 px-3">Ngày đăng ký</th>
                  <th className="py-2.5 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filtered.map((acc) => {
                  const isCurrent = currentUser?.id === acc.id;
                  return (
                    <tr key={acc.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-stone-900">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                            acc.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-stone-200 text-stone-700'
                          }`}>
                            {acc.fullName.charAt(0)}
                          </span>
                          <div>
                            <span>{acc.fullName}</span>
                            {isCurrent && (
                              <span className="ml-1.5 px-1.5 py-0.2 text-[9px] bg-blue-100 text-blue-800 rounded font-semibold">
                                Đang đăng nhập
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-2.5 px-3 text-stone-600 font-mono">
                        <div>{acc.username}</div>
                        {acc.phone && <div className="text-[10px] text-stone-400">{acc.phone}</div>}
                      </td>

                      <td className="py-2.5 px-3 text-stone-600">
                        {acc.hamlet || acc.department || 'Xã Long Hồ'}
                      </td>

                      <td className="py-2.5 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          acc.role === 'admin'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {acc.role === 'admin' ? <ShieldCheck className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          <span>{acc.role === 'admin' ? 'Cán bộ Quản trị' : 'Người dân (Xem & Tải)'}</span>
                        </span>
                      </td>

                      <td className="py-2.5 px-3 text-stone-500 text-[11px]">
                        {acc.createdAt}
                      </td>

                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Change / Reset password button */}
                          <button
                            onClick={() => {
                              setPasswordModalAccount(acc);
                              setNewPasswordVal('');
                            }}
                            className="p-1 text-stone-500 hover:text-blue-700 hover:bg-stone-100 rounded transition-colors"
                            title={`Đổi hoặc đặt lại mật khẩu cho ${acc.fullName}`}
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>

                          {!isCurrent && acc.username !== 'admin' && (
                            <>
                              <button
                                onClick={() => {
                                  const newRole = acc.role === 'admin' ? 'user' : 'admin';
                                  onUpdateRole(acc.id, newRole);
                                }}
                                className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[10px] font-semibold transition-colors"
                                title={acc.role === 'admin' ? 'Hạ quyền xuống Người dân' : 'Nâng quyền lên Cán bộ Admin'}
                              >
                                {acc.role === 'admin' ? 'Chuyển Người dân' : 'Cấp quyền Admin'}
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Xóa tài khoản của "${acc.fullName}"?`)) {
                                    onDeleteAccount(acc.id);
                                  }
                                }}
                                className="p-1 text-stone-400 hover:text-red-600 rounded transition-colors"
                                title="Xóa tài khoản"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs text-stone-500">
          <span>Tổng số <strong>{accounts.length}</strong> tài khoản trong hệ thống</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg text-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
