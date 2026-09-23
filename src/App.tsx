import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { OverviewTab } from './components/OverviewTab';
import { DocumentManager } from './components/DocumentManager';
import { AnnouncementManager } from './components/AnnouncementManager';
import { ScheduleManager } from './components/ScheduleManager';
import { CenterInfo } from './components/CenterInfo';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { DataBackupModal } from './components/DataBackupModal';
import { AuthModal } from './components/AuthModal';
import { UserManagementModal } from './components/UserManagementModal';
import { OnlineLearningManager } from './components/OnlineLearningManager';
import { LearningManagement } from './components/LearningManagement';
import { AssessmentAndResults } from './components/AssessmentAndResults';
import { Footer } from './components/Footer';

import { 
  DocumentItem, 
  AnnouncementItem, 
  ClassScheduleItem, 
  ClassProposalItem, 
  ActiveTab,
  RegistrationItem,
  UserAccount,
  UserRole,
  OnlineClassroom,
  VideoLecture,
  AttendanceRecord,
  StudentProgressItem,
  CourseExam,
  ExamSubmission,
  CourseCompletion
} from './types';
import { 
  INITIAL_DOCUMENTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_SCHEDULES,
  INITIAL_ACCOUNTS,
  INITIAL_ONLINE_CLASSROOMS,
  INITIAL_VIDEO_LECTURES,
  INITIAL_ATTENDANCE_RECORDS,
  INITIAL_STUDENT_PROGRESS,
  INITIAL_COURSE_EXAMS,
  INITIAL_EXAM_SUBMISSIONS,
  INITIAL_COURSE_COMPLETIONS
} from './data/initialData';
import { CheckCircle2, AlertCircle, X, Lock } from 'lucide-react';

const STORAGE_KEYS = {
  DOCS: 'tt_htcd_long_ho_docs_v3',
  ANNOUNCEMENTS: 'tt_htcd_long_ho_announcements_v3',
  SCHEDULES: 'tt_htcd_long_ho_schedules_v3',
  PROPOSALS: 'tt_htcd_long_ho_proposals_v3',
  ACCOUNTS: 'tt_htcd_long_ho_accounts_v3',
  CURRENT_USER: 'tt_htcd_long_ho_current_user_v3',
  CLASSROOMS: 'tt_htcd_long_ho_classrooms_v3',
  VIDEO_LECTURES: 'tt_htcd_long_ho_video_lectures_v3',
  ATTENDANCE: 'tt_htcd_long_ho_attendance_v3',
  STUDENT_PROGRESS: 'tt_htcd_long_ho_progress_v3',
  EXAMS: 'tt_htcd_long_ho_course_exams_v3',
  EXAM_SUBMISSIONS: 'tt_htcd_long_ho_exam_submissions_v3',
  COMPLETIONS: 'tt_htcd_long_ho_course_completions_v3',
};

export default function App() {
  // Navigation & State
  const [activeTab, setActiveTab] = useState<ActiveTab>('tong-quan');
  const [largeFont, setLargeFont] = useState<boolean>(false);

  // User Accounts & Authentication State
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
    } catch {
      return INITIAL_ACCOUNTS;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Admin role is strictly derived from the authenticated account
  const isAdmin = currentUser?.role === 'admin';

  // Auth Modals State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [authPromptReason, setAuthPromptReason] = useState<string | null>(null);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);

  // Core Data with LocalStorage Persistence
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOCS);
      if (saved) {
        const parsed: DocumentItem[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((d) => d.id));
        const newInitials = INITIAL_DOCUMENTS.filter((d) => !existingIds.has(d.id));
        return newInitials.length > 0 ? [...newInitials, ...parsed] : parsed;
      }
      return INITIAL_DOCUMENTS;
    } catch {
      return INITIAL_DOCUMENTS;
    }
  });

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [schedules, setSchedules] = useState<ClassScheduleItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULES);
      if (saved) {
        const parsed: ClassScheduleItem[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((s) => s.id));
        const newInitials = INITIAL_SCHEDULES.filter((s) => !existingIds.has(s.id));
        return newInitials.length > 0 ? [...newInitials, ...parsed] : parsed;
      }
      return INITIAL_SCHEDULES;
    } catch {
      return INITIAL_SCHEDULES;
    }
  });

  const [proposals, setProposals] = useState<ClassProposalItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'prop-01',
          fullName: 'Nguyễn Văn Chín',
          phone: '0908.112.334',
          hamlet: 'Ấp Bình Thuận 1',
          proposedTopic: 'Kỹ thuật nuôi lươn không bùn bằng ống nhựa PVC',
          reason: 'Bà con trong ấp có nhiều người muốn tận dụng chuồng heo cũ để nuôi lươn tạo thu nhập',
          dateSent: '2026-03-21',
        },
        {
          id: 'prop-02',
          fullName: 'Bà Lê Thị Mai',
          phone: '0937.555.789',
          hamlet: 'Ấp Bình Đông',
          proposedTopic: 'Lớp dạy làm bánh dân gian Nam Bộ phục vụ lễ hội và bán online',
          reason: 'Chị em phụ nữ nông nhàn muốn có thêm nghề phụ',
          dateSent: '2026-03-22',
        }
      ];
    } catch {
      return [];
    }
  });

  // Online Classrooms State
  const [classrooms, setClassrooms] = useState<OnlineClassroom[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CLASSROOMS);
      if (saved) {
        const parsed: OnlineClassroom[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((c) => c.id));
        const newInitials = INITIAL_ONLINE_CLASSROOMS.filter((c) => !existingIds.has(c.id));
        return newInitials.length > 0 ? [...newInitials, ...parsed] : parsed;
      }
      return INITIAL_ONLINE_CLASSROOMS;
    } catch {
      return INITIAL_ONLINE_CLASSROOMS;
    }
  });

  // Video Lectures State
  const [videoLectures, setVideoLectures] = useState<VideoLecture[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIDEO_LECTURES);
      if (saved) {
        const parsed: VideoLecture[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((v) => v.id));
        const newInitials = INITIAL_VIDEO_LECTURES.filter((v) => !existingIds.has(v.id));
        return newInitials.length > 0 ? [...newInitials, ...parsed] : parsed;
      }
      return INITIAL_VIDEO_LECTURES;
    } catch {
      return INITIAL_VIDEO_LECTURES;
    }
  });

  // Attendance Records State
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
      if (saved) {
        const parsed: AttendanceRecord[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((a) => a.id));
        const newInitials = INITIAL_ATTENDANCE_RECORDS.filter((a) => !existingIds.has(a.id));
        return newInitials.length > 0 ? [...newInitials, ...parsed] : parsed;
      }
      return INITIAL_ATTENDANCE_RECORDS;
    } catch {
      return INITIAL_ATTENDANCE_RECORDS;
    }
  });

  // Student Progress State
  const [studentProgressList, setStudentProgressList] = useState<StudentProgressItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENT_PROGRESS);
      if (saved) {
        const parsed: StudentProgressItem[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((p) => p.id));
        const newInitials = INITIAL_STUDENT_PROGRESS.filter((p) => !existingIds.has(p.id));
        return newInitials.length > 0 ? [...newInitials, ...parsed] : parsed;
      }
      return INITIAL_STUDENT_PROGRESS;
    } catch {
      return INITIAL_STUDENT_PROGRESS;
    }
  });

  // Course Exams State
  const [exams, setExams] = useState<CourseExam[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXAMS);
      if (saved) {
        const parsed: CourseExam[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((e) => e.id));
        const newInitials = INITIAL_COURSE_EXAMS.filter((e) => !existingIds.has(e.id));
        return newInitials.length > 0 ? [...newInitials, ...parsed] : parsed;
      }
      return INITIAL_COURSE_EXAMS;
    } catch {
      return INITIAL_COURSE_EXAMS;
    }
  });

  // Exam Submissions State
  const [submissions, setSubmissions] = useState<ExamSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXAM_SUBMISSIONS);
      if (saved) {
        const parsed: ExamSubmission[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((s) => s.id));
        const newInitials = INITIAL_EXAM_SUBMISSIONS.filter((s) => !existingIds.has(s.id));
        return newInitials.length > 0 ? [...newInitials, ...parsed] : parsed;
      }
      return INITIAL_EXAM_SUBMISSIONS;
    } catch {
      return INITIAL_EXAM_SUBMISSIONS;
    }
  });

  // Course Completions State
  const [completions, setCompletions] = useState<CourseCompletion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETIONS);
      if (saved) {
        const parsed: CourseCompletion[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((c) => c.id));
        const newInitials = INITIAL_COURSE_COMPLETIONS.filter((c) => !existingIds.has(c.id));
        return newInitials.length > 0 ? [...newInitials, ...parsed] : parsed;
      }
      return INITIAL_COURSE_COMPLETIONS;
    } catch {
      return INITIAL_COURSE_COMPLETIONS;
    }
  });

  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null);
  const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(null);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
    } catch (e) {
      console.error(e);
    }
  }, [exams]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXAM_SUBMISSIONS, JSON.stringify(submissions));
    } catch (e) {
      console.error(e);
    }
  }, [submissions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETIONS, JSON.stringify(completions));
    } catch (e) {
      console.error(e);
    }
  }, [completions]);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendanceRecords));
    } catch (e) {
      console.error(e);
    }
  }, [attendanceRecords]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENT_PROGRESS, JSON.stringify(studentProgressList));
    } catch (e) {
      console.error(e);
    }
  }, [studentProgressList]);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CLASSROOMS, JSON.stringify(classrooms));
    } catch (e) {
      console.error(e);
    }
  }, [classrooms]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VIDEO_LECTURES, JSON.stringify(videoLectures));
    } catch (e) {
      console.error(e);
    }
  }, [videoLectures]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
    } catch (e) {
      console.error(e);
    }
  }, [accounts]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(documents));
    } catch (e) {
      console.error(e);
    }
  }, [documents]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch (e) {
      console.error(e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules));
    } catch (e) {
      console.error(e);
    }
  }, [schedules]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(proposals));
    } catch (e) {
      console.error(e);
    }
  }, [proposals]);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Authentication Handlers
  const handleOpenAuth = (mode: 'login' | 'register' = 'login', reason?: string) => {
    setAuthInitialMode(mode);
    setAuthPromptReason(reason || null);
    setIsAuthOpen(true);
  };

  const handleRequireAuth = (promptReason: string) => {
    handleOpenAuth('register', promptReason);
  };

  const handleLogin = (account: UserAccount) => {
    const updatedAccount = {
      ...account,
      lastLogin: new Date().toISOString().split('T')[0],
    };
    setCurrentUser(updatedAccount);
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === account.id ? updatedAccount : acc))
    );
    showToast(`Đăng nhập thành công! Kính chào ${account.fullName} (${account.role === 'admin' ? 'Quyền Quản trị viên' : 'Học viên / Người dân'}).`);
  };

  const handleRegister = (
    newAccountData: Omit<UserAccount, 'id' | 'createdAt'>
  ): { success: boolean; message: string; account?: UserAccount } => {
    const usernameClean = newAccountData.username.trim().toLowerCase();
    const phoneClean = newAccountData.phone?.replace(/\D/g, '');

    // Check existing username or phone
    const exists = accounts.some(
      (acc) =>
        acc.username.toLowerCase() === usernameClean ||
        (phoneClean && acc.phone && acc.phone.replace(/\D/g, '') === phoneClean)
    );

    if (exists) {
      return {
        success: false,
        message: 'Tên đăng nhập hoặc Số điện thoại này đã được đăng ký trong hệ thống!',
      };
    }

    const newAccount: UserAccount = {
      ...newAccountData,
      id: `acc-${Date.now()}`,
      username: usernameClean,
      createdAt: new Date().toISOString().split('T')[0],
      role: 'user', // Default registered users are regular users
    };

    setAccounts((prev) => [newAccount, ...prev]);
    showToast(`Đăng ký tài khoản thành công! Kính chào bà con ${newAccount.fullName}.`);
    return {
      success: true,
      message: 'Đăng ký tài khoản thành công!',
      account: newAccount,
    };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Đã đăng xuất tài khoản thành công.');
  };

  // Admin User Management Handlers
  const handleDeleteAccount = (id: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
    if (currentUser?.id === id) {
      setCurrentUser(null);
    }
    showToast('Đã xóa tài khoản khỏi hệ thống.');
  };

  const handleUpdateRole = (id: string, newRole: UserRole) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, role: newRole } : a))
    );
    if (currentUser?.id === id) {
      setCurrentUser((prev) => (prev ? { ...prev, role: newRole } : null));
    }
    showToast(`Đã cập nhật phân quyền tài khoản thành ${newRole === 'admin' ? 'Quản trị viên' : 'Người dùng'}.`);
  };

  const handleAddAccountByAdmin = (accData: Omit<UserAccount, 'id' | 'createdAt'>) => {
    const usernameClean = accData.username.trim().toLowerCase();
    const newAcc: UserAccount = {
      ...accData,
      id: `acc-${Date.now()}`,
      username: usernameClean,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAccounts((prev) => [newAcc, ...prev]);
    showToast(`Đã tạo tài khoản cho ${newAcc.fullName} thành công!`);
  };

  // Modals & Selection States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ClassScheduleItem | null>(null);
  const [registerTargetSchedule, setRegisterTargetSchedule] = useState<ClassScheduleItem | null>(null);

  // Document Handlers
  const handleAddDocument = (newDoc: Omit<DocumentItem, 'id' | 'views' | 'downloadsCount'>) => {
    const item: DocumentItem = {
      ...newDoc,
      id: `doc-${Date.now()}`,
      views: 1,
      downloadsCount: 0,
    };
    setDocuments((prev) => [item, ...prev]);
    showToast('Đã đưa tài liệu mới lên cổng thông tin thành công!');
  };

  const handleUpdateDocument = (updatedDoc: DocumentItem) => {
    setDocuments((prev) => prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d)));
    showToast('Đã cập nhật thông tin tài liệu!');
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    showToast('Đã xóa tài liệu khỏi hệ thống!');
  };

  const handleIncrementDownload = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, downloadsCount: d.downloadsCount + 1 } : d))
    );
  };

  // Announcement Handlers
  const handleAddAnnouncement = (newAnn: Omit<AnnouncementItem, 'id' | 'views'>) => {
    const item: AnnouncementItem = {
      ...newAnn,
      id: `ann-${Date.now()}`,
      views: 1,
    };
    setAnnouncements((prev) => [item, ...prev]);
    showToast('Đã đăng thông báo mới lên web!');
  };

  const handleUpdateAnnouncement = (updatedAnn: AnnouncementItem) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === updatedAnn.id ? updatedAnn : a)));
    showToast('Đã cập nhật nội dung thông báo!');
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    showToast('Đã xóa thông báo!');
  };

  // Schedule Handlers
  const handleAddSchedule = (
    newSch: Omit<ClassScheduleItem, 'id' | 'currentEnrolled' | 'registrations'>
  ) => {
    const item: ClassScheduleItem = {
      ...newSch,
      id: `sch-${Date.now()}`,
      currentEnrolled: 0,
      registrations: [],
    };
    setSchedules((prev) => [item, ...prev]);
    showToast('Đã đưa lịch học mới lên web!');
  };

  const handleUpdateSchedule = (updatedSch: ClassScheduleItem) => {
    setSchedules((prev) => prev.map((s) => (s.id === updatedSch.id ? updatedSch : s)));
    showToast('Đã cập nhật lịch học!');
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    showToast('Đã xóa lịch học!');
  };

  // Student Registration Handlers
  const handleRegisterStudent = (
    scheduleId: string,
    student: Omit<RegistrationItem, 'id' | 'scheduleId' | 'registrationDate' | 'status'>
  ) => {
    const regItem: RegistrationItem = {
      ...student,
      id: `reg-${Date.now()}`,
      scheduleId,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'cho-xac-nhan',
    };

    setSchedules((prev) =>
      prev.map((sch) => {
        if (sch.id === scheduleId) {
          return {
            ...sch,
            currentEnrolled: sch.currentEnrolled + 1,
            registrations: [regItem, ...sch.registrations],
          };
        }
        return sch;
      })
    );
    showToast('Đăng ký lớp học thành công! Cán bộ sẽ sớm liên hệ xác nhận.');
  };

  const handleDeleteRegistration = (scheduleId: string, regId: string) => {
    setSchedules((prev) =>
      prev.map((sch) => {
        if (sch.id === scheduleId) {
          return {
            ...sch,
            currentEnrolled: Math.max(0, sch.currentEnrolled - 1),
            registrations: sch.registrations.filter((r) => r.id !== regId),
          };
        }
        return sch;
      })
    );
    showToast('Đã xóa học viên khỏi danh sách lớp.');
  };

  const handleToggleRegistrationStatus = (scheduleId: string, regId: string) => {
    setSchedules((prev) =>
      prev.map((sch) => {
        if (sch.id === scheduleId) {
          return {
            ...sch,
            registrations: sch.registrations.map((r) =>
              r.id === regId
                ? {
                    ...r,
                    status: r.status === 'da-xac-nhan' ? 'cho-xac-nhan' : 'da-xac-nhan',
                  }
                : r
            ),
          };
        }
        return sch;
      })
    );
  };

  // Proposal Handlers
  const handleAddProposal = (newProp: Omit<ClassProposalItem, 'id' | 'dateSent'>) => {
    const item: ClassProposalItem = {
      ...newProp,
      id: `prop-${Date.now()}`,
      dateSent: new Date().toISOString().split('T')[0],
    };
    setProposals((prev) => [item, ...prev]);
    showToast('Đã gửi nguyện vọng mở lớp đến Ban Giám đốc!');
  };

  const handleDeleteProposal = (id: string) => {
    setProposals((prev) => prev.filter((p) => p.id !== id));
    showToast('Đã xóa đề xuất.');
  };

  // Online Classroom Handlers
  const handleAddClassroom = (newRoom: Omit<OnlineClassroom, 'id'>) => {
    const room: OnlineClassroom = {
      ...newRoom,
      id: `room-${Date.now()}`,
    };
    setClassrooms((prev) => [room, ...prev]);
    showToast(`Đã thiết lập phòng học "${room.title}" thành công!`);
  };

  const handleUpdateClassroom = (updated: OnlineClassroom) => {
    setClassrooms((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast('Đã cập nhật thông tin phòng học trực tuyến!');
  };

  const handleDeleteClassroom = (id: string) => {
    setClassrooms((prev) => prev.filter((c) => c.id !== id));
    showToast('Đã xóa phòng học trực tuyến.');
  };

  // Video Lecture Handlers
  const handleAddVideoLecture = (newVid: Omit<VideoLecture, 'id' | 'views' | 'datePosted'>) => {
    const vid: VideoLecture = {
      ...newVid,
      id: `video-${Date.now()}`,
      views: 0,
      datePosted: new Date().toISOString().split('T')[0],
    };
    setVideoLectures((prev) => [vid, ...prev]);
    showToast(`Đã đăng tải bài giảng video "${vid.title}" thành công!`);
  };

  const handleUpdateVideoLecture = (updated: VideoLecture) => {
    setVideoLectures((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
    showToast('Đã cập nhật bài giảng video thành công!');
  };

  const handleDeleteVideoLecture = (id: string) => {
    setVideoLectures((prev) => prev.filter((v) => v.id !== id));
    showToast('Đã xóa bài giảng video.');
  };

  // Attendance and Learning Tracking Handlers
  const handleRecordAttendance = (record: Omit<AttendanceRecord, 'id' | 'accessTime' | 'status'> & { status?: AttendanceRecord['status'] }) => {
    const newRecord: AttendanceRecord = {
      ...record,
      id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      accessTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: record.status || 'tu-dong-ghi-nhan'
    };

    setAttendanceRecords((prev) => [newRecord, ...prev]);

    // Automatically update or create student progress
    setStudentProgressList((prev) => {
      const existingIndex = prev.findIndex(
        (s) =>
          (record.userId && s.userId === record.userId) ||
          (record.studentPhone && s.studentPhone === record.studentPhone) ||
          s.studentName.toLowerCase() === record.studentName.toLowerCase()
      );

      const nowFormatted = new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().slice(0, 5);

      if (existingIndex >= 0) {
        const existing = prev[existingIndex];
        const updated: StudentProgressItem = {
          ...existing,
          lastActive: nowFormatted,
          totalClassesAttended:
            record.itemType === 'online-classroom' || record.itemType === 'offline-class'
              ? existing.totalClassesAttended + 1
              : existing.totalClassesAttended,
          totalLecturesCompleted:
            record.itemType === 'video-lecture' && !existing.completedLectureIds?.includes(record.itemId)
              ? existing.totalLecturesCompleted + 1
              : existing.totalLecturesCompleted,
          completedLectureIds:
            record.itemType === 'video-lecture' && !existing.completedLectureIds?.includes(record.itemId)
              ? [...(existing.completedLectureIds || []), record.itemId]
              : existing.completedLectureIds,
          attendedClassIds:
            (record.itemType === 'online-classroom' || record.itemType === 'offline-class') &&
            !existing.attendedClassIds?.includes(record.itemId)
              ? [...(existing.attendedClassIds || []), record.itemId]
              : existing.attendedClassIds,
        };
        const clone = [...prev];
        clone[existingIndex] = updated;
        return clone;
      } else {
        const newStudent: StudentProgressItem = {
          id: `prog-${Date.now()}`,
          studentName: record.studentName,
          studentPhone: record.studentPhone,
          hamlet: record.hamlet,
          userId: record.userId,
          registeredDate: new Date().toISOString().split('T')[0],
          totalClassesAttended: record.itemType === 'online-classroom' || record.itemType === 'offline-class' ? 1 : 0,
          totalLecturesCompleted: record.itemType === 'video-lecture' ? 1 : 0,
          totalQuizzesPassed: 0,
          averageScore: 90,
          lastActive: nowFormatted,
          completedLectureIds: record.itemType === 'video-lecture' ? [record.itemId] : [],
          attendedClassIds: record.itemType !== 'video-lecture' ? [record.itemId] : [],
          certificatesEarned: [],
        };
        return [newStudent, ...prev];
      }
    });

    showToast(`Hệ thống đã tự động ghi nhận điểm danh: ${record.studentName} tham gia "${record.itemTitle}"`);
  };

  const handleUpdateStudentProgress = (updated: StudentProgressItem) => {
    setStudentProgressList((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    showToast('Đã cập nhật hồ sơ tiến độ học tập của học viên!');
  };

  // Assessment & Exam Handlers
  const handleAddSubmission = (submission: Omit<ExamSubmission, 'id' | 'submittedAt'>) => {
    const newSub: ExamSubmission = {
      ...submission,
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setSubmissions((prev) => [newSub, ...prev]);
    showToast(`Đã lưu kết quả bài kiểm tra của học viên ${submission.studentName} (${submission.score} điểm)`);
  };

  const handleAddCompletion = (completion: Omit<CourseCompletion, 'id' | 'completedDate'>) => {
    const newComp: CourseCompletion = {
      ...completion,
      id: `comp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      completedDate: new Date().toISOString().split('T')[0]
    };
    setCompletions((prev) => [newComp, ...prev]);

    // Also update student progress certificates & quizzes passed
    setStudentProgressList((prev) => {
      const idx = prev.findIndex(
        (s) =>
          (completion.userId && s.userId === completion.userId) ||
          (completion.studentPhone && s.studentPhone === completion.studentPhone) ||
          s.studentName.toLowerCase() === completion.studentName.toLowerCase()
      );
      if (idx >= 0) {
        const existing = prev[idx];
        const newCert = {
          id: `cert-${Date.now()}`,
          title: completion.courseName,
          issueDate: newComp.completedDate,
          certNumber: completion.certificateCode,
          courseCategory: completion.examTitle,
          score: completion.finalScore
        };
        const updated: StudentProgressItem = {
          ...existing,
          totalQuizzesPassed: existing.totalQuizzesPassed + 1,
          certificatesEarned: [...existing.certificatesEarned, newCert]
        };
        const clone = [...prev];
        clone[idx] = updated;
        return clone;
      }
      return prev;
    });

    showToast(`Đã tổng hợp học viên ${completion.studentName} vào Danh sách hoàn thành khóa học & cấp Giấy chứng nhận!`);
  };

  const handleAddExam = (exam: Omit<CourseExam, 'id' | 'createdAt'>) => {
    const newExam: CourseExam = {
      ...exam,
      id: `exam-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setExams((prev) => [newExam, ...prev]);
    showToast('Đã xuất bản bài kiểm tra trắc nghiệm cuối khóa mới!');
  };

  // Backup & Reset Data Handlers
  const handleImportData = (data: {
    documents: DocumentItem[];
    announcements: AnnouncementItem[];
    schedules: ClassScheduleItem[];
    proposals?: ClassProposalItem[];
    accounts?: UserAccount[];
    attendance?: AttendanceRecord[];
    progress?: StudentProgressItem[];
    exams?: CourseExam[];
    submissions?: ExamSubmission[];
    completions?: CourseCompletion[];
  }) => {
    if (data.documents) setDocuments(data.documents);
    if (data.announcements) setAnnouncements(data.announcements);
    if (data.schedules) setSchedules(data.schedules);
    if (data.proposals) setProposals(data.proposals);
    if (data.accounts) setAccounts(data.accounts);
    if (data.attendance) setAttendanceRecords(data.attendance);
    if (data.progress) setStudentProgressList(data.progress);
    if (data.exams) setExams(data.exams);
    if (data.submissions) setSubmissions(data.submissions);
    if (data.completions) setCompletions(data.completions);
    showToast('Đã khôi phục dữ liệu từ tệp sao lưu thành công!');
  };

  const handleResetDefault = () => {
    setDocuments(INITIAL_DOCUMENTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setSchedules(INITIAL_SCHEDULES);
    setAccounts(INITIAL_ACCOUNTS);
    setClassrooms(INITIAL_ONLINE_CLASSROOMS);
    setVideoLectures(INITIAL_VIDEO_LECTURES);
    setAttendanceRecords(INITIAL_ATTENDANCE_RECORDS);
    setStudentProgressList(INITIAL_STUDENT_PROGRESS);
    setExams(INITIAL_COURSE_EXAMS);
    setSubmissions(INITIAL_EXAM_SUBMISSIONS);
    setCompletions(INITIAL_COURSE_COMPLETIONS);
    setProposals([]);
    showToast('Đã khôi phục dữ liệu chuẩn mẫu của Xã Long Hồ!');
  };

  const hasLiveClass = classrooms.some((c) => c.status === 'dang-dien-ra');

  return (
    <div className={`min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-blue-200 ${largeFont ? 'text-base' : 'text-sm'}`}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-stone-700 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenUserManagement={() => setIsUserManagementOpen(true)}
        accountsCount={accounts.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        unreadCount={announcements.filter((a) => a.isPinned).length}
        largeFont={largeFont}
        setLargeFont={setLargeFont}
        hasLiveClass={hasLiveClass}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {activeTab === 'tong-quan' && (
          <OverviewTab
            documents={documents}
            announcements={announcements}
            schedules={schedules}
            isAdmin={isAdmin}
            currentUser={currentUser}
            onRequireAuth={handleRequireAuth}
            setActiveTab={setActiveTab}
            onOpenAddDoc={() => {
              setActiveTab('tai-lieu');
              setTimeout(() => {
                const btn = document.getElementById('btn-upload-document');
                if (btn) btn.click();
              }, 100);
            }}
            onOpenAddAnnouncement={() => {
              setActiveTab('thong-bao');
              setTimeout(() => {
                const btn = document.getElementById('btn-post-announcement');
                if (btn) btn.click();
              }, 100);
            }}
            onOpenAddSchedule={() => {
              setActiveTab('lich-hoc');
              setTimeout(() => {
                const btn = document.getElementById('btn-add-schedule');
                if (btn) btn.click();
              }, 100);
            }}
            onSelectDoc={(doc) => {
              setSelectedDoc(doc);
              setActiveTab('tai-lieu');
            }}
            onSelectAnnouncement={(ann) => {
              setSelectedAnnouncement(ann);
              setActiveTab('thong-bao');
            }}
            onSelectSchedule={(sch) => {
              setSelectedSchedule(sch);
              setActiveTab('lich-hoc');
            }}
            onRegisterSchedule={(sch) => {
              setRegisterTargetSchedule(sch);
              setActiveTab('lich-hoc');
            }}
          />
        )}

        {activeTab === 'tai-lieu' && (
          <DocumentManager
            documents={documents}
            isAdmin={isAdmin}
            currentUser={currentUser}
            onRequireAuth={handleRequireAuth}
            onAddDocument={handleAddDocument}
            onUpdateDocument={handleUpdateDocument}
            onDeleteDocument={handleDeleteDocument}
            selectedDoc={selectedDoc}
            setSelectedDoc={setSelectedDoc}
            onIncrementDownload={handleIncrementDownload}
          />
        )}

        {activeTab === 'thong-bao' && (
          <AnnouncementManager
            announcements={announcements}
            isAdmin={isAdmin}
            onAddAnnouncement={handleAddAnnouncement}
            onUpdateAnnouncement={handleUpdateAnnouncement}
            onDeleteAnnouncement={handleDeleteAnnouncement}
            selectedAnnouncement={selectedAnnouncement}
            setSelectedAnnouncement={setSelectedAnnouncement}
          />
        )}

        {activeTab === 'lich-hoc' && (
          <ScheduleManager
            schedules={schedules}
            isAdmin={isAdmin}
            currentUser={currentUser}
            onRequireAuth={handleRequireAuth}
            onAddSchedule={handleAddSchedule}
            onUpdateSchedule={handleUpdateSchedule}
            onDeleteSchedule={handleDeleteSchedule}
            onRegisterStudent={handleRegisterStudent}
            onDeleteRegistration={handleDeleteRegistration}
            onToggleRegistrationStatus={handleToggleRegistrationStatus}
            selectedSchedule={selectedSchedule}
            setSelectedSchedule={setSelectedSchedule}
            registerTargetSchedule={registerTargetSchedule}
            setRegisterTargetSchedule={setRegisterTargetSchedule}
          />
        )}

        {activeTab === 'hoc-truc-tuyen' && (
          <OnlineLearningManager
            classrooms={classrooms}
            videoLectures={videoLectures}
            isAdmin={isAdmin}
            currentUser={currentUser}
            onRequireAuth={handleRequireAuth}
            onAddClassroom={handleAddClassroom}
            onUpdateClassroom={handleUpdateClassroom}
            onDeleteClassroom={handleDeleteClassroom}
            onAddVideoLecture={handleAddVideoLecture}
            onUpdateVideoLecture={handleUpdateVideoLecture}
            onDeleteVideoLecture={handleDeleteVideoLecture}
            initialSelectedVideoId={selectedLectureId}
            initialSelectedRoomId={selectedClassroomId}
            onRecordAttendance={handleRecordAttendance}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'quan-ly-hoc-tap' && (
          <LearningManagement
            attendanceRecords={attendanceRecords}
            studentProgressList={studentProgressList}
            classrooms={classrooms}
            videoLectures={videoLectures}
            schedules={schedules}
            currentUser={currentUser}
            isAdmin={isAdmin}
            onRecordAttendance={handleRecordAttendance}
            onUpdateStudentProgress={handleUpdateStudentProgress}
            onRequireAuth={handleRequireAuth}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'danh-gia-ket-qua' && (
          <AssessmentAndResults
            exams={exams}
            submissions={submissions}
            completions={completions}
            currentUser={currentUser}
            isAdmin={isAdmin}
            onAddSubmission={handleAddSubmission}
            onAddCompletion={handleAddCompletion}
            onAddExam={handleAddExam}
            onRequireAuth={handleRequireAuth}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'gioi-thieu' && (
          <CenterInfo
            proposals={proposals}
            onAddProposal={handleAddProposal}
            onDeleteProposal={handleDeleteProposal}
            isAdmin={isAdmin}
          />
        )}
      </main>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        documents={documents}
        announcements={announcements}
        schedules={schedules}
        onSelectDoc={setSelectedDoc}
        onSelectAnnouncement={setSelectedAnnouncement}
        onSelectSchedule={setSelectedSchedule}
        setActiveTab={setActiveTab}
      />

      {/* Authentication Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        initialMode={authInitialMode}
        promptReason={authPromptReason}
      />

      {/* Admin User Management Modal */}
      <UserManagementModal
        isOpen={isUserManagementOpen}
        onClose={() => setIsUserManagementOpen(false)}
        accounts={accounts}
        currentUser={currentUser}
        onDeleteAccount={handleDeleteAccount}
        onUpdateRole={handleUpdateRole}
        onAddAccount={handleAddAccountByAdmin}
      />

      {/* Data Backup & Restore Modal */}
      <DataBackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
        documents={documents}
        announcements={announcements}
        schedules={schedules}
        proposals={proposals}
        onImportData={handleImportData}
        onResetDefault={handleResetDefault}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBackup={() => setIsBackupOpen(true)}
        isAdmin={isAdmin}
      />
    </div>
  );
}
