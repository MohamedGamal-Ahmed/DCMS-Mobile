
import { Correspondence, Meeting } from './types';

const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

export const initialCorrespondences: Correspondence[] = [
  {
    id: '1',
    code: '26-171',
    title: 'الايميل الوارد بخصوص الاجتماع السنوي الرابع والتسعين للجنة الدولية للسدود الكبيرة بالمكسيك في الفترة من ٢١ مايو الى ٢٩ مايو ٢٠٢٦',
    engineer: 'Eng. Engy',
    transferredTo: 'م / محمد يحيى',
    date: '18/01/2026',
    category: 'Inbound',
    status: 'New',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: '2',
    code: '26-170',
    title: 'مذكرة رئيس قطاع الطرق بخصوص التعاقد مع فرع القناة لتنفيذ أعمال ضمن مشروع البنية الاساسية للمنطقة الصناعية بأبو خليفة - الطريق الشرقي',
    engineer: 'Eng. Engy',
    transferredTo: 'م / منى عثمان',
    date: '18/01/2026',
    category: 'General',
    status: 'New',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: '3',
    code: '26-169',
    title: 'تأشيرة م / العدلاني بخصوص العطاء الخاص بمشروع محطة الضخ بمشروع محطة معالجة محسن بمدينة ايتيو',
    engineer: 'Eng. Hadeer',
    transferredTo: 'م / محمود عبد الفتاح',
    date: '17/01/2026',
    category: 'Inbound',
    status: 'Closed',
    reply: 'تم اضافة موافقة م / العدلاني',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
];

export const initialMeetings: Meeting[] = [
  {
    id: 'm1',
    title: 'مراجعة عقود السطوح - مشروع خط الفوسفات',
    startTime: new Date(currentYear, currentMonth, now.getDate(), 17, 0),
    attendees: 5,
    status: 'Live',
    platform: 'Microsoft Teams',
    location: 'Luchenene and Mutinondo HPP in Zambia',
    meetingLink: 'https://teams.microsoft.com/join'
  },
  {
    id: 'm2',
    title: 'اجتماع اللجنة الفنية لمشروع الضبعة',
    startTime: new Date(currentYear, currentMonth, now.getDate(), 10, 0),
    attendees: 12,
    status: 'Upcoming',
    platform: 'Zoom',
    location: 'قاعة اجتماعات الدور الرابع',
    meetingLink: 'https://zoom.us/j/123456789'
  },
  {
    id: 'm3',
    title: 'مناقشة ميزانية قطاع الطرق',
    startTime: new Date(currentYear, currentMonth, now.getDate() + 1, 11, 30),
    attendees: 8,
    status: 'Upcoming',
    platform: 'مكتب',
    location: 'مكتب رئيس الهيئة'
  },
  {
    id: 'm4',
    title: 'ورشة عمل التحول الرقمي',
    startTime: new Date(currentYear, currentMonth, 15, 9, 0),
    attendees: 20,
    status: 'Upcoming',
    platform: 'Microsoft Teams',
    meetingLink: 'https://teams.microsoft.com'
  },
  {
    id: 'm5',
    title: 'اجتماع تنسيق المشروعات القومية',
    startTime: new Date(currentYear, currentMonth, 22, 14, 0),
    attendees: 15,
    status: 'Upcoming',
    platform: 'Zoom',
    meetingLink: 'https://zoom.us'
  }
];
