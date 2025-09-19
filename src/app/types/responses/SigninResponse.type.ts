export interface SigninResponse {
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}