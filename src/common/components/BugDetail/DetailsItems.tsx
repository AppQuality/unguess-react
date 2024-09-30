import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { Bug, BugAdditionalField } from 'src/features/api';
import { MD, Span } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { format } from 'date-fns';

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
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
    additional_fields?: BugAdditionalField[];
  };
}) => {
  const { t } = useTranslation();
  const { occurred_date, device, reporter } = bug;
  const createdDate = new Date(occurred_date);
  const formattedDate = format(createdDate, 'dd/MM/yyyy hh:mma z');

  return (
    <>
      <DetailsItem>
        <MD isBold style={{ marginBottom: appTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_TIME_LABEL')}
        </MD>
        <MD>
          <Trans
            i18nKey="__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_TIME"
            components={{
              span: <Span />,
            }}
            default="Bug found on <span>{{bug_created}}</span>"
            values={{
              bug_created: formattedDate,
            }}
          />
        </MD>
      </DetailsItem>
      <DetailsItem>
        <MD style={{ marginBottom: appTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_REPORTER_LABEL')}
        </MD>
        <MD>
          {reporter.name} (T{reporter.tester_id})
        </MD>
      </DetailsItem>
      <DetailsItem>
        <MD style={{ marginBottom: appTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_USE_CASE_LABEL')}
        </MD>
        <MD>{bug.application_section.title}</MD>
      </DetailsItem>
      <DetailsItem>
        <MD style={{ marginBottom: appTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_SEVERITY_LABEL')}
        </MD>
        <SeverityTag
          hasBackground
          severity={bug.severity.name.toLowerCase() as Severities}
        />
      </DetailsItem>
      <DetailsItem>
        <MD style={{ marginBottom: appTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_TIPOLOGY_LABEL')}
        </MD>
        <MD>{bug.type.name}</MD>
      </DetailsItem>
      <DetailsItem>
        <MD style={{ marginBottom: appTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_REPLICABILITY_LABEL')}
        </MD>
        <MD>{bug.replicability.name}</MD>
      </DetailsItem>
      <DetailsItem>
        <MD style={{ marginBottom: appTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_DEVICE_TYPE_LABEL')}
        </MD>
        <MD style={{ textTransform: 'capitalize' }}>
          {device.type === 'desktop'
            ? device.desktop_type
            : `${device.manufacturer} ${device.model}`}
        </MD>
      </DetailsItem>
      <DetailsItem>
        <MD style={{ marginBottom: appTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_DEVICE_OS_LABEL')}
        </MD>
        <MD>
          <StyledSpan>
            {device.os} {device.os_version}
          </StyledSpan>
        </MD>
      </DetailsItem>
      {bug.additional_fields && bug.additional_fields.length
        ? bug.additional_fields.map((field) => (
            <DetailsItem>
              <MD style={{ marginBottom: appTheme.space.xs }}>{field.name}</MD>
              <MD style={{ wordBreak: 'break-all' }}>{field.value}</MD>
            </DetailsItem>
          ))
        : null}
    </>
  );
};
