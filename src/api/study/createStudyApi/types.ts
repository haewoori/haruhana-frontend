import {StudyType} from "@/types/study/study";

export interface CreateStudyRequest {
  title: string;
  content: string;
  maxParticipants: number;
  dueDate: string;
  category: StudyType;
  isOnline: boolean;
}

export interface CreateStudyResponse {
}