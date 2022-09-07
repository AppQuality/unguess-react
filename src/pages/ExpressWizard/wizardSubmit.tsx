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
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { addBusinessDays, format, formatRelative } from 'date-fns';
import { EXPRESS_BUSINESS_DAYS_TO_ADD } from 'src/constants';
import { WaterButton } from '../../common/components/waterButton';
import { WizardModel } from './wizardModel';
import { getLanguage } from './getLanguage';

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
    background-color: ${({ theme }) => theme.palette.grey[100]};
    svg {
      background-color: ${({ theme }) => theme.palette.grey[100]};
    }
  }
`;

export const WizardSubmit = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const { errors, isSubmitting, handleSubmit, values, setFieldValue } = props;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [refElement, setRefElement] = useState<HTMLButtonElement | null>();
  const [selectedDateSpot, setSelectedDateSpot] = useState<number>(0);

  const lang = getLanguage(i18n.language || 'en');
  const start_date = values.campaign_date ?? new Date();
  const requiredDuration =
    values.campaign_language === 'en'
      ? EXPRESS_BUSINESS_DAYS_TO_ADD + 1
      : EXPRESS_BUSINESS_DAYS_TO_ADD;

  // format(endDate, 'EEEE d MMMM Y', { locale: lang.locale })
  const dateSpots = [
    addBusinessDays(start_date, 1),
    addBusinessDays(start_date, 5),
  ];

  useEffect(() => {
    const endDate = addBusinessDays(
      dateSpots[selectedDateSpot],
      requiredDuration
    );

    setFieldValue('campaign_date', dateSpots[selectedDateSpot]);
    setFieldValue('campaign_date_end', endDate);
    setFieldValue(
      'campaign_date_end_text',
      format(endDate, 'EEEE d MMMM Y', { locale: lang.locale })
    );
  }, [selectedDateSpot]);

  console.log('values', values);

  return (
    <StyledDiv>
      <SplitButton>
        <WaterButton
          id="express-wizard-submit-button"
          isPill
          isPrimary
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
          onClick={() => handleSubmit()}
        >
          {t('__EXPRESS_WIZARD_CONFIRM_BUTTON_LABEL')}
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
        <HelpText>{t('__EXPRESS_WIZARD_SUBMIT_HELP_TEXT')}</HelpText>
      )}
      <TooltipModal
        referenceElement={refElement}
        onClose={() => setRefElement(null)}
        placement="auto"
        hasArrow={false}
      >
        <TooltipModal.Title>
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
                    {formatRelative(date, start_date, {
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
          </Timeline>
        </TooltipModal.Body>
        <TooltipModal.Close aria-label="Close" />
      </TooltipModal>
    </StyledDiv>
  );
};
