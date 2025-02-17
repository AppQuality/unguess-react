import {
  Button,
  Col,
  Datepicker,
  FormField as Field,
  Input,
  Label,
  MD,
  Modal,
  ModalClose,
  Paragraph,
  Row,
} from '@appquality/unguess-design-system';
import { addBusinessDays, format, isTomorrow } from 'date-fns';
import { t } from 'i18next';
import { useState } from 'react';
import { appTheme } from 'src/app/theme';
import {
  EXPRESS_BUSINESS_DAYS_TO_ADD,
  EXPRESS_START_DATE_MAX_VALUE,
} from 'src/constants';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { getLanguage } from './getLanguage';

const InBodyFooter = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

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
      <Modal.Body style={{ paddingBottom: 0, minHeight: '480px' }}>
        <Row style={{ marginTop: '60px' }}>
          <Col xs={12} sm={6}>
            <Field>
              <Label>
                {t('__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_LABEL')}
              </Label>
              <Datepicker
                value={launchDate}
                formatDate={(date: Date) =>
                  isTomorrow(date)
                    ? `${t(
                        '__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_TOMORROW_LABEL'
                      )} (${format(date, 'EEEE d MMMM Y', {
                        locale: lang.locale,
                      })})`
                    : format(date, 'EEEE d MMMM Y', { locale: lang.locale })
                }
                onChange={handleDateChange}
                minValue={addBusinessDays(new Date(), 1)}
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
                marginBottom: appTheme.space.xl,
                color: appTheme.palette.grey[600],
              }}
            >
              <MD>
                {t('__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_NOTE')}
              </MD>
            </Paragraph>
            <InBodyFooter>
              <Button isBasic onClick={onClose}>
                {t('__EXPRESS_WIZARD_STEP_WHEN_CUSTOM_DATE_CANCEL')}
              </Button>
              <Button
                isPrimary
                isAccent
                onClick={() => onSave(launchDate, endDate)}
              >
                {t('__EXPRESS_WIZARD_STEP_WHEN_CUSTOM_DATE_CONFIRM')}
              </Button>
            </InBodyFooter>
          </Col>
        </Row>
      </Modal.Body>
      <ModalClose aria-label="Close modal" />
    </Modal>
  );
};

export { PlanningModal };
