import {
  AccordionNew,
  Button,
  GlobalAlert,
  SM,
  Tag,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ReactComponent as AiIcon } from 'src/assets/icons/ai-icon.svg';
import { ReactComponent as CopyIcon } from 'src/assets/icons/copy-icon.svg';
import { useCopy } from 'src/hooks/useCopy';
import styled, { useTheme } from 'styled-components';
import { useContent } from '../Transcript/useContent';

const SentimentOverviewWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const CopyButton = styled(Button)`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const StyledHeader = styled(AccordionNew.Header)`
  .accordion-header-inner-wrapper {
    grid-template-areas:
      'supertitle supertitle'
      'label label'
      'meta meta';
  }
`;

const StyledSM = styled(SM)`
  font-style: italic;
`;

export const SentimentOverview = () => {
  const { videoId } = useParams();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  const { generalSentiment } = useContent(videoId || '');
  const copy = useCopy({ text: generalSentiment || '' });

  if (!generalSentiment) return null;
  const handleAccordionChange = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SentimentOverviewWrapper>
      <AccordionNew
        level={3}
        defaultExpandedSections={isOpen ? [0] : []}
        onChange={handleAccordionChange}
      >
        <AccordionNew.Section>
          <StyledHeader icon={<AiIcon />}>
            <AccordionNew.Label
              data-qa="tagging_tool_page_accordions_header_summary"
              label={t('__SENTIMENT_OVERVIEW_TITLE')}
              subtitle={t('__SENTIMENT_OVERVIEW_SUBTITLE')}
            />
            <AccordionNew.Meta>
              <Tag style={{ marginTop: theme.space.xs }}>Beta</Tag>
            </AccordionNew.Meta>
          </StyledHeader>
          <AccordionNew.Panel>
            <div style={{ margin: `${theme.space.xs} 0 ${theme.space.lg} 0` }}>
              <div>{generalSentiment}</div>
              <CopyButton size="small" onClick={copy}>
                <Button.StartIcon>
                  <CopyIcon />
                </Button.StartIcon>
                {t('__SENTIMENT_COPY_BUTTON_LABEL')}
              </CopyButton>
            </div>
            <GlobalAlert
              style={{ margin: `${theme.space.sm} 0 ${theme.space.md} 0` }}
              type="accent"
              title={t('__SENTIMENT_OVERVIEW_ALERT_TITLE')}
              message={t('__SENTIMENT_OVERVIEW_ALERT_SUBTITLE')}
            />
            <StyledSM>{t('__SENTIMENT_OVERVIEW_ALERT_DISCLAIMER')}</StyledSM>
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
    </SentimentOverviewWrapper>
  );
};
