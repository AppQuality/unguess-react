import {
  AccordionNew,
  Label,
  Span,
  RadioCard,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { getIconFromModuleType } from '../utils';

const Location = () => {
  const { t } = useTranslation();

  return (
    <AccordionNew data-qa="location-module" level={3} hasBorder type="default">
      <AccordionNew.Section>
        {/* @ts-ignore */}
        <AccordionNew.Header icon={getIconFromModuleType('location')}>
          <AccordionNew.Label
            label={t('__PLAN_PAGE_MODULE_LOCATION_TITLE', 'Location')}
          />
        </AccordionNew.Header>
        <AccordionNew.Panel>
          <div style={{ padding: appTheme.space.xs }}>
            <Label>
              {t(
                '__PLAN_PAGE_MODULE_LOCATION_SELECT_COUNTRY',
                'Select country'
              )}
            </Label>
            <Span style={{ color: appTheme.palette.grey[600] }}>
              {/* Placeholder for future country selector */}
            </Span>
          </div>
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};

export default Location;
