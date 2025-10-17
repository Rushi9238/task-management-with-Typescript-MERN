// API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}