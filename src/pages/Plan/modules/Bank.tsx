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
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { getIconFromModuleType } from '../utils';
import { DeleteModuleConfirmationModal } from './modal/DeleteModuleConfirmationModal';

const Bank = () => {
  type BankType = {
    name: components['schemas']['OutputServiceProviders'][number]['name'];
    isOther: components['schemas']['OutputServiceProviders'][number]['isOther'];
  };

  const { hasFeatureFlag } = useFeatureFlag();
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { value, setOutput, remove } = useModule('bank');
  const { t } = useTranslation();
  const isOtherProvidersSelected = value?.output.find(
    (bank) => bank.isOther === 1
  );
  const validation = (
    module: components['schemas']['Module'] & { type: 'bank' }
  ) => {
    if (!module.output || module.output.length === 0) {
      return { value: t('__BANK_ERROR_REQUIRED') };
    }

    return true;
  };

  const { error, validate } = useValidation({
    type: 'bank',
    validate: validation,
  });

  const isDefaultVariant = value?.variant === 'default';

  const defaultBanks: BankType[] = [
    {
      name: 'Intesa San Paolo',
      isOther: 0,
    },
    {
      name: 'Poste Italiane',
      isOther: 0,
    },
    {
      name: 'Unicredit',
      isOther: 0,
    },
    {
      name: 'ING',
      isOther: 0,
    },
    {
      name: 'Fineco',
      isOther: 0,
    },
    { name: 'Other providers', isOther: 1 },
  ];

  const bankError =
    error && typeof error === 'object' && `bank.value` in error
      ? error[`bank.value`]
      : false;

  const updateOutput = (desiredBanks: { bank: BankType }[]) => {
    if (desiredBanks.length > 0) {
      setOutput(
        desiredBanks.map((item) => ({
          ...item.bank,
          isOther: item.bank.isOther ? 1 : 0,
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
                    value?.output.some(
                      (item) =>
                        item.name === bank.name && item.isOther === bank.isOther
                    )
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateOutput(
                        defaultBanks.map((bank) => ({
                          bank: {
                            name: bank.name,
                            isOther: bank.isOther,
                          },
                        }))
                      );
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
                          item.name === b.name && item.isOther === b.isOther
                      )}
                      onChange={(e) => {
                        let updatedBanks;
                        if (e.target.checked) {
                          // Add the selected bank if not already present
                          updatedBanks = [
                            ...(value?.output || []),
                            { name: b.name, isOther: b.isOther },
                          ];
                        } else {
                          // Remove the unselected bank
                          updatedBanks = (value?.output || []).filter(
                            (item) =>
                              !(
                                item.name === b.name &&
                                item.isOther === b.isOther
                              )
                          );
                        }
                        updateOutput(
                          updatedBanks.map((bank) => ({
                            bank: {
                              name: bank.name,
                              isOther: bank.isOther ?? 0,
                            },
                          }))
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
                  <>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
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
                        isResizable
                        placeholder={t(
                          '__PLAN_PAGE_MODULE_OTHER_BANK_TEXTAREA_PLACEHOLDER'
                        )}
                      />
                    </FormField>
                  </>
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
