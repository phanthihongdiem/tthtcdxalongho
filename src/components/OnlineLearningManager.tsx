import React, { useState } from 'react';
import { 
  Video, 
  Radio, 
  Users, 
  Clock, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  Plus, 
  Edit3, 
  Trash2, 
  Play, 
  BookOpen, 
  Award, 
  FileText, 
  Download, 
  Search, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  MonitorPlay, 
  Printer,
  ChevronRight,
  Tv,
  MessageSquareQuote,
  Flame,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { 
  OnlineClassroom, 
  VideoLecture, 
  MeetingPlatform, 
  UserAccount, 
  InteractiveQuizQuestion,
  AttendanceRecord,
  ActiveTab
} from '../types';

interface OnlineLearningManagerProps {
  classrooms: OnlineClassroom[];
  videoLectures: VideoLecture[];
  isAdmin: boolean;
  currentUser: UserAccount | null;
  onRequireAuth: (reason: string) => void;
  onAddClassroom: (room: Omit<OnlineClassroom, 'id'>) => void;
  onUpdateClassroom: (room: OnlineClassroom) => void;
  onDeleteClassroom: (id: string) => void;
  onAddVideoLecture: (video: Omit<VideoLecture, 'id' | 'views' | 'datePosted'>) => void;
  onUpdateVideoLecture: (video: VideoLecture) => void;
  onDeleteVideoLecture: (id: string) => void;
  initialSelectedVideoId?: string | null;
  initialSelectedRoomId?: string | null;
  onRecordAttendance?: (record: Omit<AttendanceRecord, 'id' | 'accessTime' | 'status'> & { status?: AttendanceRecord['status'] }) => void;
  onNavigateToTab?: (tab: ActiveTab) => void;
}

export const OnlineLearningManager: React.FC<OnlineLearningManagerProps> = ({
  classrooms,
  videoLectures,
  isAdmin,
  currentUser,
  onRequireAuth,
  onAddClassroom,
  onUpdateClassroom,
  onDeleteClassroom,
  onAddVideoLecture,
  onUpdateVideoLecture,
  onDeleteVideoLecture,
  initialSelectedVideoId,
  initialSelectedRoomId,
  onRecordAttendance,
  onNavigateToTab,
}) => {
  // Main view navigation: 'classrooms' | 'lectures' | 'my-learning'
  const [activeSubTab, setActiveSubTab] = useState<'classrooms' | 'lectures' | 'my-learning'>('classrooms');

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  // Selected for viewing / modal
  const [selectedRoom, setSelectedRoom] = useState<OnlineClassroom | null>(() => {
    if (initialSelectedRoomId) {
      return classrooms.find(r => r.id === initialSelectedRoomId) || null;
    }
    return null;
  });

  const [activeLecture, setActiveLecture] = useState<VideoLecture | null>(() => {
    if (initialSelectedVideoId) {
      return videoLectures.find(v => v.id === initialSelectedVideoId) || null;
    }
    return null;
  });

  // Interactive Quiz state for active lecture
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [lectureNotes, setLectureNotes] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [attendanceSuccess, setAttendanceSuccess] = useState<boolean>(false);

  // Completed items in localStorage
  const [completedLectures, setCompletedLectures] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tt_htcd_completed_lectures');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Certificate Modal
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // Admin Modals
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<OnlineClassroom | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoLecture | null>(null);

  // Form states for Classroom
  const [roomForm, setRoomForm] = useState({
    title: '',
    platform: 'google-meet' as MeetingPlatform,
    meetingUrl: '',
    meetingId: '',
    passcode: '',
    instructor: '',
    instructorTitle: '',
    category: 'Nông nghiệp & Khuyến nông',
    date: new Date().toISOString().split('T')[0],
    time: '19:30 - 21:00',
    locationDescription: '',
    status: 'sap-dien-ra' as 'dang-dien-ra' | 'sap-dien-ra' | 'da-ket-thuc',
    targetAudience: 'Toàn thể bà con nhân dân các ấp',
    description: '',
    currentParticipants: 20,
    maxParticipants: 100,
    attachedDocsText: 'Tai-lieu-buoi-hoc.pdf',
  });

  // Form states for Video Lecture
  const [videoForm, setVideoForm] = useState({
    title: '',
    category: 'Nông nghiệp & Khuyến nông',
    instructor: '',
    instructorTitle: '',
    duration: '25:00',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: '',
    description: '',
    tagsText: 'Nông nghiệp, Khuyến nông, Long Hồ',
    isInteractive: true,
    q1_question: 'Câu hỏi củng cố kiến thức số 1?',
    q1_opt0: 'Phương án A',
    q1_opt1: 'Phương án B (Đáp án đúng)',
    q1_opt2: 'Phương án C',
    q1_opt3: 'Phương án D',
    q1_correct: 1,
    q1_explanation: 'Giải thích chi tiết vì sao câu này đúng.',
  });

  // Helper copy text
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Mark completion
  const handleToggleComplete = (lectureId: string) => {
    let updated: string[];
    if (completedLectures.includes(lectureId)) {
      updated = completedLectures.filter(id => id !== lectureId);
    } else {
      updated = [...completedLectures, lectureId];
    }
    setCompletedLectures(updated);
    try {
      localStorage.setItem('tt_htcd_completed_lectures', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Automatic Attendance Recording on Classroom & Lecture Access
  const handleAutoCheckinRoom = (room: OnlineClassroom) => {
    if (onRecordAttendance) {
      onRecordAttendance({
        studentName: currentUser?.fullName || 'Học viên trực tuyến',
        studentPhone: currentUser?.phone || '09xx.xxx.xxx',
        hamlet: currentUser?.hamlet || 'Xã Long Hồ',
        userId: currentUser?.id,
        itemType: 'online-classroom',
        itemId: room.id,
        itemTitle: room.title,
        platform: room.platform,
        instructor: room.instructor,
        durationMinutes: 90,
        status: 'tu-dong-ghi-nhan',
        device: typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent) ? 'Điện thoại di động' : 'Máy tính',
        ipOrLocation: `${currentUser?.hamlet || 'Người dân'} Xã Long Hồ`,
        notes: 'Điểm danh tự động khi học viên nhấn liên kết vào lớp học'
      });
      setAttendanceSuccess(true);
      setTimeout(() => setAttendanceSuccess(false), 4000);
    }
  };

  const handleAutoCheckinLecture = (lecture: VideoLecture) => {
    if (onRecordAttendance) {
      onRecordAttendance({
        studentName: currentUser?.fullName || 'Học viên trực tuyến',
        studentPhone: currentUser?.phone || '09xx.xxx.xxx',
        hamlet: currentUser?.hamlet || 'Xã Long Hồ',
        userId: currentUser?.id,
        itemType: 'video-lecture',
        itemId: lecture.id,
        itemTitle: lecture.title,
        platform: 'video',
        instructor: lecture.instructor,
        durationMinutes: parseInt(lecture.duration) || 20,
        status: 'tu-dong-ghi-nhan',
        device: typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent) ? 'Điện thoại di động' : 'Máy tính',
        ipOrLocation: `${currentUser?.hamlet || 'Người dân'} Xã Long Hồ`,
        notes: 'Điểm danh tự động khi học viên mở xem bài giảng video số'
      });
      setAttendanceSuccess(true);
      setTimeout(() => setAttendanceSuccess(false), 4000);
    }
  };

  // Open Room Form
  const handleOpenAddRoom = () => {
    if (!isAdmin) {
      onRequireAuth('Vui lòng đăng nhập với tài khoản Cán bộ Quản trị để thiết lập phòng học trực tuyến.');
      return;
    }
    setEditingRoom(null);
    setRoomForm({
      title: '',
      platform: 'google-meet',
      meetingUrl: 'https://meet.google.com/',
      meetingId: '',
      passcode: '',
      instructor: currentUser?.fullName || '',
      instructorTitle: 'Báo cáo viên TT HTCĐ Xã Long Hồ',
      category: 'Nông nghiệp & Khuyến nông',
      date: new Date().toISOString().split('T')[0],
      time: '19:30 - 21:00',
      locationDescription: 'Hội trường Trung tâm HTCĐ Xã Long Hồ kết hợp trực tuyến',
      status: 'sap-dien-ra',
      targetAudience: 'Toàn thể bà con nhân dân các ấp',
      description: '',
      currentParticipants: 0,
      maxParticipants: 100,
      attachedDocsText: 'Tai-lieu-huong-dan.pdf',
    });
    setIsRoomModalOpen(true);
  };

  const handleOpenEditRoom = (room: OnlineClassroom) => {
    if (!isAdmin) return;
    setEditingRoom(room);
    setRoomForm({
      title: room.title,
      platform: room.platform,
      meetingUrl: room.meetingUrl,
      meetingId: room.meetingId || '',
      passcode: room.passcode || '',
      instructor: room.instructor,
      instructorTitle: room.instructorTitle || '',
      category: room.category,
      date: room.date,
      time: room.time,
      locationDescription: room.locationDescription || '',
      status: room.status,
      targetAudience: room.targetAudience,
      description: room.description,
      currentParticipants: room.currentParticipants,
      maxParticipants: room.maxParticipants || 100,
      attachedDocsText: room.attachedDocs?.map(d => d.name).join(', ') || '',
    });
    setIsRoomModalOpen(true);
  };

  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const attachedDocs = roomForm.attachedDocsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(name => ({ name, size: '1.5 MB' }));

    if (editingRoom) {
      onUpdateClassroom({
        ...editingRoom,
        title: roomForm.title,
        platform: roomForm.platform,
        meetingUrl: roomForm.meetingUrl,
        meetingId: roomForm.meetingId,
        passcode: roomForm.passcode,
        instructor: roomForm.instructor,
        instructorTitle: roomForm.instructorTitle,
        category: roomForm.category,
        date: roomForm.date,
        time: roomForm.time,
        locationDescription: roomForm.locationDescription,
        status: roomForm.status,
        targetAudience: roomForm.targetAudience,
        description: roomForm.description,
        attachedDocs: attachedDocs.length > 0 ? attachedDocs : undefined,
        currentParticipants: Number(roomForm.currentParticipants) || 0,
        maxParticipants: Number(roomForm.maxParticipants) || 100,
      });
    } else {
      onAddClassroom({
        title: roomForm.title,
        platform: roomForm.platform,
        meetingUrl: roomForm.meetingUrl,
        meetingId: roomForm.meetingId,
        passcode: roomForm.passcode,
        instructor: roomForm.instructor,
        instructorTitle: roomForm.instructorTitle,
        category: roomForm.category,
        date: roomForm.date,
        time: roomForm.time,
        locationDescription: roomForm.locationDescription,
        status: roomForm.status,
        targetAudience: roomForm.targetAudience,
        description: roomForm.description,
        attachedDocs: attachedDocs.length > 0 ? attachedDocs : undefined,
        currentParticipants: Number(roomForm.currentParticipants) || 0,
        maxParticipants: Number(roomForm.maxParticipants) || 100,
      });
    }
    setIsRoomModalOpen(false);
  };

  // Open Video Form
  const handleOpenAddVideo = () => {
    if (!isAdmin) {
      onRequireAuth('Vui lòng đăng nhập với tài khoản Cán bộ Quản trị để đăng tải bài giảng video.');
      return;
    }
    setEditingVideo(null);
    setVideoForm({
      title: '',
      category: 'Nông nghiệp & Khuyến nông',
      instructor: currentUser?.fullName || '',
      instructorTitle: 'Báo cáo viên TT HTCĐ Xã Long Hồ',
      duration: '25:00',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      description: '',
      tagsText: 'Nông nghiệp, Long Hồ, Kỹ thuật',
      isInteractive: true,
      q1_question: 'Nội dung cốt lõi của bài giảng này cần lưu ý điều gì nhất?',
      q1_opt0: 'Thực hiện qua loa, không ghi chép',
      q1_opt1: 'Tuân thủ đúng quy trình kỹ thuật và đảm bảo an toàn vệ sinh (Đáp án đúng)',
      q1_opt2: 'Tự ý thay đổi liều lượng gấp đôi',
      q1_opt3: 'Bỏ qua khuyến cáo của cán bộ chuyên môn',
      q1_correct: 1,
      q1_explanation: 'Bà con cần tuân thủ đúng quy trình kỹ thuật để đạt hiệu quả cao nhất và bảo vệ sức khỏe môi trường.',
    });
    setIsVideoModalOpen(true);
  };

  const handleOpenEditVideo = (vid: VideoLecture) => {
    if (!isAdmin) return;
    setEditingVideo(vid);
    const q1 = vid.interactiveQuestions?.[0];
    setVideoForm({
      title: vid.title,
      category: vid.category,
      instructor: vid.instructor,
      instructorTitle: vid.instructorTitle || '',
      duration: vid.duration,
      videoUrl: vid.videoUrl,
      thumbnailUrl: vid.thumbnailUrl || '',
      description: vid.description,
      tagsText: vid.tags.join(', '),
      isInteractive: vid.isInteractive,
      q1_question: q1?.question || 'Câu hỏi tương tác?',
      q1_opt0: q1?.options[0] || 'Lựa chọn A',
      q1_opt1: q1?.options[1] || 'Lựa chọn B',
      q1_opt2: q1?.options[2] || 'Lựa chọn C',
      q1_opt3: q1?.options[3] || 'Lựa chọn D',
      q1_correct: q1 ? q1.correctOptionIndex : 1,
      q1_explanation: q1?.explanation || 'Giải thích đáp án đúng.',
    });
    setIsVideoModalOpen(true);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = videoForm.tagsText.split(',').map(s => s.trim()).filter(Boolean);
    const questions: InteractiveQuizQuestion[] = videoForm.isInteractive ? [
      {
        id: `q-${Date.now()}`,
        question: videoForm.q1_question,
        options: [videoForm.q1_opt0, videoForm.q1_opt1, videoForm.q1_opt2, videoForm.q1_opt3],
        correctOptionIndex: Number(videoForm.q1_correct),
        explanation: videoForm.q1_explanation,
      }
    ] : [];

    if (editingVideo) {
      onUpdateVideoLecture({
        ...editingVideo,
        title: videoForm.title,
        category: videoForm.category,
        instructor: videoForm.instructor,
        instructorTitle: videoForm.instructorTitle,
        duration: videoForm.duration,
        videoUrl: videoForm.videoUrl,
        thumbnailUrl: videoForm.thumbnailUrl,
        description: videoForm.description,
        tags,
        isInteractive: videoForm.isInteractive,
        interactiveQuestions: questions.length > 0 ? questions : undefined,
      });
    } else {
      onAddVideoLecture({
        title: videoForm.title,
        category: videoForm.category,
        instructor: videoForm.instructor,
        instructorTitle: videoForm.instructorTitle,
        duration: videoForm.duration,
        videoUrl: videoForm.videoUrl,
        thumbnailUrl: videoForm.thumbnailUrl,
        description: videoForm.description,
        tags,
        isInteractive: videoForm.isInteractive,
        interactiveQuestions: questions.length > 0 ? questions : undefined,
      });
    }
    setIsVideoModalOpen(false);
  };

  // Filtered Classrooms
  const filteredClassrooms = classrooms.filter(r => {
    const matchesSearch = 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || r.platform === selectedPlatform;
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    return matchesSearch && matchesPlatform && matchesCategory;
  });

  // Filtered Videos
  const filteredVideos = videoLectures.filter(v => {
    const matchesSearch = 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Live classroom check
  const liveRoom = classrooms.find(r => r.status === 'dang-dien-ra');

  // Categories list
  const allCategories = Array.from(new Set([
    ...classrooms.map(c => c.category),
    ...videoLectures.map(v => v.category),
  ]));

  // Platform badges
  const renderPlatformBadge = (platform: MeetingPlatform) => {
    switch (platform) {
      case 'google-meet':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Google Meet
          </span>
        );
      case 'zoom':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Zoom Meetings
          </span>
        );
      case 'ms-teams':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Microsoft Teams
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <MapPin className="w-3 h-3 text-amber-600" />
            Trực tiếp Hội trường
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <MonitorPlay className="w-72 h-72 text-white" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Nền tảng Học tập Số Trung tâm HTCĐ Xã Long Hồ
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Tổ Chức Học Tập Trực Tiếp & Trực Tuyến
          </h1>
          
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Kết nối lớp học số qua <strong className="text-white">Google Meet</strong>, <strong className="text-white">Zoom</strong>, <strong className="text-white">MS Teams</strong> kết hợp hội trường ấp. Cung cấp bài giảng video chuẩn hóa và bài học tương tác để bà con nông dân và học viên dễ dàng học từ xa hoặc xem lại mọi lúc, mọi nơi.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveSubTab('classrooms')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeSubTab === 'classrooms'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'bg-emerald-900/40 text-emerald-100 hover:bg-emerald-900/70 border border-emerald-600/40'
              }`}
            >
              Phòng Học Trực Tuyến ({classrooms.length})
            </button>

            <button
              onClick={() => setActiveSubTab('lectures')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeSubTab === 'lectures'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'bg-emerald-900/40 text-emerald-100 hover:bg-emerald-900/70 border border-emerald-600/40'
              }`}
            >
              Kho Bài Giảng Video & Tương Tác ({videoLectures.length})
            </button>

            <button
              onClick={() => setActiveSubTab('my-learning')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeSubTab === 'my-learning'
                  ? 'bg-amber-400 text-stone-900 shadow-sm font-bold'
                  : 'bg-emerald-900/40 text-emerald-100 hover:bg-emerald-900/70 border border-emerald-600/40'
              }`}
            >
              Tiến Độ Của Tôi ({completedLectures.length} bài đã hoàn thành)
            </button>

            {onNavigateToTab && (
              <button
                onClick={() => onNavigateToTab('quan-ly-hoc-tap')}
                className="px-4 py-2 rounded-lg text-sm font-bold transition-all bg-amber-500 hover:bg-amber-400 text-stone-900 shadow-xs flex items-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4 text-stone-900" />
                <span>Theo Dõi &amp; Điểm Danh Học Viên</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Breaking / LIVE Alert if any room is currently streaming */}
      {liveRoom && (
        <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm animate-pulse-border">
          <div className="flex items-start gap-3.5">
            <span className="flex h-3 w-3 relative mt-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-red-600 text-white">
                  ĐANG PHÁT TRỰC TIẾP (LIVE)
                </span>
                {renderPlatformBadge(liveRoom.platform)}
                <span className="text-xs text-blue-700 font-medium hidden sm:inline">
                  • {liveRoom.currentParticipants} học viên đang trực tuyến
                </span>
              </div>
              <h3 className="font-bold text-stone-900 text-base sm:text-lg mt-1">
                {liveRoom.title}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                Báo cáo viên: <strong>{liveRoom.instructor}</strong> ({liveRoom.instructorTitle}) | Thời gian: {liveRoom.time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <a
              href={liveRoom.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleAutoCheckinRoom(liveRoom)}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-sm transition-colors"
            >
              <Radio className="w-4 h-4 animate-spin" />
              Vào Lớp Học Ngay
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
            <button
              onClick={() => setSelectedRoom(liveRoom)}
              className="px-4 py-2.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-lg text-sm font-medium transition-colors"
            >
              Xem Chi Tiết
            </button>
          </div>
        </div>
      )}

      {/* Control Bar: Search & Admin Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-stone-200">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                activeSubTab === 'classrooms' 
                  ? 'Tìm kiếm phòng học, giảng viên, chuyên đề...' 
                  : 'Tìm kiếm bài giảng video, chuyên đề nông nghiệp, kỹ năng số...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-sm border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="all">Tất cả chuyên mục</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Platform Filter for classrooms */}
          {activeSubTab === 'classrooms' && (
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-3 py-2 text-sm border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">Mọi nền tảng</option>
              <option value="google-meet">Google Meet</option>
              <option value="zoom">Zoom</option>
              <option value="ms-teams">MS Teams</option>
              <option value="truc-tiep">Trực tiếp Hội trường</option>
            </select>
          )}
        </div>

        {/* Admin Action Buttons */}
        {isAdmin && (
          <div className="flex items-center gap-2">
            {activeSubTab === 'classrooms' && (
              <button
                onClick={handleOpenAddRoom}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Thêm Phòng Học Mới
              </button>
            )}

            {activeSubTab === 'lectures' && (
              <button
                onClick={handleOpenAddVideo}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Đăng Tải Bài Giảng Mới
              </button>
            )}
          </div>
        )}
      </div>

      {/* VIEW 1: ONLINE & IN-PERSON CLASSROOMS */}
      {activeSubTab === 'classrooms' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Tv className="w-5 h-5 text-emerald-700" />
              Danh Sách Phòng Học Trực Tuyến & Điểm Cầu ({filteredClassrooms.length})
            </h2>
            <span className="text-xs text-stone-500">
              Hỗ trợ tự động mở Google Meet, Zoom, MS Teams
            </span>
          </div>

          {filteredClassrooms.length === 0 ? (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center text-stone-500">
              <Video className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="font-medium text-stone-700">Không tìm thấy phòng học phù hợp.</p>
              <p className="text-sm text-stone-400 mt-1">Vui lòng thay đổi từ khóa hoặc bộ lọc tìm kiếm.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredClassrooms.map((room) => {
                const isLive = room.status === 'dang-dien-ra';
                const isEnded = room.status === 'da-ket-thuc';

                return (
                  <div
                    key={room.id}
                    className={`bg-white rounded-xl border transition-all hover:shadow-md flex flex-col justify-between p-5 ${
                      isLive 
                        ? 'border-blue-400 ring-2 ring-blue-100 bg-blue-50/20' 
                        : isEnded 
                          ? 'border-stone-200 opacity-90' 
                          : 'border-stone-200 hover:border-emerald-300'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {renderPlatformBadge(room.platform)}
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200">
                            {room.category}
                          </span>
                        </div>

                        {isLive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white animate-pulse">
                            <Radio className="w-3 h-3" />
                            ĐANG LIVE
                          </span>
                        ) : isEnded ? (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
                            Đã kết thúc
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Sắp diễn ra
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-stone-900 text-base sm:text-lg leading-snug hover:text-emerald-700 cursor-pointer"
                        onClick={() => setSelectedRoom(room)}
                      >
                        {room.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-2">
                        {room.description}
                      </p>

                      {/* Instructor & Location info */}
                      <div className="mt-4 pt-3 border-t border-stone-100 space-y-2 text-xs sm:text-sm text-stone-600">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Giảng viên: <strong className="text-stone-800">{room.instructor}</strong> {room.instructorTitle && `(${room.instructorTitle})`}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Thời gian: <strong className="text-stone-800">{room.time}</strong> • Ngày {room.date}</span>
                        </div>

                        {room.locationDescription && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>Điểm cầu: <span className="text-stone-700">{room.locationDescription}</span></span>
                          </div>
                        )}
                      </div>

                      {/* Meeting Credentials Box */}
                      {room.platform !== 'truc-tiep' && (
                        <div className="mt-3.5 bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            {room.meetingId && (
                              <div>
                                <span className="text-stone-400">ID Phòng: </span>
                                <strong className="text-stone-800 font-mono">{room.meetingId}</strong>
                              </div>
                            )}
                            {room.passcode && (
                              <div>
                                <span className="text-stone-400">Mật mã: </span>
                                <strong className="text-stone-800 font-mono">{room.passcode}</strong>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handleCopyText(`${room.meetingUrl} | ID: ${room.meetingId || ''} | Pass: ${room.passcode || ''}`, room.id)}
                            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium"
                          >
                            {copiedId === room.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Đã sao chép</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Sao chép link</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Actions footer */}
                    <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isLive ? (
                          <a
                            href={room.meetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleAutoCheckinRoom(room)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors"
                          >
                            <Video className="w-4 h-4" />
                            Tham Gia Phòng Học
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : isEnded ? (
                          room.replayVideoId ? (
                            <button
                              onClick={() => {
                                const matched = videoLectures.find(v => v.id === room.replayVideoId);
                                if (matched) {
                                  setActiveLecture(matched);
                                  handleAutoCheckinLecture(matched);
                                  setActiveSubTab('lectures');
                                }
                              }}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors"
                            >
                              <Play className="w-4 h-4" />
                              Xem Video Ghi Hình Lại
                            </button>
                          ) : (
                            <span className="text-xs text-stone-400">Buổi học đã hoàn tất</span>
                          )
                        ) : (
                          <a
                            href={room.meetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleAutoCheckinRoom(room)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Mở Link Phòng Trước
                          </a>
                        )}

                        <button
                          onClick={() => setSelectedRoom(room)}
                          className="px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                        >
                          Chi tiết
                        </button>
                      </div>

                      {/* Admin controls */}
                      {isAdmin && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditRoom(room)}
                            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded"
                            title="Chỉnh sửa phòng"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Bạn có chắc muốn xóa phòng học "${room.title}"?`)) {
                                onDeleteClassroom(room.id);
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Xóa phòng"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: VIDEO LECTURES & INTERACTIVE LESSONS */}
      {activeSubTab === 'lectures' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Play className="w-5 h-5 text-emerald-700 fill-emerald-700" />
                Kho Bài Giảng Video & Bài Giảng Tương Tác ({filteredVideos.length})
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Xem lại các buổi tập huấn ghi hình, thực hành câu hỏi tương tác và nhận chứng nhận
              </p>
            </div>
          </div>

          {filteredVideos.length === 0 ? (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center text-stone-500">
              <Play className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="font-medium text-stone-700">Không tìm thấy video bài giảng phù hợp.</p>
              <p className="text-sm text-stone-400 mt-1">Vui lòng thay đổi từ khóa hoặc bộ lọc tìm kiếm.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVideos.map((video) => {
                const isCompleted = completedLectures.includes(video.id);

                return (
                  <div
                    key={video.id}
                    className="bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
                  >
                    <div>
                      {/* Video Thumbnail */}
                      <div 
                        onClick={() => {
                          setActiveLecture(video);
                          handleAutoCheckinLecture(video);
                        }}
                        className="relative aspect-video bg-stone-900 cursor-pointer overflow-hidden group-hover:opacity-95"
                      >
                        <img
                          src={video.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                            <Play className="w-5 h-5 ml-1 fill-white" />
                          </div>
                        </div>

                        {/* Badges on Thumbnail */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-900/80 text-white backdrop-blur-xs">
                            {video.category}
                          </span>
                          {video.isInteractive && (
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500 text-stone-900 shadow-xs flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Tương tác
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-xs font-mono font-medium bg-black/80 text-white">
                          {video.duration}
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs text-stone-500">
                          <span>{video.views.toLocaleString()} lượt xem</span>
                          <span>Đăng ngày {video.datePosted}</span>
                        </div>

                        <h3 
                          onClick={() => {
                            setActiveLecture(video);
                            handleAutoCheckinLecture(video);
                          }}
                          className="font-bold text-stone-900 text-base leading-snug hover:text-emerald-700 cursor-pointer line-clamp-2"
                        >
                          {video.title}
                        </h3>

                        <p className="text-xs text-stone-600 line-clamp-2">
                          {video.description}
                        </p>

                        <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-stone-400" />
                          <span>Giảng viên: <strong className="text-stone-700">{video.instructor}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between gap-2 mt-2">
                      <button
                        onClick={() => {
                          setActiveLecture(video);
                          handleAutoCheckinLecture(video);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        Học ngay & Làm bài tập
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleToggleComplete(video.id)}
                          className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                            isCompleted 
                              ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-medium' 
                              : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                          }`}
                          title={isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
                        >
                          <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : ''}`} />
                        </button>

                        {isAdmin && (
                          <>
                            <button
                              onClick={() => handleOpenEditVideo(video)}
                              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded"
                              title="Sửa bài giảng"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Bạn có chắc muốn xóa bài giảng "${video.title}"?`)) {
                                  onDeleteVideoLecture(video.id);
                                }
                              }}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded"
                              title="Xóa bài giảng"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: MY LEARNING & PROGRESS */}
      {activeSubTab === 'my-learning' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-500" />
                  Tiến Độ Học Tập Suốt Đời Của Tôi
                </h2>
                <p className="text-sm text-stone-500 mt-1">
                  Người học: <strong className="text-stone-800">{currentUser?.fullName || 'Học viên Xã Long Hồ'}</strong> 
                  {currentUser?.hamlet && ` • ${currentUser.hamlet}`}
                </p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-emerald-700">
                  {completedLectures.length} / {videoLectures.length}
                </span>
                <span className="text-xs text-stone-500 block">chuyên đề đã hoàn thành</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(completedLectures.length / Math.max(videoLectures.length, 1)) * 100}%` }}
              ></div>
            </div>

            {completedLectures.length > 0 && (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-stone-600">
                  Chúc mừng bạn! Bạn đã hoàn thành {Math.round((completedLectures.length / videoLectures.length) * 100)}% lộ trình học tập số.
                </span>
                <button
                  onClick={() => setShowCertificate(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-900 rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  <Award className="w-4 h-4" />
                  Xem Chứng Nhận Hoàn Thành
                </button>
              </div>
            )}
          </div>

          {/* List of Completed Lectures */}
          <div className="space-y-3">
            <h3 className="font-bold text-stone-900 text-base">
              Các Bài Học Đã Ghi Nhận
            </h3>

            {completedLectures.length === 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-500">
                <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p>Bạn chưa hoàn thành bài giảng nào.</p>
                <button
                  onClick={() => setActiveSubTab('lectures')}
                  className="mt-3 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800"
                >
                  Khám phá kho bài giảng ngay
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {videoLectures
                  .filter(v => completedLectures.includes(v.id))
                  .map(video => (
                    <div 
                      key={video.id}
                      className="bg-white rounded-lg border border-emerald-200 p-4 flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm">{video.title}</h4>
                          <span className="text-xs text-stone-500">{video.category} • Thời lượng {video.duration}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveLecture(video);
                          setActiveSubTab('lectures');
                        }}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs font-medium shrink-0"
                      >
                        Học lại
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: INTERACTIVE LECTURE PLAYER & QUIZ */}
      {activeLecture && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="bg-stone-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-700 text-white">
                  {activeLecture.category}
                </span>
                <span className="text-xs text-stone-300 hidden sm:inline">• Thời lượng: {activeLecture.duration}</span>
              </div>

              <button
                onClick={() => {
                  setActiveLecture(null);
                  setQuizSubmitted(false);
                  setUserQuizAnswers({});
                }}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black relative w-full shrink-0">
              <iframe
                src={activeLecture.videoUrl}
                title={activeLecture.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            {/* Modal Body & Interactive Quiz */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  {activeLecture.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-500 mt-2">
                  <span>Giảng viên: <strong className="text-stone-800">{activeLecture.instructor}</strong></span>
                  <span>•</span>
                  <span>Lượt xem: {activeLecture.views.toLocaleString()}</span>
                  <span>•</span>
                  <span>Ngày đăng: {activeLecture.datePosted}</span>
                </div>
                <p className="text-stone-700 text-sm mt-3 leading-relaxed">
                  {activeLecture.description}
                </p>
              </div>

              {/* Action bar inside player */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200">
                <button
                  onClick={() => handleToggleComplete(activeLecture.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    completedLectures.includes(activeLecture.id)
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {completedLectures.includes(activeLecture.id) 
                    ? 'Đã Đánh Dấu Hoàn Thành' 
                    : 'Đánh Dấu Đã Học Xong'}
                </button>

                <div className="flex items-center gap-2">
                  {activeLecture.attachments && activeLecture.attachments.length > 0 && (
                    <button
                      onClick={() => alert(`Đang tải tài liệu: ${activeLecture.attachments?.[0].name}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Tải Tài Liệu Kèm ({activeLecture.attachments[0].name})
                    </button>
                  )}
                </div>
              </div>

              {/* Interactive Quiz Section */}
              {activeLecture.isInteractive && activeLecture.interactiveQuestions && (
                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      Bài Tập Tương Tác & Củng Cố Kiến Thức
                    </h3>
                    <span className="text-xs text-amber-800 font-medium">
                      Làm bài để nhận chứng nhận
                    </span>
                  </div>

                  <div className="space-y-4">
                    {activeLecture.interactiveQuestions.map((q, qIndex) => {
                      const selectedOpt = userQuizAnswers[q.id];
                      const isCorrect = selectedOpt === q.correctOptionIndex;

                      return (
                        <div key={q.id} className="bg-white rounded-lg p-4 border border-amber-200 space-y-3">
                          <p className="font-semibold text-stone-900 text-sm">
                            Câu {qIndex + 1}: {q.question}
                          </p>

                          <div className="space-y-2">
                            {q.options.map((opt, optIndex) => (
                              <label
                                key={optIndex}
                                className={`flex items-start gap-3 p-3 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${
                                  selectedOpt === optIndex
                                    ? quizSubmitted
                                      ? optIndex === q.correctOptionIndex
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium'
                                        : 'bg-red-50 border-red-500 text-red-900'
                                      : 'bg-emerald-50 border-emerald-600 text-emerald-900 font-medium'
                                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`quiz-${q.id}`}
                                  checked={selectedOpt === optIndex}
                                  onChange={() => {
                                    setUserQuizAnswers(prev => ({ ...prev, [q.id]: optIndex }));
                                  }}
                                  className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>

                          {/* Explanation feedback */}
                          {quizSubmitted && (
                            <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                              isCorrect ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                              <strong>{isCorrect ? '✓ Đáp án chính xác!' : '✗ Chưa chính xác!'}</strong> {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => {
                        setQuizSubmitted(true);
                        // Auto-complete lecture if answered
                        if (!completedLectures.includes(activeLecture.id)) {
                          handleToggleComplete(activeLecture.id);
                        }
                      }}
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-sm shadow-xs transition-colors"
                    >
                      Kiểm Tra Kết Quả
                    </button>

                    {quizSubmitted && (
                      <button
                        onClick={() => setShowCertificate(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-900 rounded-lg font-bold text-xs shadow-xs"
                      >
                        <Award className="w-4 h-4" />
                        Xem Giấy Chứng Nhận
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Note taking */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
                <h4 className="font-semibold text-stone-800 text-xs uppercase tracking-wider">
                  Ghi chú cá nhân của học viên
                </h4>
                <textarea
                  value={lectureNotes}
                  onChange={(e) => setLectureNotes(e.target.value)}
                  placeholder="Ghi lại các lưu ý quan trọng của bài giảng này (tự động lưu vào trình duyệt của bạn)..."
                  rows={3}
                  className="w-full p-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ROOM DETAILS */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-emerald-800 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {renderPlatformBadge(selectedRoom.platform)}
                <span className="text-xs font-semibold text-emerald-200">
                  {selectedRoom.category}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedRoom(null);
                  setAttendanceSuccess(false);
                }}
                className="text-stone-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-stone-900">
                {selectedRoom.title}
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed">
                {selectedRoom.description}
              </p>

              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Giảng viên / Báo cáo viên:</span>
                  <strong className="text-stone-900">{selectedRoom.instructor}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Thời gian:</span>
                  <span className="text-stone-900 font-medium">{selectedRoom.time} • Ngày {selectedRoom.date}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Điểm cầu trực tiếp:</span>
                  <span className="text-stone-900">{selectedRoom.locationDescription || 'Trực tuyến'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Đối tượng:</span>
                  <span className="text-stone-900">{selectedRoom.targetAudience}</span>
                </div>

                {selectedRoom.platform !== 'truc-tiep' && (
                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-400 block">Mã phòng / Passcode:</span>
                      <strong className="font-mono text-stone-800">
                        ID: {selectedRoom.meetingId || 'Không có'} {selectedRoom.passcode && `| Pass: ${selectedRoom.passcode}`}
                      </strong>
                    </div>

                    <button
                      onClick={() => handleCopyText(`${selectedRoom.meetingUrl}`, selectedRoom.id)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      {copiedId === selectedRoom.id ? 'Đã sao chép link' : 'Sao chép link phòng'}
                    </button>
                  </div>
                )}
              </div>

              {/* Attendance Button */}
              <div className="pt-2">
                {attendanceSuccess ? (
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-300 p-3 rounded-lg text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Đã ghi nhận điểm danh trực tuyến cho học viên {currentUser?.fullName || 'Học viên'}!
                  </div>
                ) : (
                  <button
                    onClick={() => setAttendanceSuccess(true)}
                    className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    Điểm danh trực tuyến tham gia lớp
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  onClick={() => {
                    setSelectedRoom(null);
                    setAttendanceSuccess(false);
                  }}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-sm font-medium hover:bg-stone-50"
                >
                  Đóng
                </button>

                <a
                  href={selectedRoom.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-bold shadow-xs transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Mở Phòng Học Ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CERTIFICATE OF COMPLETION */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 border-8 border-amber-100 relative">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Header */}
            <div className="text-center space-y-2 border-b-2 border-amber-300 pb-5">
              <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
                TRUNG TÂM HỌC TẬP CỘNG ĐỒNG XÃ LONG HỒ • HUYỆN LONG HỒ • TỈNH VĨNH LONG
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-800">
                GIẤY CHỨNG NHẬN HOÀN THÀNH
              </h2>
              <p className="text-xs text-stone-600 font-medium">
                Chuyên đề Học tập Trực tuyến & Kỹ năng Số Ứng dụng
              </p>
            </div>

            {/* Certificate Content */}
            <div className="py-6 text-center space-y-4 font-serif">
              <p className="text-sm text-stone-600">Chứng nhận học viên:</p>
              <h3 className="text-2xl font-bold text-stone-900 tracking-wide">
                {currentUser?.fullName || 'NGUYỄN VĂN HỌC VIÊN'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                Đã tích cực tham gia học tập trực tuyến, theo dõi đầy đủ các bài giảng video số hóa và hoàn thành xuất sắc các bài tập tương tác do Trung tâm Học tập Cộng đồng Xã Long Hồ tổ chức.
              </p>

              <div className="pt-4 flex items-center justify-around text-xs font-sans text-stone-600">
                <div>
                  <span className="block text-stone-400">Ngày cấp:</span>
                  <strong>{new Date().toLocaleDateString('vi-VN')}</strong>
                </div>
                <div>
                  <span className="block text-stone-400">Mã chứng nhận:</span>
                  <strong className="font-mono text-emerald-800">HTCĐ-AB-2026-CERT</strong>
                </div>
              </div>
            </div>

            {/* Signature Area */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
              <div className="text-center">
                <span className="text-stone-400 block">Cán bộ phụ trách E-learning</span>
                <span className="font-semibold text-stone-700 block mt-8">Tổ Công nghệ số cộng đồng</span>
              </div>
              <div className="text-center">
                <span className="text-stone-400 block">GIÁM ĐỐC TRUNG TÂM HTCĐ</span>
                <span className="font-bold text-stone-900 block mt-8">Phan Thanh Hoàng</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 font-sans">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold"
              >
                <Printer className="w-4 h-4" />
                In Chứng Nhận
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT CLASSROOM (ADMIN) */}
      {isRoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden my-6">
            <div className="bg-emerald-800 text-white p-4 px-6 flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingRoom ? 'Chỉnh Sửa Phòng Học Trực Tuyến' : 'Thiết Lập Phòng Học Trực Tuyến Mới'}
              </h3>
              <button onClick={() => setIsRoomModalOpen(false)} className="text-stone-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoom} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Tiêu đề lớp học / chuyên đề *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tập huấn Trực tuyến: Kỹ thuật Xử lý Ra Hoa Sầu riêng Nghịch Vụ"
                  value={roomForm.title}
                  onChange={(e) => setRoomForm({ ...roomForm, title: e.target.value })}
                  className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Nền tảng học trực tuyến *
                  </label>
                  <select
                    value={roomForm.platform}
                    onChange={(e) => setRoomForm({ ...roomForm, platform: e.target.value as MeetingPlatform })}
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="google-meet">Google Meet</option>
                    <option value="zoom">Zoom Meeting</option>
                    <option value="ms-teams">Microsoft Teams</option>
                    <option value="truc-tiep">Trực tiếp tại Hội trường / Điểm cầu ấp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Trạng thái phòng học *
                  </label>
                  <select
                    value={roomForm.status}
                    onChange={(e) => setRoomForm({ ...roomForm, status: e.target.value as any })}
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="sap-dien-ra">Sắp diễn ra</option>
                    <option value="dang-dien-ra">Đang diễn ra (LIVE)</option>
                    <option value="da-ket-thuc">Đã kết thúc</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Đường dẫn phòng học (Link Google Meet / Zoom / Teams) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://meet.google.com/abc-defg-hij hoặc https://zoom.us/j/..."
                  value={roomForm.meetingUrl}
                  onChange={(e) => setRoomForm({ ...roomForm, meetingUrl: e.target.value })}
                  className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Meeting ID (Mã cuộc họp)
                  </label>
                  <input
                    type="text"
                    placeholder="849 2048 5901 hoặc qmv-ytpk-wxz"
                    value={roomForm.meetingId}
                    onChange={(e) => setRoomForm({ ...roomForm, meetingId: e.target.value })}
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Mật mã phòng (Passcode nếu có)
                  </label>
                  <input
                    type="text"
                    placeholder="2026 hoặc 888999"
                    value={roomForm.passcode}
                    onChange={(e) => setRoomForm({ ...roomForm, passcode: e.target.value })}
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Giảng viên / Báo cáo viên *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ThS. Lê Thành Phong"
                    value={roomForm.instructor}
                    onChange={(e) => setRoomForm({ ...roomForm, instructor: e.target.value })}
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Đơn vị / Chức danh
                  </label>
                  <input
                    type="text"
                    placeholder="Viện Cây ăn quả Miền Nam / Công an Xã"
                    value={roomForm.instructorTitle}
                    onChange={(e) => setRoomForm({ ...roomForm, instructorTitle: e.target.value })}
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Ngày diễn ra *
                  </label>
                  <input
                    type="date"
                    required
                    value={roomForm.date}
                    onChange={(e) => setRoomForm({ ...roomForm, date: e.target.value })}
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Khung giờ (Giờ bắt đầu - kết thúc) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="19:30 - 21:00"
                    value={roomForm.time}
                    onChange={(e) => setRoomForm({ ...roomForm, time: e.target.value })}
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Điểm cầu trực tiếp (nếu kết hợp)
                </label>
                <input
                  type="text"
                  placeholder="Hội trường TT HTCĐ Xã Long Hồ + Điểm cầu Nhà sinh hoạt ấp An Hòa"
                  value={roomForm.locationDescription}
                  onChange={(e) => setRoomForm({ ...roomForm, locationDescription: e.target.value })}
                  className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Mô tả nội dung tập huấn / bài học
                </label>
                <textarea
                  rows={3}
                  placeholder="Tóm tắt nội dung trọng tâm của lớp học trực tuyến..."
                  value={roomForm.description}
                  onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
                  className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsRoomModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-sm font-medium hover:bg-stone-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-bold shadow-xs"
                >
                  {editingRoom ? 'Lưu Thay Đổi' : 'Tạo Phòng Học Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT VIDEO LECTURE (ADMIN) */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden my-6">
            <div className="bg-emerald-800 text-white p-4 px-6 flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingVideo ? 'Chỉnh Sửa Bài Giảng Video' : 'Đăng Tải Bài Giảng Video & Tương Tác Mới'}
              </h3>
              <button onClick={() => setIsVideoModalOpen(false)} className="text-stone-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Tiêu đề bài giảng video *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Kỹ thuật tỉa cành tạo tán sầu riêng vụ nghịch"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Chuyên mục *
                  </label>
                  <select
                    value={videoForm.category}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="Nông nghiệp & Khuyến nông">Nông nghiệp & Khuyến nông</option>
                    <option value="Chuyển đổi số & Ứng dụng AI">Chuyển đổi số & Ứng dụng AI</option>
                    <option value="Pháp luật & Kỹ năng số">Pháp luật & Kỹ năng số</option>
                    <option value="Chuyển đổi số & Cải cách hành chính">Chuyển đổi số & Cải cách hành chính</option>
                    <option value="Đào tạo nghề & Kỹ năng sống">Đào tạo nghề & Kỹ năng sống</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Thời lượng video *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: 25:30"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Đường dẫn Video (YouTube Embed hoặc MP4 URL) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/embed/..."
                  value={videoForm.videoUrl}
                  onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                  className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Giảng viên / Báo cáo viên *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ThS. Lê Thành Phong"
                    value={videoForm.instructor}
                    onChange={(e) => setVideoForm({ ...videoForm, instructor: e.target.value })}
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Ảnh đại diện bài giảng (Thumbnail URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={videoForm.thumbnailUrl}
                    onChange={(e) => setVideoForm({ ...videoForm, thumbnailUrl: e.target.value })}
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Mô tả tóm tắt bài giảng
                </label>
                <textarea
                  rows={2}
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  className="w-full p-2.5 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                ></textarea>
              </div>

              {/* Interactive question section */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wide text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Thiết lập Câu hỏi Trắc nghiệm Tương tác
                  </span>
                  <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={videoForm.isInteractive}
                      onChange={(e) => setVideoForm({ ...videoForm, isInteractive: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    Bật tính năng tương tác
                  </label>
                </div>

                {videoForm.isInteractive && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs text-stone-600 mb-1">Nội dung câu hỏi:</label>
                      <input
                        type="text"
                        value={videoForm.q1_question}
                        onChange={(e) => setVideoForm({ ...videoForm, q1_question: e.target.value })}
                        className="w-full p-2 text-xs border border-stone-300 rounded bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-stone-500 block mb-0.5">Phương án A:</span>
                        <input
                          type="text"
                          value={videoForm.q1_opt0}
                          onChange={(e) => setVideoForm({ ...videoForm, q1_opt0: e.target.value })}
                          className="w-full p-1.5 border border-stone-300 rounded bg-white"
                        />
                      </div>
                      <div>
                        <span className="text-stone-500 block mb-0.5">Phương án B:</span>
                        <input
                          type="text"
                          value={videoForm.q1_opt1}
                          onChange={(e) => setVideoForm({ ...videoForm, q1_opt1: e.target.value })}
                          className="w-full p-1.5 border border-stone-300 rounded bg-white"
                        />
                      </div>
                      <div>
                        <span className="text-stone-500 block mb-0.5">Phương án C:</span>
                        <input
                          type="text"
                          value={videoForm.q1_opt2}
                          onChange={(e) => setVideoForm({ ...videoForm, q1_opt2: e.target.value })}
                          className="w-full p-1.5 border border-stone-300 rounded bg-white"
                        />
                      </div>
                      <div>
                        <span className="text-stone-500 block mb-0.5">Phương án D:</span>
                        <input
                          type="text"
                          value={videoForm.q1_opt3}
                          onChange={(e) => setVideoForm({ ...videoForm, q1_opt3: e.target.value })}
                          className="w-full p-1.5 border border-stone-300 rounded bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs text-stone-600 mb-1">Phương án chính xác:</label>
                        <select
                          value={videoForm.q1_correct}
                          onChange={(e) => setVideoForm({ ...videoForm, q1_correct: Number(e.target.value) })}
                          className="w-full p-2 text-xs border border-stone-300 rounded bg-white"
                        >
                          <option value={0}>Phương án A</option>
                          <option value={1}>Phương án B</option>
                          <option value={2}>Phương án C</option>
                          <option value={3}>Phương án D</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-stone-600 mb-1">Giải thích đáp án:</label>
                        <input
                          type="text"
                          value={videoForm.q1_explanation}
                          onChange={(e) => setVideoForm({ ...videoForm, q1_explanation: e.target.value })}
                          className="w-full p-2 text-xs border border-stone-300 rounded bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-sm font-medium hover:bg-stone-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-bold shadow-xs"
                >
                  {editingVideo ? 'Lưu Bài Giảng' : 'Đăng Tải Ngay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
