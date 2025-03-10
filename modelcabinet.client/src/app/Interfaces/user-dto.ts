export interface UserDto {
  id: string;
  email: string;
  displayName: string;
  biography?: string;
  location?: string;
  website?: string;
  avatarUrl?: string;
  twitterHandle?: string;
  githubUsername?: string;
  preferredLanguage?: string;
  timeZone?: string;
  dateJoined: Date;
  lastActive: Date;
  isProfilePublic: boolean;
  emailNotificationsEnabled: boolean;
  projectUpdatesEnabled: boolean;
  newMessageNotificationsEnabled: boolean;
}

export const emptyUserDto : UserDto = {
  id: "",
  email: "",
  displayName: "",
  dateJoined: new Date("2025-03-10"),
  lastActive: new Date("2025-03-10"),
  isProfilePublic: false,
  emailNotificationsEnabled: false,
  projectUpdatesEnabled: false,
  newMessageNotificationsEnabled: false
}