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
import { DeleteModuleConfirmationModal } from 'src/pages/Plan/modules/modal/DeleteModuleConfirmationModal';
import { useIconWithValidation } from '../useIcon';
import { defaultGasProviders } from './defaultGasProviders';
import { GasProvidersType } from './types';

const GasProviders = () => {
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { value, setOutput, remove } = useModule('gas_supply');
  const { t } = useTranslation();
  const isOtherProvidersSelected = value?.output.some(
    (provider) => provider.isOther === 1
  );
  const Icon = useIconWithValidation();
  const validation = (
    module: components['schemas']['Module'] & { type: 'gas_supply' }
  ) => {
    if (!module.output || module.output.length === 0) {
      return { value: t('__GAS_ERROR_REQUIRED') };
    }

    if (
      module.output.some((gas_supply) => gas_supply.isOther === 1) &&
      module.output.find((gas_supply) => gas_supply.isOther === 1)?.name === ''
    ) {
      return { value: t('__OTHER_GAS_ERROR_REQUIRED') };
    }

    return true;
  };

  const { error, validate } = useValidation({
    type: 'gas_supply',
    validate: validation,
  });

  const isDefaultVariant = value?.variant === 'default';

  const gasError =
    error && typeof error === 'object' && `gas_supply.value` in error
      ? error[`gas_supply.value`]
      : false;

  const [otherProviderName, setOtherProviderName] = useState('');

  useEffect(() => {
    const other = value?.output.find((gas_supply) => gas_supply.isOther === 1);
    if (other) {
      setOtherProviderName(other.name || '');
    } else {
      setOtherProviderName('');
    }
  }, [value?.output]);

  const updateOutput = (
    gasProviders: GasProvidersType[],
    otherName?: string,
    doValidation?: boolean
  ) => {
    const updatedGasProviders = gasProviders.map((ep) => ({
      name: ep.isOther ? otherName ?? otherProviderName : ep.name,
      isOther: ep.isOther ? 1 : 0,
    }));

    setOutput(updatedGasProviders);
    if (doValidation) {
      validate({
        output: updatedGasProviders,
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
        className="gas-checkboxes"
        data-qa="gas-module"
        type={gasError ? 'danger' : 'default'}
        level={3}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={Icon}>
            <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_GAS_LABEL')} />
            {getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Tooltip
                  placement="start"
                  type="light"
                  size="small"
                  content={t('__PLAN_PAGE_MODULE_GAS_REMOVE_TOOLTIP_BUTTON')}
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
              <Label>{t('__PLAN_PAGE_MODULE_GAS_TITLE')}</Label>
              <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              <div>
                {defaultGasProviders.map((e) => (
                  <FormField
                    key={`gas-${e.name}`}
                    style={{
                      marginTop: appTheme.space.sm,
                    }}
                  >
                    <Checkbox
                      key={`gas-${e.name}`}
                      value={e.name}
                      name={`gas-${e.name}`}
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

                        const updatedGasProviders = event.target.checked
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
                          updatedGasProviders,
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
                        {t('__PLAN_PAGE_MODULE_OTHER_GAS_LABEL_HINT')}
                      </Hint>
                      <Span style={{ color: appTheme.palette.red[600] }}>
                        *
                      </Span>
                    </div>
                    <FormField>
                      <Textarea
                        id="other-gas-name"
                        name="other-gas-name"
                        readOnly={getPlanStatus() !== 'draft'}
                        isResizable
                        onBlur={() => {
                          validate();
                        }}
                        value={otherProviderName}
                        onChange={(e) => {
                          setOtherProviderName(e.target.value);
                          const updatedGasProviders = (value?.output || []).map(
                            (provider) => {
                              if (provider.isOther === 1) {
                                return { ...provider, name: e.target.value };
                              }
                              return provider;
                            }
                          );

                          updateOutput(
                            updatedGasProviders,
                            e.target.value,
                            true
                          );
                        }}
                        placeholder={t(
                          '__PLAN_PAGE_MODULE_OTHER_GAS_TEXTAREA_PLACEHOLDER'
                        )}
                      />
                    </FormField>
                  </div>
                )}
              </div>

              {gasError && (
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
                    data-qa="gas-error"
                  >
                    {gasError}
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

export default GasProviders;
