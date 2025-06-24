import {
  FormField as Field,
  Label,
  Radio,
  Tag,
} from '@appquality/unguess-design-system';
import React from 'react';
import { appTheme } from 'src/app/theme';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import styled from 'styled-components';

const countryOptions = [
  { label: '🇮🇹 Italy', value: 'IT' },
  { label: '🇫🇷 France', value: 'FR' },
  { label: '🇪🇸 Spain', value: 'ES' },
];

const RadioTag = styled(Tag)<{ color: string }>`
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.xxs};
  * {
    user-select: none;
  }
`;

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

type CountrySelectorProps = {
  selectedCountry: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ariaLabel: string;
};

export const CountrySelector = ({
  selectedCountry,
  onChange,
  ariaLabel,
}: CountrySelectorProps) => {
  const { getPlanStatus } = useModuleConfiguration();
  return (
    <FieldWrapper columns="3" role="group" aria-label={ariaLabel}>
      {countryOptions.map((option) => {
        const inputId = `country-radio-${option.value}`;
        return (
          <RadioTag
            key={option.value}
            color={appTheme.palette.azure[600]}
            style={{
              backgroundColor: appTheme.palette.azure[100],
              marginBottom: appTheme.space.sm,
            }}
          >
            <Field style={{ margin: 0 }}>
              <Radio
                disabled={getPlanStatus() !== 'draft'}
                id={inputId}
                value={option.value}
                name="country"
                checked={selectedCountry === option.value}
                onChange={onChange}
              >
                <Label htmlFor={inputId}>{option.label}</Label>
              </Radio>
            </Field>
          </RadioTag>
        );
      })}
    </FieldWrapper>
  );
};
