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
  Textarea,
  useToast
} from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import {
  useGetServicesApiKJobsByJobIdQuery,
  usePostServicesApiKUsecasesMutation,
} from 'src/features/api';
import { useModuleTasksContext } from '../../context';
import { useModuleTasks } from '../../hooks';
import { processItemOutput } from '../processItemOutput';
import { LoadingSpinner } from './LoadingSpinner';

// constants
const MODULES_TO_PROMPT = [
  'title',
  'goal',
  'out_of_scope',
  'tasks',
  'language',
  'touchpoints',
];
const MAX_PROMPT_LENGTH = 102300;

const CreateTaskListsWithAI = () => {
  const { setOutput, value: currentTasks } = useModuleTasks();
  const { addToast } = useToast();
  const { planId } = useParams();
  const { t } = useTranslation();
  const { setIsOpenCreateTasksWithAIModal } = useModuleTasksContext();
  const MIN_LENGTH = 1;
  const [userPrompt, setUserPrompt] = useState('');
  const [usecaseNumber, setUsecaseNumber] = useState<number | undefined>(undefined);
  const [pollingInterval, setPollingInterval] = useState(0);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

  const { records } = useAppSelector((state) => state.planModules);

  // API hooks
  const [
    postServicesApiKUsecases,
    { data: jobData, error: postError, isLoading: isPostingRequest },
  ] = usePostServicesApiKUsecasesMutation();
  const { data: useCasesData, error: useCasesError } =
    useGetServicesApiKJobsByJobIdQuery(
      { jobId: jobData?.jobId || '' },
      {
        skip: !jobData?.jobId,
        pollingInterval, // number in ms or 0 for no polling
      }
    );

  const handleClose = () => {
    if (isPostingRequest || pollingInterval > 0) {
      setIsOpenConfirmation(true);
    } else {
      setIsOpenCreateTasksWithAIModal(false);
    }
  };

  const handleConfirmClose = () => {
    setIsOpenConfirmation(false);
    setIsOpenCreateTasksWithAIModal(false);
  };
  const handleCancelClose = () => {
    setIsOpenConfirmation(false);
  };

  const handleStop = () => {
    setPollingInterval(0);
  };

  const handleClick = async () => {
    // gather modules info to prepend to the user prompt
    const modulesInfo = Object.entries(records)
      .filter(([key]) => MODULES_TO_PROMPT.includes(key))
      .map(
        ([key, item]) =>
          `Module: ${key}, Config: ${JSON.stringify(processItemOutput(item))}`
      )
      .join('\n');
    const fullPrompt = `User prompt:\n${userPrompt}\nModules info:\n${modulesInfo}`;

    await postServicesApiKUsecases({
      body: {
        planId: planId || '',
        count: usecaseNumber as number, // usecaseNumber always have a value here because the button is disabled when it's undefined
        requirements: fullPrompt.slice(0, MAX_PROMPT_LENGTH),
      },
    });
  };

  // Polling for job status every 5 seconds when jobId becomes available or changes
  useEffect(() => {
    if (jobData?.jobId) {
      setPollingInterval(5000);
    }
  }, [jobData?.jobId]);

  // Stop polling when job is completed and process the results
  useEffect(() => {
    if (useCasesData?.status === 'completed' && useCasesData?.result) {
      setPollingInterval(0);
      if (useCasesData?.result) {
        const newTasks = useCasesData.result.useCases.map((useCase) => ({
          kind: 'bug' as const,
          title: useCase.title,
          description: useCase.mainFlow,
          id: useCase.id,
        }));
        setOutput([...currentTasks, ...newTasks]);
      }
      // show a success message
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t(
              '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_SUCCESS_TOAST'
            )}
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
      // close the modal after processing the result
      setIsOpenCreateTasksWithAIModal(false);
    }
  }, [useCasesData]);

  // Stopping polling when there is an error
  useEffect(() => {
    if (useCasesError) {
      setPollingInterval(0);
    }
  }, [useCasesError]);

  let buttonLabel: string;
  if (isPostingRequest) {
    buttonLabel = t(
      '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_CREATING',
      'Creating...'
    );
  } else if (pollingInterval > 0) {
    buttonLabel = t(
      '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_STOP',
      'Stop Generation'
    );
  } else {
    buttonLabel = t(
      '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_CREATE_BUTTON',
      'Create'
    );
  }

  return (
    <Modal role="dialog">
      <Modal.Header>
        {t(
          '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_MODAL_HEADER'
        )}
      </Modal.Header>
      <Modal.Body>
        <div>
          <MD style={{ marginBottom: appTheme.space.sm }}>
            <Trans
              i18nKey="__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_PROMPT_INFO"
              components={{
                title: <MD isBold />,
                bold: <Span isBold />,
              }}
            />
          </MD>
          <FormField style={{ marginBottom: appTheme.space.md }}>
            <Select
              id="tasks-qty"
              placeholder='Select'
              inputValue={usecaseNumber !== undefined ? `${usecaseNumber}` : ''}
              label={
                <>
                  {t(
                    '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_TASKS_QUANTITY_LABEL'
                  )}
                  <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                </>
              }
              onChange={(value) => setUsecaseNumber(Number(value))}
              isDisabled={isPostingRequest || pollingInterval > 0}
              style={{ maxWidth: '150px' }}
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <Select.Option key={item} label={`${item}`} value={`${item}`} />
              ))}
            </Select>
          </FormField>
          <FormField style={{ marginBottom: appTheme.space.md }}>
            <Label htmlFor="task-list-prompt">
              {t(
                '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_PROMPT_LABEL'
              )}
              <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
            </Label>
            <div
              style={{ position: 'relative', paddingTop: appTheme.space.xs }}
            >
              <Textarea
                disabled={isPostingRequest || pollingInterval > 0}
                id="task-list-prompt"
                minLength={MIN_LENGTH}
                maxLength={102300}
                rows={8}
                placeholder={t(
                  '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_PROMPT_PLACEHOLDER'
                )}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.currentTarget.value)}
              />
              {true && (
                <LoadingSpinner />
              )}
            </div>
          </FormField>
          <Alert type="info" style={{ marginTop: appTheme.space.md }}>
            <Alert.Title>
              {t(
                '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_ALERT_TITLE'
              )}
            </Alert.Title>
            <Trans
              i18nKey="__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_ALERT_TEXT"
              components={{
                ul: (
                  <ul
                    style={{
                      paddingTop: '0.5em',
                      paddingLeft: appTheme.space.md,
                      listStyle: 'disc',
                    }}
                  />
                ),
                li: <li />,
              }}
            />
          </Alert>
          {postError && (
            <Message validation="error">
              {t(
                '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_ERROR_SUBMITTING'
              )}
            </Message>
          )}
          {useCasesError && (
            <Message validation="error">
              {t(
                '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_ERROR_FETCHING'
              )}
            </Message>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button isBasic onClick={handleClose}>
            {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_CANCEL')}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button
            disabled={isPostingRequest || userPrompt.length < MIN_LENGTH || usecaseNumber === undefined}
            onClick={pollingInterval > 0 ? handleStop : handleClick}
            isPrimary={pollingInterval === 0 && !isPostingRequest}
            isAccent={pollingInterval === 0 && !isPostingRequest}
          >
            {buttonLabel}
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose onClick={handleClose} />
      {isOpenConfirmation && (
        <Modal role="dialog" onClose={handleCancelClose}>
          <Modal.Header isDanger>
            {t(
              '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_CONFIRM_CLOSE_HEADER'
            )}
          </Modal.Header>
          <Modal.Body>
            {t(
              '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_CONFIRM_CLOSE_BODY'
            )}
          </Modal.Body>
          <Modal.Footer>
            <FooterItem>
              <Button isDanger isBasic onClick={handleConfirmClose}>
                {t(
                  '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_CONFIRM_CLOSE_CLOSE_ANYWAY'
                )}
              </Button>
            </FooterItem>
            <FooterItem>
              <Button isPrimary isAccent onClick={handleCancelClose}>
                {t(
                  '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_CONFIRM_CLOSE_KEEP_PROCESSING'
                )}
              </Button>
            </FooterItem>
          </Modal.Footer>
          <ModalClose onClick={handleCancelClose} />
        </Modal>
      )}
    </Modal>
  );
};

export { CreateTaskListsWithAI };
