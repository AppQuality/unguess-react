import React, { useMemo } from 'react';
import {
  AccordionNew,
  Label,
  Span,
  FormField as Field,
  FormHint as Hint,
  Radio,
  Checkbox,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { getIconFromModuleType } from '../../utils';
import styled from 'styled-components';
import { useModule } from 'src/features/modules/useModule';
import { CountrySelector } from './CountrySelector';
import { RegionPanel } from './RegionPanel';

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
  let outputArr = (value?.output as { type: string; values: string[] }[]) || [];
  const countryObj = outputArr.find((a) => a.type === 'country');
  const selectedCountry = countryObj?.values[0] || '';
  const areaObj = outputArr.find((a) => a.type === 'region');
  const cityObj = outputArr.find((a) => a.type === 'city');
  // find selected area
  const selectedArea = areaObj ? 'region' : cityObj ? 'city' : 'all';

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueCountry = event.target.value;
    setOutput([{ type: 'country', values: [valueCountry] }]);
  };

  const handleAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const areaType = event.target.value;
    let newArr = outputArr.filter((a) => a.type === 'country');
    if (areaType === 'all') {
      // remove region and city if switching to all areas
      newArr = newArr.filter((a) => a.type !== 'region' && a.type !== 'city');
    } else if (areaType === 'region') {
      // If switching to region, remove city and ensure region is present
      newArr.push({ type: 'region', values: [] });
      newArr = newArr.filter((a) => a.type !== 'city');
    } else if (areaType === 'city') {
      newArr.push({ type: 'city', values: [] });
      newArr = newArr.filter((a) => a.type !== 'region');
    }
    setOutput(newArr);
  };

  console.log('outputArr', outputArr, 'selectedCountry', selectedCountry);

  return (
    <AccordionNew data-qa="locality-module" level={3} hasBorder type="default">
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
                    {selectedCountry === 'IT' && selectedArea === 'region' ? (
                      <RegionPanel value={outputArr} setOutput={setOutput} />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </FieldWrapper>
          )}
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};

// città: Roma, Milano, Napoli, Torino, Palermo, Genova
export default Locality;
