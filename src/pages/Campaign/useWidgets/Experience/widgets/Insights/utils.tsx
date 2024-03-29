import { Ellipsis, Tag } from '@appquality/unguess-design-system';
import { TFunction } from 'react-i18next';
import { ReactComponent as MajorIssueIcon } from 'src/assets/icons/insight-major-issue-icon.svg';
import { ReactComponent as MinorIssueIcon } from 'src/assets/icons/insight-minor-issue-icon.svg';
import { ReactComponent as ObservationIcon } from 'src/assets/icons/insight-observation-icon.svg';
import { ReactComponent as PositiveFindingIcon } from 'src/assets/icons/insight-positive-finding-icon.svg';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { GetCampaignsByCidUxApiResponse } from 'src/features/api';

function getSeverityIcon(
  severity: NonNullable<
    GetCampaignsByCidUxApiResponse['findings']
  >[number]['severity']
) {
  switch (severity.id) {
    case 1:
      return <MinorIssueIcon />;
    case 2:
      return <MajorIssueIcon />;
    case 3:
      return <PositiveFindingIcon />;
    case 4:
      return <ObservationIcon />;
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
        <SeverityTag hasBackground severity="high">
          <Ellipsis>{text ?? severity.name}</Ellipsis>
        </SeverityTag>
      );
    case 2:
      return (
        <SeverityTag hasBackground severity="critical">
          <Ellipsis>{text ?? severity.name}</Ellipsis>
        </SeverityTag>
      );
    case 3:
      return (
        <SeverityTag hasBackground severity="low">
          <Ellipsis>{text ?? severity.name}</Ellipsis>
        </SeverityTag>
      );
    case 4:
      return (
        <SeverityTag hasBackground severity="medium">
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
      return 'high'; // Minor
    case 2:
      return 'critical'; // Major
    case 3:
      return 'low'; // Positive
    case 4:
      return 'medium'; // Observation
    default:
      return 'medium'; // Observation
  }
}

function getClusterName(
  cluster: NonNullable<
    GetCampaignsByCidUxApiResponse['findings']
  >[number]['cluster'],
  t: TFunction
) {
  if (cluster === 'all') {
    return t('__CAMPAIGN_PAGE_INSIGHTS_ALL_CLUSTERS');
  }

  if (Array.isArray(cluster)) {
    return cluster.map((c) => c.name).join(', ');
  }

  return null;
}

export {
  getSeverityIcon,
  getSeverityTag,
  getClusterTag,
  getSeverity,
  getClusterName,
};
