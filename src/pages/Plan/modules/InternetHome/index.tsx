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
import { defaultInternetHomeProviders } from './defaultInternetHomeProviders';
import { HomeInternetProvidersType } from './types';

const InternetHomeProviders = () => {
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { value, setOutput, remove } = useModule('home_internet');
  const { t } = useTranslation();
  const isOtherProvidersSelected = value?.output.some(
    (provider) => provider.isOther === 1
  );
  const validation = (
    module: components['schemas']['Module'] & { type: 'home_internet' }
  ) => {
    if (!module.output || module.output.length === 0) {
      return { value: t('__INTERNET_MOBILE_ERROR_REQUIRED') };
    }

    if (
      module.output.some((home_internet) => home_internet.isOther === 1) &&
      module.output.find((home_internet) => home_internet.isOther === 1)
        ?.name === ''
    ) {
      return { value: t('__OTHER_INTERNET_MOBILE_ERROR_REQUIRED') };
    }

    return true;
  };

  const { error, validate } = useValidation({
    type: 'home_internet',
    validate: validation,
  });

  const isDefaultVariant = value?.variant === 'default';

  const internetHomeError =
    error && typeof error === 'object' && `home_internet.value` in error
      ? error[`home_internet.value`]
      : false;

  const [otherProviderName, setOtherProviderName] = useState('');

  // Update the initial state if the value already contains an "Other" provider
  useEffect(() => {
    const other = value?.output.find(
      (home_internet) => home_internet.isOther === 1
    );
    if (other) {
      setOtherProviderName(other.name || '');
    } else {
      setOtherProviderName('');
    }
  }, [value?.output]);

  const updateOutput = (
    intenetHomeProviders: HomeInternetProvidersType[],
    otherName?: string,
    doValidation?: boolean
  ) => {
    const updatedIntenetHomeProviders = intenetHomeProviders.map((ep) => ({
      name: ep.isOther ? otherName ?? otherProviderName : ep.name,
      isOther: ep.isOther ? 1 : 0,
    }));

    setOutput(updatedIntenetHomeProviders);
    if (doValidation) {
      validate({
        output: updatedIntenetHomeProviders,
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
        className="internet-home-checkboxes"
        data-qa="internet-home-module"
        type={internetHomeError ? 'danger' : 'default'}
        level={3}
      >
        <AccordionNew.Section>
          <AccordionNew.Header
            icon={getIconFromModuleType('home_internet', true)}
          >
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_INTERNET_MOBILE_LABEL')}
            />
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
                  {t('__PLAN_PAGE_MODULE_INTERNET_MOBILE_REMOVE_BUTTON')}
                </Button>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          {isDefaultVariant && (
            <AccordionNew.Panel>
              <Label>{t('__PLAN_PAGE_MODULE_INTERNET_MOBILE_TITLE')}</Label>
              <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              <div>
                {defaultInternetHomeProviders.map((e) => (
                  <FormField
                    key={`internet-home-${e.name}`}
                    style={{
                      marginTop: appTheme.space.sm,
                    }}
                  >
                    <Checkbox
                      key={`internet-home-${e.name}`}
                      value={e.name}
                      name={`internet-home-${e.name}`}
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

                        const updatedInternetHomeProviders = event.target
                          .checked
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
                          updatedInternetHomeProviders,
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
                        {t(
                          '__PLAN_PAGE_MODULE_OTHER_INTERNET_MOBILE_LABEL_HINT'
                        )}
                      </Hint>
                      <Span style={{ color: appTheme.palette.red[600] }}>
                        *
                      </Span>
                    </div>
                    <FormField>
                      <Textarea
                        id="other-internet-home-name"
                        name="other-internet-home-name"
                        readOnly={getPlanStatus() !== 'draft'}
                        isResizable
                        onBlur={() => {
                          validate();
                        }}
                        value={otherProviderName}
                        onChange={(e) => {
                          setOtherProviderName(e.target.value);
                          const updatedInternetHomeProviders = (
                            value?.output || []
                          ).map((provider) => {
                            if (provider.isOther === 1) {
                              return { ...provider, name: e.target.value };
                            }
                            return provider;
                          });

                          updateOutput(
                            updatedInternetHomeProviders,
                            e.target.value,
                            true
                          );
                        }}
                        placeholder={t(
                          '__PLAN_PAGE_MODULE_OTHER_INTERNET_MOBILE_TEXTAREA_PLACEHOLDER'
                        )}
                      />
                    </FormField>
                  </div>
                )}
              </div>

              {internetHomeError && (
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
                    data-qa="internet-home-error"
                  >
                    {internetHomeError}
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

export default InternetHomeProviders;
