import { 
  DocumentItem, 
  AnnouncementItem, 
  ClassScheduleItem, 
  UserAccount,
  OnlineClassroom,
  VideoLecture,
  AttendanceRecord,
  StudentProgressItem,
  CourseExam,
  ExamSubmission,
  CourseCompletion
} from '../types';

export const HAMLETS = [
  'Ấp Bình Thuận 1',
  'Ấp Bình Thuận 2',
  'Ấp An Hòa',
  'Ấp An Lợi',
  'Ấp An Thạnh',
  'Ấp An Phú',
  'Ấp An Long',
  'Ấp Bình Đông',
  'Ấp Bình Tây',
  'Ấp Bình Hòa',
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-oneai-2026',
    title: 'Tài liệu Hướng dẫn Thực hành Phần mềm Trí tuệ Nhân tạo OneAI cho Cán bộ Xã',
    code: 'HD-ONEAI-2026',
    category: 'chuyen-doi-so',
    categoryLabel: 'Kỹ năng số & Ứng dụng AI',
    description: 'Tài liệu bài giảng và cẩm nang hướng dẫn thao tác phần mềm OneAI: tổng hợp các mẫu câu lệnh prompt chuẩn để soạn thảo công văn, tóm tắt báo cáo hành chính, tra cứu chính sách và chuyển đổi số cấp xã.',
    contentSummary: 'Tài liệu phục vụ tập huấn theo Giấy mời 202/GM-UBND và Kế hoạch 200/KH-UBND ngày 29/7/2026 của UBND Xã Long Hồ. Hướng dẫn chi tiết 4 nhóm tác vụ hành chính, mẹo prompt chuẩn xác và quy tắc bảo mật dữ liệu công vụ.',
    issuedBy: 'Ủy ban nhân dân Xã Long Hồ & Ban Chỉ đạo 57',
    dateIssued: '2026-09-15',
    fileType: 'pdf',
    fileName: 'HD-OneAI-Can-bo-Cong-chuc-Long-Ho-2026.pdf',
    fileSize: '3.2 MB',
    tags: ['OneAI', 'Trí tuệ nhân tạo', 'Chuyển đổi số', 'Soạn thảo văn bản', 'Ban chỉ đạo 57', 'Cán bộ ấp'],
    isFeatured: false,
    views: 890,
    downloadsCount: 342,
    fullTextContent: `TÀI LIỆU HƯỚNG DẪN THỰC HÀNH PHẦN MỀM TRÍ TUỆ NHÂN TẠO ONEAI
DÀNH CHO CÁN BỘ, CÔNG CHỨC VÀ NGƯỜI HOẠT ĐỘNG KHÔNG CHUYÊN TRÁCH XÃ LONG HỒ
(Ban hành kèm theo Kế hoạch số 200/KH-UBND và phục vụ Giấy mời số 202/GM-UBND ngày 15/09/2026)

I. TỔNG QUAN VỀ PHẦN MỀM ONEAI:
- OneAI là nền tảng trí tuệ nhân tạo chuyên biệt phục vụ công tác điều hành, quản trị công và hỗ trợ cán bộ cấp cơ sở tối ưu hóa quy trình nghiệp vụ.
- Hỗ trợ phân quyền chặt chẽ theo chức năng của từng bộ phận: Văn phòng Thống kê, Địa chính Nông nghiệp, Văn hóa Xã hội, Tư pháp Hộ tịch, Công an, Quân sự và Ban nhân dân 10 ấp.

II. BỘ MẪU CÂU LỆNH (PROMPT) CHUẨN TRONG CÔNG TÁC HÀNH CHÍNH:
1. Soạn thảo Công văn / Thông báo:
   "Hãy soạn dự thảo Thông báo của UBND Xã Long Hồ gửi bà con nhân dân 10 ấp về việc [Nội dung công việc], yêu cầu văn phong chuẩn thể thức Nghị định 30/2020/NĐ-CP, ngắn gọn, dễ hiểu đối với người lớn tuổi."
2. Tóm tắt Báo cáo / Biên bản cuộc họp:
   "Hãy tóm tắt biên bản cuộc họp sau đây thành 03 ý chính: Kết quả đạt được, Các tồn tại cần tháo gỡ tại các ấp, Phân công nhiệm vụ cụ thể cho từng đồng chí."
3. Hỗ trợ giải thích Thủ tục Hành chính cho người dân:
   "Hãy giải thích quy trình đăng ký biến động đất đai hoặc thủ tục khai sinh - đăng ký thường trú theo ngôn ngữ mộc mạc, kèm danh sách giấy tờ bà con cần chuẩn bị trước khi đến Bộ phận Một cửa."

III. LƯU Ý BẢO MẬT VÀ AN TOÀN THÔNG TIN:
- Tuyệt đối không nhập thông tin bí mật nhà nước, hồ sơ mật hoặc dữ liệu cá nhân nhạy cảm lên hệ thống.
- Cán bộ luôn phải kiểm tra, rà soát lại văn bản trước khi trình ký ban hành chính thức.

CHỦ TỊCH ỦY BAN NHÂN DÂN XÃ LONG HỒ
(Phê duyệt triển khai)
Phan Thanh Hoàng`
  },
  {
    id: 'doc-cadimi-sau-rieng-2026',
    title: 'Sổ tay Kỹ thuật Canh tác Sầu riêng Hạn chế Dư lượng Kim loại nặng Cadimi',
    code: 'ST-CADIMI-2026',
    category: 'khuyen-nong',
    categoryLabel: 'Cẩm nang Bảo vệ thực vật',
    description: 'Cẩm nang kỹ thuật chuyển giao giải pháp bón vôi nâng độ pH của đất vườn, quản lý tầng nước ngầm và kiểm soát phân bón an toàn nhằm ngăn chặn tích tụ Cadimi trên sầu riêng xuất khẩu.',
    contentSummary: 'Tài liệu hướng dẫn kỹ thuật chuyên sâu theo Kế hoạch 860/KH-CCTT&BVTV của Chi cục Trồng trọt và Bảo vệ thực vật Vĩnh Long. Hướng dẫn chi tiết kỹ thuật nâng pH đất lên mức an toàn (6.0 - 6.5) và sử dụng bộ Kit test nhanh 500 mẫu đất.',
    issuedBy: 'Chi cục Trồng trọt và Bảo vệ thực vật Tỉnh Vĩnh Long',
    dateIssued: '2026-08-27',
    fileType: 'pdf',
    fileName: 'So-tay-ky-thuat-canh-tac-han-che-Cadimi-sau-rieng.pdf',
    fileSize: '4.1 MB',
    tags: ['Sầu riêng', 'Cadimi', 'Nâng pH đất', 'Mã số vùng trồng', 'IPHM', 'Xuất khẩu'],
    isFeatured: true,
    views: 745,
    downloadsCount: 280,
    fullTextContent: `SỔ TAY HƯỚNG DẪN KỸ THUẬT CANH TÁC HẠN CHẾ DƯ LƯỢNG KIM LOẠI NẶNG CADIMI
TRÊN CÂY SẦU RIÊNG TẠI TỈNH VĨNH LONG
(Biên soạn theo Kế hoạch số 860/KH-CCTT&BVTV ngày 27/08/2026 của Chi cục Trồng trọt và BVTV)

I. NGUYÊN NHÂN TỒN DƯ CADIMI VÀ TIÊU CHUẨN XUẤT KHẨU:
- Cadimi (Cd) là kim loại nặng độc hại đối với thận và xương người. Thị trường Trung Quốc (Lệnh 280) và các nước nhập khẩu kiểm soát nghiêm ngặt ngưỡng tối đa không quá 0.05 mg/kg đối với cơm sầu riêng tươi.
- Nguyên nhân chính gây hấp thu mạnh Cadimi:
  + Đất vườn bị chua hóa (pH đất dưới 5.0 khiến Cadimi chuyển sang dạng ion hòa tan, rễ cây hút nhanh vào trái).
  + Lạm dụng phân Lân nung chảy kém chất lượng, phân khoáng không rõ nguồn gốc chứa hàm lượng Cadimi cao.
  + Nước tưới nhiễm tạp chất hoặc phù sa lắng cặn từ vùng ô nhiễm.

II. BỘ GIẢI PHÁP KỸ THUẬT CANH TÁC AN TOÀN (IPHM):
1. Giải pháp cải tạo đất nâng pH:
   - Duy trì độ pH đất vườn ở mức tối ưu từ 6.0 – 6.5.
   - Bón định kỳ vôi nông nghiệp (CaCO3) hoặc vôi Dolomite: Lượng bón 500 – 1.000 kg/ha/năm chia làm 2 lần (đầu mùa mưa và sau khi thu hoạch).
   - Tuyệt đối không bón vôi cùng thời điểm với phân đạm hoặc phân hữu cơ (cách nhau tối thiểu 15 ngày).
2. Tăng cường phân hữu cơ vi sinh và Axit Humic:
   - Axit Humic và chất hữu cơ hoai mục giúp cố định ion Cadimi trong phức hệ keo đất, hạn chế rễ hút lên thân lá.
   - Bón 15 - 20 kg phân hữu cơ vi sinh ủ hoai/gốc/năm kết hợp tưới nấm đối kháng Trichoderma.
3. Kiểm soát phân bón vô cơ đầu vào:
   - Chỉ sử dụng các loại phân bón DAP, NPK cao cấp có chứng chỉ kiểm nghiệm dư lượng kim loại nặng đạt chuẩn QCVN.
   - Tránh các loại phân Lân giá rẻ không rõ nguồn gốc xuất xứ.

III. QUY TRÌNH SỬ DỤNG MÁY ĐO VÀ BỘ KIT TEST NHANH CADIMI:
- Lấy mẫu đất: Lấy 5 điểm chữ X trong tán cây ở độ sâu 10 - 20 cm, trộn đều lấy 200g.
- Thao tác nhanh với Kit test 500 mẫu: Nhỏ dung dịch chiết tách, lắc đều trong ống nghiệm 3 phút, so sánh dải màu đối chứng để nhận biết ngay mức độ an toàn trước khi thu hoạch.`
  },
  {
    id: 'doc-khuyen-nong-cd-2026',
    title: 'Sổ tay Nghiệp vụ Khuyến nông Cộng đồng: Xây dựng Mã số Vùng trồng & Truy xuất Nguồn gốc Nông sản',
    code: 'NV-KNCD-2026',
    category: 'khuyen-nong',
    categoryLabel: 'Nghiệp vụ Khuyến nông cơ sở',
    description: 'Tài liệu hướng dẫn nghiệp vụ hoạt động khuyến nông cơ sở: quy trình tư vấn thiết lập hồ sơ cấp mã số vùng trồng, hướng dẫn ghi chép nhật ký canh tác điện tử và liên kết chuỗi tiêu thụ sản phẩm.',
    contentSummary: 'Tài liệu bồi dưỡng nghiệp vụ cho thành viên Tổ Khuyến nông cộng đồng các ấp theo Kế hoạch số 09/KH-TTDVSNC ngày 07/08/2026. Hướng dẫn kỹ năng xây dựng kế hoạch, kỹ thuật tư vấn bà con và hồ sơ số hóa nông sản.',
    issuedBy: 'Trung tâm Dịch vụ sự nghiệp công Xã Long Hồ & TT Khuyến nông Vĩnh Long',
    dateIssued: '2026-08-07',
    fileType: 'pdf',
    fileName: 'So-tay-nghiep-vu-To-Khuyen-nong-cong-dong-Long-Ho.pdf',
    fileSize: '2.5 MB',
    tags: ['Khuyến nông cộng đồng', 'Mã số vùng trồng', 'Truy xuất nguồn gốc', 'Nhật ký canh tác', 'Long Hồ'],
    isFeatured: false,
    views: 620,
    downloadsCount: 215,
    fullTextContent: `SỔ TAY NGHIỆP VỤ HOẠT ĐỘNG CỦA TỔ KHUYẾN NÔNG CỘNG ĐỒNG
(Ban hành phục vụ Kế hoạch số 09/KH-TTDVSNC ngày 07/08/2026 của TT Dịch vụ sự nghiệp công Xã Long Hồ)

I. CHỨC NĂNG, NHIỆM VỤ CỦA TỔ KHUYẾN NÔNG CỘNG ĐỒNG:
1. Là cầu nối trực tiếp giữa cơ quan khuyến nông, viện trường, doanh nghiệp với từng hộ nông dân tại 10 ấp trên địa bàn Xã Long Hồ.
2. Tư vấn, hướng dẫn kỹ thuật trồng trọt (sầu riêng, chôm chôm, nhãn xuồng, cây có múi), chăn nuôi (dê, gia cầm an toàn sinh học) và thủy sản (nuôi ếch bể bạt, cá nước ngọt).
3. Hỗ trợ bà con chuyển giao ứng dụng công nghệ số, kinh tế số nông nghiệp và tổ chức liên kết sản xuất theo chuỗi giá trị.

II. HƯỚNG DẪN THỦ TỤC THIẾT LẬP MÃ SỐ VÙNG TRỒNG (MSVT):
1. Điều kiện cấp MSVT xuất khẩu:
   - Diện tích tối thiểu: Liền vùng từ 10 ha trở lên (đối với sầu riêng, mít, chuối xuất khẩu).
   - Áp dụng quy trình thực hành nông nghiệp tốt (VietGAP hoặc tương đương).
   - Có sổ nhật ký canh tác ghi chép rõ ràng ngày bón phân, phun thuốc, thời gian cách ly (PHI).
2. Các bước lập hồ sơ:
   - Bước 1: Thu thập bản đồ giải thửa hoặc tọa độ GPS ranh giới vùng trồng của từng hộ.
   - Bước 2: Danh sách các hộ tham gia (Họ tên, CCCD, diện tích, sản lượng ước tính).
   - Bước 3: Nộp hồ sơ về Chi cục Trồng trọt và BVTV tỉnh để tổ chức thẩm định thực địa.

III. KỸ NĂNG TƯ VẤN VÀ VẬN ĐỘNG NÔNG DÂN:
- Phương châm "Cầm tay chỉ việc", "Mắt thấy tai nghe": Không chỉ nói lý thuyết, hướng dẫn trực tiếp tại vườn/chuồng của hộ nông dân.
- Thành lập các nhóm Zalo khuyến nông từng ấp để trao đổi thông tin cảnh báo dịch hại và giá cả nông sản hằng ngày.`
  },
  {
    id: 'doc-nuoi-de-2026',
    title: 'Cẩm nang Kỹ thuật Chăn nuôi Dê An Toàn Sinh Học & Hướng dẫn Kê khai Đàn trực tuyến',
    code: 'CN-DE-2026',
    category: 'dao-tao-nghe',
    categoryLabel: 'Cẩm nang Chăn nuôi - Thú y',
    description: 'Tài liệu hướng dẫn quy chuẩn chuồng sàn cao ráo, kỹ thuật ủ chua phụ phẩm cỏ voi bổ sung khoáng liếm, phác đồ phòng trị bệnh tiêu hóa ở dê và các bước kê khai chăn nuôi trên Hệ thống CSDL quốc gia.',
    contentSummary: 'Tài liệu hướng dẫn thực hành theo Kế hoạch 10/KH-TTDVSNC và Kế hoạch 43/KH-CCCN&TY của Chi cục Chăn nuôi Thú y Vĩnh Long. Giúp bà con nuôi dê thương phẩm và dê sinh sản đạt hiệu quả kinh tế cao.',
    issuedBy: 'Trung tâm Dịch vụ sự nghiệp công Xã Long Hồ & Chi hội Chăn nuôi Dê',
    dateIssued: '2026-08-24',
    fileType: 'pdf',
    fileName: 'Cam-nang-ky-thuat-nuoi-de-va-ke-khai-truy-xuat.pdf',
    fileSize: '2.3 MB',
    tags: ['Nuôi dê', 'Chuồng sàn', 'Thức ăn ủ chua', 'Kê khai chăn nuôi', 'CSDL Quốc gia', 'Long Hồ'],
    isFeatured: true,
    views: 580,
    downloadsCount: 195,
    fullTextContent: `CẨM NANG KỸ THUẬT CHĂN NUÔI DÊ AN TOÀN SINH HỌC & HƯỚNG DẪN KÊ KHAI HOẠT ĐỘNG CHĂN NUÔI
(Tài liệu phục vụ Kế hoạch số 10/KH-TTDVSNC ngày 24/08/2026 của TT Dịch vụ sự nghiệp công Xã Long Hồ)

I. KỸ THUẬT LÀM CHUỒNG TRẠI NUÔI DÊ:
1. Quy chuẩn chuồng sàn cao:
   - Sàn chuồng cách mặt đất 0.8 – 1.0 m để đảm bảo thông thoáng, dễ quét dọn phân và nước tiểu.
   - Sàn chuồng dùng thanh gỗ phẳng hoặc tre già có khe hở 1.5 cm (vừa đủ để phân lọt xuống nhưng không kẹp chân dê).
   - Hướng chuồng: Quay về hướng Đông Nam để đón gió mát mùa khô và ấm áp mùa lạnh.
2. Vệ sinh tiêu độc khử trùng:
   - Rắc vôi bột định kỳ dưới gầm chuồng 1 lần/tuần.
   - Phun sát trùng chuồng trại bằng Benkocid hoặc Iodine 2 tuần/lần.

II. DINH DƯỠNG VÀ KỸ THUẬT Ủ CHUA THỨC ĂN:
1. Khẩu phần thức ăn:
   - Dê là loài nhai lại, thức ăn thô xanh (cỏ voi, lá mít, lá keo dậu, đọt mía) chiếm 70 - 80% khẩu phần.
   - Thức ăn tinh (cám bắp, cám gạo): Bổ sung 0.3 - 0.5 kg/con/ngày trong giai đoạn vỗ béo hoặc mang thai.
   - Bắt buộc treo tảng đá liếm khoáng trong chuồng để bổ sung Canxi, Phốt pho, hạn chế dê cắn phá chuồng.
2. Kỹ thuật ủ chua cỏ voi với rỉ mật:
   - Cắt cỏ phơi tái (độ ẩm khoảng 65%), băm khúc 3 - 5 cm.
   - Trộn tỷ lệ: 100 kg cỏ + 3 kg rỉ mật đường + 0.5 kg muối ăn.
   - Nén thật chặt vào thùng phi hoặc túi ủ nilông dày, buộc kín miệng. Sau 21 ngày có thể lấy cho dê ăn (thơm mùi men rượu, chua nhẹ).

III. QUY TRÌNH KÊ KHAI CHĂN NUÔI TRÊN PHẦN MỀM CSDL QUỐC GIA:
1. Căn cứ Luật Chăn nuôi năm 2018: Mọi tổ chức, cá nhân chăn nuôi từ 01 con dê trở lên phải thực hiện kê khai theo định kỳ (đầu năm và giữa năm).
2. Các bước kê khai qua điện thoại thông minh:
   - Bước 1: Đăng nhập Cổng dịch vụ công hoặc Hệ thống quản lý chăn nuôi bằng tài khoản VNeID.
   - Bước 2: Chọn mục "Kê khai hoạt động chăn nuôi nông hộ".
   - Bước 3: Nhập số lượng đàn dê (Dê thịt, Dê cái sinh sản, Dê đực giống), địa chỉ chuồng trại tại ấp.
   - Bước 4: Nhấn nộp hồ sơ để cán bộ Thú y xã xác nhận điện tử.`
  },
  {
    id: 'doc-nuoi-ech-2026',
    title: 'Giáo trình Kỹ thuật Nuôi Ếch Thương phẩm trong Bể Bạt & Nuôi Ếch Sinh sản Tạo Sinh kế',
    code: 'GT-ECH-2026',
    category: 'dao-tao-nghe',
    categoryLabel: 'Giáo trình Nuôi trồng thủy sản',
    description: 'Cẩm nang thực hành kỹ thuật xây dựng bể bạt nilông, chọn giống ếch Thái Lan, chế độ dinh dưỡng thức ăn viên và phác đồ điều trị các bệnh thường gặp (đỏ chân, sưng chướng bụng).',
    contentSummary: 'Tài liệu hướng dẫn kỹ thuật nuôi ếch theo Kế hoạch 04/KH-TTDVSNC ngày 19/06/2026 do chuyên gia Phòng Khuyến nông Chăn nuôi và Thủy sản Vĩnh Long biên soạn.',
    issuedBy: 'Trung tâm Dịch vụ sự nghiệp công Xã Long Hồ & TT Khuyến nông Vĩnh Long',
    dateIssued: '2026-06-19',
    fileType: 'pdf',
    fileName: 'Giao-trinh-ky-thuat-nuoi-ech-be-bat-Long-Ho.pdf',
    fileSize: '1.9 MB',
    tags: ['Nuôi ếch bể bạt', 'Ếch giống', 'Mô hình sinh kế', 'Phòng trị bệnh', 'Thủy sản', 'Long Hồ'],
    isFeatured: false,
    views: 690,
    downloadsCount: 245,
    fullTextContent: `GIÁO TRÌNH KỸ THUẬT NUÔI ẾCH THƯƠNG PHẨM TRONG BỂ BẠT VÀ NUÔI ẾCH SINH SẢN
(Tài liệu đào tạo mô hình sinh kế theo Kế hoạch số 04/KH-TTDVSNC ngày 19/06/2026 của TT DVSNC Xã Long Hồ)

I. ĐẶC ĐIỂM SINH HỌC VÀ CHUẨN BỊ BỂ BẠT NUÔI ẾCH:
1. Thiết kế bể bạt:
   - Kích thước thông dụng: Rộng 3 - 4m, Dài 5 - 8m, Thành cao 1.0 - 1.2m. Bạt nilông màu đen hoặc xanh có tráng chống tia UV.
   - Đáy bể tạo độ dốc thoai thoải 5% về phía rốn xả nước để thuận tiện thay rửa vệ sinh hằng ngày.
   - Đặt các tấm xốp, vỉ tre hoặc bè gỗ nổi chiếm 1/2 diện tích mặt nước làm nơi cho ếch nghỉ ngơi và ăn mồi.
   - Mực nước trong bể: Giữ ở mức 15 – 25 cm (vừa ngập 2/3 thân ếch khi ngồi).
2. Nguồn nước nuôi:
   - Nước máy hoặc nước giếng khoan lắng qua phèn. Nước sông phải qua túi lọc lắng cặn và khử khuẩn bằng Chlorine/Iodine trước khi cấp vào bể.

II. KỸ THUẬT CHĂM SÓC VÀ KHẨU PHẦN THỨC ĂN:
1. Chọn giống và thả giống:
   - Chọn giống ếch Thái Lan thuần, đồng đều kích cỡ, da bóng bẩy, nhanh nhẹn, không cụt ngón.
   - Mật độ thả: Tháng thứ nhất thả 100 - 120 con/m2; Từ tháng thứ hai phân cỡ và tách thưa dần còn 60 - 80 con/m2.
2. Cho ăn:
   - Sử dụng thức ăn viên công nghiệp dạng nổi chuyên dụng cho ếch:
     + Giai đoạn ếch con: Hàm lượng đạm 35 - 40%.
     + Giai đoạn vỗ béo thương phẩm: Hàm lượng đạm 28 - 30%.
   - Định kỳ bổ sung Men tiêu hóa và Vitamin C vào thức ăn (trộn với dầu mực để bao màng) giúp tăng đề kháng, chống stress khi trời nắng gắt hoặc mưa đột ngột.

III. PHÒNG VÀ ĐIỀU TRỊ BỆNH THƯỜNG GẶP TRÊN ẾCH:
1. Bệnh chướng bụng, sình hơi đường ruột:
   - Triệu chứng: Ếch bơi lờ đờ, bụng phình to chứa đầy hơi hoặc dịch nước, lười ăn.
   - Trị bệnh: Giảm 50% khẩu phần ăn, trộn kháng sinh Florfenicol hoặc Enrofloxacin kèm men vi sinh liên tục 3 - 5 ngày.
2. Bệnh đỏ chân, lở loét da:
   - Triệu chứng: Đùi và bàn chân ếch ửng đỏ, xuất huyết dưới da, có vết loét lở.
   - Trị bệnh: Thay 100% nước bể nuôi, tắm ếch bằng dung dịch muối ăn 2 - 3% hoặc Oxytetracycline trong 15 phút.`
  },
  {
    id: 'doc-01',
    title: 'Sổ tay hướng dẫn Kỹ thuật chăm sóc Sầu riêng giai đoạn làm bông và đậu trái',
    code: '05/HD-TTHTCĐ-KN',
    category: 'khuyen-nong',
    categoryLabel: 'Khuyến nông - Trồng trọt',
    description: 'Tài liệu hướng dẫn quy trình siết nước, bón phân đón hoa, phòng trừ bệnh nấm thán thư và nứt thân xì mủ trên sầu riêng.',
    contentSummary: 'Quy trình chi tiết 5 bước từ dọn vườn tỉa cành, xử lý hóa chất an toàn sinh học, quản lý nước tưới và chế độ phân bón vi lượng cân đối.',
    issuedBy: 'Trạm Trồng trọt & Bảo vệ Thực vật phối hợp TT HTCĐ Xã Long Hồ',
    dateIssued: '2026-03-15',
    fileType: 'pdf',
    fileName: 'So-tay-ky-thuat-sau-rieng-Long-Ho-2026.pdf',
    fileSize: '3.8 MB',
    tags: ['Sầu riêng', 'Khuyến nông', 'Bảo vệ thực vật', 'Bón phân'],
    isFeatured: true,
    views: 428,
    downloadsCount: 156,
    fullTextContent: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc

TRUNG TÂM HỌC TẬP CỘNG ĐỒNG XÃ LONG HỒ
TỔ BÁO CÁO VIÊN KHUYẾN NÔNG

TÀI LIỆU TẬP HUẤN NÔNG DÂN NĂM 2026
Chuyên đề: Quy trình kỹ thuật chăm sóc cây Sầu riêng vụ nghịch đạt năng suất cao

1. Giai đoạn tạo mầm hoa:
- Cắt tỉa cành tăm, cành sâu bệnh bên trong tán.
- Bón phân có hàm lượng Lân và Kali cao (ví dụ: NPK 10-60-10 hoặc 10-52-17) qua lá và gốc.
- Tiến hành tạo khô hạn (siết nước) từ 20 - 25 ngày tùy tình hình thời tiết tại Xã Long Hồ.

2. Giai đoạn mắt cua và ra hoa:
- Nhấp nước nhẹ khi mắt cua sáng rõ dài từ 2 - 3 cm.
- Phòng trừ bọ trĩ và rầy phấn trắng bằng các chế phẩm sinh học an toàn.
- Bổ sung Bo và Canxi hữu cơ giúp hạt phấn khỏe, tăng tỷ lệ thụ phấn.

3. Giai đoạn nuôi trái non:
- Tỉa bớt trái non dị tật, chùm quá dày chỉ giữ từ 2-3 trái/chùm.
- Quản lý sâu đục trái và nấm phytophthora gây thối trái.
- Hotline khuyến nông Xã Long Hồ hỗ trợ tư vấn: 0270.3891.xxx`
  },
  {
    id: 'doc-02',
    title: 'Cẩm nang Kỹ năng số cho Nông dân: Nộp hồ sơ dịch vụ công & Cài đặt VNeID mức độ 2',
    code: '12/TL-CĐS-AB',
    category: 'chuyen-doi-so',
    categoryLabel: 'Chuyển đổi số & Kỹ năng số',
    description: 'Tài liệu hướng dẫn trực quan từng bước giúp bà con nhân dân tự nộp thủ tục hành chính trực tuyến tại Cổng Dịch vụ công Xã Long Hồ và sử dụng ví giấy tờ điện tử.',
    contentSummary: 'Hướng dẫn đăng ký tài khoản Cổng DVC Quốc gia, tra cứu mã định danh cá nhân, nộp hồ sơ xin cấp bản sao khai sinh, chứng thực điện tử và cảnh giác lừa đảo qua mạng.',
    issuedBy: 'Tổ Công nghệ số Cộng đồng Xã Long Hồ',
    dateIssued: '2026-02-28',
    fileType: 'pdf',
    fileName: 'Cam-nang-chuyen-doi-so-xa-Long-Ho.pdf',
    fileSize: '5.2 MB',
    tags: ['VNeID', 'Dịch vụ công', 'Chuyển đổi số', 'Tổ CNSCĐ'],
    isFeatured: true,
    views: 615,
    downloadsCount: 230,
    fullTextContent: `HƯỚNG DẪN BÀ CON SỬ DỤNG DỊCH VỤ CÔNG TRỰC TUYẾN TẠI XÃ LONG HỒ

I. LỢI ÍCH KHI SỬ DỤNG DỊCH VỤ CÔNG TRỰC TUYẾN:
- Bà con không phải chờ đợi lâu tại Bộ phận Một cửa UBND Xã.
- Có thể nộp hồ sơ bất kỳ lúc nào ngay trên điện thoại thông minh.
- Được theo dõi tiến độ giải quyết hồ sơ qua tin nhắn SMS và ứng dụng VNeID.

II. CÁC BƯỚC THỰC HIỆN:
Bước 1: Truy cập https://dichvucong.gov.vn hoặc mở ứng dụng VNeID (đã kích hoạt mức 2).
Bước 2: Chọn mục "Nộp hồ sơ trực tuyến", tìm kiếm dịch vụ cần làm (Ví dụ: Đăng ký khai sinh, Trích lục hộ tịch, Đăng ký kết hôn...).
Bước 3: Điền thông tin theo mẫu và chụp ảnh giấy tờ gốc đính kèm rõ nét.
Bước 4: Chọn nhận kết quả tại nhà qua bưu điện hoặc đến nhận trực tiếp tại UBND Xã Long Hồ.

* Lưu ý phòng tránh lừa đảo: Cán bộ Công an và UBND Xã KHÔNG BAO GIỜ yêu cầu người dân đọc mã OTP ngân hàng hoặc chuyển tiền phí kích hoạt VNeID!`
  },
  {
    id: 'doc-03',
    title: 'Hỏi đáp Pháp luật về Thừa kế, Chuyển nhượng Quyền sử dụng Đất nông nghiệp mới nhất',
    code: '08/PL-UBND',
    category: 'phap-luat',
    categoryLabel: 'Pháp luật & Chính sách',
    description: 'Tổng hợp các quy định pháp luật thiết thực cho người dân xã về Luật Đất đai, điều kiện tách thửa đất trồng cây lâu năm, chuyển đổi mục đích sử dụng đất.',
    contentSummary: 'Giải đáp 30 câu hỏi thường gặp của hộ gia đình về thủ tục cấp đổi sổ đỏ, tặng cho quyền sử dụng đất cho con cái, các loại thuế phí được miễn giảm tại địa phương.',
    issuedBy: 'Hội đồng Phổ biến Giáo dục Pháp luật Xã Long Hồ',
    dateIssued: '2026-01-20',
    fileType: 'docx',
    fileName: 'Hoi-dap-phap-luat-dat-dai-xa-Long-Ho.docx',
    fileSize: '1.4 MB',
    tags: ['Đất đai', 'Thừa kế', 'Pháp luật', 'Tư pháp xã'],
    isFeatured: false,
    views: 380,
    downloadsCount: 112,
    fullTextContent: `HỎI ĐÁP PHÁP LUẬT ĐẤT ĐAI DÀNH CHO CÔNG DÂN XÃ LONG HỒ

Câu 1: Hộ gia đình muốn tặng cho quyền sử dụng đất nông nghiệp cho con cái cần những giấy tờ gì?
Trả lời: Cần có:
1. Giấy chứng nhận quyền sử dụng đất (Sổ hồng/Sổ đỏ bản gốc).
2. Căn cước công dân của bên tặng cho và bên nhận tặng cho.
3. Hợp đồng tặng cho có công chứng hoặc chứng thực tại UBND Xã Long Hồ.
4. Tờ khai thuế thu nhập cá nhân và lệ phí trước bạ (thuộc diện miễn thuế giữa cha mẹ và con cái).

Câu 2: Diện tích tối thiểu để tách thửa đất nông nghiệp tại địa bàn tỉnh là bao nhiêu?
Bà con liên hệ Bộ phận Địa chính - Xây dựng Xã Long Hồ vào các ngày làm việc trong tuần để được hướng dẫn trích lục bản đồ địa chính chính xác.`
  },
  {
    id: 'doc-04',
    title: 'Giáo trình Kỹ thuật Nuôi và Nhân giống Ốc Bươu Đen thương phẩm trong bể bạt',
    code: '03/GT-NGHE-AB',
    category: 'dao-tao-nghe',
    categoryLabel: 'Đào tạo nghề & Kỹ năng',
    description: 'Mô hình phát triển kinh tế hộ gia đình vốn ít, sinh lời nhanh phù hợp địa bàn kênh rạch và vườn tạp Xã Long Hồ.',
    contentSummary: 'Hướng dẫn làm bể bạt, thuần dưỡng ốc giống, quản lý pH nguồn nước, thức ăn tận dụng từ bèo cám, mướp hương, lá sắn và phòng bệnh sưng vòi.',
    issuedBy: 'Hội Nông dân phối hợp TT HTCĐ Xã Long Hồ',
    dateIssued: '2026-03-02',
    fileType: 'pdf',
    fileName: 'Giao-trinh-nuoi-oc-buou-den-Long-Ho.pdf',
    fileSize: '2.6 MB',
    tags: ['Ốc bươu đen', 'Kinh tế hộ', 'Nuôi trồng thủy sản', 'Học nghề'],
    isFeatured: true,
    views: 520,
    downloadsCount: 198,
    fullTextContent: `KỸ THUẬT NUÔI ỐC BƯƠU ĐEN TRONG BỂ BẠT HIỆU QUẢ CAO

1. Thiết kế bể bạt:
- Kích thước thông dụng: Chiều dài 5m, rộng 2m, cao 1m (mực nước duy trì 40 - 50cm).
- Bạt HDPE độ bền cao, che lưới lan 50% ánh sáng để giảm nhiệt độ mùa nắng.
- Thả bèo tây, bèo cám hoặc rong đuôi chồn che phủ 1/3 mặt nước.

2. Quản lý thức ăn:
- Ốc con: Cho ăn bèo cám, tảo, cám gạo mịn rắc nhẹ.
- Ốc lớn: Cho ăn mướp, bầu, bí ngô, lá đu đủ, rau muống.
- Vớt thức ăn thừa sau 4-6 tiếng tránh gây thối nước.

3. Thu hoạch và bảo quản:
- Thời gian nuôi 3.5 - 4 tháng đạt trọng lượng 25 - 30 con/kg.
- Giá bán thương phẩm ổn định 70.000 - 90.000 đ/kg tại xã.`
  },
  {
    id: 'doc-05',
    title: 'Tài liệu Tuyên truyền: Phân loại chất thải rắn sinh hoạt tại nguồn và ủ phân hữu cơ',
    code: '15/TT-MT-AB',
    category: 'suc-khoe',
    categoryLabel: 'Sức khỏe & Môi trường',
    description: 'Cẩm nang chung tay xây dựng Xã Long Hồ đạt chuẩn Nông thôn mới nâng cao - Đô thị văn minh xanh sạch đẹp.',
    contentSummary: 'Cách phân chia 3 nhóm rác: Rác hữu cơ dễ phân hủy, rác tái chế và rác vô cơ khó phân hủy; Kỹ thuật ủ rác nhà bếp bằng chế phẩm EM làm phân bón cây trồng.',
    issuedBy: 'UBND Xã Long Hồ - Ban Môi trường Nông thôn',
    dateIssued: '2026-02-10',
    fileType: 'pdf',
    fileName: 'Tai-lieu-phan-loai-rac-tai-nguon-Long-Ho.pdf',
    fileSize: '3.1 MB',
    tags: ['Môi trường', 'Nông thôn mới', 'Ủ phân hữu cơ', 'Sức khỏe'],
    isFeatured: false,
    views: 290,
    downloadsCount: 88,
    fullTextContent: `CHUNG TAY BẢO VỆ MÔI TRƯỜNG XÃ LONG HỒ XANH - SẠCH - ĐẸP

1. Nhóm chất thải thực phẩm (Rác hữu cơ):
- Thức ăn thừa, rau củ quả dập, vỏ trái cây, bã chè, lá cây rụng.
- Cách xử lý: Đào hố rác có nắp đậy tại vườn hoặc ủ bằng thùng nhựa với men vi sinh EM làm phân bón.

2. Nhóm chất thải có khả năng tái chế:
- Vỏ lon bia, chai nhựa, giấy báo cũ, bìa carton, sắt vụn.
- Cách xử lý: Thu gom sạch bán phế liệu gây quỹ Chi hội phụ nữ / Khuyến học của ấp.

3. Nhóm chất thải còn lại:
- Túi ni lông khó phân hủy, tã lót, gốm sứ vỡ...
- Tập kết đúng nơi quy định theo lịch xe gom rác của xã.`
  },
  {
    id: 'doc-06',
    title: 'Quy trình Kỹ thuật Thâm canh Lúa chất lượng cao giảm phát thải (1 Phải 5 Giảm)',
    code: '02/KN-LUA-AB',
    category: 'khuyen-nong',
    categoryLabel: 'Khuyến nông - Trồng trọt',
    description: 'Quy trình canh tác lúa tiên tiến giúp bà con Xã Long Hồ giảm chi phí giống, phân bón, thuốc trừ sâu và thích ứng biến đổi khí hậu.',
    contentSummary: 'Ứng dụng gói kỹ thuật ngập khô xen kẽ (AWD), giảm lượng giống sạ còn 80kg/ha, nâng cao chất lượng hạt gạo xuất khẩu.',
    issuedBy: 'Chi cục Trồng trọt phối hợp TT HTCĐ Xã Long Hồ',
    dateIssued: '2026-01-05',
    fileType: 'pdf',
    fileName: 'Ky-thuat-lua-1-phai-5-giam-Long-Ho.pdf',
    fileSize: '4.5 MB',
    tags: ['Lúa chất lượng cao', '1 phải 5 giảm', 'Khuyến nông', 'Long Hồ'],
    isFeatured: false,
    views: 340,
    downloadsCount: 140,
    fullTextContent: `MÔ HÌNH 1 PHẢI 5 GIẢM TRONG CANH TÁC LÚA TẠI ĐỒNG BẰNG SÔNG CỬU LONG

1 Phải:
- Phải sử dụng giống lúa xác nhận rõ nguồn gốc.

5 Giảm:
1. Giảm lượng giống gieo sạ (từ 120-150kg/ha xuống còn 80-100kg/ha).
2. Giảm lượng phân đạm bón thừa (sử dụng bảng so màu lá lúa LCC).
3. Giảm lượng thuốc bảo vệ thực vật hóa học (áp dụng IPM, bảo vệ thiên địch).
4. Giảm lượng nước tưới (áp dụng kỹ thuật tưới ngập khô xen kẽ).
5. Giảm thất thoát sau thu hoạch (dùng máy gặt đập liên hợp).`
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-01',
    title: 'Thông báo: Tuyển sinh Lớp đào tạo Nghề Kỹ thuật Sửa chữa Máy Nông cụ & Hệ thống tưới nhỏ giọt Khóa 1/2026',
    category: 'tuyen-sinh',
    categoryLabel: 'Tuyển sinh & Khóa học',
    summary: 'Trung tâm phối hợp Trường Cao đẳng Nghề tổ chức lớp học miễn phí 100% học phí cho lao động nông thôn Xã Long Hồ, được hỗ trợ tiền ăn trưa.',
    content: `TRUNG TÂM HỌC TẬP CỘNG ĐỒNG XÃ LONG HỒ
Số: 18/TB-TTHTCĐ
Long Hồ, ngày 20 tháng 03 năm 2026

THÔNG BÁO
Về việc tuyển sinh lớp đào tạo nghề sơ cấp:
"Kỹ thuật vận hành, sửa chữa máy nông cụ và lắp đặt hệ thống tưới tự động"

Thực hiện Đề án đào tạo nghề cho lao động nông thôn năm 2026, Trung tâm Học tập Cộng đồng Xã Long Hồ phối hợp với Trung tâm Giáo dục Nghề nghiệp huyện thông báo mở lớp đào tạo nghề như sau:

1. Đối tượng tuyển sinh:
- Công dân nam, nữ từ đủ 18 tuổi trở lên đang thường trú tại các ấp trên địa bàn Xã Long Hồ.
- Ưu tiên hộ nghèo, cận nghèo, gia đình chính sách, thanh niên hoàn thành nghĩa vụ quân sự.

2. Thời gian và địa điểm:
- Thời gian đào tạo: 1.5 tháng (Học vào Thứ Bảy và Chủ Nhật hằng tuần).
- Dự kiến khai giảng: Ngày 12/04/2026.
- Địa điểm: Trụ sở UBND Ấp Bình Thuận 1, Xã Long Hồ, Tỉnh Vĩnh Long.

3. Quyền lợi học viên:
- Miễn 100% học phí và tài liệu học tập.
- Được hỗ trợ chi phí ăn trưa theo quy định hiện hành đối với học viên diện chính sách.
- Kết thúc khóa học được cấp Chứng chỉ sơ cấp nghề có giá trị toàn quốc.

4. Hồ sơ và cách đăng ký:
- Bà con có thể bấm nút "Đăng ký tham gia" trực tiếp trên trang web này hoặc nộp đơn tại Nhà sinh hoạt văn hóa các ấp.
- Hạn chót nhận đăng ký: Trước ngày 08/04/2026.

GIÁM ĐỐC TRUNG TÂM
(Đã ký & đóng dấu)
Phó Chủ tịch UBND Xã Long Hồ kiêm nhiệm`,
    postedBy: 'Ban Giám đốc TT HTCĐ Xã Long Hồ',
    datePosted: '2026-03-20',
    expiryDate: '2026-04-08',
    priority: 'quan-trong',
    isPinned: true,
    views: 540,
    attachments: [
      { name: 'Ke-hoach-tuyen-sinh-lop-nghe-01-2026.pdf', size: '1.2 MB', type: 'pdf' },
      { name: 'Don-dang-ky-hoc-nghe-mau-so-1.docx', size: '250 KB', type: 'docx' }
    ]
  },
  {
    id: 'ann-02',
    title: 'Thông báo Khẩn: Lịch Tập huấn Phòng trừ Rầy Nâu và Bệnh Vàng lùn - Lùn xoắn lá trên Trà lúa Hè Thu',
    category: 'khan-cap',
    categoryLabel: 'Thông báo khẩn cấp',
    summary: 'Theo dự báo của Trạm Khuyến nông, rầy nâu lứa mới đang nở rộ với mật độ cao, đề nghị bà con nông dân các ấp tham gia buổi tập huấn khẩn vào sáng Thứ 5.',
    content: `THÔNG BÁO KHẨN CỦA BAN CHỈ ĐẠO SẢN XUẤT NÔNG NGHIỆP XÃ LONG HỒ

Hiện nay trên trà lúa Hè Thu của xã, rầy nâu tuổi 1 - 2 đang phát sinh diện rộng tại các cánh đồng thuộc Ấp Bình Đông, Ấp Bình Tây và Ấp 2. Để chủ động bảo vệ mùa màng, TT HTCĐ phối hợp Trạm Khuyến nông huyện mở buổi tập huấn thực địa khẩn cấp:

- Thời gian: 07 giờ 30 phút, sáng Thứ Năm (ngày 26/03/2026).
- Địa điểm: Nhà văn hóa Ấp Bình Đông (có đi thăm đồng trực tiếp).
- Nội dung:
  + Hướng dẫn kỹ thuật thăm đồng vạch gốc lúa đếm mật độ rầy.
  + Hướng dẫn sử dụng thuốc đặc trị rầy chống lột xác, bảo vệ thiên địch.
  + Kỹ thuật đưa nước vào ruộng che chắn gốc lúa.

Đề nghị Trưởng các ấp thông báo trên loa truyền thanh cho bà con nông dân bố trí tham gia đông đủ đúng giờ.`,
    postedBy: 'UBND Xã & TT HTCĐ Xã Long Hồ',
    datePosted: '2026-03-22',
    priority: 'khan',
    isPinned: true,
    views: 780,
    attachments: [
      { name: 'Cong-van-phong-chong-ray-nau-so-45.pdf', size: '890 KB', type: 'pdf' }
    ]
  },
  {
    id: 'ann-03',
    title: 'Lịch Tiếp nhận và Hướng dẫn Người dân làm Hồ sơ Cấp đổi Căn cước công dân và Kích hoạt VNeID tại Trung tâm',
    category: 'hoat-dong',
    categoryLabel: 'Hoạt động cộng đồng',
    summary: 'Công an Xã Long Hồ phối hợp Tổ Công nghệ số tổ chức điểm lưu động hỗ trợ người cao tuổi và bà con cài đặt tài khoản định danh điện tử.',
    content: `Nhằm tạo điều kiện thuận lợi nhất cho nhân dân trên địa bàn xã, Công an Xã Long Hồ phối hợp Ban Giám đốc TT HTCĐ mở bàn hướng dẫn trực tiếp:

- Thời gian làm việc: Tất cả các buổi sáng thứ 3 và thứ 5 hằng tuần (từ 08h00 - 11h00).
- Địa điểm: Phòng Kỹ năng số - Trung tâm Học tập Cộng đồng Xã Long Hồ.
- Nội dung hỗ trợ:
  1. Hướng dẫn cài đặt và đăng nhập ứng dụng VNeID trên điện thoại.
  2. Tích hợp giấy phép lái xe, thẻ bảo hiểm y tế, mã số thuế cá nhân vào ứng dụng.
  3. Cấp đổi mật khẩu và mở khóa tài khoản định danh bị khóa.
  4. Hướng dẫn tự tra cứu thông tin cư trú hộ gia đình.

Lưu ý: Bà con khi đi vui lòng mang theo Căn cước công dân gắn chip và điện thoại có số thuê bao chính chủ.`,
    postedBy: 'Tổ Công nghệ số Cộng đồng Xã Long Hồ',
    datePosted: '2026-03-18',
    priority: 'binh-thuong',
    isPinned: false,
    views: 310
  },
  {
    id: 'ann-04',
    title: 'Phát động Phong trào "Toàn dân học tập - Gia đình học tập, Dòng họ học tập" năm 2026',
    category: 'chinh-sach',
    categoryLabel: 'Chính sách & Khuyến học',
    summary: 'Hội Khuyến học Xã Long Hồ phối hợp TT HTCĐ triển khai kế hoạch bình xét và khen thưởng các mô hình học tập tiêu biểu trên toàn xã.',
    content: `Thực hiện Quyết định số 387/QĐ-TTg của Thủ tướng Chính phủ, Hội Khuyến học Xã Long Hồ phối hợp Trung tâm phát động phong trào thi đua xây dựng:
1. Gia đình học tập: 100% con em trong độ tuổi đến trường, người lớn thường xuyên tự học, cập nhật kiến thức canh tác và kỹ năng sống.
2. Dòng họ học tập: Có quỹ khuyến học khuyến tài hỗ trợ con em vượt khó học giỏi.
3. Cộng đồng học tập cấp ấp: Nhà văn hóa ấp có tủ sách pháp luật - nông nghiệp hoạt động hiệu quả.

Hồ sơ đăng ký gia đình học tập nộp về Ban Khuyến học ấp trước ngày 30/04/2026.`,
    postedBy: 'Hội Khuyến học Xã Long Hồ',
    datePosted: '2026-03-10',
    priority: 'binh-thuong',
    isPinned: false,
    views: 265
  }
];

export const INITIAL_SCHEDULES: ClassScheduleItem[] = [
  {
    id: 'sch-oneai-2026',
    title: 'Lớp Tập huấn Triển khai Sử dụng Phần mềm Trí tuệ Nhân tạo OneAI (Theo GM 202/GM-UBND)',
    courseCode: 'CDS-ONEAI-2026',
    category: 'Chuyển đổi số',
    instructor: 'Ban Chỉ đạo 57 Xã Long Hồ & Đội ngũ Chuyên gia OneAI',
    instructorTitle: 'Tổ Công nghệ số cộng đồng & Chuyên gia AI cơ sở',
    startDate: '2026-09-22',
    endDate: '2026-09-22',
    timeSlot: 'Lớp 1: Sáng 07:30 - 11:30 | Lớp 2: Chiều 13:30 - 17:00 (Thứ Ba, 22/09/2026)',
    totalSessions: 2,
    location: 'Hội trường Trung tâm Sự nghiệp công Xã Long Hồ (TT Văn hóa Hòa Ninh cũ)',
    targetAudience: 'Toàn bộ cán bộ, công chức UBND, HĐND, Đoàn thể, Công an, Quân sự, Y tế và Ban nhân dân các ấp (Lớp 1: 86 đại biểu, Lớp 2: 48 đại biểu)',
    maxSeats: 134,
    currentEnrolled: 134,
    status: 'dang-dien-ra',
    feeInfo: 'Kinh phí ngân sách xã theo Kế hoạch số 200/KH-UBND (Học viên mang máy tính xách tay)',
    description: 'Thực hiện Giấy mời số 202/GM-UBND ngày 15/09/2026 của Chủ tịch UBND Xã Long Hồ Phan Thanh Hoàng. Tập huấn ứng dụng trí tuệ nhân tạo OneAI nhằm tối ưu hóa xử lý văn bản, tổng hợp báo cáo và hỗ trợ giải quyết thủ tục hành chính công.',
    curriculum: [
      'Chuyên đề 1: Tổng quan về trí tuệ nhân tạo OneAI và phương pháp phân quyền sử dụng cấp xã',
      'Chuyên đề 2: Kỹ năng ra lệnh (prompt) soạn thảo văn bản hành chính, báo cáo tuần/tháng, kế hoạch công tác',
      'Chuyên đề 3: Ứng dụng OneAI hỗ trợ trả lời công dân, tra cứu chính sách xã hội và số hóa dữ liệu địa phương',
      'Chuyên đề 4: Thực hành cá nhân trên máy tính xách tay, giải bài tập tình huống thực tế từng phòng ban và ấp'
    ],
    prerequisites: 'Đại biểu mang theo máy tính xách tay và điện thoại thông minh để quét mã QR tài liệu tập huấn.',
    registrations: [
      {
        id: 'reg-oneai-01',
        scheduleId: 'sch-oneai-2026',
        fullName: 'Phan Thanh Hoàng',
        phone: '0939.391.050',
        hamlet: 'UBND Xã',
        birthYear: '1978',
        gender: 'nam',
        registrationDate: '2026-09-15',
        notes: 'Chủ tịch UBND Xã - Chỉ đạo lớp học',
        status: 'da-xac-nhan'
      },
      {
        id: 'reg-oneai-02',
        scheduleId: 'sch-oneai-2026',
        fullName: 'Nguyễn Thanh Tâm',
        phone: '0907.967.085',
        hamlet: 'TT DVSNC',
        birthYear: '1983',
        gender: 'nam',
        registrationDate: '2026-09-16',
        notes: 'Giám đốc Trung tâm DVSNC - Chuẩn bị Hội trường',
        status: 'da-xac-nhan'
      }
    ]
  },
  {
    id: 'sch-cadimi-2026',
    title: 'Lớp Tập huấn Canh tác Hạn chế Dư lượng Kim loại nặng Cadimi trên Cây Sầu Riêng (KH 860 & GM 879)',
    courseCode: 'BVTV-CADIMI-2026',
    category: 'Khuyến nông - Làm vườn',
    instructor: 'Phòng Bảo vệ Thực vật & Trạm TT&BVTV Khu vực I',
    instructorTitle: 'Chi cục Trồng trọt và Bảo vệ thực vật Tỉnh Vĩnh Long',
    startDate: '2026-09-16',
    endDate: '2026-09-18',
    timeSlot: '08:00 - 11:30 (Đợt 1: Ngày 16/09/2026 | Đợt 2: Ngày 18/09/2026)',
    totalSessions: 2,
    location: 'Hội trường Văn hóa Xã Long Hồ (Xã Long Hồ được phân bổ 02 lớp)',
    targetAudience: 'Nhà vườn trồng sầu riêng xuất khẩu, Ban quản lý HTX và Tổ hợp tác đã/chờ cấp Mã số vùng trồng (30 người/lớp)',
    maxSeats: 60,
    currentEnrolled: 54,
    status: 'dang-dien-ra',
    feeInfo: 'Miễn phí 100%, hỗ trợ tiền ăn nước 150.000 đ/người và tài liệu hướng dẫn chuyên sâu',
    description: 'Theo Kế hoạch số 860/KH-CCTT&BVTV và Giấy mời số 879/GM-CCTT&BVTV của Chi cục Trưởng Nguyễn Thanh Bình. Giúp nhà vườn hiểu rõ độc tính Cadimi, cơ chế tích tụ từ phân bón Lân kém chất lượng, giải pháp bón vôi nâng pH đất vườn, sử dụng máy đo và bộ Kit test nhanh Cadimi để bảo vệ thị trường xuất khẩu sầu riêng.',
    curriculum: [
      'Chuyên đề 1: Độc tính của Cadimi, nguyên nhân gây tồn dư và tiêu chuẩn dư lượng của thị trường quốc tế (Nghị định 280)',
      'Chuyên đề 2: Kỹ thuật nâng pH đất vườn (bón vôi nông nghiệp đúng cách, hữu cơ vi sinh, quản lý tầng nước ngầm)',
      'Chuyên đề 3: Quy trình kiểm soát vật tư đầu vào an toàn, loại trừ phân lân và kích rễ có lẫn Cadimi',
      'Chuyên đề 4: Giới thiệu máy đo hàm lượng Cadimi trong đất và thực hành kiểm tra nhanh mẫu đất với Kit test 500 mẫu'
    ],
    prerequisites: 'Nhà vườn có thể mang theo mẫu đất mặt vườn sầu riêng (khoảng 200g) để được hướng dẫn kiểm tra độ pH và test nhanh.',
    registrations: [
      {
        id: 'reg-cadimi-01',
        scheduleId: 'sch-cadimi-2026',
        fullName: 'Lê Văn Hoàng',
        phone: '0937.605.484',
        hamlet: 'Ấp Hòa Thuận',
        birthYear: '1976',
        gender: 'nam',
        registrationDate: '2026-09-12',
        notes: 'Vườn sầu riêng 12 công đăng ký mã số vùng trồng',
        status: 'da-xac-nhan'
      }
    ]
  },
  {
    id: 'sch-nuoi-de-2026',
    title: 'Lớp Kỹ thuật Chăn nuôi Dê & Hướng dẫn Kê khai Hoạt động Chăn nuôi Truy xuất Nguồn gốc (KH 10 & GM 07)',
    courseCode: 'CN-DE-2026',
    category: 'Đào tạo nghề',
    instructor: 'Chi cục Chăn nuôi và Thú y tỉnh Vĩnh Long phối hợp TTDVSNC Xã',
    instructorTitle: 'Chuyên gia Chăn nuôi Thú y & Kỹ thuật viên CSDL Chăn nuôi',
    startDate: '2026-08-28',
    endDate: '2026-08-28',
    timeSlot: '08:00 - 11:30 (Thứ Sáu, 28/08/2026)',
    totalSessions: 1,
    location: 'Nhà Đ/c Trần Văn Hà (Bí thư Chi bộ ấp Phú An, Chi hội trưởng Chi hội chăn nuôi dê Xã Long Hồ)',
    targetAudience: '20 hộ nông dân chăn nuôi dê và thành viên Hợp tác xã chăn nuôi dê Xã Long Hồ',
    maxSeats: 20,
    currentEnrolled: 20,
    status: 'da-ket-thuc',
    feeInfo: 'Miễn phí (Theo Kế hoạch số 10/KH-TTDVSNC và Giấy mời 07/GM-TTDVSNC)',
    description: 'Thực hiện Kế hoạch số 10/KH-TTDVSNC của Giám đốc Trung tâm DVSNC Nguyễn Thanh Tâm. Cung cấp kỹ thuật làm chuồng sàn thông thoáng, phối trộn cỏ voi và phụ phẩm nông nghiệp ủ chua, phòng trừ bệnh đường ruột ở dê con và hướng dẫn kê khai trực tuyến trên Hệ thống Cơ sở dữ liệu quốc gia về chăn nuôi.',
    curriculum: [
      'Chuyên đề 1: Tiêu chuẩn thiết kế chuồng trại cao ráo, ấm đông mát hè và kỹ thuật chọn giống dê sinh sản',
      'Chuyên đề 2: Chế độ thức ăn thô xanh, bổ sung khoáng liếm và phương pháp phòng trị bệnh truyền nhiễm trên đàn dê',
      'Chuyên đề 3: Hướng dẫn quy trình kê khai đàn dê trực tuyến trên phần mềm Cơ sở dữ liệu chăn nuôi quốc gia (Kế hoạch 43/KH-CCCN&TY)',
      'Chuyên đề 4: Thảo luận kinh nghiệm thực tế tại chuồng nuôi dê mẫu của Chi hội trưởng Trần Văn Hà'
    ],
    registrations: [
      {
        id: 'reg-de-01',
        scheduleId: 'sch-nuoi-de-2026',
        fullName: 'Trần Văn Hà',
        phone: '0913.882.114',
        hamlet: 'Ấp Phú An',
        birthYear: '1970',
        gender: 'nam',
        registrationDate: '2026-08-25',
        notes: 'Bí thư Chi bộ, Chi hội trưởng Chi hội chăn nuôi dê xã',
        status: 'da-xac-nhan'
      }
    ]
  },
  {
    id: 'sch-khuyen-nong-cd-2026',
    title: 'Lớp Tập huấn Nâng cao Năng lực cho Tổ Khuyến nông Cộng đồng Xã Long Hồ (KH 09 & GM 06)',
    courseCode: 'KN-TKN-2026',
    category: 'Khuyến nông - Làm vườn',
    instructor: 'Trung tâm Khuyến nông Tỉnh Vĩnh Long',
    instructorTitle: 'Báo cáo viên Khuyến nông Tỉnh & Chuyên viên Chuyển giao KHKT',
    startDate: '2026-08-13',
    endDate: '2026-08-13',
    timeSlot: '08:00 - 11:30 (Thứ Năm, 13/08/2026)',
    totalSessions: 1,
    location: 'Hội trường Trung tâm Văn hóa Xã Long Hồ (Ấp Hòa Ninh, Xã Long Hồ)',
    targetAudience: '40 thành viên Tổ Khuyến nông cộng đồng các ấp trên địa bàn Xã Long Hồ, Trưởng các ấp, cán bộ chuyên môn',
    maxSeats: 40,
    currentEnrolled: 40,
    status: 'da-ket-thuc',
    feeInfo: 'Miễn phí 100% (Kinh phí do Trung tâm Khuyến nông tỉnh Vĩnh Long hỗ trợ)',
    description: 'Thực hiện Kế hoạch số 09/KH-TTDVSNC và Giấy mời số 06/GM-TTDVSNC của Giám đốc Trung tâm DVSNC Nguyễn Thanh Tâm. Trang bị phương pháp làm việc của Tổ Khuyến nông cộng đồng, kỹ năng hướng dẫn bà con và HTX xây dựng mã số vùng trồng, truy xuất nguồn gốc sản phẩm và nâng cao kiến thức trồng trọt, chăn nuôi, thủy sản.',
    curriculum: [
      'Chuyên đề 1: Phương pháp và quy chế hoạt động hiệu quả của Tổ Khuyến nông cộng đồng cơ sở',
      'Chuyên đề 2: Kỹ năng tư vấn, hỗ trợ nông dân và HTX thiết lập hồ sơ cấp Mã số vùng trồng, truy xuất nguồn gốc',
      'Chuyên đề 3: Đào tạo chuyên sâu về kỹ thuật trồng trọt cây ăn trái đặc sản, chăn nuôi an toàn sinh học và nuôi thủy sản',
      'Chuyên đề 4: Thực hành thảo luận nhóm, giải quyết khó khăn vướng mắc thực tế tại từng ấp'
    ],
    registrations: [
      {
        id: 'reg-kncd-01',
        scheduleId: 'sch-khuyen-nong-cd-2026',
        fullName: 'Nguyễn Khánh Nguyên',
        phone: '0901.215.418',
        hamlet: 'Ấp An Thành',
        birthYear: '1981',
        gender: 'nam',
        registrationDate: '2026-08-10',
        notes: 'Thành viên Tổ Khuyến nông cộng đồng xã',
        status: 'da-xac-nhan'
      }
    ]
  },
  {
    id: 'sch-nuoi-ech-2026',
    title: 'Lớp Tập huấn cho Nông dân tham gia Mô hình Nuôi Ếch tại Xã Long Hồ (Kế hoạch 04/KH-TTDVSNC)',
    courseCode: 'TS-ECH-2026',
    category: 'Đào tạo nghề',
    instructor: 'Đồng chí Nguyễn Minh Trí',
    instructorTitle: 'Viên chức Phòng Khuyến nông Chăn nuôi & Thủy sản - TT Khuyến nông Vĩnh Long',
    startDate: '2026-06-23',
    endDate: '2026-06-23',
    timeSlot: '07:00 - 11:00 (Thứ Ba, 23/06/2026)',
    totalSessions: 1,
    location: 'Trung tâm Dịch vụ sự nghiệp công Xã Long Hồ',
    targetAudience: 'Nông dân tham gia mô hình nuôi ếch, hộ dân nghèo, cận nghèo có nhu cầu chuyển đổi nghề tạo sinh kế',
    maxSeats: 35,
    currentEnrolled: 35,
    status: 'da-ket-thuc',
    feeInfo: 'Miễn phí 100% (Chi từ nguồn kinh phí hoạt động thường xuyên năm 2026 của TTDVSNC)',
    description: 'Thực hiện Kế hoạch số 04/KH-TTDVSNC của Giám đốc Nguyễn Thanh Tâm. Giúp nông dân nắm vững kỹ thuật làm bể bạt và vèo lưới nuôi ếch, dinh dưỡng thức ăn viên công nghiệp, kỹ thuật quản lý ếch thương phẩm và nuôi ếch giống sinh sản, phòng trị bệnh chướng hơi, đỏ chân và liên kết bao tiêu sản phẩm.',
    curriculum: [
      'Chuyên đề 1: Đặc điểm sinh học của ếch, thiết kế bể nuôi bạt nilông hoặc lồng lưới trong ao vườn',
      'Chuyên đề 2: Chế độ dinh dưỡng, cách chia cữ ăn và kỹ thuật chăm sóc ếch qua từng giai đoạn phát triển',
      'Chuyên đề 3: Nhận biết, nguyên nhân và phác đồ điều trị các bệnh thường gặp (bệnh xuất huyết, chướng bụng, đỏ chân)',
      'Chuyên đề 4: Hướng dẫn kỹ thuật nuôi ếch sinh sản, ươm nòng nọc và liên kết tiêu thụ sản phẩm tại Vĩnh Long'
    ],
    registrations: [
      {
        id: 'reg-ech-01',
        scheduleId: 'sch-nuoi-ech-2026',
        fullName: 'Võ Huỳnh Minh Trí',
        phone: '0776.567.330',
        hamlet: 'Ấp Hòa Thuận',
        birthYear: '1992',
        gender: 'nam',
        registrationDate: '2026-06-20',
        notes: 'Đoàn viên thanh niên khởi nghiệp mô hình nuôi ếch bể bạt',
        status: 'da-xac-nhan'
      }
    ]
  },
  {
    id: 'sch-01',
    title: 'Lớp Kỹ thuật Xử lý ra hoa sầu riêng vụ nghịch & Phòng chống bệnh Thán thư',
    courseCode: 'KN-SR-2026-01',
    category: 'Khuyến nông - Làm vườn',
    instructor: 'KS. Trương Tấn Phát',
    instructorTitle: 'Chuyên gia Trạm Bảo vệ Thực vật huyện',
    startDate: '2026-03-28',
    endDate: '2026-04-05',
    timeSlot: '08:00 - 11:30 (Thứ Bảy & Chủ Nhật)',
    totalSessions: 4,
    location: 'Hội trường Trụ sở UBND Ấp Bình Thuận 1, Xã Long Hồ (và tham quan vườn thực nghiệm)',
    targetAudience: 'Nhà vườn, hội viên nông dân trồng sầu riêng, cây có múi tại Xã Long Hồ',
    maxSeats: 50,
    currentEnrolled: 38,
    status: 'sap-dien-ra',
    feeInfo: 'Miễn phí 100% (Ngân sách Khuyến nông xã hỗ trợ)',
    description: 'Khóa học cung cấp kiến thức thực chiến từ chuyên gia hàng đầu về kỹ thuật siết nước, kích bông, dưỡng mắt cua, bón phân vi lượng chống sốc nhiệt rụng hoa non.',
    curriculum: [
      'Chuyên đề 1: Đánh giá sinh trưởng cành lá và tạo cơi đọt đồng loạt',
      'Chuyên đề 2: Kỹ thuật đậy bạt màng phủ nilon và quản lý mực nước mương vườn',
      'Chuyên đề 3: Phối trộn thuốc BVTV sinh học phòng trừ sâu rầy kháng thuốc',
      'Chuyên đề 4: Thực hành trực tiếp tại vườn sầu riêng mẫu tại Ấp An Hòa'
    ],
    prerequisites: 'Bà con mang theo sổ tay, nón lá khi đi thực địa vườn mẫu.',
    registrations: [
      {
        id: 'reg-01',
        scheduleId: 'sch-01',
        fullName: 'Nguyễn Văn Năm',
        phone: '0918.234.567',
        hamlet: 'Ấp An Hòa',
        birthYear: '1975',
        gender: 'nam',
        registrationDate: '2026-03-21',
        notes: 'Có vườn sầu riêng 8 công',
        status: 'da-xac-nhan'
      },
      {
        id: 'reg-02',
        scheduleId: 'sch-01',
        fullName: 'Trần Thị Mười',
        phone: '0979.888.112',
        hamlet: 'Ấp Bình Đông',
        birthYear: '1982',
        gender: 'nu',
        registrationDate: '2026-03-22',
        notes: 'Muốn học thêm cách thụ phấn bổ sung ban đêm',
        status: 'da-xac-nhan'
      }
    ]
  },
  {
    id: 'sch-02',
    title: 'Lớp Kỹ năng số cho Người cao tuổi & Phụ nữ: Sử dụng SmartPhone an toàn, phòng chống lừa đảo',
    courseCode: 'CDS-SMART-02',
    category: 'Chuyển đổi số',
    instructor: 'Thầy Lê Hoàng Quân',
    instructorTitle: 'Giáo viên Tin học THCS Long Hồ, Bí thư Đoàn Xã',
    startDate: '2026-03-29',
    endDate: '2026-04-12',
    timeSlot: '14:00 - 16:30 (Chiều Chủ Nhật)',
    totalSessions: 3,
    location: 'Phòng Máy tính - Thư viện TT HTCĐ Xã Long Hồ',
    targetAudience: 'Bác nông dân lớn tuổi, hội viên phụ nữ, người mới dùng smartphone',
    maxSeats: 30,
    currentEnrolled: 26,
    status: 'sap-dien-ra',
    feeInfo: 'Miễn phí 100% (Đoàn Thanh niên xã phụ trách)',
    description: 'Học bằng phương pháp cầm tay chỉ việc, 1 đoàn viên kèm 1 cô bác lớn tuổi. Hướng dẫn gọi Zalo hình ảnh cho con cháu, thanh toán tiền điện, nhận biết cuộc gọi lừa đảo.',
    curriculum: [
      'Buổi 1: Kết nối Wifi, chỉnh cỡ chữ to dễ nhìn, gọi video cho người thân qua Zalo',
      'Buổi 2: Đọc báo tin cậy, xem dự báo thời tiết nông vụ, tra cứu giá nông sản',
      'Buổi 3: Dấu hiệu nhận biết cuộc gọi giả danh công an, tòa án và cách bảo mật tài khoản'
    ],
    registrations: [
      {
        id: 'reg-03',
        scheduleId: 'sch-02',
        fullName: 'Lê Văn Bảy',
        phone: '0933.123.456',
        hamlet: 'Ấp 1',
        birthYear: '1960',
        gender: 'nam',
        registrationDate: '2026-03-21',
        notes: 'Mới mua điện thoại thông minh',
        status: 'da-xac-nhan'
      }
    ]
  },
  {
    id: 'sch-03',
    title: 'Lớp Nghề: Kỹ thuật Trồng nấm rơm trong nhà và ủ rơm làm phân hữu cơ vi sinh',
    courseCode: 'NGHE-NAM-01',
    category: 'Đào tạo nghề',
    instructor: 'ThS. Đặng Kim Loan',
    instructorTitle: 'Giảng viên Trường Trung cấp Nông nghiệp',
    startDate: '2026-04-10',
    endDate: '2026-04-24',
    timeSlot: '08:00 - 11:00 (Thứ Ba & Thứ Năm)',
    totalSessions: 5,
    location: 'Nhà văn hóa Ấp An Thạnh, Xã Long Hồ',
    targetAudience: 'Bà con nông dân tận dụng rơm rạ sau vụ thu hoạch lúa',
    maxSeats: 40,
    currentEnrolled: 22,
    status: 'sap-dien-ra',
    feeInfo: 'Miễn phí, hỗ trợ meo nấm giống thực hành',
    description: 'Hướng dẫn cách tận dụng nguồn rơm rạ sau thu hoạch để trồng nấm rơm trong nhà sạch sẽ, không phụ thuộc thời tiết, thu nhập phụ 4 - 6 triệu đồng/tháng.',
    curriculum: [
      'Chuyên đề 1: Chọn rơm sạch, kỹ thuật ủ rơm và khử trùng nhà nấm',
      'Chuyên đề 2: Cấy meo giống, theo dõi nhiệt độ và độ ẩm nhà trồng',
      'Chuyên đề 3: Chăm sóc, tưới đón nấm và thu hái đúng độ tuổi',
      'Chuyên đề 4: Tận dụng bã rơm thải ủ nấm Trichoderma làm phân bón hữu cơ cho vườn cam, bưởi'
    ],
    registrations: []
  },
  {
    id: 'sch-04',
    title: 'Chuyên đề Sức khỏe: Phòng chống các bệnh mạn tính (Huyết áp, Tiểu đường) ở Người cao tuổi',
    courseCode: 'SK-YTE-01',
    category: 'Sức khỏe cộng đồng',
    instructor: 'BS. CKI Phan Thanh Tùng',
    instructorTitle: 'Trưởng Trạm Y tế Xã Long Hồ',
    startDate: '2026-03-15',
    endDate: '2026-03-15',
    timeSlot: '08:00 - 10:30 (Chủ Nhật)',
    totalSessions: 1,
    location: 'Hội trường UBND Xã Long Hồ',
    targetAudience: 'Người cao tuổi từ 50 tuổi trở lên và người nhà chăm sóc',
    maxSeats: 70,
    currentEnrolled: 68,
    status: 'da-ket-thuc',
    feeInfo: 'Miễn phí, được đo huyết áp và thử đường huyết mao mạch miễn phí',
    description: 'Buổi chia sẻ kiến thức dinh dưỡng thực dưỡng, chế độ vận động dưỡng sinh và thói quen uống thuốc đúng liều lượng.',
    curriculum: [
      'Phần 1: Nhận biết dấu hiệu sớm của tai biến mạch máu não và cách sơ cứu đúng',
      'Phần 2: Chế độ ăn giảm muối, hạn chế mỡ động vật cho người cao tuổi',
      'Phần 3: Giao lưu hỏi đáp trực tiếp cùng Bác sĩ Trưởng Trạm Y tế'
    ],
    registrations: []
  }
];

export const INITIAL_ACCOUNTS: UserAccount[] = [
  {
    id: 'acc-admin',
    username: 'admin',
    password: 'admin123',
    fullName: 'Cán bộ Quản trị Trung tâm',
    role: 'admin',
    department: 'Ban Giám đốc TT HTCĐ Xã Long Hồ',
    phone: '0270.3859901',
    email: 'longho@vinhlong.gov.vn',
    createdAt: '2026-01-01',
  },
  {
    id: 'acc-user-01',
    username: 'nguoidan',
    password: '123456',
    fullName: 'Nguyễn Văn Năm',
    role: 'user',
    phone: '0918.234.567',
    email: 'vannam.longho@gmail.com',
    hamlet: 'Ấp Bình Thuận 1',
    createdAt: '2026-03-01',
  },
  {
    id: 'acc-user-02',
    username: 'hocvien',
    password: '123456',
    fullName: 'Trần Thị Mai',
    role: 'user',
    phone: '0977.888.999',
    email: 'thimai.binhthuan2@gmail.com',
    hamlet: 'Ấp Bình Thuận 2',
    createdAt: '2026-03-10',
  },
];

export const INITIAL_ONLINE_CLASSROOMS: OnlineClassroom[] = [
  {
    id: 'room-meet-01',
    title: 'Tập huấn Trực tuyến: Kỹ thuật Xử lý Ra Hoa Sầu riêng Nghịch Vụ & Phòng Trừ Thối Rễ Xì Mủ',
    platform: 'google-meet',
    meetingUrl: 'https://meet.google.com/qmv-ytpk-wxz',
    meetingId: 'qmv-ytpk-wxz',
    passcode: '2026',
    instructor: 'ThS. Lê Thành Phong',
    instructorTitle: 'Chuyên gia Cây ăn quả - Viện Cây ăn quả Miền Nam',
    category: 'Nông nghiệp & Khuyến nông',
    date: '2026-09-22',
    time: '19:30 - 21:00',
    locationDescription: 'Trực tuyến Google Meet + Tiếp sóng tại Hội trường Trung tâm HTCĐ Xã Long Hồ',
    status: 'dang-dien-ra',
    targetAudience: 'Nhà vườn trồng sầu riêng, chôm chôm các ấp Bình Thuận 1, Bình Thuận 2, An Hòa, An Lợi...',
    description: 'Tập huấn trực tuyến chuyên sâu: hướng dẫn siết nước, bón phân tạo mầm hoa, xử lý phân bón qua lá an toàn không tồn dư Cadimi và các biện pháp sinh học phòng trừ nấm Phytophthora mùa mưa lũ vùng đất Long Hồ.',
    currentParticipants: 56,
    maxParticipants: 150,
    attachedDocs: [
      { name: 'Quy-trinh-sau-rieng-nghich-vu-Long-Ho-2026.pdf', size: '2.4 MB' },
      { name: 'So-tay-lieu-luong-phan-bon-la-an-toan.xlsx', size: '420 KB' }
    ]
  },
  {
    id: 'room-zoom-02',
    title: 'Lớp học Trực tuyến Zoom: Kỹ năng Nhận diện Thủ đoạn Lừa đảo Không Gian Mạng & Bảo mật VNeID',
    platform: 'zoom',
    meetingUrl: 'https://zoom.us/j/84920485901?pwd=LongHo2026',
    meetingId: '849 2048 5901',
    passcode: '888999',
    instructor: 'Đ/c Thượng úy Trần Minh Trí',
    instructorTitle: 'Phó Đội trưởng An ninh mạng & Phòng chống tội phạm công nghệ cao',
    category: 'Chuyển đổi số & Pháp luật',
    date: '2026-09-24',
    time: '19:00 - 20:30',
    locationDescription: 'Phòng Zoom Trực tuyến + Tiếp sóng tại Nhà sinh hoạt cộng đồng Ấp An Thạnh',
    status: 'sap-dien-ra',
    targetAudience: 'Toàn thể bà con nhân dân, người cao tuổi, thanh niên, phụ nữ 10 ấp',
    description: 'Nhận diện các chiêu trò lừa đảo qua cuộc gọi mạo danh cơ quan công an, tòa án, thuế, giả mạo cán bộ chuyển đổi số yêu cầu cập nhật căn cước, cài app lạ chiếm quyền điện thoại.',
    currentParticipants: 84,
    maxParticipants: 200,
    attachedDocs: [
      { name: 'Cam-nang-phong-tranh-lua-dao-mang-2026.pdf', size: '1.8 MB' }
    ]
  },
  {
    id: 'room-teams-03',
    title: 'Hội thảo Kỹ thuật MS Teams: Ứng dụng Men Vi Sinh Bản Địa (IMO) Tự Làm Phân Hữu Cơ Tại Nông Hộ',
    platform: 'ms-teams',
    meetingUrl: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_IMO_LongHo_2026',
    meetingId: '248 109 432',
    passcode: 'IMO2026',
    instructor: 'Kỹ sư Nguyễn Thị Mai',
    instructorTitle: 'Chi cục Trồng trọt và Bảo vệ Thực vật Tỉnh Vĩnh Long',
    category: 'Nông nghiệp & Môi trường',
    date: '2026-09-26',
    time: '08:30 - 10:30',
    locationDescription: 'Trực tiếp tại Hội trường Ấp Bình Hòa kết hợp họp trực tuyến qua MS Teams',
    status: 'sap-dien-ra',
    targetAudience: 'Hội viên Nông dân, Phụ nữ và các hộ gia đình chăn nuôi, trồng trọt',
    description: 'Quy trình nhân nuôi men vi sinh bản địa IMO4 từ cám gạo, men bánh men, sữa chua; phương pháp ủ rác nhà bếp và phụ phẩm nông nghiệp thành phân bón hữu cơ sinh học đậm đặc.',
    currentParticipants: 35,
    maxParticipants: 100
  },
  {
    id: 'room-replay-04',
    title: 'Tập huấn Trực tiếp & Trực tuyến: Hướng dẫn Sử dụng Phần mềm Trí tuệ Nhân tạo OneAI cho Cán bộ Xã & Ấp',
    platform: 'google-meet',
    meetingUrl: 'https://meet.google.com/oneai-longho-2026',
    meetingId: 'oneai-longho',
    instructor: 'Ban Chỉ đạo Chuyển đổi số Xã Long Hồ',
    instructorTitle: 'Phối hợp Chuyên gia Công nghệ thông tin',
    category: 'Chuyển đổi số & Ứng dụng AI',
    date: '2026-09-18',
    time: '14:00 - 16:30',
    locationDescription: 'Hội trường UBND Xã Long Hồ kết hợp trực tuyến Google Meet',
    status: 'da-ket-thuc',
    targetAudience: 'Cán bộ, công chức xã, Ban nhân dân 10 ấp, Tổ công nghệ số cộng đồng',
    description: 'Thực hành các mẫu câu lệnh prompt chuẩn, tóm tắt công văn, trích xuất dữ liệu và giải đáp thủ tục cho người dân. Đã có video bài giảng tương tác ghi hình đầy đủ.',
    currentParticipants: 62,
    replayVideoId: 'video-oneai-01'
  }
];

export const INITIAL_VIDEO_LECTURES: VideoLecture[] = [
  {
    id: 'video-oneai-01',
    title: 'Video Bài Giảng: Hướng Dẫn Thực Hành Trí Tuệ Nhân Tạo OneAI Trong Soạn Thảo Văn Bản & Báo Cáo Hành Chính',
    category: 'Chuyển đổi số & Ứng dụng AI',
    instructor: 'Ban Chỉ đạo Chuyển đổi số & Chuyên gia AI',
    instructorTitle: 'UBND Xã Long Hồ & Ban Chỉ đạo 57',
    duration: '28:30',
    views: 1420,
    datePosted: '2026-09-19',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    description: 'Bài giảng ghi hình thực tế hướng dẫn cán bộ 10 ấp ứng dụng trí tuệ nhân tạo OneAI để tự động hóa soạn thảo công văn, tóm tắt biên bản họp và tra cứu thể thức hành chính theo Nghị định 30/2020/NĐ-CP.',
    tags: ['OneAI', 'Trí tuệ nhân tạo', 'Văn bản hành chính', 'Cán bộ ấp', 'Chuyển đổi số'],
    isInteractive: true,
    associatedClassroomId: 'room-replay-04',
    interactiveQuestions: [
      {
        id: 'q1',
        question: 'Khi sử dụng OneAI để soạn thảo công văn, nguyên tắc bảo mật thông tin quan trọng nhất là gì?',
        options: [
          'Được tự do nhập mọi tài liệu nội bộ và số liệu bí mật nhà nước',
          'Tuyệt đối không nhập thông tin mật, bí mật nhà nước hoặc dữ liệu cá nhân nhạy cảm lên hệ thống',
          'Chỉ cần đổi tên cán bộ là có thể nhập hồ sơ mật',
          'Không cần rà soát lại văn bản do máy đã soạn chính xác 100%'
        ],
        correctOptionIndex: 1,
        explanation: 'Chính xác! Theo hướng dẫn tại Kế hoạch 200/KH-UBND, tuyệt đối không đưa dữ liệu bí mật nhà nước hoặc thông tin cá nhân nhạy cảm lên AI và luôn phải có cán bộ rà soát trước khi ký ban hành.'
      },
      {
        id: 'q2',
        question: 'Mẫu prompt chuẩn nào sau đây mang lại kết quả văn bản công vụ chất lượng nhất?',
        options: [
          'Viết cho tôi một công văn',
          'Soạn nhanh một thông báo ngắn',
          'Hãy soạn dự thảo Thông báo của UBND Xã Long Hồ gửi bà con 10 ấp về việc tiêm vắc-xin cho gia súc, văn phong chuẩn Nghị định 30/2020/NĐ-CP, ngắn gọn, dễ hiểu cho người cao tuổi',
          'Làm giúp tôi việc này ngay'
        ],
        correctOptionIndex: 2,
        explanation: 'Chính xác! Câu lệnh prompt cần có đủ: vai trò, chủ đề, đối tượng nhận tin, văn phong quy chuẩn và yêu cầu về độ dài.'
      }
    ],
    attachments: [
      { name: 'Cam-nang-mau-cau-lenh-OneAI-LongHo.pdf', size: '2.1 MB', type: 'pdf' },
      { name: 'Slide-Tap-huan-OneAI-Cap-Xa.pptx', size: '4.5 MB', type: 'pptx' }
    ]
  },
  {
    id: 'video-sau-rieng-02',
    title: 'Bài Giảng Số Tương Tác: Kỹ Thuật Tỉa Hoa, Thụ Phấn Bổ Sung & Chăm Sóc Sầu Riêng Đạt Tiêu Chuẩn Xuất Khẩu',
    category: 'Nông nghiệp & Khuyến nông',
    instructor: 'ThS. Lê Thành Phong',
    instructorTitle: 'Chuyên gia Cây ăn quả - Viện Cây ăn quả Miền Nam',
    duration: '35:15',
    views: 2890,
    datePosted: '2026-09-12',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    description: 'Hướng dẫn trực quan chi tiết kỹ thuật thụ phấn bằng chổi chuyên dụng từ 18h30 - 20h30, cách nhận biết hạt phấn chín, phân biệt hoa cuống to và quản lý dư lượng Cadimi trong đất phù sa vùng đất Long Hồ.',
    tags: ['Sầu riêng Ri6', 'Thụ phấn hoa', 'Viện Cây ăn quả', 'Xuất khẩu', 'Khuyến nông Long Hồ'],
    isInteractive: true,
    interactiveQuestions: [
      {
        id: 'q1',
        question: 'Thời điểm nào trong ngày là thích hợp nhất để tiến hành thụ phấn bổ sung cho hoa sầu riêng?',
        options: [
          'Buổi sáng từ 06h00 đến 08h00 khi trời mát',
          'Buổi trưa từ 11h00 đến 13h00 khi nắng gắt nhất',
          'Buổi chiều tối từ 18h30 đến 21h00 khi hoa nở rộ và bao phấn nứt giải phóng hạt phấn',
          'Bất kỳ thời điểm nào rảnh rỗi trong ngày'
        ],
        correctOptionIndex: 2,
        explanation: 'Đúng! Hoa sầu riêng nở về đêm; từ 18h30 đến 21h00 là thời điểm đầu nhụy tiết chất nhầy kết dính tốt nhất và bao phấn nứt hoàn toàn.'
      },
      {
        id: 'q2',
        question: 'Để hạn chế dư lượng kim loại nặng Cadimi hấp thu vào quả sầu riêng, giải pháp nào sau đây được khuyến cáo?',
        options: [
          'Bón thật nhiều phân lân có nguồn gốc quặng phosphorit chưa qua tinh chế',
          'Nâng cao độ pH đất từ 6.0 - 6.5, tăng cường bón vôi nông nghiệp và bổ sung hữu cơ vi sinh',
          'Tưới nước nhiễm phèn liên tục vào gốc',
          'Lạm dụng phân bón hóa học liều lượng gấp đôi'
        ],
        correctOptionIndex: 1,
        explanation: 'Chính xác! Khi đất chua (pH < 5.5), Cadimi ở dạng linh động cao dễ bị rễ hấp thu. Tăng pH bằng vôi và bón phân hữu cơ cố định Cadimi trong đất, giúp trái đạt chuẩn kiểm nghiệm xuất khẩu.'
      }
    ],
    attachments: [
      { name: 'Quy-trinh-thu-phan-sau-rieng-Ri6-2026.pdf', size: '3.6 MB', type: 'pdf' }
    ]
  },
  {
    id: 'video-lua-dao-03',
    title: 'Chuyên Đề Số: 5 Thủ Đoạn Lừa Đảo Phổ Biến Trên Không Gian Mạng Và Cách Ứng Phó Cho Người Dân Nông Thôn',
    category: 'Pháp luật & Kỹ năng số',
    instructor: 'Tổ Công nghệ số Cộng đồng Xã Long Hồ',
    instructorTitle: 'Phối hợp Công an Xã Long Hồ',
    duration: '19:45',
    views: 3410,
    datePosted: '2026-09-08',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    description: 'Cảnh báo chân thực các vụ việc lừa đảo đã xảy ra: cuộc gọi video deepfake mượn tiền, link nhận quà tri ân mạo danh ngân hàng, giả mạo biên lai chuyển tiền và chiêu trò tuyển cộng tác viên xử lý đơn hàng ảo.',
    tags: ['An toàn mạng', 'Phòng chống lừa đảo', 'VNeID', 'Công an', 'Kỹ năng số'],
    isInteractive: true,
    interactiveQuestions: [
      {
        id: 'q1',
        question: 'Khi nhận được cuộc gọi tự xưng là cán bộ công an yêu cầu chuyển tiền vào tài khoản để "phục vụ điều tra", bà con cần làm gì?',
        options: [
          'Vội vàng ra ngân hàng chuyển tiền ngay vì sợ bị bắt',
          'Cung cấp mật khẩu và mã OTP ngân hàng cho người gọi',
          'Tuyệt đối không làm theo, tắt máy ngay và báo cho Công an Xã Long Hồ (SĐT 0270.3859901)',
          'Vay mượn người thân để chuyển cho đủ số tiền yêu cầu'
        ],
        correctOptionIndex: 2,
        explanation: 'Chính xác! Cơ quan Công an và Viện kiểm sát không bao giờ làm việc qua điện thoại hay yêu cầu người dân chuyển tiền vào tài khoản cá nhân.'
      }
    ]
  },
  {
    id: 'video-dich-vu-cong-04',
    title: 'Hướng Dẫn Từng Bước: Nộp Hồ Sơ Đăng Ký Khai Sinh & Cấp Mã Số Định Danh Tại Nhà Qua Cổng Dịch Vụ Công',
    category: 'Chuyển đổi số & Cải cách hành chính',
    instructor: 'Bộ phận Tiếp nhận và Trả kết quả (Một cửa) Xã Long Hồ',
    duration: '15:20',
    views: 1870,
    datePosted: '2026-08-25',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    description: 'Video thao tác màn hình trực quan từng bước: đăng nhập bằng tài khoản Định danh điện tử VNeID mức độ 2, chụp ảnh giấy chứng sinh, điền thông tin và nhận kết quả tại nhà qua bưu chính công ích.',
    tags: ['Dịch vụ công trực tuyến', 'Khai sinh', 'Một cửa', 'VNeID', 'UBND Xã Long Hồ'],
    isInteractive: false
  }
];

export const INITIAL_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 'att-auto-01',
    studentName: 'Nguyễn Văn Năm',
    studentPhone: '0918.234.567',
    hamlet: 'Ấp Bình Thuận 1',
    userId: 'acc-user-01',
    itemType: 'online-classroom',
    itemId: 'room-meet-01',
    itemTitle: 'Tập huấn Trực tuyến: Kỹ thuật Xử lý Ra Hoa Sầu riêng Nghịch Vụ & Phòng Trừ Thối Rễ Xì Mủ',
    platform: 'google-meet',
    instructor: 'ThS. Lê Thành Phong',
    accessTime: '2026-09-22 19:32:15',
    durationMinutes: 85,
    status: 'tu-dong-ghi-nhan',
    device: 'Điện thoại Android (Samsung Galaxy)',
    ipOrLocation: 'Ấp Bình Thuận 1, Xã Long Hồ',
    notes: 'Điểm danh tự động qua liên kết lớp học trực tuyến Google Meet'
  },
  {
    id: 'att-auto-02',
    studentName: 'Trần Thị Mai',
    studentPhone: '0977.888.999',
    hamlet: 'Ấp Bình Thuận 2',
    userId: 'acc-user-02',
    itemType: 'online-classroom',
    itemId: 'room-meet-01',
    itemTitle: 'Tập huấn Trực tuyến: Kỹ thuật Xử lý Ra Hoa Sầu riêng Nghịch Vụ & Phòng Trừ Thối Rễ Xì Mủ',
    platform: 'google-meet',
    instructor: 'ThS. Lê Thành Phong',
    accessTime: '2026-09-22 19:35:40',
    durationMinutes: 78,
    status: 'tu-dong-ghi-nhan',
    device: 'iPhone (Safari)',
    ipOrLocation: 'Ấp Bình Thuận 2, Xã Long Hồ',
    notes: 'Điểm danh tự động khi học viên nhấn "Vào Lớp Học Ngay"'
  },
  {
    id: 'att-auto-03',
    studentName: 'Nguyễn Khánh Nguyên',
    studentPhone: '0901.215.418',
    hamlet: 'Ấp An Thạnh',
    itemType: 'online-classroom',
    itemId: 'room-meet-01',
    itemTitle: 'Tập huấn Trực tuyến: Kỹ thuật Xử lý Ra Hoa Sầu riêng Nghịch Vụ & Phòng Trừ Thối Rễ Xì Mủ',
    platform: 'google-meet',
    instructor: 'ThS. Lê Thành Phong',
    accessTime: '2026-09-22 19:40:02',
    durationMinutes: 65,
    status: 'tu-dong-ghi-nhan',
    device: 'Máy tính để bàn (Chrome PC)',
    ipOrLocation: 'Ấp An Thạnh, Xã Long Hồ',
    notes: 'Tham gia học tập từ trạm truyền thanh ấp'
  },
  {
    id: 'att-auto-04',
    studentName: 'Lê Văn Bảy',
    studentPhone: '0933.123.456',
    hamlet: 'Ấp An Long',
    itemType: 'video-lecture',
    itemId: 'video-lua-dao-03',
    itemTitle: 'Chuyên Đề Số: 5 Thủ Đoạn Lừa Đảo Phổ Biến Trên Không Gian Mạng Và Cách Ứng Phó Cho Người Dân Nông Thôn',
    platform: 'video',
    instructor: 'Tổ Công nghệ số Cộng đồng Xã Long Hồ',
    accessTime: '2026-09-21 15:10:44',
    durationMinutes: 20,
    status: 'hoan-thanh',
    device: 'Điện thoại Android (Oppo A57)',
    ipOrLocation: 'Ấp An Long, Xã Long Hồ',
    notes: 'Đã hoàn thành 100% video và đạt 100 điểm trắc nghiệm tương tác'
  },
  {
    id: 'att-auto-05',
    studentName: 'Đặng Thị Hoa',
    studentPhone: '0908.777.654',
    hamlet: 'Ấp Bình Đông',
    itemType: 'video-lecture',
    itemId: 'video-cadimi-01',
    itemTitle: 'Kỹ Thuật Thực Hành: Bón Vôi & Axit Humic Khử Kim Loại Nặng Cadimi Trong Đất Vườn Sầu Riêng',
    platform: 'video',
    instructor: 'KS. Trương Hoàng Vũ',
    accessTime: '2026-09-20 20:15:30',
    durationMinutes: 25,
    status: 'hoan-thanh',
    device: 'iPad Tablet',
    ipOrLocation: 'Ấp Bình Đông, Xã Long Hồ',
    notes: 'Đã hoàn thành kiểm tra và được cấp Giấy chứng nhận hoàn thành'
  },
  {
    id: 'att-auto-06',
    studentName: 'Huỳnh Thanh Liêm',
    studentPhone: '0939.888.222',
    hamlet: 'Ấp An Hòa',
    itemType: 'offline-class',
    itemId: 'sch-oneai-2026',
    itemTitle: 'Lớp Tập huấn Triển khai Sử dụng Phần mềm Trí tuệ Nhân tạo OneAI',
    platform: 'truc-tiep',
    instructor: 'Ban Chỉ đạo 57 Xã Long Hồ & Đội ngũ Chuyên gia OneAI',
    accessTime: '2026-09-22 07:45:00',
    durationMinutes: 240,
    status: 'da-xac-nhan',
    device: 'Quét mã QR tại Hội trường xã',
    ipOrLocation: 'Hội trường Trung tâm DVSNC Xã Long Hồ',
    notes: 'Cán bộ ấp tham gia đầy đủ buổi sáng và chiều'
  },
  {
    id: 'att-auto-07',
    studentName: 'Phan Văn Út',
    studentPhone: '0919.456.789',
    hamlet: 'Ấp Bình Tây',
    itemType: 'video-lecture',
    itemId: 'video-thu-phan-02',
    itemTitle: 'Kỹ Thuật Thụ Phấn Bổ Sung Ban Đêm Tăng Tỷ Lệ Đậu Trái Sầu Riêng Đều Hộc, Không Lép',
    platform: 'video',
    instructor: 'Nông dân sản xuất giỏi Lê Văn Mười',
    accessTime: '2026-09-18 21:05:12',
    durationMinutes: 18,
    status: 'hoan-thanh',
    device: 'Điện thoại thông minh',
    ipOrLocation: 'Ấp Bình Tây, Xã Long Hồ',
    notes: 'Điểm danh tự động qua hệ thống học trực tuyến'
  },
  {
    id: 'att-auto-08',
    studentName: 'Nguyễn Thị Lệ',
    studentPhone: '0945.112.233',
    hamlet: 'Ấp An Phú',
    itemType: 'online-classroom',
    itemId: 'room-zoom-02',
    itemTitle: 'Lớp học Trực tuyến Zoom: Kỹ năng Nhận diện Thủ đoạn Lừa đảo Không Gian Mạng & Bảo mật VNeID',
    platform: 'zoom',
    instructor: 'Đ/c Thượng úy Trần Minh Trí',
    accessTime: '2026-09-19 19:02:18',
    durationMinutes: 90,
    status: 'da-xac-nhan',
    device: 'Điện thoại Vivo',
    ipOrLocation: 'Ấp An Phú, Xã Long Hồ',
    notes: 'Tương tác sôi nổi trong phòng Zoom'
  }
];

export const INITIAL_STUDENT_PROGRESS: StudentProgressItem[] = [
  {
    id: 'prog-01',
    studentName: 'Nguyễn Văn Năm',
    studentPhone: '0918.234.567',
    hamlet: 'Ấp Bình Thuận 1',
    userId: 'acc-user-01',
    registeredDate: '2026-03-01',
    totalClassesAttended: 5,
    totalLecturesCompleted: 3,
    totalQuizzesPassed: 3,
    averageScore: 95,
    lastActive: '2026-09-22 19:32',
    completedLectureIds: ['video-cadimi-01', 'video-thu-phan-02', 'video-lua-dao-03'],
    attendedClassIds: ['room-meet-01', 'sch-01', 'sch-oneai-2026'],
    certificatesEarned: [
      {
        id: 'cert-01',
        title: 'Kỹ thuật Canh tác Sầu riêng Hạn chế Cadimi theo Tiêu chuẩn Xuất khẩu',
        issueDate: '2026-09-20',
        certNumber: 'GCN-AB-2026-0042',
        courseCategory: 'Khuyến nông & Làm vườn',
        score: 100
      },
      {
        id: 'cert-02',
        title: 'Kỹ năng Số & Phòng ngừa Lừa đảo Trên Không gian mạng Cấp Xã',
        issueDate: '2026-09-21',
        certNumber: 'GCN-AB-2026-0089',
        courseCategory: 'Chuyển đổi số',
        score: 90
      }
    ],
    notes: 'Nông dân sản xuất giỏi tiêu biểu Ấp Bình Thuận 1, tích cực tham gia học trực tuyến'
  },
  {
    id: 'prog-02',
    studentName: 'Trần Thị Mai',
    studentPhone: '0977.888.999',
    hamlet: 'Ấp Bình Thuận 2',
    userId: 'acc-user-02',
    registeredDate: '2026-03-10',
    totalClassesAttended: 4,
    totalLecturesCompleted: 2,
    totalQuizzesPassed: 2,
    averageScore: 90,
    lastActive: '2026-09-22 19:35',
    completedLectureIds: ['video-cadimi-01', 'video-lua-dao-03'],
    attendedClassIds: ['room-meet-01', 'room-zoom-02'],
    certificatesEarned: [
      {
        id: 'cert-03',
        title: 'An toàn Số & Kỹ năng Giao dịch Điện tử Nông thôn',
        issueDate: '2026-09-21',
        certNumber: 'GCN-AB-2026-0091',
        courseCategory: 'Kỹ năng số',
        score: 90
      }
    ],
    notes: 'Hội viên Hội Phụ nữ ấp, gương điển hình học tập thường xuyên'
  },
  {
    id: 'prog-03',
    studentName: 'Lê Văn Bảy',
    studentPhone: '0933.123.456',
    hamlet: 'Ấp An Long',
    registeredDate: '2026-03-15',
    totalClassesAttended: 3,
    totalLecturesCompleted: 2,
    totalQuizzesPassed: 2,
    averageScore: 85,
    lastActive: '2026-09-21 15:10',
    completedLectureIds: ['video-lua-dao-03', 'video-dich-vu-cong-04'],
    attendedClassIds: ['sch-02'],
    certificatesEarned: [
      {
        id: 'cert-04',
        title: 'Kỹ năng Khai thác Dịch vụ Công Trực tuyến & Ứng dụng VNeID',
        issueDate: '2026-09-18',
        certNumber: 'GCN-AB-2026-0076',
        courseCategory: 'Dịch vụ công',
        score: 85
      }
    ],
    notes: 'Học viên lớn tuổi chuyên cần, sử dụng thành thạo điện thoại thông minh'
  },
  {
    id: 'prog-04',
    studentName: 'Nguyễn Khánh Nguyên',
    studentPhone: '0901.215.418',
    hamlet: 'Ấp An Thạnh',
    registeredDate: '2026-03-05',
    totalClassesAttended: 6,
    totalLecturesCompleted: 3,
    totalQuizzesPassed: 3,
    averageScore: 98,
    lastActive: '2026-09-22 19:40',
    completedLectureIds: ['video-cadimi-01', 'video-thu-phan-02', 'video-lua-dao-03'],
    attendedClassIds: ['sch-khuyen-nong-cd-2026', 'room-meet-01', 'sch-oneai-2026'],
    certificatesEarned: [
      {
        id: 'cert-05',
        title: 'Năng lực Hoạt động Tổ Khuyến nông Cộng đồng Cơ sở',
        issueDate: '2026-08-15',
        certNumber: 'GCN-AB-2026-0012',
        courseCategory: 'Khuyến nông cộng đồng',
        score: 100
      }
    ],
    notes: 'Thành viên cốt cán Tổ Khuyến nông cộng đồng Xã Long Hồ'
  },
  {
    id: 'prog-05',
    studentName: 'Đặng Thị Hoa',
    studentPhone: '0908.777.654',
    hamlet: 'Ấp Bình Đông',
    registeredDate: '2026-03-12',
    totalClassesAttended: 3,
    totalLecturesCompleted: 2,
    totalQuizzesPassed: 2,
    averageScore: 92,
    lastActive: '2026-09-20 20:15',
    completedLectureIds: ['video-cadimi-01', 'video-thu-phan-02'],
    attendedClassIds: ['room-meet-01'],
    certificatesEarned: [
      {
        id: 'cert-06',
        title: 'Thực hành Bón phân Hữu cơ Sinh học Cây ăn trái Đặc sản',
        issueDate: '2026-09-20',
        certNumber: 'GCN-AB-2026-0055',
        courseCategory: 'Nông nghiệp sạch',
        score: 95
      }
    ],
    notes: 'Chủ vườn bưởi da xanh và sầu riêng hữu cơ'
  },
  {
    id: 'prog-06',
    studentName: 'Huỳnh Thanh Liêm',
    studentPhone: '0939.888.222',
    hamlet: 'Ấp An Hòa',
    registeredDate: '2026-03-08',
    totalClassesAttended: 4,
    totalLecturesCompleted: 1,
    totalQuizzesPassed: 1,
    averageScore: 90,
    lastActive: '2026-09-22 07:45',
    completedLectureIds: ['video-lua-dao-03'],
    attendedClassIds: ['sch-oneai-2026'],
    certificatesEarned: [],
    notes: 'Bí thư Chi bộ Ấp An Hòa, tích cực đôn đốc nhân dân học tập'
  },
  {
    id: 'prog-07',
    studentName: 'Phan Văn Út',
    studentPhone: '0919.456.789',
    hamlet: 'Ấp Bình Tây',
    registeredDate: '2026-03-18',
    totalClassesAttended: 2,
    totalLecturesCompleted: 1,
    totalQuizzesPassed: 1,
    averageScore: 88,
    lastActive: '2026-09-18 21:05',
    completedLectureIds: ['video-thu-phan-02'],
    attendedClassIds: ['room-meet-01'],
    certificatesEarned: [],
    notes: 'Học viên mới tham gia mô hình chuyển đổi cây trồng'
  }
];

export const INITIAL_COURSE_EXAMS: CourseExam[] = [
  {
    id: 'exam-saurieng-01',
    title: 'Đánh giá cuối khóa: Kỹ thuật Xử lý Sầu riêng Ra hoa Nghịch vụ & Quản lý Thối rễ',
    courseCode: 'SR-2026-N01',
    courseName: 'Kỹ thuật Xử lý Sầu riêng Ra hoa Nghịch vụ & Quản lý Thối rễ Vàng lá',
    category: 'Khuyến nông - Cây ăn trái',
    durationMinutes: 15,
    passingScore: 70,
    totalQuestions: 5,
    description: 'Bài kiểm tra trắc nghiệm đánh giá kiến thức sau khi tham gia các buổi học trực tuyến và xem bài giảng video chuyên đề sầu riêng Xã Long Hồ.',
    createdAt: '2026-03-15',
    isActive: true,
    instructor: 'TS. Nguyễn Văn Năm (Viện Cây ăn quả Miền Nam)',
    questions: [
      {
        id: 'q-sr-1',
        question: 'Biện pháp kỹ thuật nào sau đây là quan trọng hàng đầu khi bắt đầu tiến hành xiết nước tạo khô hạn kích thích mầm hoa sầu riêng?',
        options: [
          'Bón thật nhiều phân đạm urê để cây sung sức',
          'Vét sâu mương rãnh, quét dọn sạch cỏ rác mặt liếp và đậy màng phủ nilon nông nghiệp',
          'Tưới đẫm nước 2 lần mỗi ngày để giữ ẩm',
          'Phun thuốc trừ cỏ cháy đậm đặc trực tiếp vào gốc'
        ],
        correctAnswerIndex: 1,
        explanation: 'Vét rãnh thoát nước và đậy bạt nilon giúp cô lập triệt để độ ẩm của đất, đưa rễ cây vào trạng thái sốc khô hạn để phân hóa mầm hoa hiệu quả nhất.'
      },
      {
        id: 'q-sr-2',
        question: 'Thời điểm vàng thích hợp nhất trong ngày để nhà vườn quét phấn bổ sung (thụ phấn nhân tạo) cho chùm hoa sầu riêng là khi nào?',
        options: [
          'Vào buổi sáng sớm từ 05h00 đến 06h30',
          'Vào ban đêm từ 18h00 đến 21h00 khi bao phấn nứt và hoa nở rộ',
          'Vào buổi trưa lúc nắng gắt nhất (11h30 - 13h00)',
          'Vào buổi chiều lúc 14h00 khi trời râm mát'
        ],
        correctAnswerIndex: 1,
        explanation: 'Hoa sầu riêng thụ phấn nhờ gió hoặc côn trùng ban đêm. Thời điểm từ 18h00 - 21h00 bao phấn nứt giải phóng hạt phấn mạnh nhất và nhụy cái tiết dịch bám dính tốt nhất.'
      },
      {
        id: 'q-sr-3',
        question: 'Nấm Phytophthora palmivora gây bệnh nứt thân xì mủ và thối rễ sầu riêng phát triển mạnh nhất trong điều kiện môi trường nào?',
        options: [
          'Mùa khô hạn kéo dài, nắng nóng trên 38 độ C',
          'Vườn ngập úng, độ ẩm đất bão hòa cao và pH đất bị chua hóa (pH < 5.0)',
          'Đất thịt nhẹ tơi xốp có độ pH kiềm',
          'Vườn có đầy đủ ánh sáng và hệ thống thoát nước sâu'
        ],
        correctAnswerIndex: 1,
        explanation: 'Độ ẩm đất ngập úng mùa mưa bão và pH đất thấp (< 5.0) tạo điều kiện cho bào tử nấm Phytophthora bơi lội và xâm nhập vào các vết nứt ở vỏ rễ.'
      },
      {
        id: 'q-sr-4',
        question: 'Để phòng trừ bền vững bệnh thối rễ xì mủ theo hướng VietGAP sinh học, biện pháp nào được chuyên gia khuyến cáo hàng đầu?',
        options: [
          'Rải muối hột nguyên chất vào quanh gốc cây',
          'Quét vôi tôi kết hợp bổ sung nấm đối kháng Trichoderma và phân chuồng hoai mục',
          'Đổ dầu nhớt xe máy quanh vùng rễ',
          'Tưới thuốc cỏ lưu dẫn liều cao'
        ],
        correctAnswerIndex: 1,
        explanation: 'Quét vôi nâng pH, sát trùng vỏ thân và duy trì hệ vi sinh đối kháng Trichoderma cùng chất hữu cơ giúp ức chế mầm bệnh Phytophthora tự nhiên.'
      },
      {
        id: 'q-sr-5',
        question: 'Khi cây sầu riêng đang nuôi trái non (giai đoạn rụng sinh lý lần 2), nếu cây xuất hiện đọt non đồng loạt thì nhà vườn cần xử lý thế nào để không bị rụng trái?',
        options: [
          'Bón thêm phân đạm urê liều cao để nuôi cả đọt và trái',
          'Phun phân bón lá Kali - Bo hoặc hoạt chất chặn/hãm đọt nhẹ để tập trung dinh dưỡng nuôi trái',
          'Vặt bỏ hết toàn bộ trái non trên cây để bảo vệ bộ lá',
          'Tưới thật nhiều nước liên tục suốt 24 giờ'
        ],
        correctAnswerIndex: 1,
        explanation: 'Sự cạnh tranh dinh dưỡng giữa đọt lá non và trái non là nguyên nhân chính khiến cây đào thải rụng trái non. Cần hãm đọt hoặc dìu đọt hợp lý bằng dinh dưỡng Kali và vi lượng Bo.'
      }
    ]
  },
  {
    id: 'exam-vneid-02',
    title: 'Kiểm tra cuối khóa: Định danh Điện tử VNeID Mức 2 & Dịch vụ Công Trực tuyến Xã Long Hồ',
    courseCode: 'CDS-2026-N02',
    courseName: 'Tập huấn Kỹ năng số: VNeID mức 2, Dịch vụ công trực tuyến & Thanh toán không dùng tiền mặt',
    category: 'Chuyển đổi số cộng đồng',
    durationMinutes: 15,
    passingScore: 70,
    totalQuestions: 5,
    description: 'Đánh giá kỹ năng sử dụng tài khoản định danh VNeID mức 2 trong thực hiện thủ tục hành chính, tra cứu BHYT, GPLX và thanh toán không dùng tiền mặt.',
    createdAt: '2026-03-18',
    isActive: true,
    instructor: 'Đồng chí Đại úy Trần Quốc Toàn (Công an Xã Long Hồ)',
    questions: [
      {
        id: 'q-vn-1',
        question: 'Để kích hoạt tài khoản định danh điện tử VNeID mức độ 2, công dân cần thực hiện bước nào bắt buộc?',
        options: [
          'Chỉ cần tự cài ứng dụng trên điện thoại rồi chụp ảnh tại nhà',
          'Trực tiếp đến Công an Xã Long Hồ hoặc Công an huyện Long Hồ để thu nhận vân tay và ảnh khuôn mặt',
          'Nhờ người khác đăng ký thay qua mạng xã hội',
          'Gửi tin nhắn SMS đến tổng đài viễn thông'
        ],
        correctAnswerIndex: 1,
        explanation: 'Tài khoản mức 2 yêu cầu thông tin sinh trắc học (vân tay, khuôn mặt) đối chiếu trực tiếp với cơ sở dữ liệu quốc gia về dân cư tại cơ quan Công an.'
      },
      {
        id: 'q-vn-2',
        question: 'Ví giấy tờ trên ứng dụng VNeID mức 2 có thể tích hợp và sử dụng thay thế bản gốc cho những loại giấy tờ nào khi giao dịch hành chính?',
        options: [
          'Chỉ duy nhất thẻ BHYT học sinh',
          'Thẻ Căn cước, Thẻ BHYT, Giấy phép lái xe, Thông tin cư trú hộ gia đình, Đăng ký xe',
          'Sổ đỏ quyền sử dụng đất và hộ chiếu quốc tế của người khác',
          'Chỉ có giá trị lưu giữ hình ảnh kỷ niệm, không có giá trị pháp lý'
        ],
        correctAnswerIndex: 1,
        explanation: 'Căn cứ Nghị định 59/2022/NĐ-CP và Luật Căn cước, các giấy tờ đã tích hợp thành công trên VNeID mức 2 có giá trị pháp lý tương đương bản giấy khi làm thủ tục.'
      },
      {
        id: 'q-vn-3',
        question: 'Khi nộp hồ sơ dịch vụ công trực tuyến cấp xã (như đăng ký kết hôn, khai sinh, xác nhận cư trú), công dân Xã Long Hồ đăng nhập bằng phương thức nào?',
        options: [
          'Đăng nhập bằng tài khoản VNeID',
          'Đăng nhập bằng tài khoản mạng xã hội Facebook',
          'Chỉ có thể nộp đơn viết tay trực tiếp tại Bộ phận Một cửa',
          'Gửi thư qua đường bưu điện không cần đăng nhập'
        ],
        correctAnswerIndex: 0,
        explanation: 'Hiện nay Cổng Dịch vụ công Quốc gia và Hệ thống thông tin giải quyết thủ tục hành chính tỉnh Vĩnh Long sử dụng duy nhất tài khoản VNeID để xác thực danh tính công dân.'
      },
      {
        id: 'q-vn-4',
        question: 'Hành động nào sau đây là NGUY HIỂM và TUYỆT ĐỐI KHÔNG ĐƯỢC THỰC HIỆN liên quan đến tài khoản VNeID?',
        options: [
          'Đổi mật khẩu định kỳ 6 tháng một lần',
          'Cung cấp mật khẩu đăng nhập, mã OTP hoặc mã Passcode cho người lạ qua điện thoại tự xưng là cán bộ',
          'Bật tính năng xác thực bằng vân tay hoặc nhận diện khuôn mặt trên máy điện thoại cá nhân',
          'Kiểm tra lịch sử đăng nhập thiết bị thường xuyên'
        ],
        correctAnswerIndex: 1,
        explanation: 'Cơ quan chức năng tuyệt đối KHÔNG BAO GIỜ yêu cầu công dân cung cấp mã OTP hay mật khẩu qua điện thoại. Mọi yêu cầu cung cấp OTP đều là thủ đoạn lừa đảo chiếm đoạt tài khoản.'
      },
      {
        id: 'q-vn-5',
        question: 'Người dân Xã Long Hồ có thể đến đâu để được Tổ Công nghệ số cộng đồng hướng dẫn cài đặt và sử dụng VNeID hoàn toàn miễn phí?',
        options: [
          'Trụ sở UBND Xã Long Hồ, Nhà sinh hoạt văn hóa các ấp hoặc Trung tâm HTCĐ Xã',
          'Các tiệm cầm đồ tư nhân',
          'Quán cà phê có thu phí dịch vụ cao',
          'Không có nơi nào hỗ trợ trực tiếp'
        ],
        correctAnswerIndex: 0,
        explanation: 'Tổ Công nghệ số cộng đồng tại các ấp và Bộ phận Một cửa UBND Xã Long Hồ luôn sẵn sàng hỗ trợ bà con cài đặt, kích hoạt miễn phí.'
      }
    ]
  },
  {
    id: 'exam-chan-nuoi-03',
    title: 'Đánh giá cuối khóa: Kỹ thuật Chăn nuôi Dê Nhốt chuồng & Chế biến Thức ăn Ủ chua',
    courseCode: 'CN-2026-N03',
    courseName: 'Chăn nuôi Dê nhốt chuồng & Ứng dụng chế phẩm EM ủ chua phụ phẩm nông nghiệp',
    category: 'Đào tạo nghề nông thôn',
    durationMinutes: 15,
    passingScore: 70,
    totalQuestions: 5,
    description: 'Kiểm tra quy trình làm chuồng trại cao ráo, kỹ thuật phối giống dê Boer/Bách Thảo và công thức ủ chua cỏ voi, bắp, bã đậu nành bằng men vi sinh.',
    createdAt: '2026-03-20',
    isActive: true,
    instructor: 'KS. Lê Văn Hoàng (Trạm Chăn nuôi & Thú y Huyện Long Hồ)',
    questions: [
      {
        id: 'q-cn-1',
        question: 'Quy cách thiết kế sàn chuồng nuôi dê nhốt chuồng đạt chuẩn kỹ thuật vệ sinh dịch bệnh là gì?',
        options: [
          'Sàn đắp bằng bùn đất ướt nhão sát mặt nước',
          'Sàn làm bằng nan gỗ hoặc tre, cách mặt đất từ 0.8m - 1.2m, khe hở giữa các thanh sàn rộng 1.5 - 2cm',
          'Sàn kín mít không có khe thoát phân và nước tiểu',
          'Để dê nằm chung với chuồng nuôi trâu bò'
        ],
        correctAnswerIndex: 1,
        explanation: 'Sàn chuồng cao ráo, khe hở 1.5 - 2cm vừa đủ để phân và nước tiểu lọt xuống mà không làm kẹt móng chân dê, giữ chuồng luôn khô ráo, tránh bệnh thối móng.'
      },
      {
        id: 'q-cn-2',
        question: 'Thức ăn xanh đem ủ chua làm thức ăn cho đàn dê cần đạt độ ẩm thích hợp khoảng bao nhiêu trước khi đóng túi nén chặt?',
        options: [
          'Độ ẩm 95% (vừa vớt dưới nước lên, còn ướt sũng)',
          'Độ ẩm tối ưu khoảng 60% - 70% (cỏ băm xong phơi tái nhẹ, nắm chặt tay không rỉ nước ra kẽ tay)',
          'Độ ẩm 10% (phơi khô giòn vụn)',
          'Không cần quan tâm đến độ ẩm'
        ],
        correctAnswerIndex: 1,
        explanation: 'Độ ẩm 60-70% là môi trường lý tưởng cho vi khuẩn lên men Lactic phát triển, nếu ướt quá cỏ sẽ bị thối nhũn, nếu khô quá vi sinh vật không lên men được.'
      },
      {
        id: 'q-cn-3',
        question: 'Thành phần phụ gia nào sau đây được sử dụng để kích thích vi sinh vật lên men nhanh và tạo mùi thơm chua ngọt khi ủ thức ăn gia súc?',
        options: [
          'Thuốc trừ sâu dạng sữa',
          'Rỉ mật đường (hoặc nước mật mía, đường tán) và men vi sinh EM',
          'Bột giặt và xà phòng',
          'Cồn công nghiệp 90 độ'
        ],
        correctAnswerIndex: 1,
        explanation: 'Rỉ mật đường cung cấp nguồn đường năng lượng ban đầu cho vi khuẩn Lactic nhân sinh khối nhanh chóng, giúp thức ăn ủ chua đạt chất lượng thơm ngon.'
      },
      {
        id: 'q-cn-4',
        question: 'Dấu hiệu nào sau đây chứng tỏ bao thức ăn ủ chua đã thành công và đạt chất lượng tốt để cho dê ăn?',
        options: [
          'Cỏ mốc đen, chảy nước hôi thối nồng nặc',
          'Cỏ chuyển sang màu vàng tươi hoặc vàng nâu cánh gián, có mùi thơm chua dễ chịu của giấm hoặc dưa muối',
          'Bao ủ sinh nhiệt rất nóng, cháy khét thành than',
          'Mọc đầy nấm mốc trắng xám dạng mạng nhện'
        ],
        correctAnswerIndex: 1,
        explanation: 'Thức ăn ủ đạt chuẩn có màu vàng sáng, vị chua dịu nhẹ, dê rất thích ăn và hấp thu tiêu hóa dinh dưỡng triệt để.'
      },
      {
        id: 'q-cn-5',
        question: 'Để phòng ngừa bệnh tụ huyết trùng và viêm ruột hoại tử cho đàn dê con mới tách mẹ, cần lưu ý tiêm phòng định kỳ vào thời điểm nào?',
        options: [
          'Không bao giờ cần tiêm phòng vắc-xin cho dê',
          'Tiêm vắc-xin phòng bệnh lúc dê đạt 1 - 2 tháng tuổi và nhắc lại định kỳ 6 tháng/lần',
          'Chỉ tiêm khi dê đã sắp chết',
          'Cho dê uống nước đá lạnh thay cho tiêm phòng'
        ],
        correctAnswerIndex: 1,
        explanation: 'Tiêm phòng vắc-xin chủ động khi kháng thể mẹ truyền suy giảm (1-2 tháng tuổi) giúp tạo miễn dịch bảo vệ dê phát triển khỏe mạnh không hao hụt.'
      }
    ]
  },
  {
    id: 'exam-lua-dao-04',
    title: 'Đánh giá cuối khóa: Phòng chống Tội phạm Lừa đảo Công nghệ cao trên Không gian mạng',
    courseCode: 'PL-2026-N04',
    courseName: 'Kỹ năng Nhận diện Lừa đảo qua Mạng xã hội, Tin nhắn Brandname & Cuộc gọi mạo danh',
    category: 'Pháp luật & An ninh trật tự',
    durationMinutes: 15,
    passingScore: 70,
    totalQuestions: 5,
    description: 'Đánh giá mức độ nhận thức của người dân về các thủ đoạn giả danh công an, tòa án, lừa đảo việc làm online, mượn tiền qua Facebook và lừa đảo cài app mã độc.',
    createdAt: '2026-03-21',
    isActive: true,
    instructor: 'Trung tá Nguyễn Hoàng Nam (Đội An ninh Mạng & Phòng chống tội phạm công nghệ cao)',
    questions: [
      {
        id: 'q-ld-1',
        question: 'Nếu nhận được cuộc gọi tự xưng là cán bộ Công an, Viện kiểm sát thông báo bạn có liên quan đến đường dây rửa tiền và yêu cầu chuyển tiền vào tài khoản "tạm giữ" để chứng minh, bạn phải làm gì?',
        options: [
          'Lập tức ra ngân hàng rút toàn bộ tiền tiết kiệm chuyển theo hướng dẫn để tránh bị bắt',
          'Tuyệt đối không làm theo, cúp máy ngay và báo cho Công an Xã Long Hồ hoặc đường dây nóng',
          'Cung cấp thông tin thẻ ngân hàng và mã OTP cho đối tượng',
          'Vay nóng mượn tiền người thân để chuyển ngay cho đối tượng'
        ],
        correctAnswerIndex: 1,
        explanation: 'Cơ quan Công an, Tòa án, Viện kiểm sát KHÔNG BAO GIỜ làm việc hay yêu cầu chuyển tiền qua điện thoại. Mọi cuộc gọi yêu cầu chuyển tiền vào tài khoản tạm giữ đều là lừa đảo 100%.'
      },
      {
        id: 'q-ld-2',
        question: 'Công nghệ Deepfake mà các đối tượng lừa đảo thường dùng để gọi video mượn tiền có đặc điểm nhận diện nào sau đây?',
        options: [
          'Khuôn mặt có vẻ gượng gạo, cử động mắt chớp giật bất thường, âm thanh ngắt quãng và cuộc gọi thường kết thúc rất nhanh lấy lý do sóng yếu',
          'Hình ảnh nét căng 4K và có thể nói chuyện trực tiếp cả ngày',
          'Giọng nói của người ngoài hành tinh',
          'Không thể nhận biết được bằng mắt thường'
        ],
        correctAnswerIndex: 0,
        explanation: 'Deepfake AI ghép mặt và giả giọng thường có độ trễ, mắt chớp thiếu tự nhiên, hình ảnh méo mó khi quay góc nghiêng và luôn tìm cách ngắt máy nhanh để tránh lộ tẩy.'
      },
      {
        id: 'q-ld-3',
        question: 'Thủ đoạn "Tuyển cộng tác viên online làm nhiệm vụ giật đơn hàng Shopee/Lazada hưởng hoa hồng 20-30%" có bản chất thực sự là gì?',
        options: [
          'Là cơ hội làm giàu uy tín của các tập đoàn thương mại điện tử lớn',
          'Là bẫy lừa đảo tài chính: Ban đầu thả mồi vài chục ngàn tiền hoa hồng, sau đó yêu cầu nạp tiền số tiền lớn rồi chiếm đoạt',
          'Chương trình hỗ trợ việc làm của Nhà nước cho thanh niên nông thôn',
          'Một hình thức từ thiện quốc tế'
        ],
        correctAnswerIndex: 1,
        explanation: 'Các sàn TMĐT chính thống đều không tuyển CTV giật đơn online qua tin nhắn rác Telegram/Zalo. Đây là thủ đoạn lừa nạp tiền làm nhiệm vụ rất phổ biến.'
      },
      {
        id: 'q-ld-4',
        question: 'Khi nhận được đường link lạ qua tin nhắn SMS hoặc Zalo/Facebook yêu cầu nhấn vào để nhận tiền hỗ trợ chính sách hoặc cập nhật thông tin căn cước, bạn nên làm gì?',
        options: [
          'Nhấn vào ngay và nhập tài khoản ngân hàng cùng mã OTP',
          'Không bấm vào đường link lạ, không tải các file đuôi .apk cài đặt vào điện thoại',
          'Chuyển tiếp tin nhắn cho tất cả người thân trong gia đình cùng bấm',
          'Tải ứng dụng lạ về cài đặt cho con nhỏ chơi game'
        ],
        correctAnswerIndex: 1,
        explanation: 'Đường link lạ thường cài mã độc chiếm quyền điều khiển điện thoại (accessibility) để tự động rút tiền trong tài khoản ngân hàng của nạn nhân.'
      },
      {
        id: 'q-ld-5',
        question: 'Nếu phát hiện bản thân hoặc người thân trong ấp bị lừa đảo chuyển tiền qua tài khoản ngân hàng, việc cần làm ngay lập tức trong những phút đầu tiên là gì?',
        options: [
          'Im lặng giấu kín vì sợ xấu hổ với bà con chòm xóm',
          'Gọi điện ngay cho tổng đài ngân hàng yêu cầu khóa khẩn cấp tài khoản/thẻ và đến ngay Công an Xã Long Hồ để trình báo',
          'Tìm kiếm các dịch vụ "thu hồi tiền lừa đảo" trôi nổi trên mạng Facebook',
          'Xóa toàn bộ tin nhắn và lịch sử giao dịch'
        ],
        correctAnswerIndex: 1,
        explanation: 'Hành động khóa thẻ/tài khoản ngay lập tức với ngân hàng có cơ hội ngăn chặn dòng tiền tẩu tán, đồng thời bảo toàn chứng cứ sao kê phục vụ cơ quan điều tra.'
      }
    ]
  }
];

export const INITIAL_EXAM_SUBMISSIONS: ExamSubmission[] = [
  {
    id: 'sub-01',
    examId: 'exam-saurieng-01',
    examTitle: 'Đánh giá cuối khóa: Kỹ thuật Xử lý Sầu riêng Ra hoa Nghịch vụ & Quản lý Thối rễ',
    courseName: 'Kỹ thuật Xử lý Sầu riêng Ra hoa Nghịch vụ & Quản lý Thối rễ Vàng lá',
    studentName: 'Nguyễn Văn Năm',
    studentPhone: '0918.234.567',
    hamlet: 'Ấp Bình Thuận 1',
    userId: 'user-02',
    selectedAnswers: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1 },
    score: 100,
    correctCount: 5,
    totalCount: 5,
    isPassed: true,
    timeSpentSeconds: 420,
    submittedAt: '2026-03-21 14:35:20',
    certificateCode: 'GCN-AB-2026-0101'
  },
  {
    id: 'sub-02',
    examId: 'exam-vneid-02',
    examTitle: 'Kiểm tra cuối khóa: Định danh Điện tử VNeID Mức 2 & Dịch vụ Công Trực tuyến Xã Long Hồ',
    courseName: 'Tập huấn Kỹ năng số: VNeID mức 2, Dịch vụ công trực tuyến & Thanh toán không dùng tiền mặt',
    studentName: 'Trần Thị Mai',
    studentPhone: '0987.654.321',
    hamlet: 'Ấp An Hòa',
    userId: 'user-03',
    selectedAnswers: { 0: 1, 1: 1, 2: 0, 3: 1, 4: 0 },
    score: 100,
    correctCount: 5,
    totalCount: 5,
    isPassed: true,
    timeSpentSeconds: 380,
    submittedAt: '2026-03-21 16:10:05',
    certificateCode: 'GCN-AB-2026-0102'
  },
  {
    id: 'sub-03',
    examId: 'exam-chan-nuoi-03',
    examTitle: 'Đánh giá cuối khóa: Kỹ thuật Chăn nuôi Dê Nhốt chuồng & Chế biến Thức ăn Ủ chua',
    courseName: 'Chăn nuôi Dê nhốt chuồng & Ứng dụng chế phẩm EM ủ chua phụ phẩm nông nghiệp',
    studentName: 'Lê Hoàng Phong',
    studentPhone: '0977.123.456',
    hamlet: 'Ấp Bình Thuận 2',
    selectedAnswers: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1 },
    score: 100,
    correctCount: 5,
    totalCount: 5,
    isPassed: true,
    timeSpentSeconds: 510,
    submittedAt: '2026-03-22 09:20:15',
    certificateCode: 'GCN-AB-2026-0103'
  },
  {
    id: 'sub-04',
    examId: 'exam-lua-dao-04',
    examTitle: 'Đánh giá cuối khóa: Phòng chống Tội phạm Lừa đảo Công nghệ cao trên Không gian mạng',
    courseName: 'Kỹ năng Nhận diện Lừa đảo qua Mạng xã hội, Tin nhắn Brandname & Cuộc gọi mạo danh',
    studentName: 'Phạm Thị Lan',
    studentPhone: '0903.456.789',
    hamlet: 'Ấp Bình Đông',
    selectedAnswers: { 0: 1, 1: 0, 2: 1, 3: 1, 4: 1 },
    score: 100,
    correctCount: 5,
    totalCount: 5,
    isPassed: true,
    timeSpentSeconds: 360,
    submittedAt: '2026-03-22 10:15:30',
    certificateCode: 'GCN-AB-2026-0104'
  },
  {
    id: 'sub-05',
    examId: 'exam-saurieng-01',
    examTitle: 'Đánh giá cuối khóa: Kỹ thuật Xử lý Sầu riêng Ra hoa Nghịch vụ & Quản lý Thối rễ',
    courseName: 'Kỹ thuật Xử lý Sầu riêng Ra hoa Nghịch vụ & Quản lý Thối rễ Vàng lá',
    studentName: 'Huỳnh Thanh Liêm',
    studentPhone: '0939.888.222',
    hamlet: 'Ấp An Hòa',
    selectedAnswers: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 0 },
    score: 80,
    correctCount: 4,
    totalCount: 5,
    isPassed: true,
    timeSpentSeconds: 490,
    submittedAt: '2026-03-22 11:40:12',
    certificateCode: 'GCN-AB-2026-0105'
  },
  {
    id: 'sub-06',
    examId: 'exam-vneid-02',
    examTitle: 'Kiểm tra cuối khóa: Định danh Điện tử VNeID Mức 2 & Dịch vụ Công Trực tuyến Xã Long Hồ',
    courseName: 'Tập huấn Kỹ năng số: VNeID mức 2, Dịch vụ công trực tuyến & Thanh toán không dùng tiền mặt',
    studentName: 'Võ Minh Tâm',
    studentPhone: '0945.678.901',
    hamlet: 'Ấp An Lợi',
    selectedAnswers: { 0: 1, 1: 1, 2: 0, 3: 1, 4: 1 },
    score: 80,
    correctCount: 4,
    totalCount: 5,
    isPassed: true,
    timeSpentSeconds: 430,
    submittedAt: '2026-03-22 14:05:44',
    certificateCode: 'GCN-AB-2026-0106'
  },
  {
    id: 'sub-07',
    examId: 'exam-chan-nuoi-03',
    examTitle: 'Đánh giá cuối khóa: Kỹ thuật Chăn nuôi Dê Nhốt chuồng & Chế biến Thức ăn Ủ chua',
    courseName: 'Chăn nuôi Dê nhốt chuồng & Ứng dụng chế phẩm EM ủ chua phụ phẩm nông nghiệp',
    studentName: 'Phan Văn Út',
    studentPhone: '0919.456.789',
    hamlet: 'Ấp Bình Tây',
    selectedAnswers: { 0: 1, 1: 1, 2: 0, 3: 1, 4: 1 },
    score: 80,
    correctCount: 4,
    totalCount: 5,
    isPassed: true,
    timeSpentSeconds: 520,
    submittedAt: '2026-03-22 15:30:10',
    certificateCode: 'GCN-AB-2026-0107'
  }
];

export const INITIAL_COURSE_COMPLETIONS: CourseCompletion[] = [
  {
    id: 'comp-01',
    studentName: 'Nguyễn Văn Năm',
    studentPhone: '0918.234.567',
    hamlet: 'Ấp Bình Thuận 1',
    userId: 'user-02',
    courseName: 'Kỹ thuật Xử lý Sầu riêng Ra hoa Nghịch vụ & Quản lý Thối rễ Vàng lá',
    courseId: 'SR-2026-N01',
    examId: 'exam-saurieng-01',
    examTitle: 'Đánh giá cuối khóa: Kỹ thuật Xử lý Sầu riêng Ra hoa Nghịch vụ & Quản lý Thối rễ',
    finalScore: 100,
    grade: 'Xuất Sắc',
    completedDate: '2026-03-21',
    certificateCode: 'GCN-AB-2026-0101',
    status: 'da-cap-chung-nhan',
    issuedBy: 'Ban Giám Đốc Trung Tâm Học Tập Cộng Đồng Xã Long Hồ'
  },
  {
    id: 'comp-02',
    studentName: 'Trần Thị Mai',
    studentPhone: '0987.654.321',
    hamlet: 'Ấp An Hòa',
    userId: 'user-03',
    courseName: 'Tập huấn Kỹ năng số: VNeID mức 2, Dịch vụ công trực tuyến & Thanh toán không dùng tiền mặt',
    courseId: 'CDS-2026-N02',
    examId: 'exam-vneid-02',
    examTitle: 'Kiểm tra cuối khóa: Định danh Điện tử VNeID Mức 2 & Dịch vụ Công Trực tuyến Xã Long Hồ',
    finalScore: 100,
    grade: 'Xuất Sắc',
    completedDate: '2026-03-21',
    certificateCode: 'GCN-AB-2026-0102',
    status: 'da-cap-chung-nhan',
    issuedBy: 'Ban Giám Đốc Trung Tâm Học Tập Cộng Đồng Xã Long Hồ'
  },
  {
    id: 'comp-03',
    studentName: 'Lê Hoàng Phong',
    studentPhone: '0977.123.456',
    hamlet: 'Ấp Bình Thuận 2',
    courseName: 'Chăn nuôi Dê nhốt chuồng & Ứng dụng chế phẩm EM ủ chua phụ phẩm nông nghiệp',
    courseId: 'CN-2026-N03',
    examId: 'exam-chan-nuoi-03',
    examTitle: 'Đánh giá cuối khóa: Kỹ thuật Chăn nuôi Dê Nhốt chuồng & Chế biến Thức ăn Ủ chua',
    finalScore: 100,
    grade: 'Xuất Sắc',
    completedDate: '2026-03-22',
    certificateCode: 'GCN-AB-2026-0103',
    status: 'da-cap-chung-nhan',
    issuedBy: 'Ban Giám Đốc Trung Tâm Học Tập Cộng Đồng Xã Long Hồ'
  },
  {
    id: 'comp-04',
    studentName: 'Phạm Thị Lan',
    studentPhone: '0903.456.789',
    hamlet: 'Ấp Bình Đông',
    courseName: 'Kỹ năng Nhận diện Lừa đảo qua Mạng xã hội, Tin nhắn Brandname & Cuộc gọi mạo danh',
    courseId: 'PL-2026-N04',
    examId: 'exam-lua-dao-04',
    examTitle: 'Đánh giá cuối khóa: Phòng chống Tội phạm Lừa đảo Công nghệ cao trên Không gian mạng',
    finalScore: 100,
    grade: 'Xuất Sắc',
    completedDate: '2026-03-22',
    certificateCode: 'GCN-AB-2026-0104',
    status: 'da-cap-chung-nhan',
    issuedBy: 'Ban Giám Đốc Trung Tâm Học Tập Cộng Đồng Xã Long Hồ'
  },
  {
    id: 'comp-05',
    studentName: 'Huỳnh Thanh Liêm',
    studentPhone: '0939.888.222',
    hamlet: 'Ấp An Hòa',
    courseName: 'Kỹ thuật Xử lý Sầu riêng Ra hoa Nghịch vụ & Quản lý Thối rễ Vàng lá',
    courseId: 'SR-2026-N01',
    examId: 'exam-saurieng-01',
    examTitle: 'Đánh giá cuối khóa: Kỹ thuật Xử lý Sầu riêng Ra hoa Nghịch vụ & Quản lý Thối rễ',
    finalScore: 80,
    grade: 'Giỏi',
    completedDate: '2026-03-22',
    certificateCode: 'GCN-AB-2026-0105',
    status: 'da-cap-chung-nhan',
    issuedBy: 'Ban Giám Đốc Trung Tâm Học Tập Cộng Đồng Xã Long Hồ'
  },
  {
    id: 'comp-06',
    studentName: 'Võ Minh Tâm',
    studentPhone: '0945.678.901',
    hamlet: 'Ấp An Lợi',
    courseName: 'Tập huấn Kỹ năng số: VNeID mức 2, Dịch vụ công trực tuyến & Thanh toán không dùng tiền mặt',
    courseId: 'CDS-2026-N02',
    examId: 'exam-vneid-02',
    examTitle: 'Kiểm tra cuối khóa: Định danh Điện tử VNeID Mức 2 & Dịch vụ Công Trực tuyến Xã Long Hồ',
    finalScore: 80,
    grade: 'Giỏi',
    completedDate: '2026-03-22',
    certificateCode: 'GCN-AB-2026-0106',
    status: 'da-cap-chung-nhan',
    issuedBy: 'Ban Giám Đốc Trung Tâm Học Tập Cộng Đồng Xã Long Hồ'
  },
  {
    id: 'comp-07',
    studentName: 'Phan Văn Út',
    studentPhone: '0919.456.789',
    hamlet: 'Ấp Bình Tây',
    courseName: 'Chăn nuôi Dê nhốt chuồng & Ứng dụng chế phẩm EM ủ chua phụ phẩm nông nghiệp',
    courseId: 'CN-2026-N03',
    examId: 'exam-chan-nuoi-03',
    examTitle: 'Đánh giá cuối khóa: Kỹ thuật Chăn nuôi Dê Nhốt chuồng & Chế biến Thức ăn Ủ chua',
    finalScore: 80,
    grade: 'Giỏi',
    completedDate: '2026-03-22',
    certificateCode: 'GCN-AB-2026-0107',
    status: 'da-cap-chung-nhan',
    issuedBy: 'Ban Giám Đốc Trung Tâm Học Tập Cộng Đồng Xã Long Hồ'
  }
];
