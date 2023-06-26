import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ChevronDownIcon } from 'src/assets/icons/chevron-down-stroke.svg';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-lg-stroke.svg';
import { ReactComponent as EmptyIcon } from 'src/assets/icons/empty.svg';
import {
  MD,
  Paragraph,
  Spinner,
  SplitButton,
  Timeline,
  TooltipModal,
  Button,
  TextLabel,
  getColor,
} from '@appquality/unguess-design-system';
import i18n from 'src/i18n';
import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  addBusinessDays,
  differenceInBusinessDays,
  format,
  formatRelative,
} from 'date-fns';
import { EXPRESS_BUSINESS_DAYS_TO_ADD } from 'src/constants';
import { appTheme } from 'src/app/theme';
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

const HelpText = styled(TextLabel)`
  max-width: 250px;
  position: absolute;

  left: ${({ theme }) => theme.space.lg};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    left: auto;
    right: 0;
    padding: 0 ${({ theme }) => theme.space.xs};
  }
`;

const InteractiveTimelineItem = styled(Timeline.Item)`
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => getColor(theme.colors.primaryHue, 50)};
    svg {
      background-color: ${({ theme }) => getColor(theme.colors.primaryHue, 50)};
    }
  }

  div[data-garden-id='timeline.content.separator'] {
    padding: ${({ theme }) =>
      `${theme.space.xs} 0 ${theme.space.xs} ${theme.space.sm}`};
  }
`;

export const WizardSubmit = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const { errors, isSubmitting, handleSubmit, values, setFieldValue, status } =
    props;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [refElement, setRefElement] = useState<HTMLButtonElement | null>();
  const [selectedDateSpot, setSelectedDateSpot] = useState<number>();
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const { base_cp_duration = EXPRESS_BUSINESS_DAYS_TO_ADD } = values;

  const [launchDate, setlaunchDate] = useState<Date>(
    values.campaign_date ?? new Date()
  );
  const [endDate, setEndDate] = useState<Date>(
    values.campaign_date_end ?? addBusinessDays(launchDate, base_cp_duration)
  );

  const lang = getLanguage(i18n.language || 'en');
  const today = new Date();
  const requiredDuration =
    values.campaign_language === 'en' ? base_cp_duration + 1 : base_cp_duration;

  const dateSpots = [
    addBusinessDays(values.campaign_date ?? today, 1),
    addBusinessDays(values.campaign_date ?? today, 5),
  ];

  const triggerSubmit = useCallback(() => {
    if (selectedDateSpot && selectedDateSpot !== -1) {
      const resultsDate = addBusinessDays(
        dateSpots[selectedDateSpot as number], // start_date,
        requiredDuration
      );

      setFieldValue('campaign_date', dateSpots[selectedDateSpot as number]);
      setFieldValue('campaign_date_end', resultsDate);
    } else {
      setFieldValue('campaign_date', launchDate);
      setFieldValue('campaign_date_end', endDate);
    }

    // Trigger form submit
    handleSubmit();
  }, [selectedDateSpot, launchDate, endDate]);

  // We consider cp as planned when the difference between the launchDate and the first date spot is at least 0
  const isPlanned = differenceInBusinessDays(launchDate, dateSpots[0]) > -1;

  return (
    <StyledDiv>
      <SplitButton>
        <Button
          id="express-wizard-submit-button"
          isPrimary
          isAccent
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
          onClick={triggerSubmit}
        >
          {isPlanned
            ? t('__EXPRESS_WIZARD_CONFIRM_PLANNING_BUTTON_LABEL')
            : t('__EXPRESS_WIZARD_CONFIRM_BUTTON_LABEL')}
        </Button>
        <Button
          isPrimary
          isAccent
          ref={triggerRef}
          onClick={() => {
            setRefElement(triggerRef.current);
          }}
        >
          <ChevronDownIcon />
        </Button>
      </SplitButton>
      {isSubmitting ? (
        <Spinner
          size="24"
          color={appTheme.palette.blue[600]}
          style={{ marginLeft: appTheme.space.sm }}
        />
      ) : (
        (!status || !status.submitError) && (
          <HelpText>
            {isPlanned
              ? `${t(
                  '__EXPRESS_WIZARD_SUBMIT_HELP_TEXT_WITH_RESULTS_DATE'
                )} ${format(
                  endDate ?? addBusinessDays(launchDate, requiredDuration),
                  'EEEE d MMMM',
                  { locale: lang.locale }
                )}`
              : t('__EXPRESS_WIZARD_SUBMIT_HELP_TEXT')}
          </HelpText>
        )
      )}
      <TooltipModal
        referenceElement={refElement}
        onClose={() => setRefElement(null)}
        placement="auto"
        hasArrow={false}
        style={{ padding: appTheme.space.xxs, width: 'auto' }}
      >
        <TooltipModal.Title style={{ padding: appTheme.space.xs }}>
          <MD isBold>{t('__EXPRESS_WIZARD_SUBMIT_PLANNING_TOOLTIP_TITLE')}</MD>
        </TooltipModal.Title>
        <TooltipModal.Body>
          <Timeline>
            {dateSpots.map((date, index) => (
              <InteractiveTimelineItem
                onClick={() => {
                  setSelectedDateSpot(index);
                  setlaunchDate(date);
                  setEndDate(addBusinessDays(date, requiredDuration));
                }}
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
                  <MD color={appTheme.palette.grey[600]}>
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
