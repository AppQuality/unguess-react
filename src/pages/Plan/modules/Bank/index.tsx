import {
  AccordionNew,
  Button,
  Checkbox,
  FormField,
  Hint,
  Label,
  Span,
  Textarea,
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
import { getIconFromModuleType } from '../../utils';
import { DeleteModuleConfirmationModal } from '../modal/DeleteModuleConfirmationModal';
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

  const updateOutput = (banks: BankType[], otherName?: string) => {
    if (banks.length > 0) {
      setOutput(
        banks.map((bank) => ({
          name: bank.isOther ? otherName ?? otherProviderName : bank.name,
          isOther: bank.isOther ? 1 : 0,
        }))
      );
    } else {
      setOutput([]);
    }
  };

  useEffect(() => {
    validate();
  }, [value]);

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
          <AccordionNew.Header icon={getIconFromModuleType('bank')}>
            <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_BANK_LABEL')} />
            {getPlanStatus() === 'draft' && (
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
                  {t('__PLAN_PAGE_MODULE_BANK_REMOVE_BUTTON')}
                </Button>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          {isDefaultVariant && (
            <AccordionNew.Panel>
              <Label>{t('__PLAN_PAGE_MODULE_BANK_TITLE')}</Label>
              <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              <FormField
                style={{
                  marginTop: appTheme.space.sm,
                }}
              >
                <Checkbox
                  key="all"
                  value="all"
                  name="bank-all"
                  disabled={getPlanStatus() !== 'draft'}
                  // checked if all banks are selected
                  checked={defaultBanks.every((bank) =>
                    bank.isOther
                      ? value?.output.some((item) => item.isOther === 1)
                      : value?.output.some(
                          (item) =>
                            item.name === bank.name && item.isOther === 0
                        )
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateOutput(defaultBanks, otherProviderName);
                    } else {
                      updateOutput([]);
                    }
                  }}
                >
                  <Label
                    style={{
                      color: appTheme.palette.grey[800],
                      fontSize: appTheme.fontSizes.md,
                    }}
                  >
                    {t('__PLAN_PAGE_MODULE_BANK_ALL_LABEL')}
                  </Label>
                  <Hint>{t('__PLAN_PAGE_MODULE_BANK_ALL_LABEL_HINT')}</Hint>
                </Checkbox>
              </FormField>
              <div style={{ marginLeft: appTheme.space.md }}>
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
                        let updatedBanks = (value?.output ??
                          []) as BankType[] satisfies BankType[];
                        if (e.target.checked) {
                          // If "other providers" is selected, add the value from the textarea
                          if (b.isOther) {
                            updatedBanks = updatedBanks.filter(
                              (item) => item.isOther !== 1
                            );
                            updatedBanks.push({
                              name: otherProviderName,
                              isOther: 1,
                            });
                          } else if (
                            !updatedBanks.some(
                              (item) =>
                                item.name === b.name && item.isOther === 0
                            )
                          ) {
                            updatedBanks = [
                              ...updatedBanks,
                              { name: b.name, isOther: 0 },
                            ];
                          }
                        } else {
                          // Remove the selected bank
                          updatedBanks = updatedBanks.filter((item) =>
                            b.isOther
                              ? item.isOther !== 1
                              : !(item.name === b.name && item.isOther === 0)
                          );
                        }
                        updateOutput(
                          updatedBanks,
                          b.isOther ? otherProviderName : ''
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
                        value={otherProviderName}
                        onChange={(e) => {
                          setOtherProviderName(e.target.value);
                          // Update output only if "Other providers" is selected
                          const others = (value?.output || []).filter(
                            (item) => item.isOther === 1
                          );
                          if (others.length > 0) {
                            const rest = (value?.output || []).filter(
                              (item) => item.isOther !== 1
                            );
                            updateOutput(
                              [
                                ...rest.map((bank) => ({
                                  name: bank.name,
                                  isOther: 0,
                                })),
                                { name: e.target.value, isOther: 1 },
                              ],
                              e.target.value
                            );
                          }
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
