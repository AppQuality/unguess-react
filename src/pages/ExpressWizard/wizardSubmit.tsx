import {
  Button,
  MD,
  Paragraph,
  Spinner,
  SplitButton,
  Timeline,
  TooltipModal,
  getColor,
} from '@appquality/unguess-design-system';
import {
  addBusinessDays,
  differenceInBusinessDays,
  format,
  formatRelative,
} from 'date-fns';
import { FormikProps } from 'formik';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-lg-stroke.svg';
import { ReactComponent as ChevronDownIcon } from 'src/assets/icons/chevron-down-stroke.svg';
import { ReactComponent as EmptyIcon } from 'src/assets/icons/empty.svg';
import { EXPRESS_BUSINESS_DAYS_TO_ADD } from 'src/constants';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { CardDivider } from './cardDivider';
import { getLanguage } from './getLanguage';
import { PlanningModal } from './planningModal';
import { WizardModel } from './wizardModel';

const StyledDiv = styled.div`
  /** Horizontal Align */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InteractiveTimelineItem: typeof Timeline.Item = styled(Timeline.Item)`
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
  const { errors, isSubmitting, handleSubmit, values, setFieldValue } = props;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [refElement, setRefElement] = useState<HTMLButtonElement | null>();
  const [selectedDateSpot, setSelectedDateSpot] = useState<number>();
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const today = new Date();
  const { base_cp_duration = EXPRESS_BUSINESS_DAYS_TO_ADD } = values;

  const [launchDate, setlaunchDate] = useState<Date>(
    values.campaign_date ?? addBusinessDays(today, 1)
  );

  const lang = getLanguage(i18n.language || 'en');
  const requiredDuration =
    values.campaign_language === 'it' ? base_cp_duration : base_cp_duration + 1;

  const [endDate, setEndDate] = useState<Date>(
    values.campaign_date_end ?? addBusinessDays(launchDate, requiredDuration)
  );

  const dateSpots = [addBusinessDays(today, 2), addBusinessDays(today, 5)];

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
      {isSubmitting && (
        <Spinner
          size="24"
          color={appTheme.palette.blue[600]}
          style={{ marginLeft: appTheme.space.sm }}
        />
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
