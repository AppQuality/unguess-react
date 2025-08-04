export type ProfileFormValues = {
  name: string;
  surname: string;
  roleId: number;
  email?: string;
  role?: string;
};

export type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
