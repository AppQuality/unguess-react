import { Accordion, LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Bug, BugAdditionalField } from 'src/features/api';
import styled from 'styled-components';
import DetailsItems from './DetailsItems';

const Container = styled.div`
  display: inline-block;
  width: 100%;
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

  return (
    <Container>
      <Accordion level={3} style={{ padding: 0 }}>
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label style={{ padding: 0 }}>
              <LG isBold>{t('__BUGS_PAGE_BUG_DETAIL_DETAILS_LABEL')}</LG>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel style={{ padding: 0 }}>
            <DetailsItems bug={bug} />
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
    </Container>
  );
};
