import { Accordion, LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Bug, BugAdditionalField } from 'src/features/api';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { ReactComponent as DetailsIcon } from 'src/assets/icons/details-icon.svg';
import { useBugPreviewContext } from 'src/pages/Bugs/Content/context/BugPreviewContext';
import DetailsItems from './DetailsItems';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.lg};
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
  const { openAccordions, setOpenAccordions } = useBugPreviewContext();
  const isOpen = openAccordions.includes('details');

  const handleAccordionChange = () => {
    if (isOpen) {
      setOpenAccordions(openAccordions.filter((item) => item !== 'details'));
    } else {
      setOpenAccordions([...openAccordions, 'details']);
    }
  };

  return (
    <Container id="bug-preview-details">
      <Accordion
        level={3}
        style={{ padding: 0 }}
        key={`details_accordion_${isOpen}`}
        defaultExpandedSections={isOpen ? [0, 1] : []}
        onChange={handleAccordionChange}
      >
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label style={{ padding: 0 }}>
              <Title>
                <DetailsIcon
                  style={{
                    marginRight: appTheme.space.base * 3,
                    color: appTheme.palette.grey[600],
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
