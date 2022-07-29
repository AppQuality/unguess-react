import {
  Paragraph,
  Timeline,
  XL,
  XXL,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { ReactComponent as HelpImg } from 'src/assets/modal-use-case-help.svg';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-icon.svg';
import { ReactComponent as CancelIcon } from 'src/assets/icons/cancel-icon.svg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

export const ScrollingContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  padding: 0;

  ::-webkit-scrollbar {
    background-color: transparent;
  }

  &:hover {
    ::-webkit-scrollbar {
      background-color: inherit;
    }
  }
`;

const HelpContainer = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  overflow-x: hidden;
`;

export const ModalUseCaseHelp = () => {
  const { t } = useTranslation();
  return (
    <ScrollingContainer>
      <HelpContainer>
        <HelpImg />
        <XXL style={{ marginTop: globalTheme.space.lg }}>
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_TITLE')}
        </XXL>
        <Paragraph style={{ marginBottom: globalTheme.space.xxl }}>
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_DESCRIPTION')}
        </Paragraph>
        <Paragraph style={{ marginBottom: globalTheme.space.sm }}>
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_1_TITLE')}
        </Paragraph>
        <Timeline>
          <Timeline.Item icon={<CheckIcon />} hiddenLine>
            <Timeline.Content>
              <Paragraph style={{ fontWeight: 500 }}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_1_ITEM_1_TITLE'
                )}
              </Paragraph>
              <Paragraph style={{ marginTop: 0 }}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_1_ITEM_1_SUBTITLE'
                )}
              </Paragraph>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item icon={<CheckIcon />} hiddenLine>
            <Timeline.Content>
              <Paragraph style={{ fontWeight: 500 }}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_1_ITEM_2_TITLE'
                )}
              </Paragraph>
              <Paragraph style={{ marginTop: 0 }}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_1_ITEM_2_SUBTITLE'
                )}
              </Paragraph>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
        <Paragraph
          style={{
            marginTop: globalTheme.space.lg,
            marginBottom: globalTheme.space.sm,
          }}
        >
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_2_TITLE')}
        </Paragraph>
        <Timeline>
          <Timeline.Item icon={<CancelIcon />} hiddenLine>
            <Timeline.Content>
              <Paragraph style={{ fontWeight: 500 }}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_2_ITEM_1_TITLE'
                )}
              </Paragraph>
              <Paragraph style={{ marginTop: 0 }}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_2_ITEM_1_SUBTITLE'
                )}
              </Paragraph>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item icon={<CancelIcon />} hiddenLine>
            <Timeline.Content>
              <Paragraph style={{ fontWeight: 500 }}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_2_ITEM_2_TITLE'
                )}
              </Paragraph>
              <Paragraph style={{ marginTop: 0 }}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_2_ITEM_2_SUBTITLE'
                )}
              </Paragraph>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
        <XL
          style={{
            marginTop: globalTheme.space.lg,
            marginBottom: globalTheme.space.sm,
          }}
        >
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_3_TITLE')}
        </XL>
        <Timeline>
          <Timeline.Item icon={<CancelIcon />} hiddenLine>
            <Timeline.Content>
              <Paragraph style={{ fontWeight: 500 }}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_3_ITEM_1_TITLE'
                )}
              </Paragraph>
              <Paragraph style={{ marginTop: 0 }}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_3_ITEM_1_SUBTITLE'
                )}
              </Paragraph>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item icon={<CancelIcon />} hiddenLine>
            <Timeline.Content>
              <Paragraph style={{ fontWeight: 500 }}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_3_ITEM_2_TITLE'
                )}
              </Paragraph>
              <Paragraph style={{ marginTop: 0 }}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_HELP_SECTION_3_ITEM_2_SUBTITLE'
                )}
              </Paragraph>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </HelpContainer>
    </ScrollingContainer>
  );
};
