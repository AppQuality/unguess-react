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
  SM,
  Span,
  XL,
} from '@appquality/unguess-design-system';
import { useRef } from 'react';
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
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;

  &:hover,
  &[data-dragging='true'] {
    border-color: ${({ theme }) => theme.palette.blue[600]};
    background-color: ${({ theme }) => theme.palette.blue[100]};
  }
`;

const FileList = styled.ul`
  list-style: none;
  margin: ${({ theme }) => theme.space.sm} 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

const FileItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  background: ${({ theme }) => theme.palette.grey[100]};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.grey[600]};
  padding: 0 ${({ theme }) => theme.space.xxs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1;

  &:hover {
    color: ${({ theme }) => theme.palette.red[600]};
  }
`;

const allowedLanguages = [...getAllLanguageTags()].sort((a, b) => {
  const nameA = getLanguageNameByFullTag(a)?.toLowerCase() ?? '';
  const nameB = getLanguageNameByFullTag(b)?.toLowerCase() ?? '';
  return nameA.localeCompare(nameB);
});

export interface UploadStepProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const UploadStepBody = ({
  language,
  onLanguageChange,
  files,
  onFilesChange,
}: UploadStepProps) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = [...files, ...Array.from(incoming)];
    onFilesChange(next);
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };

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

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="video/*"
        style={{ display: 'none' }}
        onChange={(e) => addFiles(e.target.files)}
      />

      <DropZone
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <XL isBold>{t('__NEW_ACTIVITY_MODAL_UPLOAD_TITLE')}</XL>
        <MD style={{ color: appTheme.palette.grey[600] }}>
          {t('__NEW_ACTIVITY_MODAL_UPLOAD_SUBTITLE')}
        </MD>
      </DropZone>

      {files.length > 0 && (
        <FileList>
          {files.map((file, i) => (
            <FileItem key={`${file.name}-${i}`}>
              <SM isBold>{file.name}</SM>
              <RemoveButton
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
              >
                ✕
              </RemoveButton>
            </FileItem>
          ))}
        </FileList>
      )}
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
