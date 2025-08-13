export interface CreateStudyRequest {
  title: string;
  content: string;
  dueDate: string;
  category: 'CERTIFICATE' | 'HOBBY';
  isOnline: boolean;
}

export interface CreateStudyResponse {
}