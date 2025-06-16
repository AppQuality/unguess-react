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
const RegionsContainer = styled.div`
  padding-left: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const areaOptions = [
  { label: 'Tutte le aree', value: 'all', hint: 'hint text' },
  { label: 'Aree Nielsen e Regioni', value: 'region', hint: 'hint text' },
  { label: 'Province e grossi centri', value: 'city', hint: 'hint text' },
];

const italyRegions = [
  {
    marketArea: 'Nord Ovest',
    regions: ['Lombardia', 'Piemonte', 'Liguria', "Valle d'Aosta"],
  },
  {
    marketArea: 'Nord Est',
    regions: [
      'Trentino Alto Adige',
      'Veneto',
      'Friuli Venezia Giulia',
      'Emilia Romagna',
    ],
  },
  { marketArea: 'Centro', regions: ['Toscana', 'Umbria', 'Marche', 'Lazio'] },
  {
    marketArea: 'Sud e Isole',
    regions: [
      'Abruzzo',
      'Molise',
      'Campania',
      'Puglia',
      'Basilicata',
      'Calabria',
      'Sicilia',
      'Sardegna',
    ],
  },
];

const Location = () => {
  const { t } = useTranslation();
  // @ts-ignore
  const { value, setOutput, remove } = useModule('location');
  // @ts-ignore
  const isAreaSelectionEnabled = useMemo(
    // @ts-ignore
    () => value?.output?.country === 'IT',
    // @ts-ignore
    [value?.output?.country]
  );

  const [selectedArea, setSelectedArea] = React.useState<string | undefined>(
    () => {
      if (!isAreaSelectionEnabled) return undefined;
      // @ts-ignore
      if (value?.output?.regions) return 'region';
      // @ts-ignore
      if (value?.output?.cities) return 'city';
      return undefined;
    }
  );
  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueCountry = event.target.value;
    if (valueCountry !== 'IT') {
      setSelectedArea(undefined);
    }
    // @ts-ignore
    setOutput({ country: valueCountry });
  };
  const handleAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedArea(event.target.value);
  };

  // @ts-ignore
  const selectedCountry = value?.output?.country || '';
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
          <CountrySelector
            selectedCountry={selectedCountry}
            onChange={handleCountryChange}
            ariaLabel={t('__PLAN_PAGE_MODULE_LOCATION_SELECT_COUNTRY')}
          />

          <FieldWrapper
            role="group"
            aria-label={t('__PLAN_PAGE_MODULE_LOCATION_SELECT_AREA')}
          >
            {areaOptions.map((option) => {
              const inputId = `area-radio-${option.value}`;
              return (
                <>
                  <Field key={option.value} style={{ margin: 0 }}>
                    <Radio
                      id={inputId}
                      value={option.value}
                      name="area"
                      checked={
                        selectedArea === option.value ||
                        (selectedArea === undefined && option.value === 'all')
                      }
                      onChange={handleAreaChange}
                    >
                      <Label htmlFor={inputId}>{option.label}</Label>
                      {option.hint && <Hint>{option.hint}</Hint>}
                    </Radio>
                  </Field>
                  {selectedArea === option.value &&
                    option.value === 'region' && (
                      <>
                        <Label>
                          {t('__PLAN_PAGE_MODULE_LOCATION_SELECT_REGION')}
                        </Label>

                        {italyRegions.map((marketArea) => (
                          <div key={marketArea.marketArea}>
                            <Field>
                              <Checkbox
                                checked={marketArea.regions.every((region) =>
                                  // @ts-ignore
                                  (value?.output?.region || []).includes(region)
                                )}
                                onChange={() => {
                                  const allSelected = marketArea.regions.every(
                                    (region) =>
                                      // @ts-ignore
                                      (value?.output?.region || []).includes(
                                        region
                                      )
                                  );
                                  let newRegions;
                                  if (allSelected) {
                                    // Uncheck all: remove all regions of this marketArea
                                    newRegions = // @ts-ignore
                                      (value?.output?.region || []).filter(
                                        (r: string) =>
                                          !marketArea.regions.includes(r)
                                      );
                                  } else {
                                    // Check all: add all regions of this marketArea (avoid duplicates)
                                    const current = new Set(
                                      // @ts-ignore
                                      value?.output?.region || []
                                    );
                                    marketArea.regions.forEach((region) =>
                                      current.add(region)
                                    );
                                    newRegions = Array.from(current);
                                  }
                                  setOutput({
                                    // @ts-ignore
                                    ...value?.output,
                                    region: newRegions,
                                  });
                                }}
                                indeterminate={
                                  // @ts-ignore
                                  (value?.output?.region || []).some(
                                    // @ts-ignore
                                    (region) =>
                                      marketArea.regions.includes(region)
                                  ) &&
                                  !marketArea.regions.every((region) =>
                                    // @ts-ignore
                                    (value?.output?.region || []).includes(
                                      region
                                    )
                                  )
                                }
                              >
                                <Label isRegular>{marketArea.marketArea}</Label>
                              </Checkbox>
                            </Field>
                            <RegionsContainer>
                              {marketArea.regions.map((region) => {
                                const regionId = `region-checkbox-${region}`;
                                return (
                                  <Field key={region} style={{ margin: 0 }}>
                                    <Checkbox
                                      id={regionId}
                                      value={region}
                                      checked={
                                        // @ts-ignore
                                        (value?.output?.region || []).includes(
                                          region
                                        )
                                      }
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        const currentRegions =
                                          // @ts-ignore
                                          value?.output?.region || [];
                                        let newRegions;
                                        if (isChecked) {
                                          // Add region
                                          newRegions = [
                                            ...currentRegions,
                                            region,
                                          ];
                                        } else {
                                          // Remove region
                                          newRegions = currentRegions.filter(
                                            (r: string) => r !== region
                                          );
                                        }
                                        setOutput({
                                          // @ts-ignore
                                          ...value?.output,
                                          region: newRegions,
                                        });
                                      }}
                                    >
                                      <Label htmlFor={regionId}>{region}</Label>
                                    </Checkbox>
                                  </Field>
                                );
                              })}
                            </RegionsContainer>
                          </div>
                        ))}
                      </>
                    )}
                </>
              );
            })}
          </FieldWrapper>
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};

export default Location;
