import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  FileText, 
  FileUp, 
  Trash2, 
  Edit3, 
  Star, 
  Calendar, 
  Tag, 
  Building, 
  Share2, 
  Printer, 
  Check, 
  X,
  FileCode,
  File,
  HelpCircle,
  ExternalLink,
  Lock,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { DocumentItem, DocumentCategory, DocumentFileType, UserAccount } from '../types';

interface DocumentManagerProps {
  documents: DocumentItem[];
  isAdmin: boolean;
  currentUser: UserAccount | null;
  onRequireAuth: (promptReason: string) => void;
  onAddDocument: (doc: Omit<DocumentItem, 'id' | 'views' | 'downloadsCount'>) => void;
  onUpdateDocument: (doc: DocumentItem) => void;
  onDeleteDocument: (id: string) => void;
  selectedDoc: DocumentItem | null;
  setSelectedDoc: (doc: DocumentItem | null) => void;
  onIncrementDownload: (id: string) => void;
}

const CATEGORIES: { id: DocumentCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Tất cả tài liệu' },
  { id: 'khuyen-nong', label: 'Khuyến nông - Làm vườn' },
  { id: 'chuyen-doi-so', label: 'Chuyển đổi số & Kỹ năng số' },
  { id: 'phap-luat', label: 'Pháp luật & Chính sách' },
  { id: 'dao-tao-nghe', label: 'Đào tạo nghề nông thôn' },
  { id: 'suc-khoe', label: 'Sức khỏe & Môi trường' },
];

export const DocumentManager: React.FC<DocumentManagerProps> = ({
  documents,
  isAdmin,
  currentUser,
  onRequireAuth,
  onAddDocument,
  onUpdateDocument,
  onDeleteDocument,
  selectedDoc,
  setSelectedDoc,
  onIncrementDownload,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'downloads' | 'views'>('newest');

  // Modal State for Adding / Editing Document
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDocId, setEditingDocId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    category: 'khuyen-nong' as DocumentCategory,
    description: '',
    contentSummary: '',
    issuedBy: 'TT HTCĐ Xã Long Hồ',
    dateIssued: new Date().toISOString().split('T')[0],
    fileType: 'pdf' as DocumentFileType,
    fileName: '',
    fileSize: '1.5 MB',
    tags: '',
    isFeatured: false,
    fullTextContent: '',
  });

  const [copiedLink, setCopiedLink] = useState(false);

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      const matchFileType = fileTypeFilter === 'all' || doc.fileType === fileTypeFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        doc.title.toLowerCase().includes(query) ||
        (doc.code && doc.code.toLowerCase().includes(query)) ||
        doc.description.toLowerCase().includes(query) ||
        doc.issuedBy.toLowerCase().includes(query) ||
        doc.tags.some((t) => t.toLowerCase().includes(query));

      return matchCategory && matchFileType && matchQuery;
    }).sort((a, b) => {
      if (sortBy === 'downloads') return b.downloadsCount - a.downloadsCount;
      if (sortBy === 'views') return b.views - a.views;
      return new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime();
    });
  }, [documents, selectedCategory, fileTypeFilter, searchQuery, sortBy]);

  // Open Add modal
  const handleOpenAdd = () => {
    setEditingDocId(null);
    setFormData({
      title: '',
      code: '',
      category: 'khuyen-nong',
      description: '',
      contentSummary: '',
      issuedBy: 'TT HTCĐ Xã Long Hồ',
      dateIssued: new Date().toISOString().split('T')[0],
      fileType: 'pdf',
      fileName: '',
      fileSize: '2.0 MB',
      tags: '',
      isFeatured: false,
      fullTextContent: '',
    });
    setIsFormOpen(true);
  };

  // Open Edit modal
  const handleOpenEdit = (doc: DocumentItem) => {
    setEditingDocId(doc.id);
    setFormData({
      title: doc.title,
      code: doc.code || '',
      category: doc.category,
      description: doc.description,
      contentSummary: doc.contentSummary,
      issuedBy: doc.issuedBy,
      dateIssued: doc.dateIssued,
      fileType: doc.fileType,
      fileName: doc.fileName,
      fileSize: doc.fileSize,
      tags: doc.tags.join(', '),
      isFeatured: !!doc.isFeatured,
      fullTextContent: doc.fullTextContent || '',
    });
    setIsFormOpen(true);
  };

  // Handle Form Submit
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const catObj = CATEGORIES.find((c) => c.id === formData.category);
    const categoryLabel = catObj && catObj.id !== 'all' ? catObj.label : 'Khác';

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const generatedFileName =
      formData.fileName.trim() ||
      `${formData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${formData.fileType}`;

    if (editingDocId) {
      const original = documents.find((d) => d.id === editingDocId);
      if (original) {
        onUpdateDocument({
          ...original,
          title: formData.title,
          code: formData.code,
          category: formData.category,
          categoryLabel,
          description: formData.description,
          contentSummary: formData.contentSummary,
          issuedBy: formData.issuedBy,
          dateIssued: formData.dateIssued,
          fileType: formData.fileType,
          fileName: generatedFileName,
          fileSize: formData.fileSize,
          tags: tagsArray,
          isFeatured: formData.isFeatured,
          fullTextContent: formData.fullTextContent,
        });
      }
    } else {
      onAddDocument({
        title: formData.title,
        code: formData.code,
        category: formData.category,
        categoryLabel,
        description: formData.description,
        contentSummary: formData.contentSummary,
        issuedBy: formData.issuedBy,
        dateIssued: formData.dateIssued,
        fileType: formData.fileType,
        fileName: generatedFileName,
        fileSize: formData.fileSize,
        tags: tagsArray,
        isFeatured: formData.isFeatured,
        fullTextContent: formData.fullTextContent,
      });
    }

    setIsFormOpen(false);
  };

  // Handle actual download of text/pdf content as a file
  const handleDownloadFile = (doc: DocumentItem) => {
    if (!currentUser) {
      onRequireAuth('Bà con vui lòng Đăng ký tài khoản hoặc Đăng nhập để tải tệp tin này về máy.');
      return;
    }
    onIncrementDownload(doc.id);
    const content = doc.fullTextContent || `${doc.title}\n\n${doc.description}\n\nCơ quan ban hành: ${doc.issuedBy}\nNgày ban hành: ${doc.dateIssued}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.fileName || `${doc.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Guard view full document content
  const handleViewDocument = (doc: DocumentItem) => {
    if (!currentUser) {
      onRequireAuth('Bà con vui lòng Đăng ký tài khoản hoặc Đăng nhập để xem toàn văn tài liệu và hướng dẫn chi tiết.');
      return;
    }
    setSelectedDoc(doc);
  };

  const getFileTypeBadge = (type: DocumentFileType) => {
    switch (type) {
      case 'pdf':
        return <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded">PDF</span>;
      case 'docx':
        return <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded">DOCX</span>;
      case 'xlsx':
        return <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">EXCEL</span>;
      case 'video':
        return <span className="px-1.5 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-800 rounded">VIDEO</span>;
      default:
        return <span className="px-1.5 py-0.5 text-[10px] font-bold bg-stone-100 text-stone-800 rounded">TÀI LIỆU</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-700" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Kho Tài Liệu Học Tập & Hướng Dẫn Kỹ Thuật
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Tổng hợp cẩm nang khuyến nông, giáo trình học nghề, quy định pháp luật và tài liệu kỹ năng số cho bà con Xã Long Hồ.
          </p>
        </div>

        {/* Upload Doc Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2"
            id="btn-upload-document"
          >
            <FileUp className="w-4 h-4 text-amber-200" />
            <span>Đưa Tài Liệu Lên Web</span>
          </button>
        </div>
      </div>

      {/* Categories Filter Tabs */}
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

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên tài liệu, mã số, từ khóa..."
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

        {/* Format & Sort Selectors */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={fileTypeFilter}
              onChange={(e) => setFileTypeFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-stone-200 rounded-lg text-xs bg-white text-stone-700 font-medium focus:outline-hidden"
            >
              <option value="all">Mọi định dạng</option>
              <option value="pdf">Tệp PDF</option>
              <option value="docx">Tệp Word (DOCX)</option>
              <option value="xlsx">Tệp Bảng tính (EXCEL)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span>Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 border border-stone-200 rounded-lg text-xs bg-white text-stone-700 font-medium focus:outline-hidden"
            >
              <option value="newest">Mới nhất</option>
              <option value="downloads">Tải nhiều nhất</option>
              <option value="views">Xem nhiều nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Document Count Info */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>Hiển thị <strong>{filteredDocuments.length}</strong> tài liệu phù hợp</span>
        {isAdmin && (
          <span className="text-blue-700 font-medium">
            (Chế độ Cán bộ: Bạn có thể sửa, xóa hoặc đánh dấu nổi bật)
          </span>
        )}
      </div>

      {/* Document Grid List */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-800">Không tìm thấy tài liệu nào</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác. Cán bộ cũng có thể bấm nút &quot;Đưa Tài Liệu Lên Web&quot; để bổ sung tài liệu mới.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setFileTypeFilter('all');
            }}
            className="px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-stone-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between space-y-4 group relative"
            >
              {/* Card Header */}
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {getFileTypeBadge(doc.fileType)}
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-stone-100 text-stone-700 rounded">
                      {doc.categoryLabel}
                    </span>
                    {doc.isFeatured && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Nổi bật
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {doc.fileSize}
                  </span>
                </div>

                {doc.code && (
                  <div className="text-[11px] font-semibold text-stone-500 font-mono">
                    Số hiệu: {doc.code}
                  </div>
                )}

                <h3
                  onClick={() => setSelectedDoc(doc)}
                  className="text-base font-bold text-stone-900 group-hover:text-blue-700 transition-colors cursor-pointer line-clamp-2 leading-snug"
                >
                  {doc.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {doc.description}
                </p>

                {/* Tags */}
                {doc.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {doc.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-stone-50 text-stone-500 border border-stone-200 px-1.5 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Metadata & Footer Actions */}
              <div className="pt-3 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span className="truncate max-w-[170px]" title={doc.issuedBy}>
                    {doc.issuedBy}
                  </span>
                  <span>{doc.dateIssued}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewDocument(doc)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                        currentUser
                          ? 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                          : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                      }`}
                      title={currentUser ? "Xem nội dung chi tiết trên web" : "Đăng ký hoặc đăng nhập tài khoản để xem"}
                    >
                      {currentUser ? <Eye className="w-3.5 h-3.5 text-stone-600" /> : <Lock className="w-3.5 h-3.5 text-amber-700" />}
                      <span>{currentUser ? 'Xem nội dung' : 'Đăng ký xem'}</span>
                    </button>
                    <button
                      onClick={() => handleDownloadFile(doc)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                        currentUser
                          ? 'bg-blue-50 hover:bg-blue-100 text-blue-800'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                      }`}
                      title={currentUser ? "Tải tệp tin về máy" : "Đăng ký hoặc đăng nhập để tải"}
                    >
                      {currentUser ? <Download className="w-3.5 h-3.5 text-blue-700" /> : <Lock className="w-3.5 h-3.5 text-stone-500" />}
                      <span>Tải về</span>
                    </button>
                  </div>

                  {/* Admin controls */}
                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(doc)}
                        className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
                        title="Chỉnh sửa tài liệu"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc muốn xóa tài liệu: "${doc.title}"?`)) {
                            onDeleteDocument(doc.id);
                          }
                        }}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                        title="Xóa tài liệu"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: View Document Detail */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {getFileTypeBadge(selectedDoc.fileType)}
                  <span className="px-2 py-0.5 text-xs font-semibold bg-stone-100 text-stone-800 rounded">
                    {selectedDoc.categoryLabel}
                  </span>
                  {selectedDoc.code && (
                    <span className="text-xs text-stone-500 font-mono">
                      Số hiệu: {selectedDoc.code}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                  {selectedDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Metadata grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-3.5 rounded-xl text-xs text-stone-600 border border-stone-200/80">
              <div>
                <span className="text-stone-400 block">Cơ quan ban hành:</span>
                <span className="font-semibold text-stone-800">{selectedDoc.issuedBy}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Ngày ban hành:</span>
                <span className="font-semibold text-stone-800">{selectedDoc.dateIssued}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Tên tệp gốc:</span>
                <span className="font-semibold text-stone-800 truncate block" title={selectedDoc.fileName}>
                  {selectedDoc.fileName}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block">Lượt tải:</span>
                <span className="font-semibold text-emerald-700">{selectedDoc.downloadsCount} lượt</span>
              </div>
            </div>

            {/* Document Content / Reading Area */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Nội dung tài liệu / Hướng dẫn:
              </h4>
              {!currentUser ? (
                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 sm:p-8 text-center space-y-3.5">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-stone-900">
                      Bà con cần Đăng ký tài khoản để xem toàn văn và tải tệp
                    </h4>
                    <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                      Theo quy định của Trung tâm Học tập Cộng đồng Xã Long Hồ, để theo dõi và hỗ trợ tốt nhất cho học viên, người dân chỉ có quyền xem chi tiết toàn văn và tải tài liệu về máy sau khi đã đăng ký tài khoản.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <button
                      onClick={() => {
                        setSelectedDoc(null);
                        onRequireAuth('Bà con vui lòng Đăng ký tài khoản mới để xem toàn văn tài liệu này.');
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Đăng Ký Tài Khoản Miễn Phí</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDoc(null);
                        onRequireAuth('Vui lòng Đăng nhập tài khoản của bạn.');
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-stone-100 text-stone-800 font-semibold text-xs rounded-xl border border-stone-300 transition-colors"
                    >
                      Đã có tài khoản? Đăng nhập
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-sm text-stone-800 font-sans leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
                  {selectedDoc.fullTextContent || selectedDoc.contentSummary}
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
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
                  <span>{copiedLink ? 'Đã sao chép liên kết!' : 'Chia sẻ tài liệu'}</span>
                </button>
                {currentUser && (
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In văn bản</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Đóng lại
                </button>
                <button
                  onClick={() => handleDownloadFile(selectedDoc)}
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  {currentUser ? <Download className="w-4 h-4 text-amber-200" /> : <Lock className="w-4 h-4 text-amber-200" />}
                  <span>{currentUser ? `Tải File (${selectedDoc.fileSize})` : 'Đăng ký để tải file'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add or Edit Document */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 space-y-5 max-h-[92vh] overflow-y-auto shadow-2xl relative border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <FileUp className="w-5 h-5 text-blue-700" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  {editingDocId ? 'Cập Nhật Tài Liệu' : 'Đưa Tài Liệu Mới Lên Web'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Tên tài liệu / Văn bản hướng dẫn <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Sổ tay phòng trừ bệnh thán thư sầu riêng năm 2026..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>

              {/* Code & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Số ký hiệu / Mã văn bản (nếu có)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 15/HD-TTHTCĐ"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Danh mục tài liệu <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  >
                    <option value="khuyen-nong">Khuyến nông - Làm vườn</option>
                    <option value="chuyen-doi-so">Chuyển đổi số & Kỹ năng số</option>
                    <option value="phap-luat">Pháp luật & Chính sách</option>
                    <option value="dao-tao-nghe">Đào tạo nghề nông thôn</option>
                    <option value="suc-khoe">Sức khỏe & Môi trường</option>
                    <option value="khac">Tài liệu khác</option>
                  </select>
                </div>
              </div>

              {/* IssuedBy and Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Cơ quan / Đơn vị ban hành
                  </label>
                  <input
                    type="text"
                    value={formData.issuedBy}
                    onChange={(e) => setFormData({ ...formData, issuedBy: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Ngày ban hành
                  </label>
                  <input
                    type="date"
                    value={formData.dateIssued}
                    onChange={(e) => setFormData({ ...formData, dateIssued: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>
              </div>

              {/* File details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Định dạng tệp
                  </label>
                  <select
                    value={formData.fileType}
                    onChange={(e: any) => setFormData({ ...formData, fileType: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="pdf">Tệp PDF (.pdf)</option>
                    <option value="docx">Tệp Word (.docx)</option>
                    <option value="xlsx">Tệp Excel (.xlsx)</option>
                    <option value="video">Video bài giảng</option>
                    <option value="link">Liên kết ngoài</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Tên tệp (File name)
                  </label>
                  <input
                    type="text"
                    placeholder="tai-lieu-khuyen-nong.pdf"
                    value={formData.fileName}
                    onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Dung lượng ước tính
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 2.5 MB"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Mô tả tóm tắt ngắn (1-2 câu)
                </label>
                <textarea
                  rows={2}
                  placeholder="Mô tả nội dung khái quát để bà con dễ nhận biết..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>

              {/* Full Text Content (Soạn thảo văn bản trực tiếp để bà con đọc được trên điện thoại) */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Nội dung chi tiết (Đọc trực tiếp trên web)
                </label>
                <textarea
                  rows={5}
                  placeholder="Nhập hoặc dán nội dung văn bản hướng dẫn tại đây. Người dân sẽ đọc được ngay mà không cần cài phần mềm đọc PDF..."
                  value={formData.fullTextContent}
                  onChange={(e) => setFormData({ ...formData, fullTextContent: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>

              {/* Tags & Featured */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Thẻ từ khóa (Cách nhau bằng dấu phẩy)
                  </label>
                  <input
                    type="text"
                    placeholder="Sầu riêng, Khuyến nông, Bón phân..."
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg"
                  />
                </div>

                <div className="pt-4 sm:pt-0 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chk-featured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-stone-300 focus:ring-blue-500"
                  />
                  <label htmlFor="chk-featured" className="text-xs font-semibold text-stone-700 cursor-pointer">
                    Đánh dấu tài liệu nổi bật
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
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
                  <span>{editingDocId ? 'Lưu Thay Đổi' : 'Đăng Tài Liệu Lên Web'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
