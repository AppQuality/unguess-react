import { ReactNode } from 'react';

export interface ListItemProps {
  children: ReactNode;
  numerator: number;
  denominator: number;
}

export interface ListProps {
  items: ListItemProps[];
  total: number;
}
