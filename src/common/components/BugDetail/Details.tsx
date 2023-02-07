import { Accordion, LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Bug, BugAdditionalField } from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { ReactComponent as DetailsIcon } from 'src/assets/icons/details-icon.svg';
import DetailsItems from './DetailsItems';

const Container = styled.div`
  display: inline-block;
  width: 100%;
`;
const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > svg {
    fill: ${({ theme }) => theme.palette.grey[600]};
  }
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
              <Title>
                <DetailsIcon
                  style={{
                    marginRight: globalTheme.space.base * 3,
                    color: globalTheme.palette.grey[600],
                  }}
                />
                <LG isBold>{t('__BUGS_PAGE_BUG_DETAIL_DETAILS_LABEL')}</LG>
              </Title>
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
