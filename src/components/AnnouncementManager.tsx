import React, { useState, useMemo } from 'react';
import { 
  Bell, 
  Search, 
  Plus, 
  AlertCircle, 
  Clock, 
  Pin, 
  Trash2, 
  Edit3, 
  Printer, 
  Share2, 
  Check, 
  X, 
  Building, 
  FileText,
  AlertTriangle,
  Paperclip,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { AnnouncementItem, AnnouncementPriority, AnnouncementCategory } from '../types';

interface AnnouncementManagerProps {
  announcements: AnnouncementItem[];
  isAdmin: boolean;
  onAddAnnouncement: (ann: Omit<AnnouncementItem, 'id' | 'views'>) => void;
  onUpdateAnnouncement: (ann: AnnouncementItem) => void;
  onDeleteAnnouncement: (id: string) => void;
  selectedAnnouncement: AnnouncementItem | null;
  setSelectedAnnouncement: (ann: AnnouncementItem | null) => void;
}

const CATEGORIES: { id: AnnouncementCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Tất cả thông báo' },
  { id: 'tuyen-sinh', label: 'Tuyển sinh & Khóa học' },
  { id: 'khan-cap', label: 'Thông báo khẩn cấp' },
  { id: 'tap-huan', label: 'Tập huấn kỹ thuật' },
  { id: 'chinh-sach', label: 'Chính sách & Khuyến học' },
  { id: 'hoat-dong', label: 'Hoạt động cộng đồng' },
];

export const AnnouncementManager: React.FC<AnnouncementManagerProps> = ({
  announcements,
  isAdmin,
  onAddAnnouncement,
  onUpdateAnnouncement,
  onDeleteAnnouncement,
  selectedAnnouncement,
  setSelectedAnnouncement,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AnnouncementCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'tuyen-sinh' as AnnouncementCategory,
    priority: 'quan-trong' as AnnouncementPriority,
    summary: '',
    content: '',
    postedBy: 'Ban Giám đốc TT HTCĐ Xã Long Hồ',
    datePosted: new Date().toISOString().split('T')[0],
    expiryDate: '',
    isPinned: false,
    attachmentName: '',
  });

  const [copiedLink, setCopiedLink] = useState(false);

  // Filtered & sorted
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((ann) => {
      const matchCat = selectedCategory === 'all' || ann.category === selectedCategory;
      const matchPriority = priorityFilter === 'all' || ann.priority === priorityFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        ann.title.toLowerCase().includes(q) ||
        ann.summary.toLowerCase().includes(q) ||
        ann.content.toLowerCase().includes(q) ||
        ann.postedBy.toLowerCase().includes(q);

      return matchCat && matchPriority && matchQuery;
    }).sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
    });
  }, [announcements, selectedCategory, priorityFilter, searchQuery]);

  const handleOpenAdd = () => {
    setEditingAnnId(null);
    setFormData({
      title: '',
      category: 'tuyen-sinh',
      priority: 'quan-trong',
      summary: '',
      content: '',
      postedBy: 'Ban Giám đốc TT HTCĐ Xã Long Hồ',
      datePosted: new Date().toISOString().split('T')[0],
      expiryDate: '',
      isPinned: false,
      attachmentName: '',
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (ann: AnnouncementItem) => {
    setEditingAnnId(ann.id);
    setFormData({
      title: ann.title,
      category: ann.category,
      priority: ann.priority,
      summary: ann.summary,
      content: ann.content,
      postedBy: ann.postedBy,
      datePosted: ann.datePosted,
      expiryDate: ann.expiryDate || '',
      isPinned: ann.isPinned,
      attachmentName: ann.attachments && ann.attachments.length > 0 ? ann.attachments[0].name : '',
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const catObj = CATEGORIES.find((c) => c.id === formData.category);
    const categoryLabel = catObj && catObj.id !== 'all' ? catObj.label : 'Thông báo';

    const attachments = formData.attachmentName.trim()
      ? [{ name: formData.attachmentName.trim(), size: '1.2 MB', type: 'pdf' }]
      : undefined;

    if (editingAnnId) {
      const orig = announcements.find((a) => a.id === editingAnnId);
      if (orig) {
        onUpdateAnnouncement({
          ...orig,
          title: formData.title,
          category: formData.category,
          categoryLabel,
          priority: formData.priority,
          summary: formData.summary,
          content: formData.content,
          postedBy: formData.postedBy,
          datePosted: formData.datePosted,
          expiryDate: formData.expiryDate || undefined,
          isPinned: formData.isPinned,
          attachments,
        });
      }
    } else {
      onAddAnnouncement({
        title: formData.title,
        category: formData.category,
        categoryLabel,
        priority: formData.priority,
        summary: formData.summary,
        content: formData.content,
        postedBy: formData.postedBy,
        datePosted: formData.datePosted,
        expiryDate: formData.expiryDate || undefined,
        isPinned: formData.isPinned,
        attachments,
      });
    }

    setIsFormOpen(false);
  };

  const getPriorityBadge = (priority: AnnouncementPriority) => {
    switch (priority) {
      case 'khan':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-red-600 text-white rounded-md tracking-wider uppercase flex items-center gap-1 shadow-xs animate-pulse">
            <AlertTriangle className="w-3 h-3" /> KHẨN CẤP
          </span>
        );
      case 'quan-trong':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-white rounded-md tracking-wider uppercase flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> QUAN TRỌNG
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-800 rounded-md">
            Tin thường
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-700" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Bản Tin & Thông Báo Trung Tâm
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Kế hoạch tuyển sinh lớp nghề, lịch tập huấn mùa vụ, cảnh báo dịch hại cây trồng và thông tin chỉ đạo của Xã Long Hồ.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2"
            id="btn-post-announcement"
          >
            <Plus className="w-4 h-4 text-amber-200" />
            <span>Đăng Thông Báo Mới</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm nội dung thông báo..."
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

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <span className="text-xs text-stone-500">Mức độ ưu tiên:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-stone-200 rounded-lg text-xs bg-white text-stone-700 font-medium focus:outline-hidden"
          >
            <option value="all">Tất cả mức độ</option>
            <option value="khan">Khẩn cấp</option>
            <option value="quan-trong">Quan trọng</option>
            <option value="binh-thuong">Bình thường</option>
          </select>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-3.5">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-3">
            <Bell className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="text-base font-bold text-stone-800">Không có thông báo phù hợp</h3>
            <p className="text-xs text-stone-500">
              Chưa có thông báo nào trong danh mục này hoặc từ khóa tìm kiếm không khớp.
            </p>
          </div>
        ) : (
          filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className={`bg-white border rounded-xl p-5 hover:shadow-md transition-all space-y-3 relative ${
                ann.isPinned
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              {/* Top metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {ann.isPinned && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-stone-900 rounded flex items-center gap-1">
                      <Pin className="w-3 h-3 fill-stone-900" /> ĐÃ GHIM ĐẦU
                    </span>
                  )}
                  {getPriorityBadge(ann.priority)}
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-stone-100 text-stone-700 rounded">
                    {ann.categoryLabel}
                  </span>
                  <span className="text-xs text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Ngày đăng: {ann.datePosted}
                  </span>
                  {ann.expiryDate && (
                    <span className="text-xs text-amber-700 font-medium">
                      (Hạn chót: {ann.expiryDate})
                    </span>
                  )}
                </div>

                {/* Admin quick buttons */}
                {isAdmin && (
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      onClick={() => handleOpenEdit(ann)}
                      className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md"
                      title="Chỉnh sửa thông báo"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Bạn có chắc muốn xóa thông báo: "${ann.title}"?`)) {
                          onDeleteAnnouncement(ann.id);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-md"
                      title="Xóa thông báo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Title & Summary */}
              <div>
                <h3
                  onClick={() => setSelectedAnnouncement(ann)}
                  className="text-base sm:text-lg font-bold text-stone-900 hover:text-blue-700 transition-colors cursor-pointer leading-snug"
                >
                  {ann.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                  {ann.summary}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="text-stone-500">
                  Đơn vị phát hành: <strong className="text-stone-700">{ann.postedBy}</strong>
                </div>

                <div className="flex items-center gap-3">
                  {ann.attachments && ann.attachments.length > 0 && (
                    <span className="text-stone-500 flex items-center gap-1 font-medium">
                      <Paperclip className="w-3.5 h-3.5 text-stone-400" />
                      {ann.attachments.length} tệp đính kèm
                    </span>
                  )}
                  <button
                    onClick={() => setSelectedAnnouncement(ann)}
                    className="font-bold text-blue-700 hover:text-blue-800 hover:underline flex items-center gap-1"
                  >
                    Xem toàn văn &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: View Announcement Detail */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-200">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {getPriorityBadge(selectedAnnouncement.priority)}
                  <span className="px-2 py-0.5 text-xs font-semibold bg-stone-100 text-stone-800 rounded">
                    {selectedAnnouncement.categoryLabel}
                  </span>
                  <span className="text-xs text-stone-500">
                    Ngày đăng: {selectedAnnouncement.datePosted}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                  {selectedAnnouncement.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Issued By banner */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 flex items-center justify-between text-xs text-stone-700">
              <div>
                Đơn vị ban hành: <strong className="text-stone-900">{selectedAnnouncement.postedBy}</strong>
              </div>
              {selectedAnnouncement.expiryDate && (
                <div className="text-amber-800 font-semibold">
                  Hạn xử lý / Kết thúc: {selectedAnnouncement.expiryDate}
                </div>
              )}
            </div>

            {/* Content text */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-sm text-stone-800 leading-relaxed font-sans whitespace-pre-wrap">
              {selectedAnnouncement.content}
            </div>

            {/* Attachments if any */}
            {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Tệp văn bản đính kèm:
                </h4>
                <div className="space-y-1.5">
                  {selectedAnnouncement.attachments.map((att, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-stone-200 rounded-lg p-3 flex items-center justify-between text-xs hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-stone-800">{att.name}</span>
                        {att.size && <span className="text-stone-400">({att.size})</span>}
                      </div>
                      <button
                        onClick={() => {
                          const blob = new Blob([`${selectedAnnouncement.title}\n\nTệp đính kèm: ${att.name}`], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = att.name;
                          a.click();
                        }}
                        className="text-xs font-bold text-blue-700 hover:underline"
                      >
                        Tải tệp &darr;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Đã sao chép!' : 'Chia sẻ thông báo'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In văn bản</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2 bg-stone-900 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-stone-800"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add or Edit Announcement */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 space-y-5 max-h-[92vh] overflow-y-auto shadow-2xl relative border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-700" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  {editingAnnId ? 'Cập Nhật Thông Báo' : 'Đăng Thông Báo Mới Lên Web'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Tiêu đề thông báo <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Thông báo tuyển sinh lớp nghề sửa chữa máy nông nghiệp..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Chuyên mục
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="tuyen-sinh">Tuyển sinh & Khóa học</option>
                    <option value="khan-cap">Thông báo khẩn cấp</option>
                    <option value="tap-huan">Tập huấn kỹ thuật</option>
                    <option value="chinh-sach">Chính sách & Khuyến học</option>
                    <option value="hoat-dong">Hoạt động cộng đồng</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Mức độ ưu tiên
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e: any) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="quan-trong">Quan trọng</option>
                    <option value="khan">Khẩn cấp</option>
                    <option value="binh-thuong">Bình thường</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Đơn vị phát hành
                  </label>
                  <input
                    type="text"
                    value={formData.postedBy}
                    onChange={(e) => setFormData({ ...formData, postedBy: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Hạn chót / Hết hiệu lực (tùy chọn)
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Tóm tắt ngắn (Dùng phát loa thanh hoặc hiển thị trang chủ)
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Tóm tắt 1-2 câu quan trọng nhất..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Nội dung đầy đủ văn bản thông báo <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Nhập chi tiết thời gian, địa điểm, thành phần tham dự, quyền lợi và yêu cầu..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-center">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Tên file đính kèm (nếu có)
                  </label>
                  <input
                    type="text"
                    placeholder="Ke-hoach-tuyen-sinh.pdf"
                    value={formData.attachmentName}
                    onChange={(e) => setFormData({ ...formData, attachmentName: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>

                <div className="pt-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chk-ann-pin"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-stone-300 focus:ring-blue-500"
                  />
                  <label htmlFor="chk-ann-pin" className="text-xs font-semibold text-stone-700 cursor-pointer">
                    Ghim lên vị trí đầu trang (Thông báo quan trọng)
                  </label>
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
                  <span>{editingAnnId ? 'Cập Nhật' : 'Đăng Thông Báo'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
