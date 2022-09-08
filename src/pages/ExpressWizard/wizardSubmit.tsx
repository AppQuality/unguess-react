import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ChevronDownIcon } from 'src/assets/icons/chevron-down-stroke.svg';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-lg-stroke.svg';
import { ReactComponent as EmptyIcon } from 'src/assets/icons/empty.svg';
import {
  MD,
  Paragraph,
  SM,
  Spinner,
  SplitButton,
  theme as globalTheme,
  Timeline,
  TooltipModal,
} from '@appquality/unguess-design-system';
import i18n from 'src/i18n';
import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { addBusinessDays, format, formatRelative } from 'date-fns';
import { EXPRESS_BUSINESS_DAYS_TO_ADD } from 'src/constants';
import { WaterButton } from '../../common/components/waterButton';
import { WizardModel } from './wizardModel';
import { getLanguage } from './getLanguage';
import { CardDivider } from './cardDivider';
import { PlanningModal } from './planningModal';

const StyledDiv = styled.div`
  /** Horizontal Align */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HelpText = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
  max-width: 250px;
  position: absolute;
  right: ${({ theme }) => theme.space.xs};
`;

const InteractiveTimelineItem = styled(Timeline.Item)`
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.kale[100]};
    svg {
      background-color: ${({ theme }) => theme.palette.kale[100]};
    }
  }

  div[data-garden-id='timeline.content.separator'] {
    padding: ${({ theme }) =>
      `${theme.space.xs} 0 ${theme.space.xs} ${theme.space.sm}`};
  }
`;

export const WizardSubmit = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const { errors, isSubmitting, handleSubmit, values, setFieldValue } = props;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [refElement, setRefElement] = useState<HTMLButtonElement | null>();
  const [selectedDateSpot, setSelectedDateSpot] = useState<number>();
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const [launchDate, setlaunchDate] = useState<Date>(
    values.campaign_date ?? new Date()
  );
  const [endDate, setEndDate] = useState<Date>();

  const lang = getLanguage(i18n.language || 'en');
  const today = new Date();
  const requiredDuration =
    values.campaign_language === 'en'
      ? EXPRESS_BUSINESS_DAYS_TO_ADD + 1
      : EXPRESS_BUSINESS_DAYS_TO_ADD;

  // format(endDate, 'EEEE d MMMM Y', { locale: lang.locale })
  const dateSpots = [
    addBusinessDays(values.campaign_date ?? today, 1),
    addBusinessDays(values.campaign_date ?? today, 5),
  ];

  const triggerSubmit = useCallback(() => {
    if (selectedDateSpot !== -1) {
      const resultsDate = addBusinessDays(
        dateSpots[selectedDateSpot as number], // start_date,
        requiredDuration
      );

      setFieldValue('campaign_date', dateSpots[selectedDateSpot as number]);
      setFieldValue('campaign_date_end', resultsDate);
      setFieldValue(
        'campaign_date_end_text',
        format(resultsDate, 'EEEE d MMMM Y', { locale: lang.locale })
      );
    } else {
      setFieldValue('campaign_date', launchDate);
      setFieldValue('campaign_date_end', endDate);
      setFieldValue(
        'campaign_date_end_text',
        format(
          endDate ?? addBusinessDays(launchDate, requiredDuration),
          'EEEE d MMMM Y',
          { locale: lang.locale }
        )
      );
    }

    // Trigger form submit
    handleSubmit();
  }, [selectedDateSpot]);

  return (
    <StyledDiv>
      <SplitButton>
        <WaterButton
          id="express-wizard-submit-button"
          isPill
          isPrimary
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
          onClick={triggerSubmit}
        >
          {!selectedDateSpot
            ? t('__EXPRESS_WIZARD_CONFIRM_BUTTON_LABEL')
            : t('__EXPRESS_WIZARD_CONFIRM_PLANNING_BUTTON_LABEL')}
        </WaterButton>
        <WaterButton
          isPill
          isPrimary
          ref={triggerRef}
          onClick={() => {
            setRefElement(triggerRef.current);
          }}
        >
          <ChevronDownIcon />
        </WaterButton>
      </SplitButton>
      {isSubmitting ? (
        <Spinner
          size="24"
          color={globalTheme.palette.blue[600]}
          style={{ marginLeft: globalTheme.space.sm }}
        />
      ) : (
        <HelpText>
          {selectedDateSpot === -1 && endDate
            ? `${t(
                '__EXPRESS_WIZARD_SUBMIT_HELP_TEXT_WITH_RESULTS_DATE'
              )} ${format(endDate, 'EEEE d MMMM', { locale: lang.locale })}`
            : t('__EXPRESS_WIZARD_SUBMIT_HELP_TEXT')}
        </HelpText>
      )}
      <TooltipModal
        referenceElement={refElement}
        onClose={() => setRefElement(null)}
        placement="auto"
        hasArrow={false}
        style={{ padding: globalTheme.space.xxs, width: 'auto' }}
      >
        <TooltipModal.Title style={{ padding: globalTheme.space.xs }}>
          <MD isBold style={{ color: globalTheme.palette.grey[800] }}>
            {t('__EXPRESS_WIZARD_SUBMIT_PLANNING_TOOLTIP_TITLE')}
          </MD>
        </TooltipModal.Title>
        <TooltipModal.Body>
          <Timeline>
            {dateSpots.map((date, index) => (
              <InteractiveTimelineItem
                onClick={() => setSelectedDateSpot(index)}
                icon={
                  index === selectedDateSpot ? (
                    <CheckIcon width={24} />
                  ) : (
                    <EmptyIcon />
                  )
                }
                hiddenLine
              >
                <Timeline.Content>
                  <Paragraph style={{ fontWeight: 500 }}>
                    {formatRelative(date, today, {
                      locale: {
                        ...lang.locale,
                        formatRelative: (token) =>
                          lang.relativeDateFormat[token as string],
                      },
                    })}
                  </Paragraph>
                  <MD style={{ color: globalTheme.palette.grey[600] }}>
                    {t(
                      '__EXPRESS_WIZARD_SUBMIT_PLANNING_TOOLTIP_FIRST_RESULTS'
                    )}{' '}
                    {format(addBusinessDays(date, requiredDuration), 'EEEE d', {
                      locale: lang.locale,
                    })}
                  </MD>
                </Timeline.Content>
              </InteractiveTimelineItem>
            ))}
            <CardDivider />
            <InteractiveTimelineItem
              onClick={() => setIsDateModalOpen(true)}
              icon={
                selectedDateSpot === -1 ? (
                  <CheckIcon width={24} />
                ) : (
                  <EmptyIcon />
                )
              }
              hiddenLine
            >
              <Timeline.Content>
                <Paragraph style={{ fontWeight: 500 }}>
                  {t('__EXPRESS_WIZARD_SUBMIT_TOOLTIP_MODAL_CUSTOM_DATE_ITEM')}
                </Paragraph>
              </Timeline.Content>
            </InteractiveTimelineItem>
          </Timeline>
        </TooltipModal.Body>
      </TooltipModal>

      {isDateModalOpen && (
        <PlanningModal
          startDate={launchDate}
          onSave={(start, end) => {
            setlaunchDate(start);
            setEndDate(end);
            setSelectedDateSpot(-1);
            setIsDateModalOpen(false);
          }}
          duration={requiredDuration}
          onClose={() => setIsDateModalOpen(false)}
        />
      )}
    </StyledDiv>
  );
};
