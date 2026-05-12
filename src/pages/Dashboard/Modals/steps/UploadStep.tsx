import {
  getAllLanguageTags,
  getLanguageNameByFullTag,
} from '@appquality/languages';
import {
  Button,
  FooterItem,
  FormField,
  Label,
  MD,
  Select,
  Span,
  XL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  border: 2px dashed ${({ theme }) => theme.palette.grey[400]};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  padding: ${({ theme }) => theme.space.xxl};
  margin-top: ${({ theme }) => theme.space.md};
  background-color: ${({ theme }) => theme.palette.grey[100]};
  text-align: center;
  min-height: 200px;
`;

const allowedLanguages = [...getAllLanguageTags()].sort((a, b) => {
  const nameA = getLanguageNameByFullTag(a)?.toLowerCase() ?? '';
  const nameB = getLanguageNameByFullTag(b)?.toLowerCase() ?? '';
  return nameA.localeCompare(nameB);
});

export interface UploadStepProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

const UploadStepBody = ({ language, onLanguageChange }: UploadStepProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <FormField style={{ marginBottom: appTheme.space.md }}>
        <Label>
          {t('__NEW_ACTIVITY_MODAL_LANGUAGE_LABEL')}
          <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
        </Label>
        <Select
          fullWidthOption
          listboxAppendToNode={document.body}
          placeholder={t('__NEW_ACTIVITY_MODAL_LANGUAGE_PLACEHOLDER')}
          onSelect={onLanguageChange}
          selectionValue={language}
          inputValue={getLanguageNameByFullTag(language) ?? ''}
        >
          {allowedLanguages.map((lang) => (
            <Select.Option
              key={`lang-${lang}`}
              value={lang}
              label={getLanguageNameByFullTag(lang) ?? lang}
            />
          ))}
        </Select>
      </FormField>
      <DropZone>
        <XL isBold>{t('__NEW_ACTIVITY_MODAL_UPLOAD_TITLE')}</XL>
        <MD style={{ color: appTheme.palette.grey[600] }}>
          {t('__NEW_ACTIVITY_MODAL_UPLOAD_SUBTITLE')}
        </MD>
      </DropZone>
    </div>
  );
};

const UploadStepFooter = ({
  onBack,
  onUpload,
}: {
  onBack: () => void;
  onUpload: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <FooterItem>
        <Button isBasic onClick={onBack}>
          {t('__NEW_ACTIVITY_MODAL_BACK_BUTTON')}
        </Button>
      </FooterItem>
      <FooterItem>
        <Button isAccent isPrimary onClick={onUpload}>
          {t('__NEW_ACTIVITY_MODAL_UPLOAD_BUTTON')}
        </Button>
      </FooterItem>
    </>
  );
};

UploadStepBody.Footer = UploadStepFooter;

export { UploadStepBody as UploadStep };
