export interface RegisterDto {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  biography?: string;
  location?: string;
  website?: string;
  avatarUrl?: string;
  twitterHandle?: string;
  githubUsername?: string;
  preferredLanguage?: string;
  timeZone?: string;
}

export const emptyRegisterDto : RegisterDto = {
  email: "",
  password: "",
  confirmPassword: "",
  displayName: ""
}