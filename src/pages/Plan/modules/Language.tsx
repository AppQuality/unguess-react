import {
  AccordionNew,
  Button,
  FormField,
  Hint,
  Label,
  Radio,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useModule } from 'src/features/modules/useModule';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { ReactComponent as LanguageIcon } from 'src/assets/icons/languages.svg';
import { appTheme } from 'src/app/theme';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import styled from 'styled-components';

const StyledTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${appTheme.space.sm};
`;
const Language = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  const { value, setOutput, remove } = useModule('language');
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

  return (
    <AccordionNew level={3} hasBorder>
      <AccordionNew.Section>
        <AccordionNew.Header
          icon={<LanguageIcon color={appTheme.palette.blue[600]} />}
        >
          <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_LANGUAGE_TITLE')} />
          {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
            <AccordionNew.Meta>
              <Button isBasic isDanger onClick={remove}>
                <Button.StartIcon>
                  <TrashIcon />
                </Button.StartIcon>
                {t('__PLAN_PAGE_MODULE_LANGUAGE_REMOVE_BUTTON')}
              </Button>
            </AccordionNew.Meta>
          )}
        </AccordionNew.Header>
        <AccordionNew.Panel data-qa="title-module">
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
  );
};

export default Language;
