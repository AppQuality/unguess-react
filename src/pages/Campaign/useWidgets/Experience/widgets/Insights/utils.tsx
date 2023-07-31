import { Ellipsis, Tag } from '@appquality/unguess-design-system';
import { TFunction } from 'react-i18next';
import { ReactComponent as MajorIssueIcon } from 'src/assets/icons/insight-major-issue.svg';
import { ReactComponent as MinorIssueIcon } from 'src/assets/icons/insight-minor-issue.svg';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { GetCampaignsByCidUxApiResponse } from 'src/features/api';

function getSeverityIcon(
  severity: NonNullable<
    GetCampaignsByCidUxApiResponse['findings']
  >[number]['severity']
) {
  switch (severity.id) {
    case 1:
      return <MajorIssueIcon />;
    case 2:
      return <MinorIssueIcon />;
    default:
      return null;
  }
}

function getSeverityTag(
  severity: NonNullable<
    GetCampaignsByCidUxApiResponse['findings']
  >[number]['severity'],
  text?: string
) {
  switch (severity.id) {
    case 1:
      return (
        <SeverityTag hasBackground severity="critical">
          <Ellipsis>{text ?? severity.name}</Ellipsis>
        </SeverityTag>
      );
    case 2:
      return (
        <SeverityTag hasBackground severity="high">
          <Ellipsis>{text ?? severity.name}</Ellipsis>
        </SeverityTag>
      );
    default:
      return null;
  }
}

function getClusterTag(
  cluster: NonNullable<
    GetCampaignsByCidUxApiResponse['findings']
  >[number]['cluster'],
  t: TFunction
) {
  if (cluster === 'all') {
    return (
      <Tag>
        <Ellipsis>{t('__CAMPAIGN_PAGE_INSIGHTS_ALL_CLUSTERS')}</Ellipsis>
      </Tag>
    );
  }

  if (Array.isArray(cluster))
    return cluster.map((c) => (
      <Tag key={c.id}>
        <Ellipsis>{c.name}</Ellipsis>
      </Tag>
    ));

  return null;
}

function getSeverity(
  severity: NonNullable<
    GetCampaignsByCidUxApiResponse['findings']
  >[number]['severity']
) {
  switch (severity.id) {
    case 1:
      return 'critical';
    case 2:
      return 'high';
    case 3:
      return 'medium';
    case 4:
      return 'low';
    default:
      return 'medium';
  }
}

export { getSeverityIcon, getSeverityTag, getClusterTag, getSeverity };
