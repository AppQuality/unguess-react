import {
  AccordionNew,
  Button,
  ContainerCard,
  GlobalAlert,
  MD,
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

export const SentimentOverview = () => {
  const { videoId } = useParams();
  const theme = useTheme();
  const [showHelp, setShowHelp] = useState(true);
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
          <AccordionNew.Header icon={<AiIcon />}>
            <AccordionNew.Label
              label={t('__SENTIMENT_OVERVIEW_TITLE')}
              subtitle={t('__SENTIMENT_OVERVIEW_SUBTITLE')}
            />
            <AccordionNew.Meta>
              <Tag>Beta</Tag>
            </AccordionNew.Meta>
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <ContainerCard style={{ margin: `${theme.space.xs} 0` }}>
              <div>{generalSentiment}</div>
              <CopyButton onClick={copy}>
                <Button.StartIcon>
                  <CopyIcon />
                </Button.StartIcon>
                {t('__SENTIMENT_COPY_BUTTON_LABEL')}
              </CopyButton>
            </ContainerCard>
            {showHelp && (
              <GlobalAlert
                style={{ margin: `${theme.space.sm} 0 ${theme.space.md} 0` }}
                type="accent"
                dismissable
                onClose={() => setShowHelp(false)}
                message={
                  <>
                    <MD isBold>{t('__SENTIMENT_OVERVIEW_ALERT_TITLE')}</MD>
                    <MD>{t('__SENTIMENT_OVERVIEW_ALERT_SUBTITLE')}</MD>
                  </>
                }
              />
            )}
            <SM>
              <i>{t('__SENTIMENT_OVERVIEW_ALERT_DISCLAIMER')}</i>
            </SM>
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
    </SentimentOverviewWrapper>
  );
};
