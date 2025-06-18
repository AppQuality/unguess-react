import {
  AccordionNew,
  FormField as Field,
  FormHint as Hint,
  Label,
  Message,
  Paragraph,
  Radio,
} from '@appquality/unguess-design-system';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useModule } from 'src/features/modules/useModule';
import { useValidation } from 'src/features/modules/useModuleValidation';
import styled from 'styled-components';
import { getIconFromModuleType } from '../../utils';
import { CitiesPanel } from './CitiesPanel';
import { CountrySelector } from './CountrySelector';
import { RegionPanel } from './RegionPanel';
import { use } from 'i18next';
import { components } from 'src/common/schema';

const FieldWrapper = styled.div<{ columns?: string }>`
  ${({ columns, theme }) =>
    columns ??
    `
        display: grid;
        grid-template-columns: repeat(${columns}, 1fr);
        gap: ${theme.space.md};
      `}
  margin-top: ${({ theme }) => theme.space.md};
  width: 100%;
`;

const areaOptions = [
  { label: 'Tutte le aree', value: 'all', hint: 'hint text' },
  { label: 'Aree Nielsen e Regioni', value: 'region', hint: 'hint text' },
  { label: 'Province e grossi centri', value: 'city', hint: 'hint text' },
];

const Locality = () => {
  const { t } = useTranslation();
  const { value, setOutput, remove } = useModule('locality');

  const countryObj = React.useMemo(
    () => value?.output.find((a) => a.type === 'country'),
    [value?.output]
  );
  const selectedCountry = React.useMemo(
    () => countryObj?.values[0] || '',
    [countryObj]
  );
  const regionObj = React.useMemo(
    () => value?.output.find((a) => a.type === 'region'),
    [value?.output]
  );
  const cityObj = React.useMemo(
    () => value?.output.find((a) => a.type === 'city'),
    [value?.output]
  );
  // find selected area
  const selectedArea = regionObj ? 'region' : cityObj ? 'city' : 'all';

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueCountry = event.target.value;
    setOutput([{ type: 'country', values: [valueCountry] }]);
  };

  const handleAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const areaType = event.target.value;
    // Always start with only the country
    let newArr = [...(countryObj ? [countryObj] : [])];
    if (areaType === 'region') {
      newArr.push({ type: 'region', values: [] });
    } else if (areaType === 'city') {
      newArr.push({ type: 'city', values: [] });
    }
    // If 'all', just country
    setOutput(newArr);
  };

  const localityRef = useRef<HTMLDivElement>(null);

  const validation = useCallback(
    ({ output }: components['schemas']['ModuleLocality']) => {
      let error;
      const countryObj = output?.find((a) => a.type === 'country');
      const regionObj = output?.find((a) => a.type === 'region');
      const cityObj = output?.find((a) => a.type === 'city');

      if (
        !countryObj ||
        !countryObj.values ||
        countryObj.values.length === 0 ||
        !countryObj.values[0]
      ) {
        error = t('__PLAN_PAGE_MODULE_LOCALITY_COUNTRY_ERROR');
        return error;
      }
      if (regionObj && (!regionObj.values || regionObj.values.length === 0)) {
        error = t('__PLAN_PAGE_MODULE_LOCALITY_REGION_ERROR');
        return error;
      }
      if (cityObj && (!cityObj.values || cityObj.values.length === 0)) {
        error = t('__PLAN_PAGE_MODULE_LOCALITY_CITY_ERROR');
        return error;
      }
      return true;
    },
    [t]
  );

  const { error, validate } = useValidation({
    type: 'locality',
    validate: validation,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        localityRef.current &&
        !localityRef.current.contains(event.target as Node)
      ) {
        validate();
      }
    }
    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [validate]);

  return (
    <div ref={localityRef}>
      <AccordionNew
        data-qa="locality-module"
        data-testid="locality-module"
        level={3}
        hasBorder
        type="default"
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={getIconFromModuleType('locality')}>
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_LOCALITY_TITLE', 'Location')}
            />
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <CountrySelector
              selectedCountry={selectedCountry}
              onChange={handleCountryChange}
              ariaLabel={t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_COUNTRY')}
            />

            {selectedCountry === 'IT' && (
              <FieldWrapper
                role="group"
                aria-label={t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_AREA')}
              >
                {areaOptions.map((option) => {
                  const inputId = `area-radio-${option.value}`;
                  return (
                    <React.Fragment key={option.value}>
                      <Field style={{ margin: 0 }}>
                        <Radio
                          id={inputId}
                          value={option.value}
                          name="area"
                          checked={selectedArea === option.value}
                          onChange={handleAreaChange}
                        >
                          <Label htmlFor={inputId}>{option.label}</Label>
                          {option.hint && <Hint>{option.hint}</Hint>}
                        </Radio>
                      </Field>
                      {selectedCountry === 'IT' &&
                      selectedArea === 'region' &&
                      option.value === 'region' ? (
                        <RegionPanel validate={validate} />
                      ) : null}
                      {selectedCountry === 'IT' &&
                      selectedArea === 'city' &&
                      option.value === 'city' ? (
                        <CitiesPanel validate={validate} />
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </FieldWrapper>
            )}
            {error && typeof error === 'string' && (
              <Message
                validation="error"
                data-qa="locality-module-error-message"
                data-testid="locality-module-error-message"
                style={{ marginTop: appTheme.space.xs }}
              >
                {error}
              </Message>
            )}
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
    </div>
  );
};

// città: Roma, Milano, Napoli, Torino, Palermo, Genova
// value: RM, MI, NA, TO, PA, GE
export default Locality;
