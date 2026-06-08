import { format } from 'date-fns';

type ApiDateLike = string | Date | null | undefined;

export const parseApiDate = (value: ApiDateLike): Date | undefined => {
  if (!value) return undefined;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }

  const dateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

export const formatApiDateDDMMYYYY = (value: ApiDateLike): string => {
  const parsed = parseApiDate(value);
  if (!parsed) return '';

  return format(parsed, 'dd/MM/yyyy');
};

export const formatDateForApiInput = (value?: Date): string => {
  if (!value) return '';

  return format(value, 'yyyy-MM-dd');
};
