import { ReactNode } from 'react';
import {
  BugSeverity,
  GetCampaignsByCidUsecasesApiResponse,
} from 'src/features/api';
import { TableBugType } from '../../types';

export interface TableDatum {
  id: string;
  bugId: ReactNode;
  title: ReactNode;
  siblings: number;
  severity: ReactNode;
  priority: ReactNode;
  created: string;
  updated?: string;
  isHighlighted?: boolean;
}

export type BugByUsecaseType = {
  useCase: UseCaseType;
  bugs: TableBugType[];
};

export type BugBySeverityType = {
  severity: BugSeverity;
  bugs: TableBugType[];
};

export type UseCaseType = ItemOfArray<GetCampaignsByCidUsecasesApiResponse>;
