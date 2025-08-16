export interface CreateStudyRequest {
  title: string;
  content: string;
  maxParticipants: number;
  dueDate: string;
  category: 'CERTIFICATE' | 'HOBBY';
  isOnline: boolean;
}

export interface CreateStudyResponse {
}