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
import { defaultBanks } from './defaultBanks';
import { BankType } from './types';

const Bank = () => {
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { value, setOutput, remove } = useModule('bank');
  const { t } = useTranslation();
  const isOtherProvidersSelected = value?.output.some(
    (bank) => bank.isOther === 1
  );
  const Icon = useIconWithValidation();

  const validation = (
    module: components['schemas']['Module'] & { type: 'bank' }
  ) => {
    if (!module.output || module.output.length === 0) {
      return { value: t('__BANK_ERROR_REQUIRED') };
    }

    if (
      module.output.some((bank) => bank.isOther === 1) &&
      module.output.find((bank) => bank.isOther === 1)?.name === ''
    ) {
      return { value: t('__OTHER_BANK_ERROR_REQUIRED') };
    }

    return true;
  };

  const { error, validate } = useValidation({
    type: 'bank',
    validate: validation,
  });

  const isDefaultVariant = value?.variant === 'default';

  const bankError =
    error && typeof error === 'object' && `bank.value` in error
      ? error[`bank.value`]
      : false;

  const [otherProviderName, setOtherProviderName] = useState('');

  // Update the initial state if the value already contains an "Other" provider
  useEffect(() => {
    const other = value?.output.find((bank) => bank.isOther === 1);
    if (other) {
      setOtherProviderName(other.name || '');
    } else {
      setOtherProviderName('');
    }
  }, [value?.output]);

  const updateOutput = (
    banks: BankType[],
    otherName?: string,
    doValidation?: boolean
  ) => {
    const updatedBanks = banks.map((bank) => ({
      name: bank.isOther ? otherName ?? otherProviderName : bank.name,
      isOther: bank.isOther ? 1 : 0,
    }));

    setOutput(updatedBanks);
    if (doValidation) {
      validate({ output: updatedBanks, variant: value?.variant || 'default' });
    }
  };

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  return (
    <div>
      <AccordionNew
        hasBorder
        className="bank-checkboxes"
        data-qa="bank-module"
        type={bankError ? 'danger' : 'default'}
        level={3}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={Icon}>
            <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_BANK_LABEL')} />
            {getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Tooltip
                  placement="start"
                  type="light"
                  size="small"
                  content={t('__PLAN_PAGE_MODULE_BANK_REMOVE_TOOLTIP_BUTTON')}
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
              <Label>{t('__PLAN_PAGE_MODULE_BANK_TITLE')}</Label>
              <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              <div>
                {defaultBanks.map((b) => (
                  <FormField
                    key={`bank-${b.name}`}
                    style={{
                      marginTop: appTheme.space.sm,
                    }}
                  >
                    <Checkbox
                      key={`bank-${b.name}`}
                      value={b.name}
                      name={`bank-${b.name}`}
                      disabled={getPlanStatus() !== 'draft'}
                      checked={value?.output.some(
                        (item) =>
                          item.isOther === b.isOther &&
                          (b.isOther
                            ? item.isOther === 1
                            : item.name === b.name)
                      )}
                      onChange={(e) => {
                        const shouldValidate =
                          (e.target.checked && !b.isOther) || !e.target.checked;

                        const updatedBanks = e.target.checked
                          ? [
                              ...(value?.output ?? []),
                              {
                                name: b.isOther ? otherProviderName : b.name,
                                isOther: b.isOther ? 1 : 0,
                              },
                            ]
                          : (value?.output ?? []).filter((item) =>
                              b.isOther
                                ? item.isOther !== 1
                                : !(item.name === b.name && item.isOther === 0)
                            );

                        updateOutput(
                          updatedBanks,
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
                        {b.name}
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
                        {t('__PLAN_PAGE_MODULE_OTHER_BANK_LABEL_HINT')}
                      </Hint>
                      <Span style={{ color: appTheme.palette.red[600] }}>
                        *
                      </Span>
                    </div>
                    <FormField>
                      <Textarea
                        id="other-bank-name"
                        name="other-bank-name"
                        readOnly={getPlanStatus() !== 'draft'}
                        isResizable
                        onBlur={() => {
                          validate();
                        }}
                        value={otherProviderName}
                        onChange={(e) => {
                          setOtherProviderName(e.target.value);
                          const updatedBanks = (value?.output || []).map(
                            (bank) => {
                              if (bank.isOther === 1) {
                                return { ...bank, name: e.target.value };
                              }
                              return bank;
                            }
                          );

                          updateOutput(updatedBanks, e.target.value, true);
                        }}
                        placeholder={t(
                          '__PLAN_PAGE_MODULE_OTHER_BANK_TEXTAREA_PLACEHOLDER'
                        )}
                      />
                    </FormField>
                  </div>
                )}
              </div>

              {bankError && (
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
                    data-qa="bank-error"
                  >
                    {bankError}
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

export default Bank;
