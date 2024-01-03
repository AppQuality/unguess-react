export const getInitials = (name: string) => {
  if (!name) return 'User';
  const names = name.split(' ');
  const initials = names[0][0] + names[names.length - 1][0];
  return initials;
};
