import { AccordionNew } from '@appquality/unguess-design-system';
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
      <AccordionNew
        level={3}
        style={{ padding: 0 }}
        key={`details_accordion_${isOpen}`}
        defaultExpandedSections={isOpen ? [0, 1] : []}
        onChange={handleAccordionChange}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={<DetailsIcon />}>
            <AccordionNew.Label
              label={t('__BUGS_PAGE_BUG_DETAIL_DETAILS_LABEL')}
            />
          </AccordionNew.Header>
          <AccordionNew.Panel style={{ padding: 0 }}>
            <DetailsItems bug={bug} />
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
    </Container>
  );
};
