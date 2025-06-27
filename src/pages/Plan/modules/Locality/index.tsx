import {
  AccordionNew,
  Button,
  FormField as Field,
  FormHint as Hint,
  Label,
  Message,
  Paragraph,
  Radio,
  Separator,
  Span,
} from '@appquality/unguess-design-system';
import { ReactComponent as DeleteIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { getIconFromModuleType } from '../../utils';
import { DeleteModuleConfirmationModal } from '../modal/DeleteModuleConfirmationModal';
import { CitiesPanel } from './components/CitiesPanel';
import { CountrySelector } from './components/CountrySelector';
import { RegionPanel } from './components/RegionPanel';
import { areaOptions } from './data/areaOptions';

const FieldWrapper = styled.div`
  padding-top: ${({ theme }) => theme.space.md};
  padding-left: ${({ theme }) => theme.space.md};
  padding-right: ${({ theme }) => theme.space.md};
  width: 100%;
`;

const OptionTagWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space.xs};
  margin-left: ${({ theme }) => theme.space.sm};
  padding-left: ${({ theme }) => theme.space.xxs};
`;

const AreaRadioWrapper = styled.div`
  &:not(:last-of-type) {
    margin-bottom: ${({ theme }) => theme.space.lg};
  }
`;

const Locality = () => {
  const { t } = useTranslation();
  const { value, setOutput, remove } = useModule('locality');
  const { hasFeatureFlag } = useFeatureFlag();
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

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
  let selectedArea = 'all';
  if (regionObj) {
    selectedArea = 'region';
  } else if (cityObj) {
    selectedArea = 'city';
  }

  const localityRef = useRef<HTMLDivElement>(null);

  const validation = useCallback(
    ({ output }: components['schemas']['ModuleLocality']) => {
      let error;
      const countryOutput = output?.find((a) => a.type === 'country');
      const regionOutput = output?.find((a) => a.type === 'region');
      const cityOutput = output?.find((a) => a.type === 'city');

      if (
        !countryOutput ||
        !countryOutput.values ||
        countryOutput.values.length === 0 ||
        !countryOutput.values[0]
      ) {
        error = t('__PLAN_PAGE_MODULE_LOCALITY_COUNTRY_ERROR');
        return error;
      }
      if (
        regionOutput &&
        (!regionOutput.values || regionOutput.values.length === 0)
      ) {
        error = t('__PLAN_PAGE_MODULE_LOCALITY_REGION_ERROR');
        return error;
      }
      if (
        cityOutput &&
        (!cityOutput.values || cityOutput.values.length === 0)
      ) {
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

  const handleAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const areaType = event.target.value;
    // Always start with only the country
    const newArr = [...(countryObj ? [countryObj] : [])];
    if (areaType === 'region') {
      newArr.push({ type: 'region', values: [] });
    } else if (areaType === 'city') {
      newArr.push({ type: 'city', values: [] });
    }

    if (error) {
      validate({
        variant: value?.variant || 'default',
        output: newArr,
      });
    }

    // If 'all', just country
    setOutput(newArr);
  };
  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };
  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueCountry = event.target.value;
    validate({
      variant: value?.variant || 'default',
      output: [{ type: 'country', values: [valueCountry] }],
    });
    setOutput([{ type: 'country', values: [valueCountry] }]);
  };

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
    <>
      <div ref={localityRef}>
        <AccordionNew
          data-qa="locality-module"
          data-testid="locality-module"
          level={3}
          hasBorder
          type={error ? 'danger' : 'default'}
        >
          <AccordionNew.Section>
            <AccordionNew.Header icon={getIconFromModuleType('locality')}>
              <AccordionNew.Label
                label={t('__PLAN_PAGE_MODULE_LOCALITY_TITLE', 'Location')}
              />
              {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) &&
                getPlanStatus() === 'draft' && (
                  <AccordionNew.Meta>
                    <Button
                      isBasic
                      isDanger
                      onClick={(e) => {
                        handleDelete();
                        e.stopPropagation();
                      }}
                    >
                      <Button.StartIcon>
                        <DeleteIcon />
                      </Button.StartIcon>
                      {t('__PLAN_PAGE_MODULE_LOCALITY_REMOVE_BUTTON')}
                    </Button>
                  </AccordionNew.Meta>
                )}
            </AccordionNew.Header>
            <AccordionNew.Panel>
              <div style={{ marginBottom: appTheme.space.md }}>
                <Label>{t('__PLAN_PAGE_MODULE_LOCALITY_LABEL')}</Label>
                <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              </div>
              <CountrySelector
                selectedCountry={selectedCountry}
                onChange={handleCountryChange}
                ariaLabel={t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_COUNTRY')}
              />
              {selectedCountry === 'IT' && (
                <>
                  <Separator style={{ margin: `${appTheme.space.md} 0` }} />
                  <Paragraph style={{ padding: `${appTheme.space.xs} 0` }}>
                    <Trans
                      i18nKey="__PLAN_PAGE_MODULE_LOCALITY_NARROW_DOWN_AREAS"
                      components={{
                        s: <Span hue={appTheme.palette.azure[600]} />,
                      }}
                      defaults="Narrow down to specific areas <s>(Italy only)</s>"
                    />
                  </Paragraph>
                  <FieldWrapper
                    role="group"
                    aria-label={t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_AREA')}
                  >
                    {areaOptions.map((option) => {
                      const inputId = `area-radio-${option.value}`;
                      return (
                        <AreaRadioWrapper key={option.value}>
                          <Field style={{ margin: 0 }}>
                            <Radio
                              id={inputId}
                              disabled={getPlanStatus() !== 'draft'}
                              value={option.value}
                              name="area"
                              checked={selectedArea === option.value}
                              onChange={handleAreaChange}
                            >
                              <Label htmlFor={inputId}>{option.label}</Label>
                              {option.hint && <Hint>{option.hint}</Hint>}
                              <OptionTagWrapper>{option.tag}</OptionTagWrapper>
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
                        </AreaRadioWrapper>
                      );
                    })}
                  </FieldWrapper>
                </>
              )}
              {error && typeof error === 'string' && (
                <div
                  style={{
                    marginTop: appTheme.space.md,
                    paddingLeft: appTheme.space.lg,
                  }}
                >
                  <Message
                    validation="error"
                    data-qa="locality-module-error-message"
                    data-testid="locality-module-error-message"
                  >
                    {error}
                  </Message>
                </div>
              )}
            </AccordionNew.Panel>
          </AccordionNew.Section>
        </AccordionNew>
      </div>
      {isOpenDeleteModal && (
        <DeleteModuleConfirmationModal
          onQuit={() => setIsOpenDeleteModal(false)}
          onConfirm={remove}
        />
      )}
    </>
  );
};

export default Locality;
