
export type Category = 'Inbound' | 'Outbound' | 'General';

export interface Correspondence {
  id: number;
  subject: string;
  date: string;
  status: string;
  assignee: string;
  referenceNumber: string;
  // Keep old fields for compatibility
  code?: string;
  title?: string;
  engineer?: string;
  transferredTo?: string;
  category?: Category;
  reply?: string;
  pdfUrl?: string;
}

export interface Meeting {
  id: number;
  title: string;
  time: string;
  location: string;
  participants: number;
  platform: string;
  status: string;
  // Keep old fields for compatibility
  startTime?: Date;
  attendees?: number;
  meetingLink?: string;
}
