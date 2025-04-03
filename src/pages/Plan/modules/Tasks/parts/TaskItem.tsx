import {
  AccordionNew,
  Button,
  Editor,
  FormField,
  Input,
  Label,
  MD,
  Message,
  Span,
  MediaInput,
  SM,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { ReactComponent as InfoIcon } from '@zendeskgarden/svg-icons/src/16/info-stroke.svg';
import { components } from 'src/common/schema';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import styled from 'styled-components';
import { useModuleTasks } from '../hooks';
import { getIconFromTaskOutput } from '../utils';
import { DeleteTaskConfirmationModal } from './modal/DeleteTaskConfirmationModal';

const StyledInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${appTheme.space.sm};
  gap: ${appTheme.space.xxs};
`;

const TaskItem = ({
  task,
}: {
  task: components['schemas']['OutputModuleTask'] & { key: number };
}) => {
  const { t } = useTranslation();
  const { update, validate, error } = useModuleTasks();
  const { getPlanStatus } = useModuleConfiguration();
  const [validLink, setValidLink] = useState<boolean>(true);
  const confirmationState = useState<{
    isOpen: boolean;
    taskKey: number;
  }>({ isOpen: false, taskKey: 0 });
  const { key, kind, title, description } = task;
  const index = key + 1;

  const titleError =
    error && typeof error === 'object' && `tasks.${key}.title` in error
      ? error[`tasks.${key}.title`]
      : false;
  const descriptionError =
    error && typeof error === 'object' && `tasks.${key}.description` in error
      ? error[`tasks.${key}.description`]
      : false;

  const hasError = titleError || descriptionError;
  const hasPlaceholder = !title;

  const handleBlur = () => {
    validate();
  };

  const validateLink = (url: string) => {
    const regex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/;
    if (url && !regex.test(url)) {
      return setValidLink(false);
    }
    return setValidLink(true);
  };

  return (
    <>
      <AccordionNew
        level={3}
        id={`task-${index}`}
        key={`task-${index}`}
        hasBorder
        type={hasError ? 'danger' : 'default'}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={getIconFromTaskOutput(task)}>
            <AccordionNew.Label
              label={`${index}. ${
                hasPlaceholder
                  ? t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_PLACEHOLDER_EMPTY')
                  : title
              }`}
            />
            {getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Button
                  isBasic
                  isDanger
                  onClick={() =>
                    confirmationState[1]({
                      isOpen: true,
                      taskKey: key,
                    })
                  }
                >
                  <Button.StartIcon>
                    <TrashIcon />
                  </Button.StartIcon>
                  {t('__PLAN_PAGE_MODULE_TASKS_REMOVE_TASK_BUTTON')}
                </Button>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <div style={{ padding: appTheme.space.xs }}>
              {kind !== 'explorative-bug' && (
                <FormField style={{ marginBottom: appTheme.space.md }}>
                  <Label>
                    {t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_LABEL')}
                    <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                  </Label>
                  <MD>
                    {t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_DESCRIPTION')}
                  </MD>
                  <Input
                    type="text"
                    disabled={getPlanStatus() !== 'draft'}
                    value={title}
                    onChange={(e) => update(key, { title: e.target.value })}
                    placeholder={t(
                      '__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_PLACEHOLDER'
                    )}
                    onBlur={handleBlur}
                    {...(titleError && { validation: 'error' })}
                    style={{ marginTop: appTheme.space.xs }}
                  />
                  {titleError && (
                    <Message validation="error">{titleError}</Message>
                  )}
                </FormField>
              )}
              <Label>
                {t('__PLAN_PAGE_MODULE_TASKS_TASK_DESCRIPTION_LABEL')}
                <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              </Label>
              {kind === 'explorative-bug' ? (
                <MD
                  style={{
                    color: appTheme.palette.grey[800],
                    marginTop: appTheme.space.xs,
                  }}
                >
                  {description}
                </MD>
              ) : (
                <>
                  <Editor
                    key={`task-editor-${index}`}
                    editable={getPlanStatus() === 'draft'}
                    headerTitle={t(
                      '__PLAN_PAGE_MODULE_TASKS_TASK_DESCRIPTION_EDITOR_HEADER_TITLE'
                    )}
                    onUpdate={(value) =>
                      update(key, { description: value.editor.getHTML() })
                    }
                    hasInlineMenu
                    placeholderOptions={{
                      placeholder: t(
                        '__PLAN_PAGE_MODULE_TASKS_TASK_DESCRIPTION_EDITOR_PLACEHOLDER'
                      ),
                    }}
                    disableSaveShortcut
                    onBlur={handleBlur}
                    {...(descriptionError && { validation: 'error' })}
                  >
                    {description}
                  </Editor>
                  {descriptionError && (
                    <Message validation="error">{descriptionError}</Message>
                  )}
                </>
              )}

              <FormField style={{ marginTop: appTheme.space.md }}>
                <Label>
                  {t('__PLAN_PAGE_MODULE_TASKS_TASK_LINK_LABEL')}{' '}
                  <Span
                    style={{
                      fontWeight: 400,
                      color: appTheme.palette.grey[600],
                    }}
                  >
                    {t('__PLAN_PAGE_MODULE_TASKS_TASK_OPTIONAL_LABEL')}
                  </Span>
                </Label>
                <MediaInput
                  start={<LinkIcon />}
                  value={task.url}
                  validation={validLink === false ? 'error' : undefined}
                  onChange={(e) => {
                    update(key, { url: e.target.value });
                  }}
                  onBlur={(e) => {
                    validateLink(e.target.value);
                  }}
                  placeholder={t(
                    '__PLAN_PAGE_MODULE_TASKS_TASK_LINK_PLACEHOLDER'
                  )}
                />
                <StyledInfoBox>
                  {validLink === false ? (
                    <>
                      <InfoIcon color={appTheme.components.text.dangerColor} />
                      <SM
                        style={{ color: appTheme.components.text.dangerColor }}
                        data-qa="link-format-error"
                      >
                        {t(
                          '__PLAN_PAGE_MODULE_TASKS_TASK_LINK_FORMAT_ERROR_LABEL'
                        )}
                      </SM>
                    </>
                  ) : (
                    <>
                      <InfoIcon />
                      <SM style={{ color: appTheme.palette.grey[600] }}>
                        {t('__PLAN_PAGE_MODULE_TASKS_TASK_LINK_INFO_LABEL')}
                      </SM>
                    </>
                  )}
                </StyledInfoBox>
              </FormField>
            </div>
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
      {confirmationState[0].isOpen && (
        <DeleteTaskConfirmationModal state={confirmationState} />
      )}
    </>
  );
};

export { TaskItem };
