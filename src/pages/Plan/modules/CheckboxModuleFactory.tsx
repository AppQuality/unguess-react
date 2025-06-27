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
import { getIconFromModuleType } from '../utils';
import { DeleteModuleConfirmationModal } from './modal/DeleteModuleConfirmationModal';

export interface CheckboxOption {
  label: string;
  value: string;
  isOther?: boolean;
}

interface Props<T extends components['schemas']['Module']['type']> {
  type: T;
  moduleLabel: string;
  title: string;
  allLabel: string;
  allHint: string;
  otherPlaceholder?: string;
  options: CheckboxOption[];
}

export const CheckboxModuleFactory = <
  T extends components['schemas']['Module']['type']
>({
  type,
  moduleLabel,
  title,
  allLabel,
  allHint,
  otherPlaceholder,
  options,
}: Props<T>) => {
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { value, setOutput, remove } = useModule(type);
  const { t } = useTranslation();

  const otherSelected =
    Array.isArray(value?.output) &&
    value?.output.some((o: any) => Boolean(o.isOther));
  const [otherName, setOtherName] = useState('');

  const { error, validate } = useValidation({
    type,
    validate: (module) => {
      if (!Array.isArray(module.output) || module.output.length === 0) {
        return { value: t('__COMMON_REQUIRED') };
      }
      if (
        Array.isArray(module.output) &&
        module.output.some((b: any) => b.isOther === 1) &&
        (module.output as Array<{ isOther: number; name?: string }>).find(
          (b) => b.isOther === 1
        )?.name === ''
      ) {
        return { value: t('__COMMON_OTHER_REQUIRED') };
      }
      return true;
    },
  });

  const updateOutput = (list: CheckboxOption[], other?: string) => {
    if (list.length > 0) {
      setOutput(
        list.map((i) => ({
          name: i.isOther ? other ?? otherName : i.label,
          isOther: i.isOther ? 1 : 0,
        }))
      );
    } else {
      setOutput([]);
    }
  };

  useEffect(() => {
    validate();
  }, [value]);

  const handleDelete = () => setIsOpenDeleteModal(true);

  return (
    <div>
      <AccordionNew
        hasBorder
        data-qa={`${type}-module`}
        type={error ? 'danger' : 'default'}
        level={3}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={getIconFromModuleType(type)}>
            <AccordionNew.Label label={moduleLabel} />
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
                  {t(`__PLAN_PAGE_MODULE_${type.toUpperCase()}_REMOVE_BUTTON`)}
                </Button>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <Label>{title}</Label>
            <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
            <FormField style={{ marginTop: appTheme.space.sm }}>
              <Checkbox
                key="all"
                value="all"
                name={`${type}-all`}
                disabled={getPlanStatus() !== 'draft'}
                checked={options.every((b) =>
                  b.isOther
                    ? Array.isArray(value?.output) &&
                      value?.output.some((i: any) => Boolean(i.isOther))
                    : Array.isArray(value?.output) &&
                      value?.output.some(
                        (i: any) => i.name === b.label && !i.isOther
                      )
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateOutput(options, otherName);
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
                  {allLabel}
                </Label>
                <Hint>{allHint}</Hint>
              </Checkbox>
            </FormField>
            <div style={{ marginLeft: appTheme.space.md }}>
              {options.map((b) => (
                <FormField
                  key={`${type}-${b.label}`}
                  style={{ marginTop: appTheme.space.sm }}
                >
                  <Checkbox
                    value={b.label}
                    name={`${type}-${b.label}`}
                    disabled={getPlanStatus() !== 'draft'}
                    checked={
                      Array.isArray(value?.output) &&
                      value?.output.some(
                        (i: any) =>
                          Boolean(i.isOther) === Boolean(b.isOther) &&
                          (b.isOther ? Boolean(i.isOther) : i.name === b.label)
                      )
                    }
                    onChange={(e) => {
                      let updated: CheckboxOption[] = Array.isArray(
                        value?.output
                      )
                        ? ((value?.output ?? []) as any[]).map((i: any) => ({
                            label: i.name,
                            value: i.name,
                            isOther: Boolean(i.isOther),
                          }))
                        : [];
                      if (e.target.checked) {
                        if (b.isOther) {
                          updated = updated.filter((i) => !i.isOther);
                          updated.push({
                            label: otherName,
                            value: otherName,
                            isOther: true,
                          });
                        } else if (
                          !updated.some(
                            (i) => i.value === b.label && !i.isOther
                          )
                        ) {
                          updated = [
                            ...updated,
                            { label: b.label, value: b.label },
                          ];
                        }
                      } else {
                        updated = updated.filter((i) =>
                          b.isOther
                            ? !i.isOther
                            : !(i.value === b.label && !i.isOther)
                        );
                      }
                      updateOutput(updated, b.isOther ? otherName : '');
                    }}
                  >
                    <Label
                      style={{
                        color: appTheme.palette.grey[800],
                        fontSize: appTheme.fontSizes.md,
                      }}
                    >
                      {b.label}
                    </Label>
                  </Checkbox>
                </FormField>
              ))}
              {otherSelected && otherPlaceholder && (
                <div style={{ marginLeft: appTheme.space.md }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: appTheme.space.xs,
                    }}
                  >
                    <Hint>{t('__PLAN_PAGE_MODULE_OTHER_BANK_LABEL_HINT')}</Hint>
                    <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                  </div>
                  <FormField>
                    <Textarea
                      id={`other-${type}-name`}
                      name={`other-${type}-name`}
                      readOnly={getPlanStatus() !== 'draft'}
                      isResizable
                      value={otherName}
                      onChange={(e) => {
                        setOtherName(e.target.value);
                        const others = Array.isArray(value?.output)
                          ? (value?.output as any[]).filter((i: any) =>
                              Boolean(i.isOther)
                            )
                          : [];
                        if (others.length > 0) {
                          const rest = Array.isArray(value?.output)
                            ? (value?.output as any[]).filter(
                                (i: any) => !i.isOther
                              )
                            : [];
                          updateOutput(
                            [
                              ...rest.map((r: any) => ({
                                label: r.name,
                                value: r.name,
                              })),
                              {
                                label: e.target.value,
                                value: e.target.value,
                                isOther: true,
                              },
                            ],
                            e.target.value
                          );
                        }
                      }}
                      placeholder={otherPlaceholder}
                    />
                  </FormField>
                </div>
              )}
            </div>
            {error && (
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
                >
                  {typeof error === 'string' ? error : error[`${type}.value`]}
                </Span>
              </div>
            )}
          </AccordionNew.Panel>
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
