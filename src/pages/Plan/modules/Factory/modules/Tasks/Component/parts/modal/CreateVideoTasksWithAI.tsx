import {
  Alert,
  Button,
  FooterItem,
  FormField,
  Label,
  MD,
  Message,
  Modal,
  ModalClose,
  Notification,
  Select,
  Span,
  Tag,
  Textarea,
  useToast,
} from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ReactComponent as StopIcon } from 'src/assets/icons/stop.svg';
import {
  Module,
  usePostAiAgentsGenerateVideoTasksMutation,
} from 'src/features/api';
import { v4 as uuidv4 } from 'uuid';
import { useModuleTasksContext } from '../../context';
import { useModuleTasks } from '../../hooks';
import { LoadingSpinner } from './LoadingSpinner';

// constants
const MODULES_TO_PROMPT = [
  'title',
  'goal',
  'out_of_scope',
  'tasks',
  'language',
  'touchpoints',
  'age',
  'literacy',
  'additional_target',
];
const MAX_PROMPT_LENGTH = 102300;

const CreateVideoTasksWithAI = () => {
  const { setOutput, value: currentTasks } = useModuleTasks();
  const { addToast } = useToast();
  const { planId } = useParams();
  const { t } = useTranslation();
  const { setIsOpenCreateVideoTasksWithAIModal } = useModuleTasksContext();
  const MIN_LENGTH = 1;
  const [userPrompt, setUserPrompt] = useState('');
  const [usecaseNumber, setUsecaseNumber] = useState<number | undefined>(
    undefined
  );
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

  const records = useAppSelector((state) => state.planModules);

  // API hooks
  const [
    generateVideoTasks,
    { data: useCasesData, error: useCasesError, isLoading: isPostingRequest },
  ] = usePostAiAgentsGenerateVideoTasksMutation();

  // Type for the mutation request
  type GenerateVideoTasksRequest = ReturnType<typeof generateVideoTasks>;
  const [request, setRequest] = useState<GenerateVideoTasksRequest | null>(
    null
  );

  const handleClose = () => {
    if (isPostingRequest) {
      setIsOpenConfirmation(true);
    } else {
      setIsOpenCreateVideoTasksWithAIModal(false);
    }
  };

  const handleConfirmClose = () => {
    setIsOpenConfirmation(false);
    setIsOpenCreateVideoTasksWithAIModal(false);
  };
  const handleCancelClose = () => {
    setIsOpenConfirmation(false);
  };

  const handleStop = () => {
    request?.abort(); // Abort the ongoing request
  };

  const handleClick = () => {
    // gather modules info to prepend to the user prompt
    const modulesInfo: Module[] = Object.entries(records)
      .filter(([key]) => MODULES_TO_PROMPT.includes(key))
      .map(([key, item]) => ({
        ...item,
        key,
      }));
    const fullPrompt = `User prompt:\n${userPrompt}\n[Modules info]:\n${modulesInfo}`;

    const req = generateVideoTasks({
      body: {
        plan_id: planId ? Number(planId) : undefined,
        usecaseNumber: usecaseNumber as number, // usecaseNumber always have a value here because the button is disabled when it's undefined
        inputPrompt: fullPrompt.slice(0, MAX_PROMPT_LENGTH),
        modules: modulesInfo,
      },
    });
    setRequest(req);
  };

  // Stop polling when job is completed and process the results
  useEffect(() => {
    if (useCasesData?.tasks) {
      const newTasks = useCasesData.tasks.map((useCase) => ({
        kind: useCase.kind,
        title: useCase.title,
        description: useCase.description || '',
        id: useCase.id ?? uuidv4(),
      }));
      setOutput([...currentTasks, ...newTasks]);

      // show a success message
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t('__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_SUCCESS_TOAST')}
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
      // close the modal after processing the result
      setIsOpenCreateVideoTasksWithAIModal(false);
    }
  }, [useCasesData]);

  return (
    <Modal role="dialog">
      <Modal.Header>
        {t('__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_HEADER')}{' '}
        <Tag>{t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_AI_BETA_TAG')}</Tag>
      </Modal.Header>
      <Modal.Body>
        <div>
          <MD style={{ marginBottom: appTheme.space.sm }}>
            <Trans
              i18nKey="__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_PROMPT_INFO"
              components={{
                title: <MD isBold />,
                bold: <Span isBold />,
              }}
            />
          </MD>
          <FormField style={{ marginBottom: appTheme.space.md }}>
            <Select
              id="tasks-qty"
              inputValue={usecaseNumber !== undefined ? `${usecaseNumber}` : ''}
              selectionValue={usecaseNumber ? usecaseNumber.toString() : ''}
              placeholder="Auto"
              label={
                <>
                  {t(
                    '__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_TASKS_QUANTITY_LABEL'
                  )}
                </>
              }
              onSelect={(value) => setUsecaseNumber(Number(value))}
              isDisabled={isPostingRequest}
              style={{ maxWidth: '150px' }}
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <Select.Option
                  key={item}
                  label={`${item}`}
                  value={`${item}`}
                  isSelected={usecaseNumber === item}
                />
              ))}
            </Select>
          </FormField>
          <FormField style={{ marginBottom: appTheme.space.md }}>
            <Label htmlFor="task-list-prompt">
              {t('__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_PROMPT_LABEL')}
              <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
            </Label>
            <div
              style={{ position: 'relative', paddingTop: appTheme.space.xs }}
            >
              <Textarea
                disabled={isPostingRequest}
                id="task-list-prompt"
                minLength={MIN_LENGTH}
                maxLength={102300}
                rows={8}
                placeholder={t(
                  '__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_PROMPT_PLACEHOLDER'
                )}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.currentTarget.value)}
              />
              {isPostingRequest && <LoadingSpinner />}
            </div>
          </FormField>
          <Alert type="info" style={{ marginTop: appTheme.space.md }}>
            <Alert.Title>
              {t('__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_ALERT_TITLE')}
            </Alert.Title>
            <Trans
              i18nKey="__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_ALERT_TEXT"
              components={{
                br: <br />,
              }}
            />
          </Alert>
          {useCasesError && (
            <Message validation="error">
              {t('__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_ERROR')}
            </Message>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button isBasic onClick={handleClose}>
            {t('__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_CANCEL_BUTTON')}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button
            disabled={userPrompt.length < MIN_LENGTH}
            onClick={isPostingRequest ? handleStop : handleClick}
            isPrimary
            isAccent
          >
            {isPostingRequest ? (
              <>
                <Button.StartIcon>
                  <StopIcon />
                </Button.StartIcon>
                {t('__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_STOP_BUTTON')}
              </>
            ) : (
              t('__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_CREATE_BUTTON')
            )}
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose onClick={handleClose} />
      {isOpenConfirmation && (
        <Modal role="dialog" onClose={handleCancelClose}>
          <Modal.Header isDanger>
            {t('__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_CONFIRM_CLOSE_HEADER')}
          </Modal.Header>
          <Modal.Body>
            {t('__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_CONFIRM_CLOSE_BODY')}
          </Modal.Body>
          <Modal.Footer>
            <FooterItem>
              <Button isDanger isBasic onClick={handleConfirmClose}>
                {t('__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_CONFIRM_CLOSE_ANYWAY')}
              </Button>
            </FooterItem>
            <FooterItem>
              <Button isPrimary isAccent onClick={handleCancelClose}>
                {t('__PLAN_PAGE_ADD_VIDEO_TASK_MODAL_AI_CONFIRM_CLOSE_CANCEL')}
              </Button>
            </FooterItem>
          </Modal.Footer>
          <ModalClose onClick={handleCancelClose} />
        </Modal>
      )}
    </Modal>
  );
};

export { CreateVideoTasksWithAI };
