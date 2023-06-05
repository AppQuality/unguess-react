import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import BugTags from 'src/common/components/BugDetail/Tags';
import { Bug, BugAdditionalField } from 'src/features/api';
import { MD, Span } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Label } from './Label';

const DetailsItem = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledSpan = styled(Span)`
  text-transform: capitalize;
`;

export default ({
  bug,
  isLightbox,
  refetchBugTags,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
    additional_fields?: BugAdditionalField[];
  };
  isLightbox?: boolean;
  refetchBugTags?: () => void;
}) => {
  const { t } = useTranslation();
  const { occurred_date, device, reporter } = bug;
  const createdDate = new Date(occurred_date);
  const formattedDate = format(createdDate, 'dd/MM/yyyy hh:mma z');

  return (
    <>
      {!isLightbox && (
        <DetailsItem>
          <BugTags bug={bug} refetchBugTags={refetchBugTags} />
        </DetailsItem>
      )}
      <DetailsItem>
        <Label isBold style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_TIME_LABEL')}
        </Label>
        <MD>
          <Trans i18nKey="__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_TIME">
            Bug found on{' '}
            <Span>
              {{
                bug_created: formattedDate,
              }}
            </Span>
          </Trans>
        </MD>
      </DetailsItem>
      <DetailsItem>
        <Label style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_REPORTER_LABEL')}
        </Label>
        <MD>
          {reporter.name} (T{reporter.tester_id})
        </MD>
      </DetailsItem>
      <DetailsItem>
        <Label style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_USE_CASE_LABEL')}
        </Label>
        <MD>{bug.application_section.title}</MD>
      </DetailsItem>
      <DetailsItem>
        <Label style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_SEVERITY_LABEL')}
        </Label>
        <SeverityTag
          hasBackground
          severity={bug.severity.name.toLowerCase() as Severities}
        />
      </DetailsItem>
      <DetailsItem>
        <Label style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_TIPOLOGY_LABEL')}
        </Label>
        <MD>{bug.type.name}</MD>
      </DetailsItem>
      <DetailsItem>
        <Label style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_REPLICABILITY_LABEL')}
        </Label>
        <MD>{bug.replicability.name}</MD>
      </DetailsItem>
      <DetailsItem>
        <Label style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_DEVICE_TYPE_LABEL')}
        </Label>
        <MD style={{ textTransform: 'capitalize' }}>
          {device.type === 'desktop'
            ? device.desktop_type
            : `${device.manufacturer} ${device.model}`}
        </MD>
      </DetailsItem>
      <DetailsItem>
        <Label style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_DEVICE_OS_LABEL')}
        </Label>
        <MD>
          <StyledSpan>
            {device.os} {device.os_version}
          </StyledSpan>
        </MD>
      </DetailsItem>
      {bug.additional_fields && bug.additional_fields.length
        ? bug.additional_fields.map((field) => (
            <DetailsItem>
              <Label style={{ marginBottom: globalTheme.space.xs }}>
                {field.name}
              </Label>
              <MD style={{ wordBreak: 'break-all' }}>{field.value}</MD>
            </DetailsItem>
          ))
        : null}
    </>
  );
};
