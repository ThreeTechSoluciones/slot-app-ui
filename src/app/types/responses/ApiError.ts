type ErrorPayload = {
  errorMessage: string;
  path: string;
  status: number;
  timestamp: Date;
} 

export type ApiError = {
  status: number;
  data: ErrorPayload
}