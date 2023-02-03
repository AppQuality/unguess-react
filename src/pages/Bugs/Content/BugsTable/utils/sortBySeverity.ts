import { GetCampaignsByCidSeveritiesApiResponse } from 'src/features/api';
import { TableBugType } from '../../../types';
import { BugBySeverityType } from '../types';

export const sortBySeverity = (
  bugs: TableBugType[],
  severities: GetCampaignsByCidSeveritiesApiResponse
) => {
  const bugsBySeverity: BugBySeverityType[] = severities?.map((severity) => ({
    severity,
    bugs: [],
  }));
  bugs.forEach((bug) => {
    const severity = bugsBySeverity.find(
      (item) => item.severity.id === bug.severity.id
    );
    severity?.bugs.push(bug);
  });
  return bugsBySeverity;
};
