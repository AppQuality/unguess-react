export type ProfileFormValues = {
  name: string;
  surname: string;
  roleId: number;
  email?: string;
  role?: string;
  companySize?: string;
  companySizeId: number;
};

export type NotificationSettingsFormValues = {
  commentsActivity: boolean;
  activitySetupUpdates: boolean;
  activityProgress: boolean;
};

export type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
