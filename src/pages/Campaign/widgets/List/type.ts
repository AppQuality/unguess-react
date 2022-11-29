import { ReactNode } from 'react';

export interface ListItemProps {
  children: ReactNode;
  numerator: number;
  denominator: number;
  key: string | number;
}

export interface ListProps {
  header?: ReactNode;
  title: ReactNode;
  children: ReactNode;
}
