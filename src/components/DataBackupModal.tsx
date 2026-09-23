import React, { useRef } from 'react';
import { Download, Upload, RotateCcw, X, ShieldAlert, Check } from 'lucide-react';
import { DocumentItem, AnnouncementItem, ClassScheduleItem, ClassProposalItem } from '../types';

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DocumentItem[];
  announcements: AnnouncementItem[];
  schedules: ClassScheduleItem[];
  proposals: ClassProposalItem[];
  onImportData: (data: {
    documents: DocumentItem[];
    announcements: AnnouncementItem[];
    schedules: ClassScheduleItem[];
    proposals?: ClassProposalItem[];
  }) => void;
  onResetDefault: () => void;
}

export const DataBackupModal: React.FC<DataBackupModalProps> = ({
  isOpen,
  onClose,
  documents,
  announcements,
  schedules,
  proposals,
  onImportData,
  onResetDefault,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    const backupData = {
      app: 'TT-HTCD-XA-AN-BINH',
      exportDate: new Date().toISOString(),
      documents,
      announcements,
      schedules,
      proposals,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Du-lieu-TT-HTCD-An-Binh-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.documents && parsed.announcements && parsed.schedules) {
            onImportData(parsed);
            alert('Đã khôi phục dữ liệu từ tệp tin thành công!');
            onClose();
          } else {
            alert('Tệp sao lưu không đúng định dạng của Trung tâm!');
          }
        } catch (err) {
          alert('Lỗi đọc tệp dữ liệu JSON!');
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative border border-stone-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-stone-900">Sao Lưu & Quản Trị Dữ Liệu</h3>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-stone-600">
          <p>
            Toàn bộ tài liệu, thông báo và lịch học được tự động lưu trữ trên trình duyệt. Cán bộ có thể xuất tệp dự phòng hoặc khôi phục khi cần thiết.
          </p>

          <div className="p-3.5 bg-stone-50 rounded-xl space-y-1 border border-stone-200">
            <div className="font-bold text-stone-900">Hiện đang lưu trữ:</div>
            <ul className="list-disc list-inside space-y-0.5 text-stone-600">
              <li>{documents.length} tài liệu học tập & hướng dẫn</li>
              <li>{announcements.length} thông báo & văn bản chỉ đạo</li>
              <li>{schedules.length} lớp đào tạo nghề & lịch học</li>
              <li>{proposals.length} đề xuất mở lớp của người dân</li>
            </ul>
          </div>

          <div className="space-y-2.5 pt-2">
            {/* Export */}
            <button
              onClick={handleExport}
              className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-amber-200" />
              <span>Tải Tệp Dự Phòng (Xuất JSON)</span>
            </button>

            {/* Import */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-stone-300"
            >
              <Upload className="w-4 h-4 text-stone-600" />
              <span>Khôi Phục Từ Tệp JSON</span>
            </button>

            {/* Reset */}
            <button
              onClick={() => {
                if (confirm('Khôi phục về dữ liệu mẫu chuẩn của Xã Long Hồ? Các dữ liệu tự nhập sẽ được hoàn nguyên.')) {
                  onResetDefault();
                  alert('Đã khôi phục dữ liệu mẫu ban đầu!');
                  onClose();
                }
              }}
              className="w-full py-2 px-4 text-stone-500 hover:text-blue-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục dữ liệu mẫu ban đầu của Xã Long Hồ</span>
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-200 flex justify-end">
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
