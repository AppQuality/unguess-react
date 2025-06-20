import {
  AccordionNew,
  Button,
  Checkbox,
  FormField,
  Hint,
  Label,
  Span,
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

const Browser = () => {
  type BrowserType =
    components['schemas']['OutputModuleBrowser'][number]['name'];
  const browserTypes: BrowserType[] = ['chrome', 'firefox', 'safari', 'edge'];

  const { hasFeatureFlag } = useFeatureFlag();
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { value, setOutput, remove } = useModule('browser');
  const { t } = useTranslation();
  const validation = (
    module: components['schemas']['Module'] & { type: 'browser' }
  ) => {
    if (!module.output || module.output.length === 0) {
      return { value: t('__BROWSER_ERROR_REQUIRED') };
    }

    return true;
  };

  const { error, validate } = useValidation({
    type: 'browser',
    validate: validation,
  });

  const isDefaultVariant = value?.variant === 'default';

  const browserError =
    error && typeof error === 'object' && `browser.value` in error
      ? error[`browser.value`]
      : false;

  const updateOutput = (desiredBrowsers: { name: BrowserType }[]) => {
    if (desiredBrowsers.length > 0) {
      const fixedPercentage: number = Number(
        (100 / desiredBrowsers.length).toFixed(2) // the percentage is equally divided and it's the same for all genders
      );
      setOutput(
        desiredBrowsers.map((item) => ({
          ...item,
          percentage: fixedPercentage,
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
        className="browser-checkboxes"
        data-qa="browser-module"
        type={browserError ? 'danger' : 'default'}
        level={3}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={getIconFromModuleType('browser')}>
            <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_BROWSER_LABEL')} />
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
                    {t('__PLAN_PAGE_MODULE_BROWSER_REMOVE_BUTTON')}
                  </Button>
                </AccordionNew.Meta>
              )}
          </AccordionNew.Header>
          {isDefaultVariant && (
            <AccordionNew.Panel>
              <Label>{t('__PLAN_PAGE_MODULE_BROWSER_TITLE')}</Label>
              <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              <FormField
                style={{
                  marginTop: appTheme.space.sm,
                }}
              >
                <Checkbox
                  key="all"
                  value="all"
                  name="browser-all"
                  disabled={getPlanStatus() !== 'draft'}
                  // checked if all ages are selected
                  checked={browserTypes.every((browser) =>
                    value?.output.some(
                      (item) => item.name === browser.toLowerCase()
                    )
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateOutput(
                        browserTypes.map((b) => ({
                          name: b.toLowerCase() as BrowserType,
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
                    {t('__PLAN_PAGE_MODULE_BROWSER_ALL_LABEL')}
                  </Label>
                  <Hint>{t('__PLAN_PAGE_MODULE_BROWSER_ALL_LABEL_HINT')}</Hint>
                </Checkbox>
              </FormField>
              <div style={{ marginLeft: appTheme.space.md }}>
                {browserTypes.map((br) => (
                  <FormField
                    key={`browser-${br.toLowerCase()}`}
                    style={{
                      marginTop: appTheme.space.sm,
                    }}
                  >
                    <Checkbox
                      key={`browser-${br.toLowerCase()}`}
                      value={`${br.toLowerCase()}`}
                      name={`browser-${br.toLowerCase()}`}
                      disabled={getPlanStatus() === 'pending_review'}
                      checked={value?.output.some((item) => item.name === br)}
                      onChange={(e) => {
                        const previousBrowsers = value?.output.map(
                          (item) => item.name
                        );
                        let updatedBrowsers: BrowserType[] = [];
                        if (e.target.checked) {
                          updatedBrowsers = [
                            ...(previousBrowsers || []),
                            e.target.value as BrowserType,
                          ];
                        } else {
                          updatedBrowsers = previousBrowsers
                            ?.filter((item) => item !== e.target.value)
                            .map((item) => item) as BrowserType[];
                        }
                        updateOutput(updatedBrowsers.map((b) => ({ name: b })));
                      }}
                    >
                      <Label
                        style={{
                          color: appTheme.palette.grey[800],
                          fontSize: appTheme.fontSizes.md,
                        }}
                      >
                        {br.split('')[0].toUpperCase() + br.slice(1)}
                      </Label>
                    </Checkbox>
                  </FormField>
                ))}
              </div>

              {browserError && (
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
                    data-qa="browser-error"
                  >
                    {browserError}
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

export default Browser;
