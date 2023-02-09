import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { SeverityPill } from 'src/common/components/pills/SeverityPill';
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
  const { created, device } = bug;
  const createdDate = new Date(created);
  const formattedDate = format(createdDate, 'dd/MM/yyyy hh:mma z');

  return (
    <>
      <DetailsItem style={{ marginTop: globalTheme.space.base * 3 }}>
        <MD isBold style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_BUG_TIME_LABEL')}
        </MD>
        <MD>
          <Trans i18nKey="__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_TIME">
            Bug founded on{' '}
            <Span>
              {{
                bug_created: formattedDate,
              }}
            </Span>
          </Trans>
        </MD>
      </DetailsItem>
      <DetailsItem>
        <MD isBold style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_USE_CASE_LABEL')}
        </MD>
        <MD>{bug.application_section.title}</MD>
      </DetailsItem>
      <DetailsItem>
        <MD isBold style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_SEVERITY_LABEL')}
        </MD>
        <SeverityPill
          severity={bug.severity.name.toLowerCase() as Severities}
        />
      </DetailsItem>
      <DetailsItem>
        <MD isBold style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_TIPOLOGY_LABEL')}
        </MD>
        <MD>{bug.type.name}</MD>
      </DetailsItem>
      <DetailsItem>
        <MD isBold style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_REPLICABILITY_LABEL')}
        </MD>
        <MD>{bug.replicability.name}</MD>
      </DetailsItem>
      <DetailsItem>
        <MD isBold style={{ marginBottom: globalTheme.space.xs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_DEVICE_TYPE_LABEL')}
        </MD>
        <MD style={{ textTransform: 'capitalize' }}>
          {device.type === 'desktop'
            ? device.desktop_type
            : `${device.manufacturer} ${device.model}`}
        </MD>
      </DetailsItem>
      <DetailsItem>
        <MD isBold style={{ marginBottom: globalTheme.space.xs }}>
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
              <MD isBold style={{ marginBottom: globalTheme.space.xs }}>
                {field.name}
              </MD>
              <MD style={{ wordBreak: 'break-all' }}>{field.value}</MD>
            </DetailsItem>
          ))
        : null}
    </>
  );
};
