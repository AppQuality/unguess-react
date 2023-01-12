import { Accordion, LG, MD, Span } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { Bug } from 'src/features/api';
import styled from 'styled-components';
import { format } from 'date-fns';
import { theme as globalTheme } from 'src/app/theme';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: ${({ theme }) => theme.space.lg} 0;
`;

export default ({
  bug,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
  };
}) => {
  const { t } = useTranslation();
  const { created } = bug;
  const formattedDate = format(new Date(created), 'dd/MM/yyyy');

  return (
    <Container>
      <Accordion level={3}>
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label>
              <LG isBold>{t('__BUGS_PAGE_BUG_DETAIL_DETAILS_LABEL')}</LG>
              <MD
                style={{
                  color: globalTheme.palette.grey[700],
                  marginTop: globalTheme.space.md,
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
              </MD>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            <MD>Details</MD>
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
    </Container>
  );
};
