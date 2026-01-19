
export type Category = 'Inbound' | 'Outbound' | 'General';

export interface Correspondence {
  id: string;
  code: string;
  title: string;
  engineer: string;
  transferredTo: string;
  date: string;
  category: Category;
  status: 'New' | 'Closed' | string;
  reply?: string;
  pdfUrl?: string;
}

export interface Meeting {
  id: string;
  title: string;
  startTime: Date;
  attendees: number;
  status: 'Live' | 'Upcoming';
  platform: string;
  location?: string;
  meetingLink?: string;
}
