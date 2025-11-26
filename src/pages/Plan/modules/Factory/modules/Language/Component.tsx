import {
  AccordionNew,
  FormField,
  Hint,
  IconButton,
  Label,
  Radio,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import useWindowSize from 'src/hooks/useWindowSize';
import { DeleteModuleConfirmationModal } from 'src/pages/Plan/modules/modal/DeleteModuleConfirmationModal';
import styled from 'styled-components';
import { useIconWithValidation } from './useIcon';

const StyledTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${appTheme.space.sm};
`;
const Language = () => {
  const { getPlanStatus } = useModuleConfiguration();
  const { value, setOutput, remove } = useModule('language');
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { t } = useTranslation();
  const Icon = useIconWithValidation();
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const isMobile = width < breakpointSm;

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
          <AccordionNew.Header icon={Icon}>
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_LANGUAGE_TITLE')}
            />
            {!isMobile && getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Tooltip
                  placement="start"
                  type="light"
                  size="small"
                  content={t(
                    '__PLAN_PAGE_MODULE_LANGUAGE_REMOVE_TOOLTIP_BUTTON'
                  )}
                >
                  <IconButton
                    isDanger
                    onClick={(e) => {
                      handleDelete();
                      e.stopPropagation();
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip>
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
