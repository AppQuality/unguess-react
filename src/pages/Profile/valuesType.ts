export type ProfileFormValues = {
  password?: { current: string; new: string; confirm: string };
  name: string;
  surname: string;
  roleId: number;
  email?: string;
  role?: string;
};
