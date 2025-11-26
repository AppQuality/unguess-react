import {
  AccordionNew,
  Checkbox,
  FormField,
  Hint,
  IconButton,
  Label,
  Span,
  Textarea,
  Tooltip,
} from '@appquality/unguess-design-system';
import { ReactComponent as DeleteIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import useWindowSize from 'src/hooks/useWindowSize';
import { DeleteModuleConfirmationModal } from 'src/pages/Plan/modules/modal/DeleteModuleConfirmationModal';
import { useIconWithValidation } from '../useIcon';
import { defaultElectricityProviders } from './defaultElectricityProviders';
import { ElectricityProvidersType } from './types';

const ElectricityProviders = () => {
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { value, setOutput, remove } = useModule('elettricity_supply');
  const { t } = useTranslation();
  const Icon = useIconWithValidation();
  const isOtherProvidersSelected = value?.output.some(
    (provider) => provider.isOther === 1
  );
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const isMobile = width < breakpointSm;

  const validation = (
    module: components['schemas']['Module'] & { type: 'elettricity_supply' }
  ) => {
    if (!module.output || module.output.length === 0) {
      return { value: t('__ELECTRICITY_ERROR_REQUIRED') };
    }

    if (
      module.output.some(
        (elettricity_supply) => elettricity_supply.isOther === 1
      ) &&
      module.output.find(
        (elettricity_supply) => elettricity_supply.isOther === 1
      )?.name === ''
    ) {
      return { value: t('__OTHER_ELECTRICITY_ERROR_REQUIRED') };
    }

    return true;
  };

  const { error, validate } = useValidation({
    type: 'elettricity_supply',
    validate: validation,
  });

  const isDefaultVariant = value?.variant === 'default';

  const electricityError =
    error && typeof error === 'object' && `elettricity_supply.value` in error
      ? error[`elettricity_supply.value`]
      : false;

  const [otherProviderName, setOtherProviderName] = useState('');

  // Update the initial state if the value already contains an "Other" provider
  useEffect(() => {
    const other = value?.output.find(
      (elettricity_supply) => elettricity_supply.isOther === 1
    );
    if (other) {
      setOtherProviderName(other.name || '');
    } else {
      setOtherProviderName('');
    }
  }, [value?.output]);

  const updateOutput = (
    electricityProviders: ElectricityProvidersType[],
    otherName?: string,
    doValidation?: boolean
  ) => {
    const updatedElectricityProviders = electricityProviders.map((ep) => ({
      name: ep.isOther ? otherName ?? otherProviderName : ep.name,
      isOther: ep.isOther ? 1 : 0,
    }));

    setOutput(updatedElectricityProviders);
    if (doValidation) {
      validate({
        output: updatedElectricityProviders,
        variant: value?.variant || 'default',
      });
    }
  };

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  return (
    <div>
      <AccordionNew
        hasBorder
        className="electricity-checkboxes"
        data-qa="electricity-module"
        type={electricityError ? 'danger' : 'default'}
        level={3}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={Icon}>
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_ELECTRICITY_LABEL')}
            />
            {!isMobile && getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Tooltip
                  placement="start"
                  type="light"
                  size="small"
                  content={t(
                    '__PLAN_PAGE_MODULE_ELECTRICITY_SUPPLY_REMOVE_TOOLTIP_BUTTON'
                  )}
                >
                  <IconButton
                    isDanger
                    onClick={(e) => {
                      handleDelete();
                      e.stopPropagation();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          {isDefaultVariant && (
            <AccordionNew.Panel>
              <Label>{t('__PLAN_PAGE_MODULE_ELECTRICITY_TITLE')}</Label>
              <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              <div>
                {defaultElectricityProviders.map((e) => (
                  <FormField
                    key={`electricity-${e.name}`}
                    style={{
                      marginTop: appTheme.space.sm,
                    }}
                  >
                    <Checkbox
                      key={`electricity-${e.name}`}
                      value={e.name}
                      name={`electricity-${e.name}`}
                      disabled={getPlanStatus() !== 'draft'}
                      checked={value?.output.some(
                        (item) =>
                          item.isOther === e.isOther &&
                          (e.isOther
                            ? item.isOther === 1
                            : item.name === e.name)
                      )}
                      onChange={(event) => {
                        const shouldValidate =
                          (event.target.checked && !e.isOther) ||
                          !event.target.checked;

                        const updatedElectricityProviders = event.target.checked
                          ? [
                              ...(value?.output ?? []),
                              {
                                name: e.isOther ? otherProviderName : e.name,
                                isOther: e.isOther ? 1 : 0,
                              },
                            ]
                          : (value?.output ?? []).filter((item) =>
                              e.isOther
                                ? item.isOther !== 1
                                : !(item.name === e.name && item.isOther === 0)
                            );

                        updateOutput(
                          updatedElectricityProviders,
                          otherProviderName,
                          shouldValidate
                        );
                      }}
                    >
                      <Label
                        style={{
                          color: appTheme.palette.grey[800],
                          fontSize: appTheme.fontSizes.md,
                        }}
                      >
                        {e.name}
                      </Label>
                    </Checkbox>
                  </FormField>
                ))}
                {isOtherProvidersSelected && (
                  <div style={{ marginLeft: appTheme.space.md }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: appTheme.space.xs,
                      }}
                    >
                      <Hint>
                        {t('__PLAN_PAGE_MODULE_OTHER_ELECTRICITY_LABEL_HINT')}
                      </Hint>
                      <Span style={{ color: appTheme.palette.red[600] }}>
                        *
                      </Span>
                    </div>
                    <FormField>
                      <Textarea
                        id="other-electricity-name"
                        name="other-electricity-name"
                        readOnly={getPlanStatus() !== 'draft'}
                        isResizable
                        onBlur={() => {
                          validate();
                        }}
                        value={otherProviderName}
                        onChange={(e) => {
                          setOtherProviderName(e.target.value);
                          const updatedElectricityProviders = (
                            value?.output || []
                          ).map((provider) => {
                            if (provider.isOther === 1) {
                              return { ...provider, name: e.target.value };
                            }
                            return provider;
                          });

                          updateOutput(
                            updatedElectricityProviders,
                            e.target.value,
                            true
                          );
                        }}
                        placeholder={t(
                          '__PLAN_PAGE_MODULE_OTHER_ELECTRICITY_TEXTAREA_PLACEHOLDER'
                        )}
                      />
                    </FormField>
                  </div>
                )}
              </div>

              {electricityError && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: appTheme.space.sm,
                  }}
                >
                  <AlertIcon />
                  <Span
                    style={{
                      marginLeft: appTheme.space.xs,
                      color: appTheme.palette.red[600],
                    }}
                    data-qa="electricity-error"
                  >
                    {electricityError}
                  </Span>
                </div>
              )}
            </AccordionNew.Panel>
          )}
        </AccordionNew.Section>
      </AccordionNew>
      {isOpenDeleteModal && (
        <DeleteModuleConfirmationModal
          onQuit={() => setIsOpenDeleteModal(false)}
          onConfirm={remove}
        />
      )}
    </div>
  );
};

export default ElectricityProviders;
