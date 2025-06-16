import {
  AccordionNew,
  Button,
  FormField,
  Label,
  MultiSelect,
  SM,
  Span,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { components } from 'src/common/schema';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { getIconFromModuleType } from '../utils';
import { DeleteModuleConfirmationModal } from './modal/DeleteModuleConfirmationModal';

const StyledInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${appTheme.space.sm};
  gap: ${appTheme.space.xxs};
`;

// eslint-disable-next-line
enum EmploymentType {
  EMPLOYEE = 1,
  FREELANCER,
  RETIRED,
  STUDENT,
  UNEMPLOYED,
  HOMEMAKER,
}

const Employment = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  const { value, setOutput, remove } = useModule('employment');
  const { getPlanStatus } = useModuleConfiguration();
  const { t } = useTranslation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const options = Object.values(EmploymentType)
    .filter((v) => typeof v === 'number')
    .map((id) => ({
      id: id as number,
      label: t(
        `__PLAN_PAGE_MODULE_EMPLOYMENT_OPTION_${EmploymentType[id as number]}`
      ),
    }));

  const validation = (
    module: components['schemas']['Module'] & { type: 'employment' }
  ) => {
    let error;
    if (!module.output) {
      error = t('__PLAN_EMPLOYMENT_SIZE_ERROR_REQUIRED');
    }
    if (module.output.length < 1) {
      error = t('__PLAN_EMPLOYMENT_SIZE_ERROR_REQUIRED');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'employment',
    validate: validation,
  });
  const handleChange = () => {
    validate();
  };

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };
  return (
    <>
      <AccordionNew
        data-qa="employment-module"
        level={3}
        hasBorder
        type={error ? 'danger' : 'default'}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={getIconFromModuleType('employment')}>
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_EMPLOYMENT_TITLE')}
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
                      <TrashIcon />
                    </Button.StartIcon>
                    {t('__PLAN_PAGE_MODULE_EMPLOYMENT_REMOVE_BUTTON')}
                  </Button>
                </AccordionNew.Meta>
              )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <div style={{ padding: appTheme.space.xs }}>
              <FormField style={{ marginBottom: appTheme.space.md }}>
                <Label>
                  <Trans i18nKey="__PLAN_PAGE_MODULE_EMPLOYMENT_LABEL">
                    Select one or more professional categories
                  </Trans>
                  <Span style={{ color: appTheme.palette.red[700] }}>*</Span>
                </Label>
                <MultiSelect
                  options={options}
                  creatable
                  maxItems={4}
                  size="small"
                  i18n={{
                    placeholder: t(
                      '__PLAN_PAGE_MODULE_EMPLOYMENT_SELECT_PLACEHOLDER'
                    ),
                  }}
                  /*   onChange={} */
                />
                <StyledInfoBox>
                  {error && typeof error === 'string' && (
                    <>
                      <AlertIcon />
                      <SM
                        style={{ color: appTheme.components.text.dangerColor }}
                        data-qa="employment-error"
                      >
                        {error}
                      </SM>
                    </>
                  )}
                </StyledInfoBox>
              </FormField>
            </div>
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
      {isOpenDeleteModal && (
        <DeleteModuleConfirmationModal
          onQuit={() => setIsOpenDeleteModal(false)}
          onConfirm={remove}
        />
      )}
    </>
  );
};

export default Employment;
