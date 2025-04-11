import { ReactNode } from 'react';
import {
  BugCustomStatus,
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

export type BugByStateType = {
  state: BugCustomStatus;
  bugs: TableBugType[];
};

type UseCaseType = ItemOfArray<GetCampaignsByCidUsecasesApiResponse>;
