export type DocumentCategory =
  | 'khuyen-nong'
  | 'phap-luat'
  | 'chuyen-doi-so'
  | 'dao-tao-nghe'
  | 'suc-khoe'
  | 'khac';

export type DocumentFileType = 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'video' | 'link';

export interface DocumentItem {
  id: string;
  title: string;
  code?: string; // Số ký hiệu văn bản / mã tài liệu (vd: 12/HD-TTHTCĐ)
  category: DocumentCategory;
  categoryLabel: string;
  description: string;
  contentSummary: string;
  issuedBy: string; // Cơ quan ban hành (vd: TT HTCĐ Xã Long Hồ, Trạm Khuyến nông huyện)
  dateIssued: string;
  fileType: DocumentFileType;
  fileName: string;
  fileSize: string;
  fileUrl?: string; // Tùy chọn đường dẫn hoặc nội dung text đọc trực tiếp
  fullTextContent?: string;
  tags: string[];
  isFeatured?: boolean;
  views: number;
  downloadsCount: number;
}

export type AnnouncementPriority = 'khan' | 'quan-trong' | 'binh-thuong';
export type AnnouncementCategory = 'tuyen-sinh' | 'khan-cap' | 'tap-huan' | 'chinh-sach' | 'hoat-dong';

export interface AnnouncementItem {
  id: string;
  title: string;
  category: AnnouncementCategory;
  categoryLabel: string;
  summary: string;
  content: string;
  postedBy: string; // vd: Ban Giám đốc TT HTCĐ Xã Long Hồ
  datePosted: string;
  expiryDate?: string;
  priority: AnnouncementPriority;
  isPinned: boolean;
  views: number;
  attachments?: {
    name: string;
    size?: string;
    type?: string;
  }[];
}

export type ScheduleStatus = 'sap-dien-ra' | 'dang-dien-ra' | 'da-ket-thuc' | 'tam-hoan';

export interface RegistrationItem {
  id: string;
  scheduleId: string;
  fullName: string;
  phone: string;
  hamlet: string; // Ấp/Thôn
  birthYear: string;
  gender: 'nam' | 'nu' | 'khac';
  registrationDate: string;
  notes?: string;
  status: 'da-xac-nhan' | 'cho-xac-nhan';
}

export interface ClassScheduleItem {
  id: string;
  title: string;
  courseCode: string;
  category: string;
  instructor: string;
  instructorTitle: string; // vd: ThS. Kỹ sư Nông nghiệp Nguyễn Văn Hùng
  startDate: string;
  endDate?: string;
  timeSlot: string; // vd: 08:00 - 11:00 (Thứ 7 & Chủ Nhật)
  totalSessions: number;
  location: string; // vd: Hội trường Trung tâm HTCĐ Xã Long Hồ
  targetAudience: string; // vd: Hội viên nông dân, bà con các ấp
  maxSeats: number;
  currentEnrolled: number;
  status: ScheduleStatus;
  feeInfo: string; // vd: Miễn phí 100% (Ngân sách Nhà nước hỗ trợ)
  description: string;
  curriculum: string[]; // Các chuyên đề bài học
  prerequisites?: string;
  registrations: RegistrationItem[];
}

export interface ClassProposalItem {
  id: string;
  fullName: string;
  phone: string;
  hamlet: string;
  proposedTopic: string;
  reason: string;
  dateSent: string;
}

export type UserRole = 'admin' | 'user';

export interface UserAccount {
  id: string;
  username: string; // Tên đăng nhập hoặc SĐT
  password?: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  email?: string;
  hamlet?: string; // Ấp cư trú (nếu là người dân)
  department?: string; // Đơn vị/Phòng ban (nếu là cán bộ admin)
  createdAt: string;
}

export type MeetingPlatform = 'google-meet' | 'zoom' | 'ms-teams' | 'truc-tiep';

export interface OnlineClassroom {
  id: string;
  title: string;
  platform: MeetingPlatform;
  meetingUrl: string;
  meetingId?: string;
  passcode?: string;
  instructor: string;
  instructorTitle?: string;
  category: string;
  date: string;
  time: string;
  locationDescription?: string;
  status: 'dang-dien-ra' | 'sap-dien-ra' | 'da-ket-thuc';
  targetAudience: string;
  description: string;
  attachedDocs?: { name: string; url?: string; size?: string }[];
  currentParticipants: number;
  maxParticipants?: number;
  replayVideoId?: string;
}

export interface InteractiveQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface VideoLecture {
  id: string;
  title: string;
  category: string;
  instructor: string;
  instructorTitle?: string;
  duration: string;
  views: number;
  datePosted: string;
  videoUrl: string;
  thumbnailUrl?: string;
  description: string;
  tags: string[];
  isInteractive: boolean;
  interactiveQuestions?: InteractiveQuizQuestion[];
  attachments?: { name: string; size: string; type: string }[];
  associatedClassroomId?: string;
}

export interface LearningProgress {
  completedLectureIds: string[];
  quizScores: Record<string, { score: number; total: number; passed: boolean; completedAt: string }>;
  lectureNotes: Record<string, string>;
}

export type AttendanceItemType = 'online-classroom' | 'video-lecture' | 'offline-class';
export type AttendanceStatus = 'tu-dong-ghi-nhan' | 'da-xac-nhan' | 'hoan-thanh';

export interface AttendanceRecord {
  id: string;
  studentName: string;
  studentPhone: string;
  hamlet: string; // Ấp (vd: Ấp Bình Thuận 1, Ấp An Hòa,...)
  userId?: string;
  itemType: AttendanceItemType;
  itemId: string;
  itemTitle: string;
  platform?: MeetingPlatform | 'truc-tiep' | 'video';
  instructor?: string;
  accessTime: string; // Định dạng ngày giờ: YYYY-MM-DD HH:mm:ss
  durationMinutes?: number;
  status: AttendanceStatus;
  device?: string; // Thiết bị: Điện thoại Android, iPhone/iOS, Máy tính
  ipOrLocation?: string;
  notes?: string;
}

export interface EarnedCertificate {
  id: string;
  title: string;
  issueDate: string;
  certNumber: string;
  courseCategory: string;
  score?: number;
}

export interface StudentProgressItem {
  id: string;
  studentName: string;
  studentPhone: string;
  hamlet: string;
  userId?: string;
  registeredDate: string;
  totalClassesAttended: number;
  totalLecturesCompleted: number;
  totalQuizzesPassed: number;
  averageScore: number;
  lastActive: string;
  completedLectureIds: string[];
  attendedClassIds: string[];
  certificatesEarned: EarnedCertificate[];
  notes?: string;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CourseExam {
  id: string;
  title: string;
  courseCode?: string;
  courseName: string;
  category: string;
  durationMinutes: number; // Thời gian làm bài (phút)
  passingScore: number; // Điểm đạt tối thiểu (thang điểm 100, ví dụ 70)
  totalQuestions: number;
  description: string;
  questions: ExamQuestion[];
  createdAt: string;
  isActive: boolean;
  instructor?: string;
}

export interface ExamSubmission {
  id: string;
  examId: string;
  examTitle: string;
  courseName: string;
  studentName: string;
  studentPhone: string;
  hamlet: string;
  userId?: string;
  selectedAnswers: Record<number, number>; // index câu hỏi -> index đáp án chọn
  score: number; // Thang 100
  correctCount: number;
  totalCount: number;
  isPassed: boolean;
  timeSpentSeconds: number;
  submittedAt: string;
  certificateCode?: string;
}

export type CompletionGrade = 'Xuất Sắc' | 'Giỏi' | 'Khá' | 'Đạt';

export interface CourseCompletion {
  id: string;
  studentName: string;
  studentPhone: string;
  hamlet: string;
  userId?: string;
  courseName: string;
  courseId?: string;
  examId: string;
  examTitle: string;
  finalScore: number;
  grade: CompletionGrade;
  completedDate: string;
  certificateCode: string;
  status: 'da-cap-chung-nhan' | 'cho-xac-nhan';
  issuedBy: string;
}

export type ActiveTab = 
  | 'tong-quan' 
  | 'tai-lieu' 
  | 'thong-bao' 
  | 'lich-hoc' 
  | 'hoc-truc-tuyen' 
  | 'quan-ly-hoc-tap' 
  | 'danh-gia-ket-qua'
  | 'gioi-thieu';
