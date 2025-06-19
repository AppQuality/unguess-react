import {
  FormField as Field,
  Checkbox,
  Label,
  Hint,
  Span,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useModule } from 'src/features/modules/useModule';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { components } from 'src/common/schema';
import { appTheme } from 'src/app/theme';
import { CITIES } from '../data/cities';
import { useCallback } from 'react';

const CitiesContainer = styled.div`
  padding-left: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

type ModuleOutput = components['schemas']['OutputModuleLocality'];

type CitiesPanelProps = {
  validate?: ReturnType<typeof useValidation<'locality'>>['validate'];
};

const getCityArea = (areaArr: ModuleOutput = []) =>
  areaArr.find((a) => a.type === 'city') || { type: 'city', values: [] };

export const CitiesPanel = ({ validate }: CitiesPanelProps) => {
  const { t } = useTranslation();
  const { value, setOutput } = useModule('locality');
  const areaArr: ModuleOutput = value?.output || [];
  const cityArea = getCityArea(areaArr);
  const selectedCities = cityArea.values || [];

  const updateCities = useCallback(
    (newCities: string[]) => {
      const newAreaArr: ModuleOutput = [
        ...areaArr.filter((a: ModuleOutput[0]) => a.type !== 'city'),
        { type: 'city', values: newCities },
      ];
      setOutput(newAreaArr);
      if (validate) {
        validate({
          output: newAreaArr,
          variant: value?.variant || 'default',
        });
      }
    },
    [areaArr, setOutput, validate, value?.variant]
  );

  return (
    <div
      role="group"
      aria-label={t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_CITY')}
      style={{ marginTop: appTheme.space.lg, paddingLeft: appTheme.space.xl }}
    >
      <div
        style={{
          paddingTop: appTheme.space.xs,
          marginBottom: appTheme.space.md,
        }}
      >
        <Label>{t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_CITY')}</Label>
        <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
        <Hint>{t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_CITY_HINT')}</Hint>
      </div>
      <CitiesContainer>
        {CITIES.map((city) => {
          const cityId = `city-checkbox-${city.value}`;
          return (
            <Field key={city.value} style={{ margin: 0 }}>
              <Checkbox
                id={cityId}
                value={city.value}
                checked={selectedCities.includes(city.value)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  let newCities;
                  if (isChecked) {
                    newCities = [...selectedCities, city.value];
                  } else {
                    newCities = selectedCities.filter(
                      (c: string) => c !== city.value
                    );
                  }
                  updateCities(newCities);
                }}
              >
                <Label htmlFor={cityId}>{city.label}</Label>
              </Checkbox>
            </Field>
          );
        })}
      </CitiesContainer>
    </div>
  );
};
