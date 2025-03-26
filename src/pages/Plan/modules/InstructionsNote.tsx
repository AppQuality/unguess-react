import {
  Button,
  Card,
  Editor,
  Label,
  Message,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { DeleteModuleConfirmationModal } from './modal/DeleteModuleConfirmationModal';
import { getIconFromModuleType } from '../utils';

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space.md};
  padding-left: ${({ theme }) => theme.space.md};
  padding-right: ${({ theme }) => theme.space.md};
  padding-bottom: ${({ theme }) => theme.space.lg};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
`;

const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.space.md};
`;

const StyledInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.space.sm};
  gap: ${({ theme }) => theme.space.xxs};
`;

const InstructionsNote = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  const { value, setOutput, remove } = useModule('instruction_note');
  const { getPlanStatus } = useModuleConfiguration();
  const { t } = useTranslation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const validation = (
    module: components['schemas']['Module'] & { type: 'instruction_note' }
  ) => {
    let error;
    if (module.output.length > 512) {
      error = t('__PLAN_INSTRUCTION_NOTE_SIZE_ERROR_TOO_LONG');
    }
    if (module.output === '<p></p>') {
      error = t('__PLAN_INSTRUCTION_NOTE_SIZE_ERROR_EMPTY');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'instruction_note',
    validate: validation,
  });
  const handleBlur = () => {
    validate();
  };

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  return (
    <>
      <StyledCard>
        <StyledCardHeader>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: appTheme.space.xs,
            }}
          >
            {getIconFromModuleType('instruction_note')}
            <Label>{t('__PLAN_PAGE_MODULE_INSTRUCTION_NOTE_TITLE')}</Label>
          </div>
          {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) &&
            getPlanStatus() === 'draft' && (
              <Button isBasic isDanger onClick={handleDelete}>
                <Button.StartIcon>
                  <TrashIcon />
                </Button.StartIcon>
                {t('__PLAN_PAGE_MODULE_INSTRUCTION_NOTE_REMOVE_BUTTON')}
              </Button>
            )}
        </StyledCardHeader>
        <>
          <Editor
            editable={
              hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) &&
              getPlanStatus() === 'draft'
            }
            headerTitle={t(
              '__PLAN_PAGE_MODULE_INSTRUCTION_NOTE_DESCRIPTION_EDITOR_HEADER_TITLE'
            )}
            onUpdate={(content) => setOutput(content.editor.getHTML())}
            hasInlineMenu
            placeholderOptions={{
              placeholder: t(
                '__PLAN_PAGE_MODULE_INSTRUCTION_NOTE_DESCRIPTION_EDITOR_PLACEHOLDER'
              ),
            }}
            disableSaveShortcut
            onBlur={handleBlur}
            {...(error && { validation: 'error' })}
          >
            {value?.output}
          </Editor>
          <StyledInfoBox>
            {error && typeof error === 'string' ? (
              <Message validation="error" data-qa="instruction-note-error">
                {error}
              </Message>
            ) : (
              <Message>{t('__PLAN_PAGE_MODULE_INSTRUCTION_NOTE_INFO')}</Message>
            )}
          </StyledInfoBox>
        </>
      </StyledCard>
      {isOpenDeleteModal && (
        <DeleteModuleConfirmationModal
          onQuit={() => setIsOpenDeleteModal(false)}
          onConfirm={remove}
        />
      )}
    </>
  );
};

export default InstructionsNote;
