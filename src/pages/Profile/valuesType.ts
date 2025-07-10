export type ProfileFormValues = {
  name: string;
  surname: string;
  roleId: number;
  role?: string;
};

export type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
