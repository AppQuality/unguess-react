import {
  Accordion,
  LG,
  MD,
  SM,
  Span,
  Tag,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { Bug, BugAdditionalField } from 'src/features/api';
import styled from 'styled-components';
import { format } from 'date-fns';
import { theme as globalTheme } from 'src/app/theme';
import { Pill } from 'src/common/components/Pill';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: ${({ theme }) => theme.space.lg} 0;
`;

const DetailsItem = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.md};
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
  const { created } = bug;
  const createdDate = new Date(created);
  const formattedDate = format(createdDate, 'dd/MM/yyyy hh:mma z');

  return (
    <Container>
      <Accordion level={3} style={{ padding: 0 }}>
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label style={{ padding: 0 }}>
              <LG isBold>{t('__BUGS_PAGE_BUG_DETAIL_DETAILS_LABEL')}</LG>
              <SM
                style={{
                  color: globalTheme.palette.grey[700],
                  marginTop: globalTheme.space.md,
                  marginBottom: globalTheme.space.md,
                }}
              >
                <Trans i18nKey="__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_TIME">
                  Bug founded on{' '}
                  <Span>
                    {{
                      bug_created: formattedDate,
                    }}
                  </Span>
                </Trans>
              </SM>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel style={{ padding: 0 }}>
            <DetailsItem style={{ marginTop: globalTheme.space.base * 3 }}>
              <MD isBold style={{ marginBottom: globalTheme.space.xs }}>
                {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_USE_CASE_LABEL')}
              </MD>
              <MD>{bug.application_section.title}</MD>
            </DetailsItem>
            <DetailsItem>
              <MD isBold style={{ marginBottom: globalTheme.space.xs }}>
                {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_SEVERITY_LABEL')}
              </MD>
              <Tag isPill size="small">
                {bug.severity.name}
              </Tag>
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
              <MD style={{ textTransform: 'capitalize' }}>{bug.device.type}</MD>
            </DetailsItem>
            <DetailsItem>
              <MD isBold style={{ marginBottom: globalTheme.space.xs }}>
                {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_DEVICE_OS_LABEL')}
              </MD>
              <MD>
                {bug.device.os} {bug.device.os_version}
              </MD>
            </DetailsItem>
            {bug.additional_fields && bug.additional_fields.length
              ? bug.additional_fields.map((field) => (
                  <DetailsItem>
                    <MD isBold style={{ marginBottom: globalTheme.space.xs }}>
                      {field.name}
                    </MD>
                    <MD>{field.value}</MD>
                  </DetailsItem>
                ))
              : null}
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
    </Container>
  );
};
