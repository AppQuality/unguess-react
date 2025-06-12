import React, { useMemo } from 'react';
import {
  AccordionNew,
  Label,
  Span,
  RadioCard,
  SM,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { getIconFromModuleType } from '../utils';
import styled from 'styled-components';
import { useModule } from 'src/features/modules/useModule';

const RadioWrapper = styled.div<{ columns?: string }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.columns}, 1fr);
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.md};
  width: 100%;
`;

const countryOptions = [
  { label: 'Italy', value: 'IT', icon: undefined },
  { label: 'France', value: 'FR', icon: undefined },
  { label: 'Spain', value: 'ES', icon: undefined },
];

const areaOptions = [
  { label: 'Aree Nielsen e Regioni', value: 'region', icon: undefined },
  { label: 'Province e grossi centri', value: 'city', icon: undefined },
];

const Location = () => {
  const { t } = useTranslation();
  // @ts-ignore
  const { value, setOutput, remove } = useModule('location');
  // @ts-ignore
  const isAreaSelectionEnabled = useMemo(
    () => value?.output?.country === 'IT',
    // @ts-ignore
    [value?.output?.country]
  );

  const [selectedArea, setSelectedArea] = React.useState<string | undefined>(
    () => {
      if (!isAreaSelectionEnabled) return undefined;
      // @ts-ignore
      if (value?.output?.region) return 'region';
      // @ts-ignore
      if (value?.output?.city) return 'city';
      return undefined;
    }
  );
  const handleCountryChange = (value: string) => {
    if (value !== 'IT') {
      // If the selected country is not Italy, reset area selection
      setSelectedArea(undefined);
    }
    // @ts-ignore
    setOutput({ country: value });
  };
  const handleAreaChange = (value: string) => {
    setSelectedArea(value);
  };

  // @ts-ignore
  const selectedCountry = value?.output?.country;

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
          <RadioWrapper
            columns="3"
            role="group"
            aria-label={t('__PLAN_PAGE_MODULE_LOCATION_SELECT_COUNTRY')}
          >
            {countryOptions.map((option) => (
              <RadioCard
                role="radio"
                key={option.value}
                label={option.label}
                value={option.value}
                checked={selectedCountry === option.value}
                onChecked={handleCountryChange}
                name="country"
                icon={option.icon}
              />
            ))}
          </RadioWrapper>
          {isAreaSelectionEnabled && (
            <RadioWrapper
              columns="2"
              role="group"
              aria-label={t('__PLAN_PAGE_MODULE_LOCATION_SELECT_AREA')}
            >
              {areaOptions.map((option) => (
                <RadioCard
                  role="radio"
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  checked={selectedArea === option.value}
                  onChecked={handleAreaChange}
                  name="area"
                  icon={option.icon}
                />
              ))}
            </RadioWrapper>
          )}
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};

export default Location;
