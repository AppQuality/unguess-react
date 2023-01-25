import { ReactNode } from 'react';
import {
  Bug,
  BugSeverity,
  GetCampaignsByCidBugsApiResponse,
} from 'src/features/api';

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
  bugs: Exclude<GetCampaignsByCidBugsApiResponse['items'], undefined>;
};

export type BugBySeverityType = {
  severity: BugSeverity;
  bugs: Exclude<GetCampaignsByCidBugsApiResponse['items'], undefined>;
};
