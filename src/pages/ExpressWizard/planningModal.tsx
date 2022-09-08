import {
  Col,
  Label,
  Modal,
  ModalClose,
  Row,
  theme as globalTheme,
  Paragraph,
  FooterItem,
  MD,
} from '@appquality/unguess-design-system';
import { Field, Input } from '@zendeskgarden/react-forms';
import { Datepicker } from '@zendeskgarden/react-datepickers';
import { useState } from 'react';
import i18n from 'src/i18n';
import { t } from 'i18next';
import { addBusinessDays, format, isToday } from 'date-fns';
import {
  EXPRESS_BUSINESS_DAYS_TO_ADD,
  EXPRESS_START_DATE_MAX_VALUE,
} from 'src/constants';
import { WaterButton } from 'src/common/components/waterButton';

import { getLanguage } from './getLanguage';

const PlanningModal = ({
  startDate,
  duration = EXPRESS_BUSINESS_DAYS_TO_ADD,
  onClose,
  onSave,
}: {
  startDate: Date;
  duration: number;
  onSave: (start: Date, end: Date) => void;
  onClose: () => void;
}) => {
  const [launchDate, setlaunchDate] = useState<Date>(startDate);
  const [endDate, setEndDate] = useState<Date>(
    addBusinessDays(startDate, duration)
  );
  const lang = getLanguage(i18n.language || 'en');

  const handleDateChange = (date: Date) => {
    // We have to add 2 business days to determine the end date
    setlaunchDate(date);
    setEndDate(addBusinessDays(date, duration));
  };

  return (
    <Modal onClose={onClose} isLarge>
      <Modal.Header>
        {t('__EXPRESS_WIZARD_SUBMIT_PLANNING_TOOLTIP_TITLE')}
      </Modal.Header>
      <Modal.Body style={{ minHeight: '250px' }}>
        <Row style={{ marginTop: '60px' }}>
          <Col xs={12} sm={6}>
            <Field>
              <Label>
                {t('__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_LABEL')}
              </Label>
              <Datepicker
                value={launchDate}
                formatDate={(date: Date) =>
                  isToday(date)
                    ? `${t(
                        '__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_TODAY_LABEL'
                      )} (${format(date, 'EEEE d MMMM Y', {
                        locale: lang.locale,
                      })})`
                    : format(date, 'EEEE d MMMM Y', { locale: lang.locale })
                }
                onChange={handleDateChange}
                minValue={new Date()}
                maxValue={
                  new Date(
                    new Date().setDate(
                      new Date().getDate() + EXPRESS_START_DATE_MAX_VALUE
                    )
                  )
                }
              >
                <Input
                  type="text"
                  placeholder={t(
                    '__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_PLACEHOLDER'
                  )}
                />
              </Datepicker>
            </Field>
          </Col>
          <Col xs={12} sm={6}>
            <Field>
              <Label>
                {t(
                  '__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_RESULTS_LABEL'
                )}
              </Label>
              <Input
                type="text"
                placeholder={t(
                  '__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_RESULTS_PLACEHOLDER'
                )}
                value={
                  !endDate
                    ? ''
                    : format(endDate, 'EEEE d MMMM Y', { locale: lang.locale })
                }
                readOnly
                disabled
              />
            </Field>
          </Col>
          <Col xs={12}>
            <Paragraph
              style={{
                marginBottom: globalTheme.space.xl,
                color: globalTheme.palette.grey[600],
              }}
            >
              <MD>
                {t('__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_NOTE')}
              </MD>
            </Paragraph>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <WaterButton isBasic onClick={onClose}>
            {t('__EXPRESS_WIZARD_STEP_WHEN_CUSTOM_DATE_CANCEL')}
          </WaterButton>
        </FooterItem>
        <FooterItem>
          <WaterButton
            isPill
            isPrimary
            onClick={() => onSave(launchDate, endDate)}
          >
            {t('__EXPRESS_WIZARD_STEP_WHEN_CUSTOM_DATE_CONFIRM')}
          </WaterButton>
        </FooterItem>
      </Modal.Footer>
      <ModalClose aria-label="Close modal" />
    </Modal>
  );
};

export { PlanningModal };
