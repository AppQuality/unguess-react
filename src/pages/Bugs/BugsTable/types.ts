import { ReactNode } from 'react';

export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type Bug = {
  id: number;
  title: string;
  severity: Severity;
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
