import { BankType } from './types';

export const defaultBanks: BankType[] = [
  {
    name: 'Intesa San Paolo',
    isOther: 0,
  },
  {
    name: 'Poste Italiane',
    isOther: 0,
  },
  {
    name: 'Unicredit',
    isOther: 0,
  },
  {
    name: 'ING',
    isOther: 0,
  },
  {
    name: 'Fineco',
    isOther: 0,
  },
  { name: 'Other providers', isOther: 1 },
];
