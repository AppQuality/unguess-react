import { Datepicker, LG, Input } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { format, addBusinessDays } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { getLanguage } from 'src/pages/ExpressWizard/getLanguage';
import { useModuleContext } from 'src/features/modules/ModuleWrapper';

const DatePickerWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const Dates = () => {
  const { t, i18n } = useTranslation();
  const lang = getLanguage(i18n.language || 'en');
  const { value, set } = useModuleContext('dates');

  return (
    <div>
      <LG tag="h3" isBold>
        Campaign Dates
      </LG>
      <DatePickerWrapper>
        <Datepicker
          value={
            value?.output.start
              ? new Date(value.output.start)
              : addBusinessDays(new Date(), 1)
          }
          formatDate={(date: Date) =>
            format(date, 'EEEE d MMMM Y', { locale: lang.locale })
          }
          onChange={(date) =>
            set({
              output: { start: date.toISOString() },
            })
          }
          minValue={addBusinessDays(new Date(), 1)}
        >
          <Input type="text" placeholder={t('Select a launch date')} />
        </Datepicker>
      </DatePickerWrapper>
    </div>
  );
};

export { Dates };
