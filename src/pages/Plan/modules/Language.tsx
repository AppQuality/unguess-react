import {
  AccordionNew,
  Button,
  FormField,
  Hint,
  Label,
  Radio,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { useState } from 'react';
import { getIconFromModuleType } from '../utils';
import { DeleteModuleConfirmationModal } from './modal/DeleteModuleConfirmationModal';

const StyledTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${appTheme.space.sm};
`;
const Language = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  const { getPlanStatus } = useModuleConfiguration();
  const { value, setOutput, remove } = useModule('language');
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { t } = useTranslation();
  const languages = [
    {
      value: 'en',
      label: t('__PLAN_PAGE_MODULE_LANGUAGE_OPTION_EN'),
    },
    {
      value: 'fr',
      label: t('__PLAN_PAGE_MODULE_LANGUAGE_OPTION_FR'),
    },
    {
      value: 'it',
      label: t('__PLAN_PAGE_MODULE_LANGUAGE_OPTION_IT'),
    },
    {
      value: 'es',
      label: t('__PLAN_PAGE_MODULE_LANGUAGE_OPTION_ES'),
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutput(e.target.value);
  };
  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  return (
    <>
      <AccordionNew level={3} hasBorder data-qa="language-module">
        <AccordionNew.Section>
          <AccordionNew.Header icon={getIconFromModuleType('language')}>
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_LANGUAGE_TITLE')}
            />
            {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
              <AccordionNew.Meta>
                <Button isBasic isDanger onClick={handleDelete}>
                  <Button.StartIcon>
                    <TrashIcon />
                  </Button.StartIcon>
                  {t('__PLAN_PAGE_MODULE_LANGUAGE_REMOVE_BUTTON')}
                </Button>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <StyledTitleGroup>
              <Label>
                {t('_PLAN_PAGE_MODULE_LANGUAGE_SUBTITLE')}
                <span style={{ color: appTheme.palette.red[700] }}>*</span>
              </Label>
              <Hint>{t('_PLAN_PAGE_MODULE_LANGUAGE_DESCRIPTION')}</Hint>
            </StyledTitleGroup>
            <div style={{ padding: appTheme.space.xs }}>
              {languages.map((language) => (
                <FormField style={{ marginBottom: appTheme.space.sm }}>
                  <Radio
                    disabled={getPlanStatus() !== 'draft'}
                    name={language.value}
                    value={language.value}
                    checked={value?.output === language.value}
                    onChange={handleChange}
                  >
                    <Label isRegular>{t(language.label)}</Label>
                  </Radio>
                </FormField>
              ))}
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

export default Language;
