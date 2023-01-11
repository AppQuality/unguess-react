import { ReactNode } from 'react';

export type Bug = {
  id: number;
  title: string;
  severity: Severities;
  created: string;
  updated?: string;
  isUnread?: boolean;
  tags?: string[];
};

export interface TableDatum {
  id: string;
  bugId: ReactNode;
  title: ReactNode;
  severity: ReactNode;
  created: string;
  updated?: string;
  isHighlighted?: boolean;
}
