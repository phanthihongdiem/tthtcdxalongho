import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Users, 
  Send, 
  CheckCircle2, 
  GraduationCap, 
  HelpCircle, 
  BookOpen, 
  Lightbulb,
  MessageSquare,
  Shield,
  Trash2
} from 'lucide-react';
import { ClassProposalItem } from '../types';
import { HAMLETS } from '../data/initialData';

interface CenterInfoProps {
  proposals: ClassProposalItem[];
  onAddProposal: (proposal: Omit<ClassProposalItem, 'id' | 'dateSent'>) => void;
  onDeleteProposal: (id: string) => void;
  isAdmin: boolean;
}

export const CenterInfo: React.FC<CenterInfoProps> = ({
  proposals,
  onAddProposal,
  onDeleteProposal,
  isAdmin,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    hamlet: HAMLETS[0],
    proposedTopic: '',
    reason: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.proposedTopic.trim()) return;

    onAddProposal({
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      hamlet: formData.hamlet,
      proposedTopic: formData.proposedTopic.trim(),
      reason: formData.reason.trim(),
    });

    setSubmitted(true);
    setFormData({
      fullName: '',
      phone: '',
      hamlet: HAMLETS[0],
      proposedTopic: '',
      reason: '',
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Introduction Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="space-y-2">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 rounded-md">
              Cơ quan Giáo dục & Dân trí Cơ sở
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 leading-tight">
              TRUNG TÂM HỌC TẬP CỘNG ĐỒNG XÃ LONG HỒ
            </h2>
            <p className="text-sm text-stone-600 max-w-2xl">
              Được thành lập theo Quyết định của UBND huyện, Trung tâm Học tập Cộng đồng Xã Long Hồ là thiết chế giáo dục thường xuyên tại địa bàn xã, hoạt động nhằm mục đích &quot;Học tập suốt đời - Nâng cao dân trí - Phát triển kinh tế - Xây dựng nông thôn mới kiểu mẫu&quot;.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 text-center sm:text-left space-y-1 flex-shrink-0">
            <div className="text-xs font-semibold text-stone-500 uppercase">Khẩu hiệu hành động</div>
            <div className="text-base font-extrabold text-blue-800">Cần gì học nấy • Học để làm • Làm để ấm no</div>
          </div>
        </div>

        {/* 4 Pillars of Operation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              🌾
            </div>
            <h4 className="text-sm font-bold text-stone-900">Khuyến nông & Chuyển giao kỹ thuật</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tập huấn kỹ thuật chăm sóc cây ăn trái giá trị cao (sầu riêng, bưởi), kỹ thuật nuôi trồng thủy sản nước ngọt và phòng chống dịch bệnh nông vụ.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              📱
            </div>
            <h4 className="text-sm font-bold text-stone-900">Kỹ năng số & Dịch vụ công</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Phổ cập ứng dụng định danh VNeID, nộp hồ sơ trực tuyến, thanh toán hóa đơn điện nước qua điện thoại và kỹ năng phòng ngừa lừa đảo mạng.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              🛠️
            </div>
            <h4 className="text-sm font-bold text-stone-900">Đào tạo nghề nông thôn</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Mở các lớp học nghề ngắn hạn miễn phí: sửa chữa máy nông cơ, cắt may gia dụng, làm bánh tiệc, kỹ thuật chăn nuôi gia cầm an toàn sinh học.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              ⚖️
            </div>
            <h4 className="text-sm font-bold text-stone-900">Phổ biến Giáo dục Pháp luật</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tuyên truyền Luật Đất đai, Luật Nghĩa vụ Quân sự, chính sách bảo hiểm y tế hộ gia đình và xây dựng nếp sống văn hóa tại 100% các ấp.
            </p>
          </div>
        </div>

        {/* Center Contact & Operational Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-700" />
              Thông Tin Liên Hệ Trực Tiếp
            </h4>
            <div className="space-y-2.5 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                <span>Trụ sở: <strong>Trụ sở UBND Xã Long Hồ, Huyện Long Hồ, Tỉnh Vĩnh Long</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-stone-400 flex-shrink-0" />
                <span>Đường dây nóng: <strong>0270.3859901</strong> (Giờ hành chính)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-400 flex-shrink-0" />
                <span>Hòm thư điện tử: <strong>longho@vinhlong.gov.vn</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-stone-400 flex-shrink-0" />
                <span>Giờ mở cửa thư viện và phòng máy tính: <strong>Sáng: 07:30 - 11:30 | Chiều: 13:30 - 17:00</strong></span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-700" />
              Ban Giám Đốc Trung Tâm
            </h4>
            <div className="space-y-2 text-xs text-stone-700">
              <div className="p-2.5 bg-stone-50 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900 block">Đ/c Nguyễn Thị Mỹ Hạnh</span>
                  <span className="text-stone-500">Phó Chủ tịch UBND Xã Long Hồ</span>
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10px]">
                  Giám đốc
                </span>
              </div>

              <div className="p-2.5 bg-stone-50 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900 block">Đ/c Lưu Quốc Trụ</span>
                  <span className="text-stone-500">Chủ tịch Hội Khuyến học Xã Long Hồ</span>
                </div>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-[10px]">
                  Phó Giám đốc
                </span>
              </div>

              <div className="p-2.5 bg-stone-50 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900 block">Thầy Nguyễn Văn Nho</span>
                  <span className="text-stone-500">P.HT Trường THCS Long Hồ</span>
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10px]">
                  Phó Giám đốc
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Citizen Wish / Proposal Form */}
      <div className="bg-gradient-to-br from-stone-50 to-amber-50/50 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="max-w-2xl space-y-1">
          <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900 rounded-md">
            Lắng Nghe Tiếng Nói Nhân Dân
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 pt-1">
            Hòm Thư Đề Xuất & Nguyện Vọng Mở Lớp Học Mới
          </h3>
          <p className="text-xs sm:text-sm text-stone-600">
            Bà con tại các ấp có nhu cầu học chuyên đề nào (nuôi con gì, trồng cây gì, học nghề gì...) vui lòng gửi ý kiến. Trung tâm sẽ tổng hợp để mời chuyên gia, báo cáo viên về tận ấp giảng dạy.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-emerald-900">Đã gửi ý kiến thành công!</h4>
            <p className="text-xs text-emerald-700">
              Ban Giám đốc Trung tâm chân thành cảm ơn ý kiến đóng góp của bà con. Chúng tôi sẽ nghiên cứu đưa vào kế hoạch đào tạo sớm nhất.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Họ và tên bà con <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Nguyễn Văn Năm"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Số điện thoại liên hệ
                </label>
                <input
                  type="tel"
                  placeholder="0918.xxx.xxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Ấp đang sinh sống
                </label>
                <select
                  value={formData.hamlet}
                  onChange={(e) => setFormData({ ...formData, hamlet: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg bg-white"
                >
                  {HAMLETS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Chuyên đề / Nghề muốn Trung tâm tổ chức lớp dạy <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Lớp dạy kỹ thuật ghép sầu riêng Musang King, Lớp nấu ăn đãi tiệc..."
                value={formData.proposedTopic}
                onChange={(e) => setFormData({ ...formData, proposedTopic: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Lý do hoặc mong muốn cụ thể của bà con
              </label>
              <textarea
                rows={2}
                placeholder="Ví dụ: Ấp An Hòa có nhiều nhà muốn chuyển từ trồng lúa sang vườn cây, rất cần cán bộ hướng dẫn kỹ thuật cải tạo đất phèn..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg bg-white"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-200" />
              <span>Gửi Đề Xuất Đến Trung Tâm</span>
            </button>
          </form>
        )}
      </div>

      {/* Staff View: Received Proposals */}
      {isAdmin && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-700" />
              <h3 className="text-base font-bold text-stone-900">
                Ý Kiến & Đề Xuất Mở Lớp Của Bà Con (Chế độ Cán bộ)
              </h3>
            </div>
            <span className="text-xs font-semibold text-stone-500">
              Tổng số: <strong>{proposals.length}</strong> đề xuất
            </span>
          </div>

          {proposals.length === 0 ? (
            <p className="text-xs text-stone-500 py-4 text-center">
              Chưa có đề xuất nào từ nhân dân.
            </p>
          ) : (
            <div className="space-y-3">
              {proposals.map((prop) => (
                <div
                  key={prop.id}
                  className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-bold text-stone-900">{prop.fullName}</span>
                      <span className="text-stone-400">•</span>
                      <span className="text-stone-600">{prop.phone || 'Không có SĐT'}</span>
                      <span className="text-stone-400">•</span>
                      <span className="font-semibold text-blue-700">{prop.hamlet}</span>
                      <span className="text-stone-400">•</span>
                      <span className="text-stone-400">{prop.dateSent}</span>
                    </div>
                    <h4 className="text-sm font-bold text-blue-800">
                      Nguyện vọng học: {prop.proposedTopic}
                    </h4>
                    {prop.reason && (
                      <p className="text-xs text-stone-600 italic">
                        &quot;{prop.reason}&quot;
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('Xóa đề xuất này?')) {
                        onDeleteProposal(prop.id);
                      }
                    }}
                    className="p-2 text-stone-400 hover:text-red-600 rounded-lg transition-colors self-end sm:self-center"
                    title="Xóa ý kiến"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
