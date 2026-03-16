import {
  FormField,
  Input,
  Label,
  MD,
  Select,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

const COUNTRY_CODES = [
  { label: 'Italy', code: '+39' },
  { label: 'France', code: '+33' },
  { label: 'United States', code: '+1' },
  { label: 'United Kingdom', code: '+44' },
  { label: 'Germany', code: '+49' },
  { label: 'Spain', code: '+34' },
];

const PhoneRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  align-items: flex-end;
`;

interface SmsStepProps {
  phoneNumber: string;
  onPhoneNumberChange: (value: string) => void;
  countryCode: string;
  onCountryCodeChange: (value: string) => void;
}

export const SmsStep = ({
  phoneNumber,
  onPhoneNumberChange,
  countryCode,
  onCountryCodeChange,
}: SmsStepProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <MD
        style={{
          color: appTheme.palette.grey[700],
          marginBottom: appTheme.space.lg,
        }}
      >
        {t('__PROFILE_PAGE_MFA_SMS_STEP_DESCRIPTION')}
      </MD>
      <Label style={{ marginBottom: appTheme.space.xs }}>
        {t('__PROFILE_PAGE_MFA_SMS_STEP_PHONE_LABEL')}
      </Label>
      <PhoneRow>
        <Select
          inputValue={countryCode}
          selectionValue={countryCode}
          renderValue={() => countryCode}
          listboxAppendToNode={document.body}
          listboxZIndex={600}
          onSelect={(value) => {
            onCountryCodeChange(value);
          }}
        >
          {COUNTRY_CODES.map((country) => (
            <Select.Option key={country.code} value={country.code}>
              <div>
                <MD>{country.label}</MD>
                <MD style={{ color: appTheme.palette.grey[500] }}>
                  {country.code}
                </MD>
              </div>
            </Select.Option>
          ))}
        </Select>
        <FormField style={{ flex: 1 }}>
          <Input
            type="tel"
            placeholder={t('__PROFILE_PAGE_MFA_SMS_STEP_PHONE_PLACEHOLDER')}
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onPhoneNumberChange(e.target.value)
            }
          />
        </FormField>
      </PhoneRow>
    </div>
  );
};
