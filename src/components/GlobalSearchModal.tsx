import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Bell, Calendar, ChevronRight, FileText } from 'lucide-react';
import { DocumentItem, AnnouncementItem, ClassScheduleItem, ActiveTab } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DocumentItem[];
  announcements: AnnouncementItem[];
  schedules: ClassScheduleItem[];
  onSelectDoc: (doc: DocumentItem) => void;
  onSelectAnnouncement: (ann: AnnouncementItem) => void;
  onSelectSchedule: (sch: ClassScheduleItem) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  documents,
  announcements,
  schedules,
  onSelectDoc,
  onSelectAnnouncement,
  onSelectSchedule,
  setActiveTab,
}) => {
  const [query, setQuery] = useState('');

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedDocs = q
    ? documents.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.categoryLabel.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const matchedAnnouncements = q
    ? announcements.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.postedBy.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchedSchedules = q
    ? schedules.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.instructor.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const totalMatches = matchedDocs.length + matchedAnnouncements.length + matchedSchedules.length;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-stone-200">
        {/* Search Input Bar */}
        <div className="relative border-b border-stone-200 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-700 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm tài liệu, lịch học, thông báo (ví dụ: sầu riêng, VNeID, lớp nghề...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm sm:text-base outline-hidden text-stone-900 placeholder:text-stone-400 bg-transparent"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline px-2 py-0.5 text-xs bg-stone-100 border border-stone-200 rounded text-stone-500">
              ESC
            </kbd>
          )}
        </div>

        {/* Search Results Container */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="py-8 text-center text-xs text-stone-500 space-y-2">
              <Search className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="font-semibold text-stone-700">Nhập từ khóa để tra cứu toàn diện hệ thống</p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="text-stone-400">Gợi ý tìm kiếm:</span>
                <button
                  onClick={() => setQuery('Sầu riêng')}
                  className="px-2 py-0.5 bg-stone-100 rounded text-stone-600 hover:bg-stone-200"
                >
                  Sầu riêng
                </button>
                <button
                  onClick={() => setQuery('VNeID')}
                  className="px-2 py-0.5 bg-stone-100 rounded text-stone-600 hover:bg-stone-200"
                >
                  VNeID
                </button>
                <button
                  onClick={() => setQuery('Lớp nghề')}
                  className="px-2 py-0.5 bg-stone-100 rounded text-stone-600 hover:bg-stone-200"
                >
                  Lớp nghề
                </button>
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div className="py-8 text-center text-xs text-stone-500">
              Không tìm thấy kết quả phù hợp cho &quot;{query}&quot;. Thử từ khóa khác.
            </div>
          ) : (
            <>
              {/* Matched Documents */}
              {matchedDocs.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 px-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    Kho Tài Liệu ({matchedDocs.length})
                  </div>
                  {matchedDocs.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => {
                        onClose();
                        setActiveTab('tai-lieu');
                        onSelectDoc(doc);
                      }}
                      className="p-3 bg-stone-50 hover:bg-blue-50/60 rounded-xl cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div className="space-y-0.5 pr-2">
                        <span className="text-[10px] font-bold text-blue-700 uppercase">
                          {doc.categoryLabel}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-blue-700 line-clamp-1">
                          {doc.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 line-clamp-1">
                          {doc.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-blue-700 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Announcements */}
              {matchedAnnouncements.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-stone-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 px-2">
                    <Bell className="w-3.5 h-3.5" />
                    Bản Tin & Thông Báo ({matchedAnnouncements.length})
                  </div>
                  {matchedAnnouncements.map((ann) => (
                    <div
                      key={ann.id}
                      onClick={() => {
                        onClose();
                        setActiveTab('thong-bao');
                        onSelectAnnouncement(ann);
                      }}
                      className="p-3 bg-stone-50 hover:bg-amber-50/60 rounded-xl cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div className="space-y-0.5 pr-2">
                        <span className="text-[10px] font-bold text-amber-800 uppercase">
                          {ann.categoryLabel}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-amber-800 line-clamp-1">
                          {ann.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 line-clamp-1">
                          {ann.summary}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-800 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Schedules */}
              {matchedSchedules.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-stone-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 px-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Lịch Học & Lớp Đào Tạo ({matchedSchedules.length})
                  </div>
                  {matchedSchedules.map((sch) => (
                    <div
                      key={sch.id}
                      onClick={() => {
                        onClose();
                        setActiveTab('lich-hoc');
                        onSelectSchedule(sch);
                      }}
                      className="p-3 bg-stone-50 hover:bg-blue-50/60 rounded-xl cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div className="space-y-0.5 pr-2">
                        <span className="text-[10px] font-bold text-blue-800 uppercase">
                          {sch.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-blue-800 line-clamp-1">
                          {sch.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 line-clamp-1">
                          Bắt đầu: {sch.startDate} • {sch.location}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-blue-800 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Trung tâm Học tập Cộng đồng Xã Long Hồ</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white hover:bg-stone-200 text-stone-700 font-semibold rounded-lg border border-stone-200"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
