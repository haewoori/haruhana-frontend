export interface CancelStudyRequest {
  studyCardId: string;
}

export interface CancelStudyResponse {
  success: boolean;
  participated: boolean;
}