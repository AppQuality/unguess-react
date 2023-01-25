import { ReactNode } from 'react';
import { Bug, BugSeverity } from 'src/features/api';
import { TableBugType } from '../types';

export interface TableDatum {
  id: string;
  bugId: ReactNode;
  title: ReactNode;
  severity: ReactNode;
  created: string;
  updated?: string;
  isHighlighted?: boolean;
}

export type BugByUsecaseType = {
  useCase: Bug['application_section'];
  bugs: TableBugType[];
};

export type BugBySeverityType = {
  severity: BugSeverity;
  bugs: TableBugType[];
};
